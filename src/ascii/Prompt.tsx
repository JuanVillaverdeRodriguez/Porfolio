import Typewriter from "./Typewriter";

// Línea de shell: usuario@máquina:ruta$ comando (el comando se teclea).
export default function Prompt({ cmd, path = "~", delay = 0 }: { cmd: string; path?: string; delay?: number }) {
  return (
    <div className="prompt">
      <span className="p-user">juan</span>
      <span className="p-at">@</span>
      <span className="p-host">udc</span>
      <span className="p-at">:</span>
      <span className="p-path">{path}</span>
      <span className="p-at">$ </span>
      <Typewriter as="span" text={cmd} speed={45} delay={delay} className="p-cmd" />
    </div>
  );
}

// Comentario de narrador entre capítulos.
export function Narrator({ i18nKey }: { i18nKey: string }) {
  return (
    <div className="narrator">
      <Typewriter i18nKey={i18nKey} speed={32} />
    </div>
  );
}
