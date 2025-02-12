const Experience = () => {
  return (
      <div className="text-gray-200 flex flex-col justify-between">
          <h1 className="font-bold text-4xl pt-16 pb-4">Experiencia</h1>

          <div className="relative pt-8 ml-6">
              <div className="absolute left-0 top-0 w-1 bg-zinc-800 h-full rounded"></div>

              <ol className="relative space-y-8">
                  <li className="relative flex items-start">
                      <div className="absolute -left-5.5 bg-zinc-900 text-black w-12 h-12 flex items-center justify-center rounded-full">
                            <img src="./src/assets/TCP_Logo.svg" alt="Logo de tus clases particulares" className="w-64 h-64 scale-170 object-contain" />
                      </div>

                      <div className="pl-16">
                          <h2 className="font-semibold text-2xl">Profesor particular</h2>
                          <h3 className="text-[1.250rem] pb-4 text-gray-300">Noviembre 2024 - Febrero 2025</h3>
                          <p className="text-[1.125rem]">
                              Proporcioné <mark className="text-purple-300 bg-transparent font-bold">clases de programación</mark> en C de forma autónoma y telemática a través de la plataforma de 
                              <mark className="text-purple-300 bg-transparent font-bold "> Tus Clases Particulares</mark>. Las clases estaban orientadas a ayudar a estudiantes de la facultad de informática
                              a comprender las bases y superar las asignaturas de programación.
                          </p>
                          <a href="https://www.tusclasesparticulares.com/profesores/juan-villaverde-rodriguez.htm" className="w-fit">
                          <div className="flex space-x-4 bg-zinc-800 rounded-4xl justify-center items-center mt-2 w-fit px-2.25 py-1.5">
                            
                            <div className="bg-blue-800 w-6 h-6 flex items-center justify-center rounded-md text-l font-bold mr-2">
                                tc
                            </div>
                            Mi perfil
                          </div>
                          </a>
                      </div>
                  </li>
                  <li className="relative flex items-start">
                      <div className="absolute -left-5.5 bg-zinc-900 text-black w-12 h-12 flex items-center justify-center rounded-full">
                        <img src="./src/assets/Projects_Icon.svg" alt="Icono de proyectos" className="w-32 h-32 scale-80 object-contain" />
                      </div>

                      <div className="pl-16">
                          <h2 className="font-semibold text-2xl">Proyectos personales</h2>
                          <h3 className="text-[1.250rem] pb-4 text-gray-300">Constantemente...</h3>
                          <p className="text-[1.125rem]">
                            He realizado diversos <mark className="text-purple-300 bg-transparent font-bold ">proyectos por cuenta propia</mark> que me han permitido 
                            expandir mis conocimientos más allá de lo que se enseña en la universidad. Con ellos he podido
                            aprender nuevas tecologías y mejorar mis habilidades de programación.
                          </p>
                      </div>
                  </li>


              </ol>
          </div>
      </div>
  );
};

export default Experience;
