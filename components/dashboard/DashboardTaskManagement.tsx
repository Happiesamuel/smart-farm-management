import { MdArrowForwardIos } from "react-icons/md";

const tasks = [
  {
    id: 1,
    name: "Plant maize on Field A",
    assignee: "Farm Worker A",
    due: "Apr 23",
    status: "inprogress",
    priority: "high",
    type: "General task",
    progress: 65,
  },
  {
    id: 2,
    name: "Apply fertilizer to rice crops",
    assignee: "Farm Manager",
    due: "Apr 21",
    status: "blocked",
    priority: "critical",
    type: "General task",
    progress: 30,
  },
  {
    id: 3,
    name: "Irrigate cassava field",
    assignee: "Farm Worker B",
    due: "Apr 28",
    status: "todo",
    priority: "medium",
    type: "General task",
    progress: 0,
  },
  {
    id: 4,
    name: "Harvest mature maize crops",
    assignee: "Harvest Team",
    due: "Apr 22",
    status: "review",
    priority: "critical",
    type: "General task",
    progress: 90,
  },
  {
    id: 5,
    name: "Inspect crops for pests and diseases",
    assignee: "Field Supervisor",
    due: "Apr 15",
    status: "done",
    priority: "low",
    type: "General task",
    progress: 100,
  },
];
const statusConfig: Record<string, { label: string; className: string }> = {
  todo: {
    label: "To do",
    className: "bg-zinc-100 text-zinc-600 border-zinc-200",
  },
  inprogress: {
    label: "In progress",
    className: "bg-blue-50 text-blue-700 border-blue-200",
  },
  review: {
    label: "In review",
    className: "bg-amber-50 text-amber-700 border-amber-200",
  },
  done: {
    label: "Done",
    className: "bg-green-50 text-green-700 border-green-200",
  },
  blocked: {
    label: "Blocked",
    className: "bg-red-50 text-red-600 border-red-200",
  },
};

const priorityDot: Record<string, string> = {
  critical: "bg-red-500",
  high: "bg-amber-400",
  medium: "bg-blue-400",
  low: "bg-green-400",
};

const progressColor: Record<string, string> = {
  done: "bg-green-400",
  blocked: "bg-red-400",
  inprogress: "bg-blue-400",
  review: "bg-amber-400",
  todo: "bg-zinc-300",
};

export default function DashboardTaskManagement() {
  return (
    <div className="flex-1 bg-white rounded-2xl px-2 py-2 border border-border/70 shadow-sm flex flex-col h-full overflow-hidden">
      {/* HEADER */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-white">
        <div>
          <h6 className="text-sm font-semibold text-dark">Task Management</h6>
          {/* <p className="text-xs text-zinc-400">{tasks.length} active tasks</p> */}
        </div>

        <div className="flex items-center gap-2">
          <button className="bg-primary-green cursor-pointer hover:bg-primary-green/90 text-white px-3 py-1.5 text-xs rounded-md transition shadow-sm">
            + New Task
          </button>

          <button className="flex items-center cursor-pointer gap-1 text-xs text-zinc-600 hover:text-dark border border-border px-3 py-1.5 rounded-md transition">
            View All
            <MdArrowForwardIos className="text-[10px]" />
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="flex-1 no-scroll overflow-y-auto">
        <table className="w-full text-sm">
          {/* HEADER */}
          <thead className="sticky top-0 bg-zinc-50/80 backdrop-blur">
            <tr className="border-b border-border">
              <th className="text-left px-4 py-4 text-[10px] font-semibold text-dark uppercase tracking-wide">
                Task
              </th>
              <th className="text-left px-3 py-4 text-[10px] font-semibold text-dark uppercase tracking-wide">
                Assignee
              </th>
              <th className="text-left px-3 py-4 text-[10px] font-semibold text-dark uppercase tracking-wide">
                Due
              </th>
              <th className="text-left px-3 py-4 text-[10px] font-semibold text-dark uppercase tracking-wide">
                Status
              </th>
              <th className="text-left px-3 py-4 text-[10px] font-semibold text-dark uppercase tracking-wide">
                Progress
              </th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {tasks.map((task, i) => {
              const status = statusConfig[task.status];

              return (
                <tr
                  key={task.id}
                  className={`border-b border-border/70 hover:bg-zinc-50/60 transition ${i % 2 === 0 && "bg-border/10"}`}
                >
                  {/* TASK */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2 h-2 rounded-full ${priorityDot[task.priority]}`}
                      />
                      <div className="flex flex-col">
                        <span className="text-[13px] font-medium text-dark truncate max-w-[140px] block">
                          {task.name}
                        </span>
                        <span className="text-[11px] text-zinc-400">
                          {task.type || "General task"}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* ASSIGNEE */}
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-[10px] font-semibold">
                        {task.assignee
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <span className="text-[12px] text-zinc-600">
                        {task.assignee}
                      </span>
                    </div>
                  </td>

                  {/* DUE DATE */}
                  <td className="px-3 py-3">
                    <span className="text-[12px] text-zinc-500">
                      {task.due}
                    </span>
                  </td>

                  {/* STATUS */}
                  <td className="px-3 py-3">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${status.className}`}
                    >
                      {status.label}
                    </span>
                  </td>

                  {/* PROGRESS */}
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${progressColor[task.status]}`}
                          style={{ width: `${task.progress}%` }}
                        />
                      </div>
                      <span className="text-[11px] text-zinc-400 w-8 text-right">
                        {task.progress}%
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
