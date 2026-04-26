import { FaPersonDigging, FaPoop } from "react-icons/fa6";
import { GiPlantRoots } from "react-icons/gi";
import { MdPestControl } from "react-icons/md";

export default function FarmActivites() {
  const activies = [
    {
      task: "Irrigation completed in Field A",
      time: "2 hours ago",
      id: 1,
      svg: <FaPersonDigging />,
    },
    {
      task: "Fertilizer applied in Field B",
      time: "1 day ago",
      id: 2,
      svg: <FaPoop />,
    },
    {
      task: "Maize planted in Field C",
      time: "2 days ago",
      id: 3,
      svg: <GiPlantRoots />,
    },
    {
      task: "Pest control in Field D",
      time: "3 days ago",
      id: 4,
      svg: <MdPestControl />,
    },
  ];
  return (
    <div className="w-full p-4 h-[300px]  bg-white flex-1 rounded-xl border border-border/80 hover:shadow-sm transition flex flex-col  shrink-0">
      <div className="flex pb-4 items-center justify-between">
        <p className="text-dark text-base font-semibold">Recent Activites</p>
        <p className="text-sm text-primary-green font-normal">View All</p>
      </div>

      <div className="space-y-4">
        {activies.map((act) => (
          <div key={act.id} className="flex items-center gap-3.5">
            <div className="flex items-center justify-center size-7 rounded bg-green-100/80 border border-green-200 text-primary-green ">
              {act.svg}
            </div>
            <div className="space-y-1">
              <p className="text-dark/95 text-sm">{act.task}</p>
              <p className="text-zinc-500 text-xs">{act.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
