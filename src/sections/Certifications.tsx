import { useTranslation } from "react-i18next";
import Figlet from "../ascii/Figlet";
import Pane from "../ascii/Pane";
import Prompt from "../ascii/Prompt";
import Typewriter from "../ascii/Typewriter";

const certs = [
  { key: "certifications_1", issuer: "Santander", seal: "PBI", file: "/assets/PowerBI_Cert.pdf" },
  { key: "certifications_2", issuer: "Cambridge University", seal: "C1", file: "/assets/Statment_of_Result.pdf" },
];

// Sello ASCII con las siglas del certificado.
const seal = (s: string) => [
  "   .-----.   ",
  "  / *   * \\  ",
  ` |  ${s.padEnd(3)}  | `,
  "  \\ *   * /  ",
  "   '-----'   ",
  "    /   \\    ",
  "   /_/ \\_\\   ",
].join("\n");

export default function Certifications() {
  const { t } = useTranslation();
  return (
    <section id="certifications" className="chapter" aria-labelledby="cert-title">
      <h2 id="cert-title" className="sr-only">{t("certifications.title")}</h2>
      <Figlet text={t("certifications.title")} />
      <Prompt cmd={t("certifications.cmd")} />
      <div className="certs">
        {certs.map((c, i) => (
          <Pane key={c.key} className="cert">
            <div className="cert-inner">
              <pre className="seal" aria-hidden="true" style={{ color: i ? "var(--magenta)" : "var(--yellow)" }}>{seal(c.seal)}</pre>
              <div>
                <h3 className="cert-title"><Typewriter text={t(`${c.key}.title`)} as="span" speed={40} /></h3>
                <p className="cert-meta">{t("certifications.issuer")} {c.issuer}</p>
                <p className="cert-meta">{t(`${c.key}.date`)}</p>
                <div className="cert-actions">
                  <a className="tlink" href={c.file} target="_blank" rel="noopener noreferrer">[{t("certifications.show")}]</a>
                  <a className="tlink" href={c.file} download>[{t("certifications.download")}]</a>
                </div>
              </div>
            </div>
          </Pane>
        ))}
      </div>
    </section>
  );
}
