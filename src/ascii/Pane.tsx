import { ReactNode, useLayoutEffect, useRef, useState } from "react";

// Panel con marco de caracteres de caja (┌─┐ / ╔═╗). Las esquinas y el lado derecho
// se anclan al borde del panel; el tramo horizontal sobrante se recorta.
type Props = {
  title?: ReactNode;
  right?: ReactNode;
  double?: boolean;
  className?: string;
  children: ReactNode;
};


export default function Pane({ title, right, double = false, className = "", children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ cols: 0, rows: 0 });

  useLayoutEffect(() => {
    const el = ref.current!;
    const probe = document.createElement("span");
    probe.textContent = "─".repeat(10);
    probe.className = "pane-probe";
    el.appendChild(probe);
    const measure = () => {
      // altura de línea de la rejilla del texto (--line crece en pantallas grandes)
      const LINE = parseFloat(getComputedStyle(el).getPropertyValue("--line")) || 24;
      const cw = probe.getBoundingClientRect().width / 10 || 8.4;
      const inner = el.querySelector<HTMLElement>(".pane-body")!;
      inner.style.minHeight = "";
      const rows = Math.max(3, Math.ceil((inner.scrollHeight + LINE) / LINE) + 1);
      inner.style.minHeight = `${(rows - 2) * LINE}px`;
      setBox({ cols: Math.max(4, Math.ceil(el.clientWidth / cw)), rows });
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
        <div className="pane-top"><span>{tl}</span><span className="pane-run">{h.repeat(n)}</span><span>{tr}</span></div>
        <div className="pane-side pane-left">{(v + "\n").repeat(Math.max(0, box.rows - 2))}</div>
        <div className="pane-side pane-right">{(v + "\n").repeat(Math.max(0, box.rows - 2))}</div>
        <div className="pane-bottom"><span>{bl}</span><span className="pane-run">{h.repeat(n)}</span><span>{br}</span></div>
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
