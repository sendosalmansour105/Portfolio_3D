
import { Timeline } from "../components/Tlimeline";
import { experiences } from "../MyInfo";
const Experiences = () => {
  return (
    <div className="w-full" id="work">
   <Timeline data={experiences}/>
    </div>
  );
};

export default Experiences;
