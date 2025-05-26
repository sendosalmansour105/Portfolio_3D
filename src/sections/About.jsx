import { useRef } from "react";


import { Frameworks } from "../components/Framework";
import CopyEmailButton from "../components/CopyEmailButton";

// import Card from "../components/Card";
// import { Globe } from "../components/globe";
// import CopyEmailButton from "../components/CopyEmailButton";
// import { Frameworks } from "../components/FrameWorks";


const About = () => {

      const grid2Container = useRef();
      const images=[
        "logo/react.svg",
        "logo/bootstrap.png",
        "logo/css3.svg",
        "logo/git.svg",
        "logo/github.svg",
        "logo/html5.svg",
        "logo/javascript.svg",
        "logo/redux.png",
        "logo/tailwindcss.svg",
        "logo/threejs.svg",
        "logo/visualstudiocode.svg",
        "logo/vitejs.svg",
        "logo/vuejs.png",
        "logo/vuex.png",
      ]

  return (
      <section className="c-space section-spacing" id="about">
      <h2 className="text-heading">About Me</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[18rem] mt-12">
        {/* Grid 1 */}
        <div className="flex items-end grid-default-color grid-1">
          <img
            src="images/coding-pov.png"
            className="absolute scale-[1.75] -right-[5rem] -top-[1rem] md:scale-[3] md:left-50 md:inset-y-10 lg:scale-[2.5]"
          />
          <div className="z-10">
            <p className="headtext">Hi, I'm Sendos Almansour</p>
            <p className="subtext">
              Over the last 2 years, I developed my frontend dev
              skills to deliver dynamic and software and web applications.
            </p>
          </div>
          <div className="absolute inset-x-0 pointer-evets-none -bottom-4 h-1/2 sm:h-1/3 bg-gradient-to-t from-indigo" />
        </div>
       
      
        {/* Grid 2 */}
       <div className="grid-default-color grid-2">
          <div className="z-10 w-[50%]">
            <p className="headText">Teck Stack</p>
            <p className="subtext ">
              I specialize in a variety of languages, frameworks, and tools taht
              allow me to build robust and scalable web applications
            </p>
          </div>
          <div className="absolute inset-y-0 md:inset-y-9 w-full h-full start-[50%] md:scale-125">
            <Frameworks/>
          </div>
        </div>
         {/* Grid 3 */}
            <div className="grid-default-color grid-3">
           <div className="flex flex-col items-center justify-center gap-4 size-full">
            <p className="text-center headtext">
              Do you want to start a project together?
            </p>
           <CopyEmailButton/>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About