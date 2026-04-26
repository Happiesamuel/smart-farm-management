import { GiPlantRoots } from "react-icons/gi";

export default function FarmUpcomingHarvest() {
  const activies = [
    {
      name: "Maize",
      field: "Field A",
      id: 1,
      time: "In 5 days",
      date: "May 28, 2026",
    },
    {
      name: "Rice",
      field: "Field B",
      id: 2,
      time: "In 12 days",
      date: "June 4, 2026",
    },
    {
      name: "Tomatoes",
      field: "Field C",
      id: 3,
      time: "In 18 days",
      date: "June 10, 2026",
    },
  ];
  return (
    <div className="w-full p-4 h-[300px] bg-white flex-1 rounded-xl border border-border/80 hover:shadow-sm transition flex flex-col  shrink-0">
      <div className="flex pb-4 items-center justify-between">
        <p className="text-dark text-base font-semibold">Upcoming Harvest</p>
        <p className="text-sm text-primary-green font-normal">View All</p>
      </div>

      <div className="space-y-4">
        {activies.map((act) => (
          <div key={act.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="flex items-center justify-center size-7 rounded bg-green-100/80 border border-green-200 text-primary-green ">
                <GiPlantRoots />
              </div>
              <div className="space-y-1">
                <p className="text-dark/95 text-sm">{act.name}</p>
                <p className="text-zinc-500 text-xs">{act.field}</p>
              </div>
            </div>

            <div className="space-y-1 text-end">
              <p className="text-primary-green font-semibold text-sm">
                {act.time}
              </p>
              <p className="text-zinc-500 text-xs">{act.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
