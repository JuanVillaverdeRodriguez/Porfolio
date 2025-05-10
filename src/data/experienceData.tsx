// data/experienceData.tsx
import { ReactNode } from "react";
import T from "../i18n/T";

interface ExperienceItem {
  title: () => ReactNode;
  date: () => ReactNode;
  description: () => ReactNode;
  link: null | {
    url: string;
    label: () => ReactNode;
    icon: string;
  };
}

export const experienceData: ExperienceItem[] = [
  {
    title:() => (
      <>
        <T i18nKey="experience_1.title" />
      </>
    ),
    date: () => (
      <>
        <T i18nKey="experience_1.date" />
      </>
    ),
    description: () => (
      <>
        <T i18nKey="experience_1.description" />
      </>
    ),
    link: {
      url: "https://www.tusclasesparticulares.com/profesores/juan-villaverde-rodriguez.htm",
      label: () => (
      <>
        <T i18nKey="experience_1.TCP_label" />
      </>
    ),
      icon: "assets/TCP_Logo_Short.svg",
    },
  },
  {
    title: () => (
      <>
        <T i18nKey="experience_2.title" />
      </>
    ),
    date: () => (
      <>
        <T i18nKey="experience_2.date" />
      </>
    ),
    description: () => (
      <>
        <T i18nKey="experience_2.description" />
      </>
    ),
    link: null,
  },
];
