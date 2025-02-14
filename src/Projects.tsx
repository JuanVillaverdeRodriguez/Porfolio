import { GithubIcon } from "@/components/ui/github";

const Projects = () => {
    return (
      <section id="projects" className="text-gray-200 mx-auto max-w-5xl px-4">
        <h1 className="font-bold text-3xl pb-8">Proyectos</h1>
  
        <div className="flex flex-col md:flex-row items-start md:ml-6 mb-12">
          <div className="bg-zinc-800 p-1.5 mb-4 md:mb-0">
            <img 
              src="assets/Ocnet.png" 
              className="object-contain w-full md:w-96 h-auto" 
              alt="Imagen del sintetizador" 
            />
          </div>
          <div className="flex-1 flex flex-col pl-0 md:pl-8">
            <div className="text-2xl font-bold">Sintetizador musical</div>
            <div className="pt-2 text-lg text-gray-300">
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center space-x-2 rounded-full bg-zinc-800 px-2 py-1 text-sm">
                  <img src="assets/C++_Logo.svg" alt="Logo de C++" className="w-4 h-4 object-contain"/>
                  <span>C++</span>
                </div>
                <div className="flex items-center space-x-2 rounded-full bg-zinc-800 px-2 py-1 text-sm">
                  <img src="assets/Juce_Logo.png" alt="Logo de Juce" className="w-4 h-4 object-contain"/>
                  <span>Juce</span>
                </div>
              </div>
              <div className="pt-4 text-base">
                Mi TFG, desarrollé un <mark className="text-purple-300 bg-transparent font-bold">plugin de audio</mark> en C++ para la creación de sonidos y música. Tiene funcionalidades como creación de ondas, modulación y efectos de sonido. La nota final fue un <mark className="text-purple-300 bg-transparent font-bold">9,0</mark>.
              </div>
              <div className="pt-4 text-sm">
                <div className="flex space-x-3 border-2 border-zinc-700 items-center bg-zinc-800 w-fit rounded-full px-2 py-1">
                  <a href="https://github.com/JuanVillaverdeRodriguez">
                    <GithubIcon className="w-5 h-5 text-gray-300 -translate-y-1" />
                  </a>
                  <span>Código</span>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <div className="flex flex-col md:flex-row items-start md:ml-6">
          <div className="bg-zinc-800 p-1.5 mb-4 md:mb-0">
            <img 
              src="assets/Ocnet.png" 
              className="object-contain w-full md:w-96 h-auto" 
              alt="Imagen de la aplicación de buses" 
            />
          </div>
          <div className="flex-1 flex flex-col pl-0 md:pl-8">
            <div className="text-2xl font-bold">Bus Pontevedra</div>
            <div className="pt-2 text-lg text-gray-300">
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center space-x-2 rounded-full bg-zinc-800 px-2 py-1 text-sm">
                  <img src="assets/Kotlin_Logo.svg" alt="Logo de Kotlin" className="w-4 h-4 object-contain"/>
                  <span>Kotlin</span>
                </div>
                <div className="flex items-center space-x-2 rounded-full bg-zinc-800 px-2 py-1 text-sm">
                  <img src="assets/React_Logo.svg" alt="Logo de React" className="w-4 h-4 object-contain"/>
                  <span>React</span>
                </div>
                <div className="flex items-center space-x-2 rounded-full bg-zinc-800 px-2 py-1 text-sm">
                  <img src="assets/Tailwind_Logo.svg" alt="Logo de Tailwind" className="w-4 h-4 object-contain"/>
                  <span>Tailwind CSS</span>
                </div>
              </div>
              <div className="pt-4 text-base">
                Una aplicación en desarrollo para móvil que muestra los <mark className="text-purple-300 bg-transparent font-bold">horarios de los autobuses</mark> de la ciudad de Pontevedra. Dado que muchos datos son erróneos, también fué necesario crear una página web para ayudar a corregirlos.
              </div>
              <div className="pt-4 text-sm">
                <div className="flex space-x-3 border-2 border-zinc-700 items-center bg-zinc-800 w-fit rounded-full px-2 py-1">
                  <a href="https://github.com/JuanVillaverdeRodriguez">
                    <GithubIcon className="w-5 h-5 text-gray-300 -translate-y-1" />
                  </a>
                  <span>Código</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default Projects;
  