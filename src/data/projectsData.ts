export interface ProjectShot {
  label: string;
  src: string;
}

export interface ProjectItem {
  key: string;
  slug: string;
  image: string;
  stack: string[];
  link: string;
  // Varias capturas: se muestran con pestañas en lugar de `image`
  shots?: ProjectShot[];
}

export const projectsData: ProjectItem[] = [
  {
    key: "projects_1",
    slug: "ocnet",
    image: "assets/Ocnet_Oscillators.png",
    stack: ["C++", "JUCE"],
    link: "https://github.com/JuanVillaverdeRodriguez/ocnet",
    shots: [
      { label: "osc", src: "assets/Ocnet_Oscillators.png" },
      { label: "fx", src: "assets/Ocnet_Effects.png" },
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
    stack: ["Flutter", "Python"],
    link: "https://github.com/migueldeoleiros/vuelingconnect",
  },
];
