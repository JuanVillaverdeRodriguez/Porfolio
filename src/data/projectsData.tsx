import { ReactNode } from "react";

interface TechItem {
  name: string;
  icon: string;
}

interface ProjectItem {
  title: string;
  description: () => ReactNode;
  image: string;
  stack: TechItem[];
  link: string;
}

export const projectsData: ProjectItem[] = [
  {
    title: "Sintetizador musical",
    description: () => (
      <>
        Mi TFG, desarrollé un <mark className="text-[var(--accent)] bg-transparent font-bold">plugin de audio</mark> en C++ para la creación de sonidos y música. Tiene funcionalidades como creación de ondas, modulación y efectos de sonido. La nota final fue un <mark className="text-[var(--accent)] bg-transparent font-bold">9,0</mark>.
      </>
    ),
    image: "assets/Ocnet.png",
    stack: [
      { name: "C++", icon: "assets/C++_Logo.svg" },
      { name: "Juce", icon: "assets/Juce_Logo.png" }
    ],
    link: "https://github.com/JuanVillaverdeRodriguez/ocnet"
  },
  {
    title: "Bus Pontevedra",
    description: () => (
      <>
        Una aplicación en desarrollo para móvil que muestra los <mark className="text-[var(--accent)] bg-transparent font-bold">horarios de los autobuses</mark> de la ciudad de Pontevedra. Dado que muchos datos son erróneos, también fue necesario crear una página web para ayudar a corregirlos.
      </>
    ),
    image: "assets/Bus_Management.png",
    stack: [
      { name: "Kotlin", icon: "assets/Kotlin_Logo.svg" },
      { name: "React", icon: "assets/React_Logo.svg" },
      { name: "Tailwind CSS", icon: "assets/Tailwind_Logo.svg" }
    ],
    link: "https://github.com/JuanVillaverdeRodriguez/BusPontevedra"
  },
  {
    title: "HackUPC 2025",
    description: () => (
      <>
        VuelingConnect es una aplicación que permite a los viajeros compartir información crítica sobre vuelos durante cortes de red utilizando tecnología Bluetooth de Bajo Consumo (BLE). La app crea una red en malla entre dispositivos, lo que permite que la información se propague sin necesidad de conexión a internet.
      </>
    ),
    image: "assets/mockuuups-smartphone-in-hand-mockup.jpg",
    stack: [
      { name: "Flutter", icon: "assets/Flutter_Logo.svg" },
      { name: "Python", icon: "assets/Python_Logo.png" },
    ],
    link: "https://github.com/migueldeoleiros/vuelingconnect"
  }
];
