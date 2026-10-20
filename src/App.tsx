import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import NatureCanvas from "./ascii/NatureCanvas";
import { Narrator } from "./ascii/Prompt";
import StatusBar from "./StatusBar";
import Hero from "./sections/Hero";
import Experience from "./sections/Experience";
import Projects from "./sections/Projects";
import Certifications from "./sections/Certifications";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import { applyTheme, defaultTheme, Theme } from "./themes";

function App() {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const { t, i18n } = useTranslation();

  useEffect(() => { applyTheme(theme); }, [theme]);
  useEffect(() => { document.documentElement.lang = i18n.language; }, [i18n.language]);

  return (
    <>
      <a className="skip" href="#about">{t("skip")}</a>
      <NatureCanvas theme={theme} />
      <StatusBar theme={theme} onTheme={setTheme} />
      <main className="story">
        <Hero theme={theme} />
        <Narrator i18nKey="story.dawn" />
        <Experience />
        <Narrator i18nKey="story.forest" />
        <Projects />
        <Narrator i18nKey="story.river" />
        <Certifications />
        <Narrator i18nKey="story.fire" />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
