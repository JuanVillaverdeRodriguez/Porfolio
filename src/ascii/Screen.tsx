import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { ProjectShot } from "../data/projectsData";

type Props = {
  shots: ProjectShot[];
  name: string; // nombre del proyecto para los textos alternativos
  path: string; // ruta que aparece en el prompt de la pantalla
};

// "Pantalla" que muestra la captura real, como haría imgcat en una terminal.
// Con varias capturas, unas pestañas permiten cambiar de vista.
export default function Screen({ shots, name, path }: Props) {
  const { t } = useTranslation();
  const [index, setIndex] = useState(0);
  const shot = shots[index];
  const file = shot.src.split("/").pop();

  return (
    <div className="project-shot screen">
      <div className="screen-bar">
        <p className="screen-cmd" aria-hidden="true">
          <span className="p-path">{path}</span>
          <span className="p-at">$ </span>
          <span className="p-cmd">imgcat {file}</span>
        </p>
        {shots.length > 1 && (
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
        )}
      </div>
      <img
        key={shot.src}
        src={shot.src}
        alt={shots.length > 1 ? t("projects.raw", { name, view: shot.label }) : t("projects.shot", { name })}
        className="screen-raw"
        loading="lazy"
        decoding="async"
      />
    </div>
  );
}
