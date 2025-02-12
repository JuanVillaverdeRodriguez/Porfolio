
import AboutMe from './AboutMe.tsx'
import Experience from './Experience.tsx'
import Projects from './Projects.tsx'


function App() {
  return (
    <>
      <div className="relative overflow-x-clip h-full w-full bg-zinc-900">
        <div className="absolute z-[0] bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(192,132,252,.15),rgba(255,255,255,0))]"></div>
        <div className="absolute z-[0] bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(192,132,252,.15),rgba(255,255,255,0))]"></div>
        <div className="px-32 py-24 ">
          <div className="px-16 py-8 m-16 pb-8 z-[10]">
            <AboutMe/>
            <Experience/>
            <Projects/>
        </div>
      </div>
      </div>
    </>
  );
}

export default App;
