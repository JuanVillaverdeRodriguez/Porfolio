import { GithubIcon } from "@/components/ui/github";

const Projects = () => {
    return (
        <div className="text-gray-200 flex flex-col">
            <div className=" rounded text-gray-200">
                <h1 className="font-bold text-4xl pt-16 pb-4">Proyectos</h1>

                <div className="flex relative pt-8 ml-6 items-start">
                    <div className="items-start bg-zinc-800 p-1.5">
                        <img 
                            src="assets/Ocnet.png" 
                            className="object-contain items-start w-96 h-auto"
                            alt="Imagen del sintetizador"
                        />
                    </div>
                    <div className="flex-1 8 flex-col pl-8">
                        <div className="text-2xl font-bold">
                            Sintetizador musical
                        </div>
                        <div className="pt-2 text-[1.125rem] text-gray-300">
                            <div className="flex space-x-4">
                                <div className="flex items-center h-fit w-fit space-x-2 rounded-4xl bg-zinc-800 px-2 py-1 text-[0.925rem]">
                                        <img src="assets/C++_Logo.svg" alt="Logo de C++" className="w-4.5 h-4.5 scale-100 object-contain"/>
                                        <div>
                                            C++
                                        </div>
                                </div>
                                <div className="flex items-center h-fit w-fit space-x-2 rounded-4xl bg-zinc-800 px-2 py-1 text-[0.925rem]">
                                    <img src="assets/Juce_Logo.png" alt="Logo de Juce" className="w-4 h-4 scale-100 object-contain"/>
                                        <div>
                                            Juce
                                        </div>
                                </div>

                            </div>
                            <div className="pt-4">
                                Mi TFG, desarrollé un <mark className="text-purple-300 bg-transparent font-bold">plugin de audio</mark> en C++ para la creación de sonidos y música.
                                Tiene funcionalidades como creación de ondas, modulación y efectos de sonido. La nota final fue un <mark className="text-purple-300 bg-transparent font-bold">9,0</mark>.
                            </div>
                            <div className="pt-4 text-[0.925rem]">
                                <div className="flex space-x-3 border-2 border-zinc-700 items-center bg-zinc-800 w-fit rounded-2xl px-2 py-1.5">
                                    <a href="https://github.com/JuanVillaverdeRodriguez">
                                        <GithubIcon className="w-5 h-5 text-gray-300 -translate-y-1" />
                                    </a>
                                    <div>
                                        Código
                                    </div>
                                </div>
                            </div>

                            
                        </div>
                    </div>
                    
                </div>
                <div className="flex relative pt-8 ml-6 items-start">
                    <div className="items-start bg-zinc-800 p-1.5">
                        <img 
                            src="assets/Ocnet.png" 
                            className="object-contain items-start w-96 h-auto"
                            alt="Imagen de la aplicación de buses"
                        />
                    </div>
                    <div className="flex-1 8 flex-col pl-8">
                        <div className="text-2xl font-bold">
                            Bus Pontevedra
                        </div>
                        <div className="pt-2 text-[1.125rem] text-gray-300">
                            <div className="flex space-x-4">
                                <div className="flex items-center h-fit w-fit space-x-2 rounded-4xl bg-zinc-800 px-2 py-1 text-[0.925rem]">
                                        <img src="assets/Kotlin_Logo.svg" alt="Logo de Kotlin" className="w-4.5 h-4.5 scale-100 object-contain"/>
                                        <div>
                                            Kotlin
                                        </div>
                                </div>
                                <div className="flex items-center h-fit w-fit space-x-2 rounded-4xl bg-zinc-800 px-2 py-1 text-[0.925rem]">
                                    <img src="assets/React_Logo.svg" alt="Logo de React" className="w-4 h-4 scale-100 object-contain"/>
                                        <div>
                                            React
                                        </div>
                                </div>
                                <div className="flex items-center h-fit w-fit space-x-2 rounded-4xl bg-zinc-800 px-2 py-1 text-[0.925rem]">
                                    <img src="assets/Tailwind_Logo.svg" alt="Logo de Tailwind" className="w-4 h-4 scale-100 object-contain"/>
                                        <div>
                                            Tailwind CSS
                                        </div>
                                </div>

                            </div>
                            <div className="pt-4">
                                Una aplicación en desarrollo para móvil que muestra los <mark className="text-purple-300 bg-transparent font-bold">horarios de los autobuses</mark> de la ciudad de Pontevedra. 
                                Dado que muchos datos son erróneos, también fué necesario crear una página web para ayudar a corregirlos.
                            </div>
                            <div className="pt-4 text-[0.925rem]">
                                <div className="flex space-x-3 border-2 border-zinc-700 items-center bg-zinc-800 w-fit rounded-2xl px-2 py-1.5">
                                    <a href="https://github.com/JuanVillaverdeRodriguez">
                                        <GithubIcon className="w-5 h-5 text-gray-300 -translate-y-1" />
                                    </a>
                                    <div>
                                        Código
                                    </div>
                                </div>
                            </div>

                            
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default Projects;
