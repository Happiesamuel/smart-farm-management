import { NoResult } from "../loader/GeneralLoader";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

export default function DashboardRecentTasks({
  tasks,
}: {
  tasks: {
    title: string;
    farm: string;
    field: string;
    date: string;
    priority: string;
    id: string;
    status: string;
    isOverdue: boolean;
    isToday: boolean;
  }[];
}) {
  const priorityColor: Record<string, string> = {
    High: "bg-red-100 text-red-500",
    Medium: "bg-orange-100 text-orange-500",
    Low: "bg-green-100 text-green-500",
  };

  return (
    <div className="w-full md:col-span-2 xl:col-span-1 p-4 bg-white flex-1 rounded-xl border border-border/80 hover:shadow-sm transition flex flex-col h-[320px] shrink-0">
      <div className="flex items-center justify-between pb-4">
        <h6 className="text-base text-dark">Recent Tasks</h6>
        <p className="text-sm text-primary-green">View All</p>
      </div>
       {!tasks.length ? <div className="h-full"><NoResult>No task record found!</NoResult></div>:
      <div className="flex overflow-scroll no-scroll  flex-col gap-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="grid grid-cols-1 md:grid-cols-[1fr_0.5fr] gap-2"
          >
            <div className="flex items-center gap-2">
              <Checkbox
                id="terms-checkbox-2"
                name="terms-checkbox-2"
                checked={task.status === "done"}
              />
              <div className="space-y-1">
                <Label
                  htmlFor="terms-checkbox-2"
                  className="text-dark max-w-[150px] truncate text-sm"
                >
                  {task.title}
                </Label>
                <div className="flex items-center gap-2 text-zinc-500 text-xs">
                  <p>{task.farm}</p>
                  <p className={`size-1 bg-zinc-500 rounded-full `} />
                  <p>{task.field}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-end items-center gap-4 md:justify-between">
              <p
                className={`${priorityColor[task.priority]} w-fit text-xs rounded py-0.5 p-1`}
              >
                {task.priority}
              </p>
              <p
                className={`text-xs ${
                  task.isOverdue
                    ? "text-red-500 font-medium"
                    : task.isToday
                      ? "text-orange-500"
                      : "text-zinc-500"
                }`}
              >
                {task.date}
              </p>
            </div>
          </div>
        ))}
      </div>
}
    </div>
  );
}
