import { useTranslation } from "react-i18next";
import Figlet from "../ascii/Figlet";
import Pane from "../ascii/Pane";
import Screen from "../ascii/Screen";
import Typewriter from "../ascii/Typewriter";
import { projectsData } from "../data/projectsData";

// Las capturas se muestran tal cual sobre una "pantalla" oscura de terminal.
export default function Projects() {
  const { t } = useTranslation();
  return (
    <section id="projects" className="chapter" aria-labelledby="proj-title">
      <h2 id="proj-title" className="sr-only">{t("projects.title")}</h2>
      <Figlet text={t("projects.title")} />
      <div className="projects">
        {projectsData.map((p, i) => (
          <article key={p.slug} id={`p-${p.slug}`} className={`project ${i % 2 ? "project-flip" : ""}`}>
            <Pane title={`${p.slug}/`} right={p.stack.join(" · ")}>
              <div className="project-grid">
                <Screen
                  shots={p.shots ?? [{ label: p.slug, src: p.image }]}
                  name={t(`${p.key}.title`)}
                  path={`~/${p.slug}`}
                />
                <div className="project-text">
                  <h3 className="project-title">{t(`${p.key}.title`)}</h3>
                  <ul className="tags" aria-label={t("projects.stack")}>
                    {p.stack.map(s => <li key={s}>{s}</li>)}
                  </ul>
                  <Typewriter i18nKey={`${p.key}.description`} className="project-desc" />
                  <a className="tlink clone" href={p.link} target="_blank" rel="noopener noreferrer">
                    <span className="dim">$ git clone </span>{p.link.replace("https://", "")}
                    <span className="sr-only"> ({t("projects.Github_label")})</span>
                  </a>
                </div>
              </div>
            </Pane>
          </article>
        ))}
      </div>
    </section>
  );
}
