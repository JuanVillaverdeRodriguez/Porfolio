import { experienceData } from './data/experienceData';
import T from "./i18n/T";

const Experience = () => {
  return (
    <section id="experience" className="text-[var(--foreground)] mx-auto max-w-5xl px-4">
      <h1 className="font-bold text-3xl mb-8">
        <T i18nKey="experience.title"/>
      </h1>
      <div className="relative md:ml-6">
        <ol className="relative">
          {experienceData.map((exp, index) => (
            <li key={index} className="relative flex flex-col md:flex-row items-start">
              <div className="mt-8 md:mt-0 pb-8 md:ml-16 mx-12 before:absolute before:left-0 before:top-0 before:w-1 before:bg-[var(--line)] before:transition-colors before:duration-1000 before:h-full before:rounded">
                <div className="absolute -left-1.25 mt-4 rounded-full text-[var(--accent)]">
                  <svg className="w-3.5 h-3.5 bg-[var(--accent)] rounded-full" fill="none" viewBox="0 0 24 24" />
                </div>
                <h2 className="font-semibold text-xl md:text-2xl">{exp.title()}</h2>
                <h3 className="text-base pb-4 text-[var(--muted-foreground)]">{exp.date()}</h3>
                <p className="text-base">{exp.description()}</p>
                {exp.link && (
                  <a href={exp.link.url} className="mt-2 inline-block">
                    <div className="flex space-x-2.5 bg-[var(--button)] rounded-full items-center px-3 py-1 mt-2 shadow-sm hover:shadow-purple-300/20 transition-all duration-300 ease-in-out">
                      <div className="p-0.5 rounded-sm">
                        <img src={exp.link.icon} alt="Logo" className="w-5 h-5 object-contain" />
                      </div>
                      <span>{exp.link.label()}</span>
                    </div>
                  </a>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Experience;
