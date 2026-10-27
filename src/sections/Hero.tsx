import { useState } from "react";
import { useTranslation } from "react-i18next";
import AsciiImage from "../ascii/AsciiImage";
import { Narrator } from "../ascii/Prompt";
import Figlet from "../ascii/Figlet";
import Pane from "../ascii/Pane";
import Prompt from "../ascii/Prompt";
import Typewriter from "../ascii/Typewriter";
import type { Theme } from "../themes";

const LINKS = [
  { label: "github", href: "https://github.com/JuanVillaverdeRodriguez" },
  { label: "linkedin", href: "https://www.linkedin.com/in/juanvillaverde" },
  { label: "mail", href: "mailto:juanvillaverderodriguez@gmail.com" },
];

export default function Hero({ theme }: { theme: Theme }) {
  const { t } = useTranslation();
  const [raw, setRaw] = useState(false);
  const rows: [string, string][] = [
    ["neofetch.role", "neofetch.roleValue"],
    ["neofetch.degree", "neofetch.degreeValue"],
    ["neofetch.now", "neofetch.nowValue"],
    ["neofetch.exp", "neofetch.expValue"],
    ["neofetch.langs", "neofetch.langsValue"],
  ];

  return (
    <section id="about" className="chapter hero" aria-labelledby="hero-title">
      <h1 id="hero-title" className="sr-only">Juan Villaverde</h1>
      <div className="hero-names">
        <Figlet text="Juan Villaverde" lolcat max={12} className="name-wide" />
        <div className="name-stack">
          <Figlet text="Juan" lolcat fitText="Villaverde" />
          <Figlet text="Villaverde" lolcat className="hero-name-2" />
        </div>
      </div>
      <Narrator i18nKey="story.night" />

      <Pane title="~ — zsh">
        <Prompt cmd="neofetch" />
        <div className="neofetch">
          <figure className="neofetch-art">
            <div className="sb-lang art-mode" role="group" aria-label={t("projects.mode")}>
              <button className={`sb-btn ${!raw ? "is-on" : ""}`} aria-pressed={!raw} onClick={() => setRaw(false)}>ascii</button>
              <span aria-hidden="true">|</span>
              <button className={`sb-btn ${raw ? "is-on" : ""}`} aria-pressed={raw} onClick={() => setRaw(true)}>raw</button>
            </div>
            {raw ? (
              <img src="assets/Yo.jpg" alt={t("neofetch.photo")} className="art-raw" />
            ) : (
              <AsciiImage
                src="assets/Yo_recorte.png"
                alt={t("neofetch.portrait")}
                cols={110}
                knockout={2}
                floor={0.3}
                light={theme.light}
              />
            )}
          </figure>
          <div className="neofetch-info">
            <p className="nf-title"><span className="c-user">juan</span>@<span className="c-host">villaverde</span></p>
            <p className="nf-rule" aria-hidden="true">-------------------</p>
            <dl>
              {rows.map(([k, v], i) => (
                <div key={k} className="nf-row">
                  <dt>{t(k)}</dt>
                  <dd><Typewriter text={t(v)} as="span" delay={300 + i * 180} caret={false} /></dd>
                </div>
              ))}
            </dl>
            <Typewriter i18nKey="aboutMe.description" className="hero-lede" delay={900} />
            <div className="hero-actions">
          <a className="btn-primary" href="https://www.linkedin.com/in/juan-villaverde-rodr%C3%ADguez/">
            <span aria-hidden="true">[ </span>{t("aboutMe.availableButton")}<span aria-hidden="true"> ]</span>
            <span className="btn-arrow" aria-hidden="true"> ⏎</span>
          </a>
          <ul className="hero-links">
            {LINKS.map(l => (
              <li key={l.label}><a href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">~/{l.label}</a></li>
            ))}
          </ul>
            </div>
          </div>
        </div>
      </Pane>
    </section>
  );
}
