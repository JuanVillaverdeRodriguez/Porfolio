import  { useState, useEffect } from 'react';

type HeaderProps = {
  isDarkMode: boolean;
};

const Header = ({ isDarkMode }: HeaderProps) => {
    const scrollToSection = (id: string) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    const [scrollPercentage, setScrollPercentage] = useState(0);

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;
      const currentPosition = window.scrollY;
  
      const scrollPercentage = (currentPosition / (fullHeight - windowHeight)) * 100;
  
      setScrollPercentage(scrollPercentage);
    };

  
    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

    const opacity = Math.min(1, scrollPercentage / 100); // Aumenta de 0 a 1
    const navBackgroundColor = isDarkMode ? `rgba(39, 39, 42, ${opacity * 4})` : `rgba(255, 255, 255, ${opacity * 4})`;

  
    return (
      <nav className={`flex fixed left-1/2 md:w-fit  justify-center transform -translate-x-1/2 bg-opacity-0 w-fit rounded-xl py-2 px-2 z-[50] text-base`} style={{
        backgroundColor: navBackgroundColor,
      }}>
        <ul className="flex flex-wrap [&>li]:px-2 justify-center text-[var(--muted-foreground)] [&>li]:cursor-pointer [&>li]:hover:text-[var(--accent)] ">
          <li onClick={() => scrollToSection("about")}><a href="#about"></a>Perfil</li>
          <li onClick={() => scrollToSection("experience")}><a href="#experience"></a>Experiencia</li>
          <li onClick={() => scrollToSection("projects")}><a href="#projects"></a>Proyectos</li>
          <li onClick={() => scrollToSection("certifications")}><a href="#certifications"></a>Certificaciones</li>
          <li onClick={() => scrollToSection("contact")}><a href="#contact"></a>Contacto</li>
        </ul>
      </nav>
    );
  };
  
  export default Header;