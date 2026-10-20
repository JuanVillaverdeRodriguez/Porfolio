/// <reference types="vite/client" />

declare module "figlet/lib/figlet.js" {
  import figlet from "figlet";
  export default figlet;
}
declare module "figlet/importable-fonts/*" {
  const font: string;
  export default font;
}
