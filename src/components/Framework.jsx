import { OrbitingCircles } from "./OrbitingCircles";

export function Frameworks() {
  const skills = [
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
  ];
  return (
    <div className="relative flex h-[15rem] w-full flex-col items-center justify-center">
      <OrbitingCircles iconSize={40}>
        {skills.map((skill, index) => (
          <Icon key={index} src={`${skill}`} />
        ))}
      </OrbitingCircles>
      <OrbitingCircles iconSize={25} radius={100} reverse speed={2}>
        {skills.reverse().map((skill, index) => (
          <Icon key={index} src={`${skill}`} />
        ))}
      </OrbitingCircles>
    </div>
  );
}

const Icon = ({ src }) => (
  <img src={src} className="duration-200 rounded-sm hover:scale-110" />
);
