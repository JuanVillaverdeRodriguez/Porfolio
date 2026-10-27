import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import type { Theme } from "../themes";
import { clamp01, hash, noise2 } from "./noise";

// Final del paseo: al seguir bajando, la cámara se acerca a la hoguera del paisaje
// y aparece un malvavisco en un palo para tostarlo. Todo en caracteres, como el resto.

type Level = "raw" | "golden" | "toasted" | "burnt";
const levelOf = (toast: number): Level => (toast < 0.22 ? "raw" : toast < 0.5 ? "golden" : toast < 0.78 ? "toasted" : "burnt");

type Stats = { eaten: number; perfect: number };
const STORE = "malvaviscos";
const loadStats = (): Stats => {
  try { return { eaten: 0, perfect: 0, ...JSON.parse(localStorage.getItem(STORE) || "{}") }; } catch { return { eaten: 0, perfect: 0 }; }
};
const saveStats = (s: Stats) => {
  try { localStorage.setItem(STORE, JSON.stringify(s)); } catch { /* sin storage */ }
};

const FLAME_H = 11; // alto de las llamas, en celdas
const ease = (x: number) => x * x * (3 - 2 * x);
const lerp = (a: number, b: number, k: number) => a + (b - a) * k;

export default function Campfire({ theme }: { theme: Theme }) {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const zoneRef = useRef<HTMLDivElement>(null);
  const themeRef = useRef(theme);
  themeRef.current = theme;
  const [active, setActive] = useState(false);
  const [msg, setMsg] = useState("msg.hint");
  const [stats, setStats] = useState<Stats>(loadStats);
  const eatRef = useRef<() => void>(() => {});
  const touch = typeof window !== "undefined" && window.matchMedia("(hover: none)").matches;

  useEffect(() => {
    const section = sectionRef.current!;
    const stage = stageRef.current!;
    const canvas = canvasRef.current!;
    const zone = zoneRef.current!;
    const ctx = canvas.getContext("2d")!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0, H = 0, base = 13, cw0 = 8, ch0 = 17;
    let raf = 0, last = 0, inView = false, disposed = false;
    let sp = 0; // progreso suavizado del scroll dentro de la sección
    let isActive = false;
    // malvavisco: posición en pantalla, objetivo (puntero) y estado del tostado
    const m = { x: 0, y: 0, tx: 0, ty: 0, follow: false, speed: 0, lastMove: 0 };
    const mm = { toast: 0, burning: false, fireT: 0, gone: 0, level: "raw" as Level };
    const sparks: { x: number; y: number; life: number; seed: number }[] = [];
    let view = { ax: 0, ay: 0, cw: 8, chh: 17 };

    const say = (key: string) => setMsg(prev => (prev === key ? prev : key));

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = Math.floor(W * dpr); canvas.height = Math.floor(H * dpr);
      canvas.style.width = W + "px"; canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      base = W < 640 ? 11 : 13; // la misma letra que el paisaje, para que el zoom empiece donde está su hoguera
      ctx.font = `${base}px "JetBrains Mono", ui-monospace, monospace`;
      cw0 = ctx.measureText("M").width || base * 0.6;
      ch0 = Math.round(base * 1.3);
    };

    const progress = () => {
      const r = section.getBoundingClientRect();
      return clamp01((H - r.top) / Math.max(1, r.height));
    };

    const draw = (now: number, dt: number) => {
      const th = themeRef.current;
      const tt = reduced ? 0 : now / 1000;
      sp += (progress() - sp) * (reduced ? 1 : Math.min(1, dt * 6));
      const fade = clamp01((sp - 0.06) / 0.22);
      stage.style.visibility = fade > 0 ? "visible" : "hidden";
      canvas.style.opacity = String(fade);
      if (fade <= 0) return;

      const k = ease(clamp01((sp - 0.1) / 0.62));
      const zoom = 1 + (W < 640 ? 1.4 : 1.8) * k;
      const cw = cw0 * zoom, chh = ch0 * zoom;
      const ax = W / 2, ay = lerp(H - 2 * ch0, H * (W < 640 ? 0.66 : 0.72), k);
      view = { ax, ay, cw, chh };

      const nowActive = sp > 0.9;
      if (nowActive !== isActive) {
        isActive = nowActive;
        setActive(nowActive);
        if (!nowActive) m.follow = false;
      }

      ctx.clearRect(0, 0, W, H);
      ctx.globalAlpha = 1;
      ctx.fillStyle = th.bg;
      ctx.fillRect(0, 0, W, H);

      // resplandor que late con el fuego
      const flick = 0.85 + 0.15 * Math.sin(tt * 7) * Math.sin(tt * 3.1);
      const [r, g, b] = [1, 3, 5].map(i => parseInt(th.orange.slice(i, i + 2), 16));
      const gr = ctx.createRadialGradient(ax, ay - 3 * chh, 0, ax, ay - 3 * chh, 18 * cw * flick);
      gr.addColorStop(0, `rgba(${r},${g},${b},${th.light ? 0.22 : 0.2})`);
      gr.addColorStop(1, `rgba(${r},${g},${b},0)`);
      ctx.fillStyle = gr;
      ctx.fillRect(0, 0, W, H);

      // estrellas lejanas, sin zoom
      ctx.font = `${base}px "JetBrains Mono", ui-monospace, monospace`;
      ctx.textBaseline = "top";
      for (let i = 0; i < 70; i++) {
        const tw = 0.5 + 0.5 * Math.sin(tt * 1.5 + i * 7.3);
        ctx.globalAlpha = 0.12 + 0.25 * tw * (1 - k * 0.4);
        ctx.fillStyle = th.fg;
        ctx.fillText(hash(i, 3) > 0.85 ? "*" : ".", hash(i, 1) * W, hash(i, 2) * H * 0.5);
      }

      ctx.font = `${base * zoom}px "JetBrains Mono", ui-monospace, monospace`;
      const cell = (cx: number, cy: number, ch: string, col: string, a = 1) => {
        ctx.globalAlpha = a;
        ctx.fillStyle = col;
        ctx.fillText(ch, ax + cx * cw - cw / 2, ay + cy * chh);
      };
      const str = (cx: number, cy: number, s: string, col: string, a = 1) => [...s].forEach((c, i) => cell(cx + i, cy, c, col, a));

      // suelo
      const span = Math.ceil(ax / cw) + 2;
      for (let cx = -span; cx <= span; cx++) {
        const h = hash(cx, 7);
        cell(cx, 1, h < 0.12 ? "," : h < 0.22 ? "." : "_", th.muted, 0.45);
        if (hash(cx, 8) > 0.86) cell(cx, 2, ".", th.muted, 0.25);
      }
      // troncos para sentarse y piedras alrededor
      str(-16, 0, "[=====]", th.orange, 0.55);
      str(10, 0, "[=====]", th.orange, 0.55);
      str(-6, 0, "oO", th.muted, 0.8);
      str(5, 0, "Oo", th.muted, 0.8);
      // leña y brasas
      cell(-3, 0, "\\", th.orange); cell(-2, 0, "_", th.orange);
      for (let i = -1; i <= 1; i++) cell(i, 0, "X", Math.sin(tt * 5 + i * 2) > 0 ? th.red : th.orange);
      cell(2, 0, "_", th.orange); cell(3, 0, "/", th.orange);

      // llamas
      for (let j = 1; j <= FLAME_H; j++) {
        const wdt = (FLAME_H - j) * 0.62 + 1;
        const lim = Math.ceil(wdt);
        const sway = Math.sin(tt * 6 + j * 0.8) * 0.45 * (j / FLAME_H);
        for (let i = -lim; i <= lim; i++) {
          const edge = Math.abs(i) / wdt;
          const n = noise2(i * 0.6 + 30, j * 0.5 - tt * 3.4);
          if (n < 0.1 + edge * 0.5 + (j / FLAME_H) * 0.22) continue;
          const col = edge < 0.45 && j < FLAME_H * 0.5 ? th.yellow : j < FLAME_H * 0.75 ? th.orange : th.red;
          const ch = "()^'\"*"[Math.floor(hash(i, j, Math.floor(tt * 9)) * 6)];
          cell(i + sway, -j, ch, col, 0.95 - (j / FLAME_H) * 0.35);
        }
      }

      // chispas que suben
      if (!reduced && Math.random() < dt * 6) sparks.push({ x: (Math.random() - 0.5) * 3, y: -FLAME_H + 1, life: 1, seed: Math.random() * 99 });
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.y -= dt * 3.2;
        s.x += Math.sin(tt * 4 + s.seed) * dt * 1.5;
        s.life -= dt * 0.7;
        if (s.life <= 0) { sparks.splice(i, 1); continue; }
        cell(s.x, s.y, s.life > 0.5 ? "*" : ".", s.life > 0.5 ? th.yellow : th.orange, s.life);
      }

      // ── Malvavisco ──────────────────────────────────────
      const showStick = clamp01((k - 0.55) / 0.35);
      if (showStick <= 0) return;
      const restX = ax + 8 * cw, restY = ay - 6 * chh;
      if (!m.follow) { m.tx = restX; m.ty = restY; }
      if (!m.x) { m.x = restX; m.y = restY; }
      m.x += (m.tx - m.x) * Math.min(1, dt * 12);
      m.y += (m.ty - m.y) * Math.min(1, dt * 12);
      m.speed *= Math.max(0, 1 - dt * 6);
      const wx = (m.x - ax) / cw + 0.5, wy = (m.y - ay) / chh;

      // calor: dentro de las llamas, y algo de aire caliente justo encima
      const inFlame = clamp01(1 - Math.hypot(wx / 5.5, (wy + 5) / 6.5));
      const above = clamp01(1 - Math.hypot(wx / 3, (wy + 13.5) / 3)) * 0.45;
      const heat = Math.max(inFlame, above);
      const present = now > mm.gone;
      if (isActive && present) {
        mm.toast = Math.min(1.2, mm.toast + Math.pow(heat, 1.4) * dt * 0.3);
        mm.fireT = heat > 0.7 ? mm.fireT + dt : Math.max(0, mm.fireT - dt * 0.6);
        if (!mm.burning && mm.fireT > 1.5) { mm.burning = true; say("msg.burning"); }
        if (mm.burning) {
          mm.toast = Math.min(1.2, mm.toast + dt * 0.35);
          if (m.speed > (W < 640 ? 1400 : 2200)) { mm.burning = false; mm.fireT = 0; say("msg.blown"); }
        }
        const lv = levelOf(mm.toast);
        if (lv !== mm.level) { mm.level = lv; if (!mm.burning) say(`msg.${lv}`); }
      }

      // palo: baja en diagonal hacia la esquina del lado en que está el malvavisco,
      // un carácter por fila para que el trazo quede limpio
      const side = wx >= 0 ? 1 : -1;
      const lastRow = Math.ceil((H - ay) / chh) + 1;
      for (let row = Math.round(wy) + 1, i = 1; row <= lastRow; row++, i++) {
        cell(Math.round(wx) + side * (1 + Math.round(i * 0.9)), row, side > 0 ? "\\" : "/", th.orange, 0.85 * showStick);
      }
      if (!present) return;
      const col = { raw: th.fg, golden: th.yellow, toasted: th.orange, burnt: th.muted }[levelOf(mm.toast)];
      const mx = Math.round(wx), my = Math.round(wy);
      // un hueco oscuro detrás para que se lea aunque esté dentro de las llamas
      ctx.globalAlpha = 0.85 * showStick;
      ctx.fillStyle = th.bg;
      ctx.fillRect(ax + (mx - 1) * cw - cw / 2, ay + (my - 1) * chh + chh * 0.1, cw * 3, chh * 1.9);
      str(mx - 1, my - 1, ".-.", col, showStick);
      str(mx - 1, my, "|_|", col, showStick);
      if (mm.burning) {
        for (let i = -1; i <= 1; i++) {
          if (hash(i, Math.floor(tt * 10), 4) < 0.35) continue;
          cell(mx + i, my - 2, "^'*"[Math.floor(hash(i, Math.floor(tt * 12), 5) * 3)], i ? th.red : th.orange);
        }
        if (hash(0, Math.floor(tt * 8), 6) > 0.5) cell(mx, my - 3, "'", th.yellow, 0.7);
      }
    };

    // comer: puntúa según el tostado y aparece otro malvavisco
    eatRef.current = () => {
      if (!isActive || performance.now() < mm.gone) return;
      const lv = mm.burning ? "burnt" : levelOf(mm.toast);
      setStats(prev => {
        const next = { eaten: prev.eaten + 1, perfect: prev.perfect + (lv === "golden" ? 1 : 0) };
        saveStats(next);
        return next;
      });
      say(`eat.${lv}`);
      Object.assign(mm, { toast: 0, burning: false, fireT: 0, gone: performance.now() + 700, level: "raw" });
    };

    const setTarget = (x: number, y: number) => {
      const now = performance.now();
      const d = Math.hypot(x - m.tx, y - m.ty);
      const dtm = Math.max(1, now - m.lastMove) / 1000;
      if (m.follow) m.speed = Math.max(m.speed, d / dtm);
      m.lastMove = now;
      m.tx = x; m.ty = y; m.follow = true;
    };
    const onMove = (e: PointerEvent) => { if (isActive) setTarget(e.clientX, e.clientY); };
    const onDown = (e: PointerEvent) => {
      if (!isActive) return;
      setTarget(e.clientX, e.clientY);
      if (e.pointerType !== "mouse") zone.setPointerCapture(e.pointerId);
    };
    const onClick = (e: MouseEvent) => {
      if ((e as PointerEvent).pointerType && (e as PointerEvent).pointerType !== "mouse") return;
      eatRef.current();
    };
    const onKey = (e: KeyboardEvent) => {
      if (!isActive) return;
      const stepX = view.cw, stepY = view.chh;
      const from = m.follow ? { x: m.tx, y: m.ty } : { x: m.x, y: m.y };
      const moves: Record<string, [number, number]> = { ArrowLeft: [-stepX, 0], ArrowRight: [stepX, 0], ArrowUp: [0, -stepY], ArrowDown: [0, stepY] };
      if (moves[e.key]) { e.preventDefault(); setTarget(from.x + moves[e.key][0], from.y + moves[e.key][1]); m.speed = 0; }
      else if (e.key === "Enter" || e.key === " ") { e.preventDefault(); eatRef.current(); }
    };
    zone.addEventListener("pointermove", onMove);
    zone.addEventListener("pointerdown", onDown);
    zone.addEventListener("click", onClick);
    zone.addEventListener("keydown", onKey);

    const frame = (now: number) => {
      if (disposed) return;
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.1, (now - (last || now)) / 1000);
      last = now;
      draw(now, dt);
    };
    const io = new IntersectionObserver(([e]) => {
      inView = e.isIntersecting;
      if (inView && !raf) { last = 0; raf = requestAnimationFrame(frame); }
      if (!inView) { cancelAnimationFrame(raf); raf = 0; stage.style.visibility = "hidden"; sp = 0; }
    });
    io.observe(section);
    resize();
    window.addEventListener("resize", resize);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      zone.removeEventListener("pointermove", onMove);
      zone.removeEventListener("pointerdown", onDown);
      zone.removeEventListener("click", onClick);
      zone.removeEventListener("keydown", onKey);
    };
  }, []);

  const eat = useCallback(() => eatRef.current(), []);
  const msgKey = msg === "msg.hint" && touch ? "msg.hintTouch" : msg;

  return (
    <section ref={sectionRef} id="campfire" className="campfire" aria-label={t("fire.label")}>
      <div ref={stageRef} className="campfire-stage" style={{ visibility: "hidden" }}>
        <canvas ref={canvasRef} aria-hidden="true" />
        <div
          ref={zoneRef}
          className={`campfire-zone ${active ? "is-on" : ""}`}
          tabIndex={active ? 0 : -1}
          role="application"
          aria-label={t("fire.zone")}
        />
        <div className={`campfire-hud ${active ? "is-on" : ""}`}>
          <p className="campfire-title">{t("fire.title")}</p>
          <div className="campfire-bottom">
            <p className="campfire-msg" aria-live="polite">{t(`fire.${msgKey}`)}</p>
            <div className="campfire-actions">
              <button className="btn-primary" onClick={eat} tabIndex={active ? 0 : -1}>
                <span aria-hidden="true">[ </span>{t("fire.eat")}<span aria-hidden="true"> ]</span>
              </button>
              <span className="dim">{t("fire.stats", stats)}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
