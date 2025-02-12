import { GithubIcon } from "@/components/ui/github";
import { LinkedinIcon } from "@/components/ui/linkedin";

const AboutMe = () => {
    return (
        <div className="text-gray-200 flex flex-col">
            <div className="flex space-x-14">
                <img className="rounded-full size-68" src="./src/images/Yo.jpg" alt="Foto de perfil" />
                <div>
                    <div>
                        <h1 className="bg-gradient-to-r from-gray-200 to-purple-300 bg-clip-text text-transparent font-bold text-6xl pt-4 pb-4">
                            Juan Villaverde
                        </h1>
                        

                    </div>

                    <div className="pt-2 w-172">
                        <p className="text-[1.125rem]">
                            <mark className="text-purple-300 bg-transparent font-bold">Desarrollador de software</mark> graduado por la Universidad de A Coruña (UDC) y actualmente cursando el máster en Ingeniería Informática en la misma universidad.
                            <br></br>
                            Experiencia como <mark className="text-purple-300 bg-transparent font-bold">profesor particular</mark> y en <mark className="text-purple-300 bg-transparent font-bold">proyectos propios</mark>.
                        </p>
                    </div>

                    {/*<div className="pt-4 flex justify-center">
                        <img src="/src/images/ShowMore.svg" alt="Show more" className="cursor-pointer w-8 h-8 scale-120 duration-200 hover:translate-y-1 hover:text-purple-300" />
                    </div>*/}

                    <div className="flex pt-4 space-x-4">
                        <a href="https://github.com/JuanVillaverdeRodriguez" className="hover:scale-105 transition-transform">
                            <GithubIcon className="w-8 h-8 text-gray-300 hover:text-purple-400" />
                        </a>
                        <a href="https://www.linkedin.com/in/juanvillaverde" className="hover:scale-105 transition-transform">
                            <LinkedinIcon className="w-8 h-8 text-gray-300 hover:text-blue-400" />
                        </a>
                        <a href="mailto:juanvillaverderodriguez@gmail.com" className="hover:scale-105 transition-transform">
                            <svg className="h-8 w-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                            </svg>
                        </a>
                    </div>
                    <div className="flex justify-end pt-6">
                        <a href="https://www.linkedin.com/in/juan-villaverde-rodr%C3%ADguez/" className="relative inline-flex">
                            <span className="absolute -inset-1 blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-2000  animate-pulse rounded-full bg-gradient-to-r from-purple-300 via-zinc-600 to-green-300"></span>
                            
                            <span className="relative text-lg rounded-full bg-zinc-800 px-4 py-2 font-semibold text-gray-200 shadow-md transition-all hover:shadow-purple-400/50">
                                Hey! Estoy disponible
                            </span>
                        </a>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default AboutMe;
