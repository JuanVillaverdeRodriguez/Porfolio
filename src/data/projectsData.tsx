import { ReactNode } from "react";
import T from "../i18n/T";

interface TechItem {
  name: string;
  icon: string;
}

interface ProjectItem {
  title: () => ReactNode;
  description: () => ReactNode;
  image: string;
  stack: TechItem[];
  link: string;
}

export const projectsData: ProjectItem[] = [
  {
    title: () => (
      <>
        <T i18nKey="projects_1.title" />
      </>
    ),
    description: () => (
      <>
        <T i18nKey="projects_1.description" />
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
    title: () => (
      <>
        <T i18nKey="projects_2.title" />
      </>
    ),
    description: () => (
      <>
        <T i18nKey="projects_2.description" />
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
    title: () => (
      <>
        <T i18nKey="projects_3.title" />
      </>
    ),
    description: () => (
      <>
        <T i18nKey="projects_3.description" />
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
