import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Theme, themes } from "./themes";

// Barra de estado estilo tmux: ventanas = capítulos, a la derecha tema, idioma y reloj.
const WINDOWS = [
  { id: "about", key: "header.profile" },
  { id: "experience", key: "header.experience" },
  { id: "projects", key: "header.projects" },
  { id: "certifications", key: "header.certifications" },
  { id: "contact", key: "header.contact" },
];

type Props = { theme: Theme; onTheme: (t: Theme) => void };

export default function StatusBar({ theme, onTheme }: Props) {
  const { t, i18n } = useTranslation();
  const [active, setActive] = useState("about");
  const [open, setOpen] = useState(false);
  const [clock, setClock] = useState(() => new Date());
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const mid = window.innerHeight * 0.45;
      let current = WINDOWS[0].id;
      for (const w of WINDOWS) {
        const el = document.getElementById(w.id);
        if (el && el.getBoundingClientRect().top <= mid) current = w.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const id = setInterval(() => setClock(new Date()), 15000);
    return () => { window.removeEventListener("scroll", onScroll); clearInterval(id); };
  }, []);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !menuRef.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("pointerdown", close);
    window.addEventListener("keydown", close);
    return () => { window.removeEventListener("pointerdown", close); window.removeEventListener("keydown", close); };
  }, [open]);

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const setLang = (lng: string) => {
    i18n.changeLanguage(lng);
    try { localStorage.setItem("language", lng); } catch { /* sin storage */ }
  };

  const lang = i18n.language.startsWith("en") ? "en" : "es";

  return (
    <header className="statusbar">
      <span className="sb-session">[juan]</span>
      <nav className="sb-windows" aria-label={t("status.nav")}>
        {WINDOWS.map((w, i) => (
          <button
            key={w.id}
            className={`sb-win ${active === w.id ? "is-active" : ""}`}
            aria-current={active === w.id ? "true" : undefined}
            onClick={() => go(w.id)}
          >
            {i}<span className="sb-label">:{t(w.key).toLowerCase()}</span>{active === w.id ? "*" : ""}
          </button>
        ))}
      </nav>
      <div className="sb-right">
        <div className="sb-theme" ref={menuRef}>
          <button
            className="sb-btn"
            aria-haspopup="menu"
            aria-expanded={open}
            onClick={() => setOpen(o => !o)}
            title={t("status.theme")}
          >
            <span className="sb-dot" /> <span className="sb-theme-name">{theme.name}</span>
          </button>
          {open && (
            <ul className="sb-menu" role="menu">
              {themes.map(th => (
                <li key={th.id} role="none">
                  <button
                    role="menuitemradio"
                    aria-checked={th.id === theme.id}
                    className="sb-menu-item"
                    onClick={() => { onTheme(th); setOpen(false); }}
                  >
                    <span className="sb-swatches" aria-hidden="true">
                      {[th.red, th.green, th.yellow, th.blue, th.magenta, th.cyan].map(c => (
                        <i key={c} style={{ background: c }} />
                      ))}
                    </span>
                    <span style={{ color: th.id === theme.id ? "var(--green)" : undefined }}>
                      {th.id === theme.id ? "> " : "  "}{th.name}
                    </span>
                    <span className="sb-menu-meta">{th.light ? t("status.light") : t("status.dark")}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="sb-lang" role="group" aria-label={t("status.language")}>
          <button className={`sb-btn ${lang === "es" ? "is-on" : ""}`} aria-pressed={lang === "es"} onClick={() => setLang("es")}>es</button>
          <span aria-hidden="true">|</span>
          <button className={`sb-btn ${lang === "en" ? "is-on" : ""}`} aria-pressed={lang === "en"} onClick={() => setLang("en")}>en</button>
        </div>
        <span className="sb-clock" aria-hidden="true">
          {clock.toLocaleTimeString(lang, { hour: "2-digit", minute: "2-digit" })}
        </span>
      </div>
    </header>
  );
}
