import { ElementType, useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "./useInView";
import { useTranslation } from "react-i18next";

// Texto que se teclea solo al entrar en pantalla. Respeta las etiquetas <mark>
// de las traducciones y reserva el espacio final para que nada salte.
type Segment = { text: string; mark: boolean };

const parse = (raw: string): Segment[] =>
  raw.split(/(<mark>.*?<\/mark>)/g).filter(Boolean).map(part =>
    part.startsWith("<mark>")
      ? { text: part.slice(6, -7), mark: true }
      : { text: part, mark: false });


type Props = {
  i18nKey?: string;
  text?: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  speed?: number; // ms por carácter
  caret?: boolean;
};

export default function Typewriter({ i18nKey, text, as: Tag = "p", className, delay = 0, speed = 14, caret = true }: Props) {
  const { t } = useTranslation();
  const raw = text ?? t(i18nKey ?? "");
  const segments = useMemo(() => parse(raw), [raw]);
  const total = useMemo(() => segments.reduce((n, s) => n + s.text.length, 0), [segments]);
  const [ref, seen] = useInView<HTMLElement>(0.4);
  const [count, setCount] = useState(0);
  const skipped = useRef(false);
  const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (!seen) return;
    if (reduced) { setCount(total); return; }
    setCount(0);
    // los textos largos aceleran: nadie espera más de ~1,6 s a leer
    const per = Math.min(speed, 1600 / Math.max(1, total));
    let raf = 0;
    const start = performance.now() + delay;
    const tick = (now: number) => {
      const n = skipped.current ? total : Math.max(0, Math.floor((now - start) / per));
      setCount(Math.min(total, n));
      if (n < total) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, total, speed, delay, reduced, raw]);

  let left = count;
  let caretPlaced = !caret || count >= total;
  return (
    <Tag ref={ref} className={className} onClick={() => { skipped.current = true; setCount(total); }}>
      <span className="sr-only">{segments.map(s => s.text).join("")}</span>
      <span aria-hidden="true">
        {segments.map((s, i) => {
          const shown = s.text.slice(0, Math.max(0, left));
          const hidden = s.text.slice(shown.length);
          left -= s.text.length;
          const Inner = s.mark ? "mark" : "span";
          const showCaret = !caretPlaced && hidden.length > 0;
          if (showCaret) caretPlaced = true;
          return (
            <Inner key={i} className={s.mark ? "hl" : undefined}>
              {shown}
              {showCaret && <span className="caret" />}
              {hidden && <span className="ghost">{hidden}</span>}
            </Inner>
          );
        })}
      </span>
    </Tag>
  );
}
