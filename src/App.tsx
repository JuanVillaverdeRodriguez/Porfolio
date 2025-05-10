import { useState, useEffect } from 'react'
import { FiMoon, FiSun } from 'react-icons/fi'

import AboutMe from './AboutMe.tsx'
import Experience from './Experience.tsx'
import Projects from './Projects.tsx'
import Header from './Header.tsx'
import Contact from './Contact.tsx';
import Footer from './Footer.tsx';
import Certifications from './Certifications.tsx';
import i18n from 'i18next';

function App() {
  const [isDark, setIsDark] = useState(() => {
    // Comprobamos si hay un valor guardado en localStorage
    const storedTheme = localStorage.getItem('theme')
    return storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)
  })

  // Actualiza la clase del <html> y guarda en localStorage
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])

  const [rippleStyle, setRippleStyle] = useState<React.CSSProperties>({});
  const [showRipple, setShowRipple] = useState(false);

  return (
    <>
      <div className={`relative overflow-x-clip h-full w-full ${isDark ? 'bg-zinc-900' : 'bg-white'}`}>
      {showRipple && (
        <div
          className="fixed z-40 pointer-events-none rounded-full opacity-30 animate-ripple bg-[var(--primary)]"
          style={{
            width: 300,
            height: 300,
            position: 'fixed',
            ...rippleStyle,
          }}
        />
      )}
        <div className="absolute z-[0] bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(192,132,252,.15),rgba(255,255,255,0))]"></div>
        <div className="absolute z-[0] bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(192,132,252,.15),rgba(255,255,255,0))]"></div>

        <div className="fixed top-4 right-4 z-50 flex gap-2 items-center">
          {/* Botón cambio de tema */}
          <button
            className="px-4  py-2 rounded-full bg-[var(--button)] text-[var(--muted-foreground)] hover:brightness-110 transition-colors duration-1000 flex items-center space-x-2 shadow-sm hover:shadow-purple-300/20 cursor-pointer"
            onClick={(e) => {
              const x = e.clientX;
              const y = e.clientY;

              setRippleStyle({ left: x - 150, top: y - 150 });
              setShowRipple(true);
              setTimeout(() => setShowRipple(false), 600);

              document.documentElement.classList.add('theme-transition');
              setTimeout(() => {
                setIsDark(prev => !prev);
                setTimeout(() => {
                  document.documentElement.classList.remove('theme-transition');
                }, 1000);
              }, 20);
            }}
            onMouseDown={e => e.currentTarget.classList.add("scale-95")}
            onMouseUp={e => e.currentTarget.classList.remove("scale-95")}
          >
            <span className="transition-transform duration-300 ease-in-out transform hover:rotate-12">
              {isDark ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
            </span>
          </button>

          {/* Selector de idioma */}
          <select
            className="px-4 py-2 rounded-full bg-[var(--button)] text-[var(--muted-foreground)]  hover:brightness-110 transition-colors duration-1000 shadow-sm hover:shadow-purple-300/20 cursor-pointer"
            value={i18n.language}
            onChange={(e) => {
              const newLang = e.target.value;
              i18n.changeLanguage(newLang);
              localStorage.setItem('language', newLang);
              window.location.reload(); 
            }}
          >
            <option value="es">Español</option>
            <option value="en">English</option>
          </select>
        </div>


        <div className={`flex flex-col space-y-24 px-4 py-4 scroll-smooth transition-colors duration-500 ${isDark ? 'bg-zinc-900' : 'bg-gray-100'}`} >
          <Header isDarkMode={isDark}  />
          <AboutMe />
          <Experience />
          <Projects />
          <Certifications />
          <Contact />
        </div>
        <Footer />
      </div>
    </>
  )
}

export default App
