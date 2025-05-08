// data/experienceData.tsx
import { ReactNode } from "react";

interface ExperienceItem {
  title: string;
  date: string;
  description: () => ReactNode;
  link: null | {
    url: string;
    label: string;
    icon: string;
  };
}

export const experienceData: ExperienceItem[] = [
  {
    title: "Profesor particular",
    date: "Noviembre 2024 - Febrero 2025",
    description: () => (
      <>
        Proporcioné <mark className="text-[var(--accent)] bg-transparent font-bold">clases de programación</mark> en C de forma autónoma y telemática a través de la plataforma de{" "}
        <mark className="text-[var(--accent)] bg-transparent font-bold">Tus Clases Particulares</mark>. Las clases estaban orientadas a ayudar a estudiantes a comprender las bases y superar las asignaturas de programación.
      </>
    ),
    link: {
      url: "https://www.tusclasesparticulares.com/profesores/juan-villaverde-rodriguez.htm",
      label: "Mi perfil",
      icon: "assets/TCP_Logo_Short.svg",
    },
  },
  {
    title: "Proyectos personales",
    date: "Constantemente...",
    description: () => (
      <>
        He realizado diversos <mark className="text-[var(--accent)] bg-transparent font-bold">proyectos por cuenta propia</mark> que me han permitido expandir mis conocimientos y mejorar mis habilidades de programación.
      </>
    ),
    link: null,
  },
];
