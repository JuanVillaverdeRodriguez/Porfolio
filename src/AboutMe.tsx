import { GithubIcon } from "@/components/ui/github";
import { LinkedinIcon } from "@/components/ui/linkedin";

const AboutMe = () => {
    return (
      <section id="about" className="text-gray-200 mx-auto max-w-5xl px-4 mt-32">
        <div className="flex flex-col align-middle md:flex-row md:space-x-14 md:space-y-0">
          <img 
            className="rounded-full shadow-lg w-48 h-48 md:w-64 md:h-64 object-cover md:mr-14 mx-auto" 
            src="assets/Yo.jpg" 
            alt="Foto de perfil" 
          />
          <div className="flex flex-col justify-center space-y-4 mt-6">
            <h1 className="bg-gradient-to-r from-gray-200 to-purple-300 bg-clip-text text-transparent font-bold text-4xl md:text-6xl md:text-start text-center">
              Juan Villaverde
            </h1>
            <p className="text-l md:text-l md:text-start text-center">
              <mark className="text-purple-300 bg-transparent font-bold">Desarrollador de software</mark> graduado por la Universidad de A Coruña (UDC) y actualmente cursando el máster en Ingeniería Informática en la misma universidad.
              Experiencia como <mark className="text-purple-300 bg-transparent font-bold">profesor particular</mark> y en <mark className="text-purple-300 bg-transparent font-bold">proyectos propios</mark>.
            </p>
            <div className="flex md:flex-row flex-col justify-between mt-2 ">
                <div className="flex space-x-4 w-fit md:mx-0 mx-auto">
                <a href="https://github.com/JuanVillaverdeRodriguez" className="hover:scale-105 transition-transform">
                <GithubIcon className="w-8 h-8 text-gray-300 hover:text-purple-400" />
              </a>
              <a href="https://www.linkedin.com/in/juanvillaverde" className="hover:scale-105 transition-transform">
                <LinkedinIcon className="w-8 h-8 text-gray-300 hover:text-blue-400" />
              </a>
              <a href="mailto:juanvillaverderodriguez@gmail.com" className="hover:scale-105 transition-transform">
                <svg className="h-8 w-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </a>
                </div>
              
              <div className="md:mr-6 md:mt-0 mt-6 md:mx-0 mx-auto">
              <a href="https://www.linkedin.com/in/juan-villaverde-rodr%C3%ADguez/" className="relative inline-flex group">
                <span className="absolute -inset-1 md:blur-sm blur-xs opacity-30 group-hover:opacity-70 transition-opacity duration-2000 animate-pulse rounded-full bg-gradient-to-r from-purple-300 via-zinc-600 to-green-300"></span>
                <span className="text-base relative rounded-full bg-zinc-800 px-4 py-2  text-gray-300 shadow-md transition-all hover:shadow-purple-400/50">
                  Hey! Estoy disponible
                </span>
              </a>
            </div>
            </div>

          </div>
        </div>
      </section>
    );
  };
  
  export default AboutMe;