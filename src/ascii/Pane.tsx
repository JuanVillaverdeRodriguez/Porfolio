import { ReactNode, useLayoutEffect, useRef, useState } from "react";

// Panel con marco de caracteres de caja (┌─┐ / ╔═╗). El marco se recalcula
// en celdas enteras para que esquinas y lados siempre encajen.
type Props = {
  title?: ReactNode;
  right?: ReactNode;
  double?: boolean;
  className?: string;
  children: ReactNode;
};

const LINE = 24; // altura de línea en px, la misma rejilla que el texto

export default function Pane({ title, right, double = false, className = "", children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ cols: 0, rows: 0, cw: 8 });

  useLayoutEffect(() => {
    const el = ref.current!;
    const probe = document.createElement("span");
    probe.textContent = "─".repeat(10);
    probe.className = "pane-probe";
    el.appendChild(probe);
    const measure = () => {
      const cw = probe.getBoundingClientRect().width / 10 || 8.4;
      const inner = el.querySelector<HTMLElement>(".pane-body")!;
      inner.style.minHeight = "";
      const rows = Math.max(3, Math.ceil((inner.scrollHeight + LINE) / LINE) + 1);
      inner.style.minHeight = `${(rows - 2) * LINE}px`;
      setBox({ cols: Math.max(4, Math.floor(el.clientWidth / cw)), rows, cw });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    document.fonts?.ready.then(measure);
    return () => { ro.disconnect(); probe.remove(); };
  }, []);

  const [tl, tr, bl, br, h, v] = double ? ["╔", "╗", "╚", "╝", "═", "║"] : ["┌", "┐", "└", "┘", "─", "│"];
  const n = Math.max(0, box.cols - 2);

  return (
    <div ref={ref} className={`pane ${double ? "pane-double" : ""} ${className}`} style={{ width: "100%" }}>
      <div className="pane-frame" aria-hidden="true">
        <div className="pane-top">{tl}{h.repeat(n)}{tr}</div>
        <div className="pane-side pane-left">{(v + "\n").repeat(Math.max(0, box.rows - 2))}</div>
        <div className="pane-side pane-right" style={{ left: `${(box.cols - 1) * box.cw}px` }}>{(v + "\n").repeat(Math.max(0, box.rows - 2))}</div>
        <div className="pane-bottom">{bl}{h.repeat(n)}{br}</div>
      </div>
      {(title || right) && (
        <div className="pane-titlebar">
          {title && <span className="pane-title">{title}</span>}
          {right && <span className="pane-right-title">{right}</span>}
        </div>
      )}
      <div className="pane-body">{children}</div>
    </div>
  );
}
