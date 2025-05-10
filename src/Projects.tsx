import { projectsData } from "./data/projectsData.tsx";
import { GithubIcon } from "@/components/ui/github";
import T from "./i18n/T";

const Projects = () => {
  return (
    <section id="projects" className="text-[var(--foreground)] mx-auto max-w-5xl px-4 transition-colors">
      <h1 className="font-bold text-3xl pb-8"><T i18nKey="projects.title" /></h1>
      {projectsData.map((project, index) => (
        <div key={index} className="flex flex-col md:flex-row items-start md:ml-6 mb-12">
          <div className="bg-[var(--card)] p-1.5 mb-4 md:mb-0">
            <img
              src={project.image}
              className="object-contain w-full md:w-96 h-auto "
              alt={`Imagen de ${project.title}`}
            />
          </div>
          <div className="flex-1 flex flex-col pl-0 md:pl-8">
            <div className="text-2xl font-bold">{project.title()}</div>
            <div className="pt-2 text-lg text-[var(--muted-foreground)]">
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech, idx) => (
                  <div key={idx} className="flex items-center space-x-2 rounded-full bg-[var(--button)] px-2 py-1 text-sm ">
                    <img src={tech.icon} alt={`Logo de ${tech.name}`} className="w-4 h-4 object-contain" />
                    <span>{tech.name}</span>
                  </div>
                ))}
              </div>
              <div className="pt-4 text-[var(--foreground)] text-base">
                {project.description()}
              </div>
              <div className="pt-4 text-sm w-fit">
                <a href={project.link}>
                  <div className="cursor-pointer flex space-x-3   items-center bg-[var(--button)] shadow-sm w-fit rounded-full px-2 py-2 hover:shadow-purple-300/20">
                    <GithubIcon className="w-5 h-5 text-[var(--muted-foreground)] -translate-y-1 " />
                    <span><T i18nKey="projects.Github_label" /></span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Projects;
