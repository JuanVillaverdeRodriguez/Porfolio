// Ordenado como un git log: lo más reciente arriba.
export interface ExperienceItem {
  key: string;
  hash: string;
  head?: boolean;
  link: null | { url: string; labelKey: string; site: string };
}

export const experienceData: ExperienceItem[] = [
  { key: "experience_2", hash: "f3a91c7", head: true, link: null },
  {
    key: "experience_1",
    hash: "8e0b4d1",
    link: {
      url: "https://www.tusclasesparticulares.com/profesores/juan-villaverde-rodriguez.htm",
      labelKey: "experience_1.TCP_label",
      site: "tusclasesparticulares.com",
    },
  },
];
