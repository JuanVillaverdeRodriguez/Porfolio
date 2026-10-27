import { CSSProperties, useMemo } from "react";
import figlet from "figlet/lib/figlet.js";
import ansiShadow from "figlet/importable-fonts/ANSI Shadow.js";
import { useInView } from "./useInView";

figlet.parseFont("ANSI Shadow", ansiShadow);

// Rótulo figlet que se ajusta al ancho disponible y se "imprime" de izquierda a derecha.
// Con `lolcat`, cada columna toma su tono del arcoíris y el arcoíris se desplaza.
type Props = { text: string; lolcat?: boolean; max?: number; fitText?: string; className?: string };

const strip = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toUpperCase();

export default function Figlet({ text, lolcat = false, max = 10, fitText, className = "" }: Props) {
  const lines = useMemo(() => {
    const out = figlet.textSync(strip(text), { font: "ANSI Shadow" }).split("\n");
    while (out.length && !out[out.length - 1].trim()) out.pop();
    return out;
  }, [text]);
  // con fitText, el tamaño se calcula para ese texto: varias líneas comparten letra
  const fitWidth = useMemo(() => fitText
    ? Math.max(...figlet.textSync(strip(fitText), { font: "ANSI Shadow" }).split("\n").map(l => l.length))
    : 0, [fitText]);
  const width = fitWidth || Math.max(...lines.map(l => l.length));
  const [ref, seen] = useInView<HTMLDivElement>(0.2);

  const style = { "--cols": width, "--max": `calc(${max}px * var(--scale, 1))` } as CSSProperties;

  return (
    <div ref={ref} className={`figlet-fit ${className}`}>
      <pre aria-hidden="true" className={`figlet ${seen ? "is-in" : "armed"} ${lolcat ? "lolcat" : ""}`} style={style}>
        {lolcat
          ? lines.map((line, y) => (
              <span key={y} className="figlet-line">
                {[...line].map((c, x) =>
                  c === " " ? " " : <span key={x} style={{ "--h": `${x * 5 + y * 9}deg` } as CSSProperties}>{c}</span>)}
                {"\n"}
              </span>
            ))
          : lines.join("\n")}
      </pre>
    </div>
  );
}
