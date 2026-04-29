import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

export default function DashboardRecentTasks() {
  const tasks = [
    {
      title: "Apply fertilizer to Maize",
      farm: "Green Valley Farm",
      field: "Field A",
      date: "May 29",
      priority: "High",
      id: 1,
      status: "done",
    },
    {
      title: "Irrigate Field B",
      farm: "Green Valley Farm",
      field: "Field B",
      date: "May 30",
      priority: "Medium",
      id: 2,
      status: "none",
    },
    {
      title: "Weed control in Field C",
      farm: "Sunrise Farm",
      field: "Field C",
      date: "May 30",
      priority: "Medium",
      id: 3,
      status: "done",
    },
    {
      title: "Pest control inspection",
      farm: "Green Valley Farm",
      field: "Field D",
      date: "Jun 2 ",
      priority: "Low",
      id: 4,
      status: "none",
    },
    {
      title: "Prepare for harvest (Rice)",
      farm: "Sunrise Farm",
      field: "Field A ",
      date: "Jun 5 ",
      priority: "Medium",
      id: 5,
      status: "none",
    },
  ];
  const priorityColor: Record<string, string> = {
    High: "bg-red-100 text-red-500",
    Medium: "bg-orange-100 text-orange-500",
    Low: "bg-green-100 text-green-500",
  };

  return (
    <div className="w-full p-4 bg-white flex-1 rounded-xl border border-border/80 hover:shadow-sm transition flex flex-col h-[220px shrink-0">
      <div className="flex items-center justify-between pb-4">
        <h6 className="text-base text-dark">Recent Tasks</h6>
        <p className="text-sm text-primary-green">View All</p>
      </div>
      <div className="flex  flex-col gap-3">
        {tasks.map((task) => (
          <div key={task.id} className="grid grid-cols-[1fr_0.5fr] gap-2">
            <div className="flex items-center gap-2">
              <Checkbox
                id="terms-checkbox-2"
                name="terms-checkbox-2"
                checked={task.status === "done"}
              />
              <div className="space-y-1">
                <Label htmlFor="terms-checkbox-2" className="text-dark text-sm">
                  {task.title}
                </Label>
                <div className="flex items-center gap-2 text-zinc-500 text-xs">
                  <p>{task.farm}</p>
                  <p className={`size-1 bg-zinc-500 rounded-full `} />
                  <p>{task.field}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <p
                className={`${priorityColor[task.priority]} w-fit text-xs rounded py-0.5 p-1`}
              >
                {task.priority}
              </p>
              <p className="text-zinc-500 text-xs">{task.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
