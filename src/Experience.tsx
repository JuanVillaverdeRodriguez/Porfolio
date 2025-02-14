const Experience = () => {
    return (
      <section id="experience" className="text-gray-200 mx-auto max-w-5xl px-4">
        <h1 className="font-bold text-3xl mb-8">Experiencia</h1>
        <div className="relative md:ml-6">
          <ol className="relative">
            <li className="relative flex flex-col md:flex-row items-start">
                
              <div className="mt-8 md:mt-0 pb-12 md:ml-16 mx-12 before:absolute before:left-0 before:top-0 before:w-1 before:bg-zinc-800 before:h-full before:rounded">
                <div className="absolute -left-1.25 mt-4 rounded-full bg-purple-300">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    </svg>
                </div>
                
                <h2 className="font-semibold text-xl md:text-2xl">Profesor particular</h2>
                <h3 className="text-base pb-4 text-gray-300">Noviembre 2024 - Febrero 2025</h3>
                <p className="text-base">
                  Proporcioné <mark className="text-purple-300 bg-transparent font-bold">clases de programación</mark> en C de forma autónoma y telemática a través de la plataforma de 
                  <mark className="text-purple-300 bg-transparent font-bold"> Tus Clases Particulares</mark>. Las clases estaban orientadas a ayudar a estudiantes a comprender las bases y superar las asignaturas de programación.
                </p>
                <a href="https://www.tusclasesparticulares.com/profesores/juan-villaverde-rodriguez.htm" className="mt-2 inline-block">
                  <div className="flex space-x-2.5 bg-zinc-800 rounded-full items-center px-3 py-1">
                    <div className="bg-blue-800 w-6 h-6 flex items-center justify-center rounded-full text-sm font-bold">
                      tc
                    </div>
                    <span>Mi perfil</span>
                  </div>
                </a>
              </div>
            </li>
            <li className="relative flex flex-col md:flex-row items-start">
                <div className="md:ml-16 mx-12 before:absolute before:left-0 before:top-0 before:w-1 before:bg-zinc-800 before:h-full before:rounded">
                <div className="absolute -left-1.25 mt-4 rounded-full bg-purple-300">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    </svg>
                </div>
              <div className="mt-8 md:mt-0">
                <h2 className="font-semibold text-xl md:text-2xl">Proyectos personales</h2>
                <h3 className="text-base pb-4 text-gray-300">Constantemente...</h3>
                <p className="text-base">
                  He realizado diversos <mark className="text-purple-300 bg-transparent font-bold">proyectos por cuenta propia</mark> que me han permitido expandir mis conocimientos y mejorar mis habilidades de programación.
                </p>
              </div>
                </div>
            </li>
          </ol>
        </div>
      </section>
    );
  };
  
  export default Experience;
  