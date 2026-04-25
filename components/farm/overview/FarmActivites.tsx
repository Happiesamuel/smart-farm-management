import { FaPersonDigging, FaPoop } from "react-icons/fa6";
import { GiPlantRoots } from "react-icons/gi";
import { MdPestControl } from "react-icons/md";

export default function FarmActivites() {
  const activies = [
    {
      task: "Irrigation completed in Field A",
      title: "2 hours ago",
      id: 1,
      svg: <FaPersonDigging />,
    },
    {
      task: "Fertilizer applied in Field B",
      title: "1 day ago",
      id: 2,
      svg: <FaPoop />,
    },
    {
      task: "Maize planted in Field C",
      title: "2 days ago",
      id: 3,
      svg: <GiPlantRoots />,
    },
    {
      task: "Pest control in Field D",
      title: "3 days ago",
      id: 4,
      svg: <MdPestControl />,
    },
  ];
  return (
    <div className="w-full  bg-white flex-1 rounded-xl border border-border/80 hover:shadow-sm transition flex flex-col  shrink-0">
      FarmActivites
    </div>
  );
}
