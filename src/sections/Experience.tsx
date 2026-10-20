import { useTranslation } from "react-i18next";
import Figlet from "../ascii/Figlet";
import Pane from "../ascii/Pane";
import Prompt from "../ascii/Prompt";
import Typewriter from "../ascii/Typewriter";
import { experienceData } from "../data/experienceData";

// La experiencia como un `git log --graph`.
export default function Experience() {
  const { t } = useTranslation();
  return (
    <section id="experience" className="chapter" aria-labelledby="exp-title">
      <h2 id="exp-title" className="sr-only">{t("experience.title")}</h2>
      <Figlet text={t("experience.title")} />
      <Pane title="git log" right="main">
        <Prompt cmd={t("experience.cmd")} />
        <ol className="gitlog">
          {experienceData.map((e, i) => (
            <li key={e.key} className="commit">
              <div className="commit-head">
                <span className="graph" aria-hidden="true">*</span>
                <span className="c-hash">commit {e.hash}</span>
                {e.head && <span className="c-ref"> (<span className="c-headref">HEAD -&gt; </span><span className="c-branch">main</span>)</span>}
              </div>
              <div className="commit-body">
                <span className="graph-line" aria-hidden="true" />
                <div>
                  <h3 className="commit-title">{t(`${e.key}.title`)}</h3>
                  <p className="commit-date">{t("experience.date")}: {t(`${e.key}.date`)}</p>
                  <Typewriter i18nKey={`${e.key}.description`} className="commit-msg" delay={i * 200} />
                  {e.link && (
                    <a className="tlink" href={e.link.url} target="_blank" rel="noopener noreferrer">
                      ↗ {t(e.link.labelKey)} <span className="dim">· {e.link.site}</span>
                    </a>
                  )}
                </div>
              </div>
            </li>
          ))}
          <li className="commit commit-root" aria-hidden="true"><span className="graph">*</span> <span className="dim">initial commit</span></li>
        </ol>
      </Pane>
    </section>
  );
}
