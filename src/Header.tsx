import { useState, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi'; // Iconos para abrir/cerrar

type HeaderProps = {
  isDarkMode: boolean;
};

const Header = ({ isDarkMode }: HeaderProps) => {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false); // Cerrar menú tras navegar
  };

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const fullHeight = document.documentElement.scrollHeight;
    const currentPosition = window.scrollY;
    const scrollPercentage = (currentPosition / (fullHeight - windowHeight)) * 100;
    setScrollPercentage(scrollPercentage);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const opacity = Math.min(1, scrollPercentage / 100);
  const navBackgroundColor = isDarkMode
    ? `rgba(39, 39, 42, ${opacity * 4})`
    : `rgba(255, 255, 255, ${opacity * 4})`;

  return (
    <>
      {/* Botón menú en móviles */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="fixed top-4 left-4 z-[51] md:hidden text-xl p-2 bg-[var(--background)] rounded-lg shadow"
        aria-label="Abrir menú"
      >
        {menuOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Menú lateral móvil */}
      <div
        className={`fixed top-0 left-0 h-full w-2/3 max-w-xs z-[50] bg-[var(--background)] transform transition-transform duration-300 ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        } md:hidden shadow-xl`}
      >
        <ul className="flex flex-col p-6 mt-12 gap-4 text-[var(--muted-foreground)]">
          <li onClick={() => scrollToSection("about")} className="cursor-pointer hover:text-[var(--accent)]">Perfil</li>
          <li onClick={() => scrollToSection("experience")} className="cursor-pointer hover:text-[var(--accent)]">Experiencia</li>
          <li onClick={() => scrollToSection("projects")} className="cursor-pointer hover:text-[var(--accent)]">Proyectos</li>
          <li onClick={() => scrollToSection("certifications")} className="cursor-pointer hover:text-[var(--accent)]">Certificaciones</li>
          <li onClick={() => scrollToSection("contact")} className="cursor-pointer hover:text-[var(--accent)]">Contacto</li>
        </ul>
      </div>

      {/* Menú normal (escritorio) */}
      <nav
        className={`hidden md:flex fixed left-1/2 justify-center transform -translate-x-1/2 bg-opacity-0 rounded-xl py-2 px-2 z-[50] text-base`}
        style={{ backgroundColor: navBackgroundColor }}
      >
        <ul className="flex flex-wrap [&>li]:px-2 justify-center text-[var(--muted-foreground)] [&>li]:cursor-pointer [&>li]:hover:text-[var(--accent)]">
          <li onClick={() => scrollToSection("about")}>Perfil</li>
          <li onClick={() => scrollToSection("experience")}>Experiencia</li>
          <li onClick={() => scrollToSection("projects")}>Proyectos</li>
          <li onClick={() => scrollToSection("certifications")}>Certificaciones</li>
          <li onClick={() => scrollToSection("contact")}>Contacto</li>
        </ul>
      </nav>
    </>
  );
};

export default Header;
