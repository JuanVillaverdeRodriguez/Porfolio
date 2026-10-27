import { useState } from "react";
import { useTranslation } from "react-i18next";
import AsciiImage from "./AsciiImage";
import type { ProjectShot } from "../data/projectsData";

type Props = {
  shots: ProjectShot[];
  name: string; // nombre del proyecto para los textos alternativos
  path: string; // ruta que aparece en el prompt de la pantalla
  cols?: number;
  knockout?: number;
  blackPoint?: number;
};

// "Pantalla" con varias capturas: por defecto se imprimen en ASCII (jp2a) y
// con `raw` se muestra la captura real, como haría imgcat en una terminal.
export default function Screen({ shots, name, path, cols = 160, knockout = 2, blackPoint = 0.13 }: Props) {
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);
  const [raw, setRaw] = useState(false);
  const shot = shots[index];
  const file = shot.src.split("/").pop();

  return (
    <div className="project-shot screen">
      <div className="screen-bar">
        <p className="screen-cmd" aria-hidden="true">
          <span className="p-path">{path}</span>
          <span className="p-at">$ </span>
          <span className="p-cmd">{raw ? `imgcat ${file}` : `jp2a --colors ${file}`}</span>
        </p>
        <div className="screen-controls">
          <div className="sb-lang" role="group" aria-label={t("projects.view")}>
            {shots.map((s, i) => (
              <button
                key={s.src}
                className={`sb-btn ${i === index ? "is-on" : ""}`}
                aria-pressed={i === index}
                onClick={() => setIndex(i)}
              >{s.label}</button>
            ))}
          </div>
          <div className="sb-lang" role="group" aria-label={t("projects.mode")}>
            <button className={`sb-btn ${!raw ? "is-on" : ""}`} aria-pressed={!raw} onClick={() => setRaw(false)}>ascii</button>
            <span aria-hidden="true">|</span>
            <button className={`sb-btn ${raw ? "is-on" : ""}`} aria-pressed={raw} onClick={() => setRaw(true)}>raw</button>
          </div>
        </div>
      </div>
      {raw ? (
        <img
          key={shot.src}
          src={shot.src}
          alt={t("projects.raw", { name, view: shot.label })}
          className="screen-raw"
          width={1280}
          height={720}
        />
      ) : (
        <AsciiImage
          key={shot.src}
          src={shot.src}
          alt={t("projects.shot", { name })}
          cols={cols}
          crop={shot.crop}
          knockout={knockout}
          blackPoint={blackPoint}
        />
      )}
    </div>
  );
}
