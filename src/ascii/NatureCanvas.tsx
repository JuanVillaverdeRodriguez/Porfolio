import { useEffect, useRef } from "react";
import type { Theme } from "../themes";
import { clamp01, fbm1, hash, noise2 } from "./noise";

// Paisaje ASCII a pantalla completa. La historia avanza con el scroll:
// 0 noche · 1 amanecer · 2 bosque · 3 río · 4 hoguera.
const CHAPTERS = ["about", "experience", "projects", "certifications", "contact"];

const COLOR_KEYS = ["fg", "muted", "red", "orange", "yellow", "green", "cyan", "blue", "magenta"] as const;
type ColorKey = (typeof COLOR_KEYS)[number];
const C: Record<ColorKey, number> = Object.fromEntries(COLOR_KEYS.map((k, i) => [k, i])) as Record<ColorKey, number>;
const ALPHAS = [0.14, 0.24, 0.36, 0.5, 0.68, 0.9];
const NA = ALPHAS.length;

const hexToRgb = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

type Particle = { x: number; y: number; vx: number; vy: number; life: number; kind: 0 | 1 | 2; seed: number };
type Ripple = { x: number; y: number; t0: number };

const storyProgress = () => {
  const mid = window.innerHeight * 0.55;
  let s = 0;
  for (let i = 0; i < CHAPTERS.length; i++) {
    const el = document.getElementById(CHAPTERS[i]);
    if (!el) continue;
    const r = el.getBoundingClientRect();
    if (r.top <= mid) s = i + clamp01((mid - r.top) / Math.max(1, r.height)) * (i < CHAPTERS.length - 1 ? 1 : 0);
  }
  // Al llegar al final del documento, la hoguera queda encendida del todo
  const end = document.documentElement.scrollHeight - window.innerHeight - window.scrollY;
  if (end < 40) s = Math.max(s, 4);
  return Math.min(4, s);
};

const bump = (s: number, c: number, w: number) => clamp01(1 - Math.abs(s - c) / w);

export default function NatureCanvas({ theme }: { theme: Theme }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const themeRef = useRef(theme);
  themeRef.current = theme;

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d", { alpha: true })!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0, H = 0, cols = 0, rows = 0, cw = 8, chH = 16, fs = 13;
    let chars = new Uint16Array(0);
    let style = new Int16Array(0);
    let buckets: number[][] = [];
    let styles: string[] = [];
    let styleThemeId = "";
    const mouse = { x: -9999, y: -9999, active: false, px: -9999, py: -9999, speed: 0 };
    const ripples: Ripple[] = [];
    const particles: Particle[] = [];
    let raf = 0;
    let last = 0;
    let smoothS = storyProgress();
    let clearEls: Element[] = [];
    const CLEAR = ".narrator p, .hint, .footer p, .pane, .ls, .chapter > .prompt, .figlet-fit, .statusbar";
    const collect = () => { clearEls = [...document.querySelectorAll(CLEAR)]; };
    collect();
    const collectId = setInterval(collect, 1000);

    const buildStyles = () => {
      const th = themeRef.current;
      styles = [];
      for (const k of COLOR_KEYS) {
        const [r, g, b] = hexToRgb(th[k]);
        for (const a of ALPHAS) styles.push(`rgba(${r},${g},${b},${th.light ? Math.min(1, a * 1.15) : a})`);
      }
      buckets = styles.map(() => []);
      styleThemeId = th.id;
    };

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      fs = W < 640 ? 11 : 13;
      ctx.font = `${fs}px "JetBrains Mono", ui-monospace, monospace`;
      ctx.textBaseline = "top";
      cw = ctx.measureText("M").width || fs * 0.6;
      chH = Math.round(fs * 1.3);
      cols = Math.ceil(W / cw) + 1;
      rows = Math.ceil(H / chH) + 1;
      chars = new Uint16Array(cols * rows);
      style = new Int16Array(cols * rows);
    };

    const put = (x: number, y: number, ch: string, color: number, a: number) => {
      x |= 0; y |= 0;
      if (x < 0 || y < 0 || x >= cols || y >= rows || ch === " ") return;
      const i = y * cols + x;
      chars[i] = ch.charCodeAt(0);
      style[i] = color * NA + Math.max(0, Math.min(NA - 1, a | 0));
    };

    const alphaLevel = (v: number, max = NA - 1) => Math.round(clamp01(v) * max);

    const spawn = (kind: 0 | 1 | 2, x: number, y: number) => {
      if (particles.length > 160) return;
      particles.push({ x, y, vx: 0, vy: 0, life: 1, kind, seed: Math.random() * 1000 });
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const minDt = W < 640 ? 1000 / 30 : 1000 / 45;
      if (now - last < minDt) return;
      const dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      draw(now / 1000, dt);
    };

    const draw = (t: number, dt: number) => {
      if (styleThemeId !== themeRef.current.id) buildStyles();
      const th = themeRef.current;
      chars.fill(0);
      style.fill(-1);

      const target = storyProgress();
      smoothS += (target - smoothS) * (reduced ? 1 : Math.min(1, dt * 3));
      const s = smoothS;
      const walk = s * cols * 0.9; // la cámara "camina" con la historia

      const nightW = Math.max(clamp01(1 - s / 1.2), clamp01((s - 3.25) / 0.6));
      const warmW = Math.max(bump(s, 1, 0.75), bump(s, 3, 0.7));
      const dayW = bump(s, 2, 1.1);
      const treesW = clamp01((s - 1.35) / 0.6);
      const riverW = clamp01((s - 2.45) / 0.5);
      const fireW = clamp01((s - 3.3) / 0.55);
      const horizon = Math.floor(rows * 0.64);

      // ── Estrellas ──────────────────────────────────────────────
      if (nightW > 0.02) {
        for (let y = 0; y < horizon; y++) {
          for (let x = 0; x < cols; x++) {
            const h = hash(x, y, 7);
            if (h > 0.035) continue;
            const tw = 0.5 + 0.5 * Math.sin(t * (1 + h * 60) + h * 400);
            const h2 = hash(x, y, 8);
            const ch = h2 < 0.55 ? "." : h2 < 0.8 ? "·" : h2 < 0.93 ? "+" : "*";
            const col = h2 < 0.6 ? C.fg : h2 < 0.75 ? C.blue : h2 < 0.88 ? C.magenta : C.yellow;
            put(x, y, ch, col, alphaLevel(nightW * (0.25 + 0.75 * tw)));
          }
        }
      }

      // ── Aurora ─────────────────────────────────────────────────
      const auroraW = Math.max(clamp01(1 - s / 1.0), clamp01((s - 3.55) / 0.45) * 0.7);
      if (auroraW > 0.02) {
        const auroraCols = [C.green, C.cyan, C.blue, C.magenta];
        for (let x = 0; x < cols; x++) {
          const cy = rows * 0.2 + Math.sin(x * 0.06 + t * 0.35) * 3 + Math.sin(x * 0.021 - t * 0.2) * 5;
          const len = 4 + Math.round(3 * (0.5 + 0.5 * Math.sin(x * 0.13 + t * 0.8)));
          const strength = 0.5 + 0.5 * Math.sin(x * 0.045 - t * 0.5);
          const colIdx = auroraCols[Math.floor(((x / cols) * 4 + t * 0.05) % 4)];
          for (let k = 0; k < len; k++) {
            const y = Math.round(cy + k);
            const fade = 1 - k / len;
            const ch = k === 0 ? "~" : (x + k) % 3 === 0 ? "|" : ":";
            put(x, y, ch, colIdx, alphaLevel(auroraW * strength * fade, 4));
          }
        }
      }

      // ── Cielo cálido de amanecer / atardecer ─────────────────
      if (warmW > 0.02) {
        const warmCols = [C.yellow, C.orange, C.red, C.magenta];
        for (let y = Math.floor(horizon * 0.35); y < horizon; y++) {
          const band = (horizon - y) / (horizon * 0.65);
          const col = warmCols[Math.min(3, Math.floor(band * 4))];
          for (let x = 0; x < cols; x++) {
            const n = noise2((x + t * 2) * 0.09, y * 0.5, 3);
            if (n < 0.62) continue;
            put(x, y, n > 0.8 ? "=" : n > 0.7 ? "-" : "·", col, alphaLevel(warmW * (1 - band * 0.6), 4));
          }
        }
      }

      // ── Nubes ──────────────────────────────────────────────────
      const cloudW = Math.max(dayW, warmW * 0.6);
      if (cloudW > 0.02) {
        const ramp = " .:-=+*";
        for (let y = 1; y < horizon * 0.55; y++) {
          for (let x = 0; x < cols; x++) {
            const n = noise2((x + walk * 0.15 + t * 1.2) * 0.06, y * 0.22, 11) * 0.7 + noise2(x * 0.15, y * 0.5, 12) * 0.3;
            const v = (n - 0.55) * 4;
            if (v <= 0) continue;
            const ch = ramp[Math.min(ramp.length - 1, Math.floor(v * ramp.length))];
            put(x, y, ch, warmW > dayW ? C.magenta : C.fg, alphaLevel(cloudW * 0.7, 3));
          }
        }
      }

      // ── Luna y sol ─────────────────────────────────────────────
      const moonW = Math.max(clamp01(1 - s / 0.9), clamp01((s - 3.5) / 0.5));
      if (moonW > 0.05) {
        const moon = ["  _..._  ", ".:::::'. ", ":::::'   ", ":::::.   ", "':::::'. ", "  `''`   "];
        const mx = Math.floor(cols * 0.8), my = Math.floor(rows * 0.08);
        moon.forEach((line, j) => [...line].forEach((c, i) => put(mx + i, my + j, c, C.yellow, alphaLevel(moonW))));
      }
      const sunPhase = (s - 0.55) / 2.9;
      if (sunPhase > 0 && sunPhase < 1) {
        const elev = Math.sin(Math.PI * sunPhase);
        const sx = cols * (0.12 + 0.76 * sunPhase);
        const sy = horizon - elev * horizon * 0.72;
        const R = 3.2;
        const a = alphaLevel(Math.min(1, elev * 2.5));
        for (let dy = -6; dy <= 6; dy++) {
          for (let dx = -12; dx <= 12; dx++) {
            const d = Math.hypot(dx / 2, dy);
            if (d < R) put(sx + dx, sy + dy, d < R - 1.4 ? "@" : "O", d < R - 1.4 ? C.yellow : C.orange, a);
            else if (d < R + 2.6) {
              const ang = Math.atan2(dy, dx / 2) + t * 0.4;
              if (Math.abs(Math.sin(ang * 6)) > 0.92) put(sx + dx, sy + dy, Math.abs(dy) > Math.abs(dx / 2) ? "|" : "-", C.yellow, a - 1);
            }
          }
        }
      }

      // ── Pájaros ───────────────────────────────────────────────
      const birdW = bump(s, 1.6, 0.9);
      if (birdW > 0.05) {
        for (let b = 0; b < 7; b++) {
          const bx = ((t * (6 + b) + b * 23) % (cols + 20)) - 10;
          const by = rows * 0.18 + b * 1.7 + Math.sin(t * 2 + b) * 1.2;
          put(bx, by, Math.sin(t * 8 + b * 2) > 0 ? "v" : "^", C.fg, alphaLevel(birdW * 0.8));
        }
      }

      // ── Montañas (dos capas con paralaje) ────────────────────
      const ridge = (layer: number, base: number, amp: number, speed: number, col: number, fill: number) => {
        let prev = 0;
        for (let x = -1; x < cols; x++) {
          const wx = x + walk * speed;
          const top = Math.round(base - amp * fbm1(wx * 0.03, layer * 10));
          if (x >= 0) {
            const next = Math.round(base - amp * fbm1((wx + 1) * 0.03, layer * 10));
            const ch = top < prev && top <= next ? "^" : next < top ? "/" : prev < top ? "\\" : "_";
            const snowy = top < base - amp * 0.72;
            put(x, top, ch, snowy ? C.fg : col, snowy ? NA - 2 : fill + 1);
            for (let y = top + 1; y < rows; y++) {
              const h = hash(Math.floor(wx), y, layer + 40);
              const depth = (y - top) / 6;
              if (h < 0.18 + Math.min(0.4, depth * 0.08)) put(x, y, h < 0.05 ? ":" : ".", col, fill);
              else put(x, y, " ", col, 0); // ocupa la celda: tapa estrellas y cielo detrás
            }
          }
          prev = top;
        }
      };
      ridge(1, horizon, rows * 0.24, 0.12, th.light ? C.blue : C.magenta, 1);
      ridge(2, horizon + rows * 0.1, rows * 0.17, 0.35, C.blue, 2);

      const ground = rows - 2;

      // ── Árboles ───────────────────────────────────────────────
      if (treesW > 0.01) {
        const spacing = 9;
        const startWX = Math.floor((walk * 0.8) / spacing) - 2;
        for (let k = startWX; k < startWX + cols / spacing + 4; k++) {
          const h = hash(k, 0, 91);
          if (h < 0.25) continue;
          const tx = Math.round(k * spacing + hash(k, 1, 91) * 5 - walk * 0.8);
          const height = Math.round((6 + hash(k, 2, 91) * 9) * treesW);
          if (height < 2) continue;
          let sway = Math.sin(t * 1.3 + k) * 0.8;
          if (mouse.active) {
            // el cursor es una ráfaga: los árboles cercanos se apartan
            const dx = tx * cw - mouse.x, dy = (ground - height / 2) * chH - mouse.y;
            const d = Math.hypot(dx, dy * 0.6);
            if (d < 200) sway += Math.sign(dx) * (1 - d / 200) * 2.5;
          }
          const round = hash(k, 3, 91) < 0.3;
          const leafCol = round ? [C.green, C.yellow, C.orange][Math.floor(hash(k, 4, 91) * 3)] : hash(k, 5, 91) < 0.5 ? C.green : C.cyan;
          for (let j = 0; j < height; j++) {
            const y = ground - 2 - (height - 1 - j);
            const off = Math.round(sway * (1 - j / height));
            if (round) {
              const r = Math.max(1, Math.round(Math.sin(Math.PI * ((j + 0.5) / height)) * height * 0.55));
              for (let i = -r; i <= r; i++) {
                const hh = hash(k * 31 + i, j, 92);
                put(tx + i + off, y, hh < 0.33 ? "@" : hh < 0.66 ? "&" : "%", leafCol, 3 + (hh > 0.8 ? 1 : 0));
              }
            } else {
              const half = Math.floor(j * 0.6);
              put(tx - half - 1 + off, y, j === 0 ? " " : "/", leafCol, 4);
              put(tx + half + 1 + off, y, j === 0 ? " " : "\\", leafCol, 4);
              if (j === 0) put(tx + off, y, "^", leafCol, 5);
              for (let i = -half; i <= half; i++) {
                const hh = hash(k * 17 + i, j, 93);
                put(tx + i + off, y, hh < 0.12 ? "*" : hh < 0.5 ? "^" : " ", hh < 0.12 ? C.yellow : leafCol, hh < 0.12 ? 4 : 2);
              }
            }
          }
          put(tx, ground - 1, "|", C.orange, 3);
          put(tx + 1, ground - 1, "|", C.orange, 3);
        }
      }

      // ── Río ───────────────────────────────────────────────────
      if (riverW > 0.01) {
        const rTop = ground - Math.round(3 * riverW);
        for (let y = rTop; y < ground; y++) {
          for (let x = 0; x < cols; x++) {
            const n = Math.sin((x + walk * 0.2) * 0.35 - t * 3 + y * 1.7) + Math.sin(x * 0.11 + t * 1.3);
            const ch = n > 1.2 ? "°" : n > 0.4 ? "~" : n > -0.6 ? "-" : " ";
            put(x, y, ch, n > 1.2 ? C.fg : y % 2 ? C.cyan : C.blue, alphaLevel(riverW * 0.85));
          }
        }
      }

      // ── Hierba ────────────────────────────────────────────────
      for (let y = ground; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const wx = Math.floor(x + walk * 0.8);
          const h = hash(wx, y, 51);
          let lean = Math.sin(wx * 0.18 - t * 1.6) * 0.6 + Math.sin(t * 0.7) * 0.3;
          if (mouse.active) {
            const dx = x * cw - mouse.x, dy = y * chH - mouse.y;
            const d = Math.hypot(dx, dy);
            if (d < 140) lean += Math.sign(dx) * (1 - d / 140) * 2;
          }
          let ch = lean > 0.45 ? "/" : lean < -0.45 ? "\\" : h < 0.5 ? "|" : ",";
          let col: number = y === ground ? C.green : C.cyan;
          if (h > 0.96) { ch = "*"; col = [C.magenta, C.yellow, C.red, C.blue][Math.floor(hash(wx, y, 52) * 4)]; }
          put(x, y, ch, col, y === ground ? 3 : 2);
        }
      }

      // ── Hoguera ───────────────────────────────────────────────
      let fireX = 0, fireY = 0;
      if (fireW > 0.01) {
        fireX = Math.round(cols * 0.5);
        fireY = ground - 1;
        put(fireX - 3, fireY, "\\", C.orange, 4);
        put(fireX - 2, fireY, "_", C.orange, 4);
        for (let i = -1; i <= 1; i++) put(fireX + i, fireY, "X", C.red, 4);
        put(fireX + 2, fireY, "_", C.orange, 4);
        put(fireX + 3, fireY, "/", C.orange, 4);
        const fh = Math.round((W < 640 ? 7 : 10) * fireW);
        for (let j = 1; j <= fh; j++) {
          const wdt = Math.max(0, Math.round((fh - j) * 0.55));
          for (let i = -wdt; i <= wdt; i++) {
            if (Math.random() < 0.25 + j * 0.05) continue;
            const col = j < fh * 0.35 ? C.yellow : j < fh * 0.7 ? C.orange : C.red;
            const ch = "()^'\"*"[Math.floor(Math.random() * 6)];
            put(fireX + i + Math.round(Math.sin(t * 9 + j) * 0.6), fireY - j, ch, col, alphaLevel(fireW));
          }
        }
        if (!reduced && Math.random() < 0.4 * fireW) spawn(2, fireX * cw, (fireY - fh) * chH);
      }

      // ── Partículas: luciérnagas, hojas, chispas ──────────────
      if (!reduced) {
        const flyW = Math.max(fireW, clamp01(1 - s / 1.1) * 0.5);
        if (Math.random() < 0.08 * flyW && particles.filter(p => p.kind === 0).length < 26) {
          spawn(0, Math.random() * W, H * (0.45 + Math.random() * 0.5));
        }
        if (treesW > 0.2 && Math.random() < 0.06 * treesW * (1 - fireW)) spawn(1, Math.random() * W, H * 0.4);
      }
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        if (p.kind === 0) {
          // luciérnaga: vaga y se acerca al cursor
          p.vx += (noise2(p.seed, t * 0.5) - 0.5) * 30 * dt;
          p.vy += (noise2(p.seed + 9, t * 0.5) - 0.5) * 30 * dt;
          if (mouse.active) {
            const dx = mouse.x - p.x, dy = mouse.y - p.y;
            const d = Math.hypot(dx, dy);
            if (d < 320 && d > 20) { p.vx += (dx / d) * 60 * dt; p.vy += (dy / d) * 60 * dt; }
          }
          p.vx *= 0.96; p.vy *= 0.96;
          p.life -= dt * 0.05;
          const glow = 0.5 + 0.5 * Math.sin(t * 4 + p.seed);
          put(p.x / cw, p.y / chH, glow > 0.6 ? "*" : "·", C.yellow, alphaLevel(glow * Math.min(1, p.life * 3)));
        } else if (p.kind === 1) {
          // hoja que cae con el viento
          p.vx = 18 + Math.sin(t + p.seed) * 25 + (mouse.speed > 0 && Math.hypot(mouse.x - p.x, mouse.y - p.y) < 120 ? (p.x - mouse.x) : 0);
          p.vy = 22 + Math.sin(t * 2 + p.seed) * 10;
          p.life -= dt * 0.12;
          put(p.x / cw, p.y / chH, Math.sin(t * 5 + p.seed) > 0 ? "'" : ",", p.seed % 2 > 1 ? C.orange : C.green, 4);
        } else {
          // chispa de la hoguera
          p.vx = Math.sin(t * 6 + p.seed) * 14;
          p.vy = -50;
          p.life -= dt * 0.9;
          put(p.x / cw, p.y / chH, p.life > 0.5 ? "*" : ".", p.life > 0.5 ? C.yellow : C.orange, alphaLevel(p.life));
        }
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        if (p.life <= 0 || p.y > H + 20 || p.y < -20 || p.x < -30 || p.x > W + 30) particles.splice(i, 1);
      }

      // ── Cursor: linterna que dispersa y tiñe los caracteres ──
      if (mouse.active && !reduced) {
        const mcx = mouse.x / cw, mcy = mouse.y / chH;
        const R = W < 640 ? 6 : 9;
        const rainbow = [C.red, C.orange, C.yellow, C.green, C.cyan, C.blue, C.magenta];
        for (let y = Math.floor(mcy - R); y <= mcy + R; y++) {
          for (let x = Math.floor(mcx - R * 2); x <= mcx + R * 2; x++) {
            if (x < 0 || y < 0 || x >= cols || y >= rows) continue;
            const dx = (x - mcx) / 2, dy = y - mcy;
            const d = Math.hypot(dx, dy);
            if (d > R) continue;
            const i = y * cols + x;
            const k = 1 - d / R;
            const hue = rainbow[Math.floor(((Math.atan2(dy, dx) + Math.PI) / (2 * Math.PI)) * 7 + t * 0.5) % 7];
            if (chars[i] && chars[i] !== 0x2002) {
              style[i] = hue * NA + alphaLevel(0.45 + k * 0.55);
            } else if (hash(x, y, Math.floor(t * 6)) < k * 0.22) {
              put(x, y, k > 0.6 ? "+" : ".", hue, alphaLevel(k * 0.8));
            }
          }
        }
      }

      // ── Ondas al hacer clic ───────────────────────────────────
      for (let r = ripples.length - 1; r >= 0; r--) {
        const rp = ripples[r];
        const age = t - rp.t0;
        if (age > 2.2) { ripples.splice(r, 1); continue; }
        const radius = age * 26;
        const cx = rp.x / cw, cy = rp.y / chH;
        const a = alphaLevel(1 - age / 2.2);
        const steps = Math.max(24, Math.round(radius * 6));
        for (let k = 0; k < steps; k++) {
          const ang = (k / steps) * Math.PI * 2;
          const x = cx + Math.cos(ang) * radius * 2, y = cy + Math.sin(ang) * radius;
          put(x, y, age < 0.6 ? "O" : age < 1.3 ? "o" : ".", k % 2 ? C.cyan : C.magenta, a);
        }
      }

      // ── Claros bajo el texto: el paisaje nunca cruza lo que se lee ──
      for (const el of clearEls) {
        const r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > H || r.width === 0) continue;
        const x0 = Math.max(0, Math.floor(r.left / cw) - 1), x1 = Math.min(cols - 1, Math.ceil(r.right / cw));
        const y0 = Math.max(0, Math.floor(r.top / chH)), y1 = Math.min(rows - 1, Math.ceil(r.bottom / chH) - 1);
        for (let y = y0; y <= y1; y++) style.fill(-1, y * cols + x0, y * cols + x1 + 1);
      }

      // ── Pintado agrupado por estilo ───────────────────────────
      ctx.clearRect(0, 0, W, H);
      for (const b of buckets) b.length = 0;
      for (let i = 0; i < chars.length; i++) {
        if (chars[i] && chars[i] !== 0x2002 && style[i] >= 0) buckets[style[i]].push(i);
      }
      for (let si = 0; si < buckets.length; si++) {
        const b = buckets[si];
        if (!b.length) continue;
        ctx.fillStyle = styles[si];
        for (const i of b) {
          ctx.fillText(String.fromCharCode(chars[i]), (i % cols) * cw, Math.floor(i / cols) * chH);
        }
      }
      if (fireW > 0.01) {
        // halo cálido real de la hoguera, no un adorno: ilumina el suelo
        const g = ctx.createRadialGradient(fireX * cw, fireY * chH, 0, fireX * cw, fireY * chH, 220);
        const [r, gg, bb] = hexToRgb(th.orange);
        g.addColorStop(0, `rgba(${r},${gg},${bb},${0.16 * fireW})`);
        g.addColorStop(1, `rgba(${r},${gg},${bb},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(fireX * cw - 220, fireY * chH - 220, 440, 440);
      }
    };

    const onMove = (e: PointerEvent) => {
      const now = performance.now();
      mouse.speed = Math.hypot(e.clientX - mouse.px, e.clientY - mouse.py) / Math.max(1, now - last);
      mouse.px = mouse.x; mouse.py = mouse.y;
      mouse.x = e.clientX; mouse.y = e.clientY;
      mouse.active = e.pointerType === "mouse" || e.pointerType === "pen" || e.buttons > 0;
    };
    const onLeave = () => { mouse.active = false; mouse.x = mouse.y = -9999; };
    const onDown = (e: PointerEvent) => {
      if (reduced) return;
      const tgt = e.target as HTMLElement;
      if (tgt.closest("a,button,input,textarea,select,label,[role=menu]")) return;
      ripples.push({ x: e.clientX, y: e.clientY, t0: performance.now() / 1000 });
      if (ripples.length > 4) ripples.shift();
    };

    resize();
    buildStyles();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    let onScroll: (() => void) | null = null;
    if (reduced) {
      // Sin animación: un único fotograma por cambio de scroll o tema
      const once = () => draw(1, 0.016);
      onScroll = () => requestAnimationFrame(once);
      window.addEventListener("scroll", onScroll, { passive: true });
      const id = setInterval(() => styleThemeId !== themeRef.current.id && once(), 300);
      document.fonts?.ready.then(() => { resize(); once(); });
      once();
      return () => {
        clearInterval(id);
        clearInterval(collectId);
        window.removeEventListener("resize", resize);
        window.removeEventListener("scroll", onScroll!);
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerdown", onDown);
        document.removeEventListener("pointerleave", onLeave);
      };
    }

    document.fonts?.ready.then(resize);
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(collectId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="nature" aria-hidden="true" />;
}
