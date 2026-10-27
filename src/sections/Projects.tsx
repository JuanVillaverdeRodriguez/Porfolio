import { useTranslation } from "react-i18next";
import AsciiImage from "../ascii/AsciiImage";
import Figlet from "../ascii/Figlet";
import Pane from "../ascii/Pane";
import Prompt from "../ascii/Prompt";
import Screen from "../ascii/Screen";
import Typewriter from "../ascii/Typewriter";
import { projectsData } from "../data/projectsData";

// Las capturas se pintan siempre sobre una "pantalla" oscura: son interfaces, no fotos.
export default function Projects() {
  const { t } = useTranslation();
  return (
    <section id="projects" className="chapter" aria-labelledby="proj-title">
      <h2 id="proj-title" className="sr-only">{t("projects.title")}</h2>
      <Figlet text={t("projects.title")} />
      <div className="ls">
        <Prompt cmd={t("projects.cmd")} />
        <p className="ls-out">
          {projectsData.map(p => (
            <a
              key={p.slug}
              href={`#p-${p.slug}`}
              className="ls-dir"
              onClick={e => { e.preventDefault(); document.getElementById(`p-${p.slug}`)?.scrollIntoView({ behavior: "smooth" }); }}
            >{p.slug}/</a>
          ))}
        </p>
      </div>

      <div className="projects">
        {projectsData.map((p, i) => (
          <article key={p.slug} id={`p-${p.slug}`} className={`project ${i % 2 ? "project-flip" : ""}`}>
            <Pane title={`${p.slug}/`} right={p.stack.join(" · ")}>
              <div className="project-grid">
                {p.featured && p.shots ? (
                  <Screen shots={p.shots} name={t(`${p.key}.title`)} path={`~/${p.slug}`} />
                ) : (
                  <AsciiImage
                    src={p.image}
                    alt={t("projects.shot", { name: t(`${p.key}.title`) })}
                    cols={170}
                    crop={p.crop}
                    knockout={p.slug === "vuelingconnect" ? 0.86 : 2}
                    className="project-shot"
                  />
                )}
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
