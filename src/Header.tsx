import  { useState, useEffect } from 'react';

const Header = () => {
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

  
    return (
      <nav className={`fixed left-1/2 transform -translate-x-1/2 bg-zinc-800 bg-opacity-0 w-fit rounded-xl py-2 px-2 z-[50] `} style={{
        backgroundColor: `rgba(39, 39, 42, ${opacity * 4})`,
      }}>
        <ul className="flex [&>li]:px-2 justify-center text-gray-300 [&>li]:cursor-pointer [&>li]:hover:text-purple-300">
          <li onClick={() => scrollToSection("about")}><a href="#about"></a>Sobre mí</li>
          <li onClick={() => scrollToSection("experience")}><a href="#experience"></a>Experiencia</li>
          <li onClick={() => scrollToSection("projects")}><a href="#projects"></a>Proyectos</li>
        </ul>
      </nav>
    );
  };
  
  export default Header;