import { useEffect, useRef } from "react";

// Convierte una imagen real en ASCII a color, calculado en vivo por luminancia.
// Se "imprime" línea a línea al entrar en pantalla y el cursor la agita.
// Rampa clásica de 70 niveles: más tonos = más detalle por carácter
const RAMP = " .'`^\",:;Il!i><~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";
const SCRAMBLE = "!<>-_\\/[]{}=+*^?#%&@$";

type Props = {
  src: string;
  alt: string;
  cols?: number;
  light?: boolean;
  knockout?: number; // luminancia a partir de la cual el fondo claro se vacía
  crop?: [number, number, number, number]; // x, y, ancho, alto en fracciones de la imagen
  floor?: number; // densidad mínima de lo opaco: en un recorte, la silueta entera se dibuja
  blackPoint?: number; // luminancia por debajo de la cual el fondo oscuro se vacía (interfaces oscuras)
  className?: string;
};

type Cell = { ch: string; color: string };

export default function AsciiImage({ src, alt, cols = 72, light = false, knockout = 0.86, crop = [0, 0, 1, 1], floor = 0, blackPoint = 0, className }: Props) {
  const [cx, cy, cwid, chei] = crop;
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current!;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let grid: Cell[][] = [];
    let rows = 0;
    let revealed = reduced ? 1 : 0;
    let revealing = false;
    let raf = 0;
    let fs = 8, cw = 5, chH = 8;
    const pointer = { x: -999, y: -999, inside: false };
    let disposed = false;

    const img = new Image();
    img.src = src;

    const sample = () => {
      const sx = cx * img.naturalWidth, sy = cy * img.naturalHeight;
      const sw = cwid * img.naturalWidth, sh = chei * img.naturalHeight;
      const ratio = sh / sw;
      rows = Math.max(1, Math.round(cols * ratio * 0.6)); // celda de 0.6em x 1em
      const off = document.createElement("canvas");
      off.width = cols;
      off.height = rows;
      const octx = off.getContext("2d", { willReadFrequently: true })!;
      octx.drawImage(img, sx, sy, sw, sh, 0, 0, cols, rows);
      const data = octx.getImageData(0, 0, cols, rows).data;
      // estira el contraste (percentiles 3–97) para que la forma se lea en caracteres
      const lums: number[] = [];
      for (let i = 0; i < data.length; i += 4) lums.push((0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) / 255);
      // las zonas transparentes (imagen recortada) no cuentan para el contraste
      const sorted = lums.filter((_, k) => data[k * 4 + 3] >= 128).sort((a, b) => a - b);
      if (!sorted.length) sorted.push(0, 1);
      const lo = sorted[Math.floor(sorted.length * 0.03)], hi = sorted[Math.floor(sorted.length * 0.97)];
      const span = Math.max(0.05, hi - lo);
      grid = [];
      for (let y = 0; y < rows; y++) {
        const line: Cell[] = [];
        for (let x = 0; x < cols; x++) {
          const i = (y * cols + x) * 4;
          let r = data[i], g = data[i + 1], b = data[i + 2];
          if (data[i + 3] < 128) { line.push({ ch: " ", color: "" }); continue; }
          const raw = lums[y * cols + x];
          const lum = Math.min(1, Math.max(0, (raw - lo) / span));
          const sat = Math.max(r, g, b) - Math.min(r, g, b);
          if (raw > knockout && sat < 40) { line.push({ ch: " ", color: "" }); continue; }
          if (raw < blackPoint) { line.push({ ch: " ", color: "" }); continue; }
          const v = light ? 1 - lum : lum;
          const dens = floor + (1 - floor) * Math.pow(v, 0.9);
          const ch = RAMP[Math.min(RAMP.length - 1, Math.max(floor > 0 ? 1 : 0, Math.floor(dens * RAMP.length)))];
          // satura el color para que el ASCII brille sobre el fondo
          const avg = (r + g + b) / 3;
          r = avg + (r - avg) * 1.5; g = avg + (g - avg) * 1.5; b = avg + (b - avg) * 1.5;
          if (light) { r *= 0.62; g *= 0.62; b *= 0.62; } else { const lift = 50 + floor * 80; r = r * 0.8 + lift; g = g * 0.8 + lift; b = b * 0.8 + lift; }
          const c = (n: number) => Math.max(0, Math.min(255, Math.round(n)));
          line.push({ ch, color: `rgb(${c(r)},${c(g)},${c(b)})` });
        }
        grid.push(line);
      }
    };

    const layout = () => {
      const w = wrap.clientWidth;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      cw = w / cols;
      fs = cw / 0.6;
      chH = fs * 1.0;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(rows * chH * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = rows * chH + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = `${fs}px "JetBrains Mono", ui-monospace, monospace`;
      ctx.textBaseline = "top";
    };

    const paint = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const front = revealed * rows;
      const t = performance.now() / 1000;
      for (let y = 0; y < rows; y++) {
        if (y > front + 1) break;
        const atFront = y >= front - 1.5;
        for (let x = 0; x < cols; x++) {
          const cell = grid[y][x];
          let ch = cell.ch;
          if (ch === " ") continue;
          let color = cell.color;
          if (atFront && revealed < 1) {
            ch = SCRAMBLE[(Math.random() * SCRAMBLE.length) | 0];
          } else if (pointer.inside) {
            const d = Math.hypot((x * cw - pointer.x) / 1.6, y * chH - pointer.y);
            if (d < 46) {
              const k = 1 - d / 46;
              if (Math.random() < k * 0.6) ch = SCRAMBLE[(Math.random() * SCRAMBLE.length) | 0];
              color = `hsl(${(t * 90 + x * 6 + y * 4) % 360} 85% ${light ? 40 : 72}%)`;
            }
          }
          ctx.fillStyle = color;
          ctx.fillText(ch, x * cw, y * chH);
        }
      }
    };

    const loop = () => {
      if (disposed) return;
      if (revealing) {
        revealed = Math.min(1, revealed + 1 / 70);
        if (revealed >= 1) revealing = false;
      }
      paint();
      if (revealing || pointer.inside) raf = requestAnimationFrame(loop);
      else raf = 0;
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(loop); };

    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && revealed === 0) { revealing = true; kick(); io.disconnect(); }
    }, { threshold: 0.2 });

    const ro = new ResizeObserver(() => { if (grid.length) { layout(); paint(); } });

    img.onload = () => {
      if (disposed) return;
      sample();
      layout();
      paint();
      ro.observe(wrap);
      if (!reduced) io.observe(wrap);
      document.fonts?.ready.then(() => { layout(); paint(); });
    };

    const onMove = (e: PointerEvent) => {
      if (reduced) return;
      const r = canvas.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
      pointer.inside = true;
      kick();
    };
    const onLeave = () => { pointer.inside = false; kick(); };
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, [src, cols, light, knockout, cx, cy, cwid, chei, floor, blackPoint]);

  return (
    <div ref={wrapRef} className={className}>
      <canvas ref={canvasRef} role="img" aria-label={alt} className="ascii-img" />
    </div>
  );
}
