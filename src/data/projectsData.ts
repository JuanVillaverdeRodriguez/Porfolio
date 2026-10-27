export interface ProjectShot {
  label: string;
  src: string;
  crop?: [number, number, number, number]; // recorte para la versión ASCII (la raw se ve entera)
}

export interface ProjectItem {
  key: string;
  slug: string;
  image: string;
  stack: string[];
  link: string;
  crop?: [number, number, number, number];
  // Proyecto destacado: captura a todo el ancho con varias vistas y modo raw
  featured?: boolean;
  shots?: ProjectShot[];
}

export const projectsData: ProjectItem[] = [
  {
    key: "projects_1",
    slug: "ocnet",
    image: "assets/Ocnet_Oscillators.png",
    stack: ["C++", "JUCE"],
    link: "https://github.com/JuanVillaverdeRodriguez/ocnet",
    featured: true,
    shots: [
      { label: "osc", src: "assets/Ocnet_Oscillators.png", crop: [0.515, 0.2, 0.47, 0.37] },
      { label: "fx", src: "assets/Ocnet_Effects.png", crop: [0.017, 0.17, 0.47, 0.37] },
    ],
  },
  {
    key: "projects_2",
    slug: "bus-pontevedra",
    image: "assets/Bus_Management.png",
    stack: ["Kotlin", "React", "Tailwind CSS"],
    link: "https://github.com/JuanVillaverdeRodriguez/BusPontevedra",
  },
  {
    key: "projects_3",
    slug: "vuelingconnect",
    image: "assets/mockuuups-smartphone-in-hand-mockup.jpg",
    crop: [0.1, 0.12, 0.8, 0.8],
    stack: ["Flutter", "Python"],
    link: "https://github.com/migueldeoleiros/vuelingconnect",
  },
];
