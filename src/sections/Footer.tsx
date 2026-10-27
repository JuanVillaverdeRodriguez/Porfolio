import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="footer">
      <p>
        <span className="p-user">juan</span><span className="p-at">@</span><span className="p-host">udc</span>
        <span className="p-at">:~$ </span>{t("footer.exit")}
      </p>
      <p className="dim">{t("footer.copyright", { year: new Date().getFullYear() })}</p>
      <p className="footer-links">
        <a className="tlink" href="https://github.com/JuanVillaverdeRodriguez" target="_blank" rel="noopener noreferrer">github</a>
        <span aria-hidden="true"> · </span>
        <a className="tlink" href="https://www.linkedin.com/in/juanvillaverde" target="_blank" rel="noopener noreferrer">linkedin</a>
      </p>
    </footer>
  );
}
