export interface ProjectItem {
  key: string;
  slug: string;
  image: string;
  stack: string[];
  link: string;
  crop?: [number, number, number, number];
}

export const projectsData: ProjectItem[] = [
  {
    key: "projects_1",
    slug: "ocnet",
    image: "assets/Ocnet.png",
    crop: [0.52, 0.06, 0.47, 0.5],
    stack: ["C++", "JUCE"],
    link: "https://github.com/JuanVillaverdeRodriguez/ocnet",
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
