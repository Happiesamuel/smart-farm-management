import { NoResult } from "@/components/loader/GeneralLoader";
import { groupTasks, normalizeTasks } from "@/lib/workerFn";
import Link from "next/link";
import { useParams } from "next/navigation";
import { BiTask } from "react-icons/bi";
import { CiBellOn } from "react-icons/ci";
const priorityStyles: Record<string, string> = {
  Low: "bg-green-100 text-green-700",
  Medium: "bg-yellow-100 text-yellow-700",
  High: "bg-red-100 text-red-600",
};

const statusStyles: Record<string, string> = {
  Pending: "bg-yellow-100 text-yellow-700",
  "In Progress": "bg-blue-100 text-blue-700",
  Completed: "bg-green-100 text-green-700",
  Cancelled: "bg-gray-100 text-gray-600",
  Delayed: "bg-orange-100 text-orange-700",
};

export default function DashboardTodaysTask({
  tasks,
  farms,
  fields,
  id,
}: {
  id: string;
  tasks: { [key: string]: string }[];
  farms: { [key: string]: string }[];
  fields: { [key: string]: string }[];
}) {
  const { workspaceId } = useParams();
  const newTask = tasks?.filter((x) => x.assignTo === id);

  const normalizedTasks = normalizeTasks(
    newTask ?? [],
    fields ?? [],
    farms ?? [],
  );
  const grouped = groupTasks(normalizedTasks);
  return (
    <div className="flex flex-col  gap-4 border border-border  rounded-md  p-4 shadow-xs bg-white">
      <div className="flex items-center justify-between gap-2 border-b border-border py-2 pb-4">
        <h3 className="text-dark  text-base">My Tasks</h3>
        <Link
          className="text-[#1058d6] text-sm"
          href={`/worker/${workspaceId}/tasks`}
        >
          View all tasks
        </Link>
      </div>

      <div className="space-y-2 h-[300px] lg:h-[460px] xl:h-[420px]  overflow-scroll no-scroll">
        {!newTask.length ? (
          <div className="h-full">
            {" "}
            <NoResult>No task record!</NoResult>
          </div>
        ) : (
          <>
            {RenderSection("Today", grouped.today)}
            {RenderSection("Upcoming", grouped.upcoming)}
            {RenderSection("Overdue", grouped.overdue)}
            {RenderSection("Completed", grouped.completed)}
          </>
        )}
      </div>

      <div className="text-sm flex items-center gap-2 text-zinc-500 py-1 font-normal">
        <CiBellOn className="text-xl" />
        <p>Don&apos;t forget to update task status after completion</p>
      </div>
    </div>
  );
}

const RenderSection = (title: string, tasks: { [key: string]: string }[]) => {
  const { workspaceId } = useParams();
  if (!tasks.length) return null;

  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold text-zinc-500 uppercase">{title}</p>

      {tasks.map((l) => (
        <Link
          href={`/worker/${workspaceId}/tasks/${l.id}`}
          key={l.id}
          className="grid grid-cols-1 gap-2 border-b border-border px-2.5 py-3 md:grid-cols-[1fr_8rem]"
        >
          <div className="flex items-center gap-3">
            <div
              className={`flex items-center justify-center size-10 text-lg rounded-md ${statusStyles[l.status]}`}
            >
              <BiTask />
            </div>

            <div className="space-y-1">
              <p className="text-dark/90 text-base font-medium">{l.title}</p>

              <div className="text-zinc-500 text-sm flex items-center gap-1.5">
                <span>{l.farm}</span>
                <div className="size-1 bg-zinc-500 rounded-full" />
                <span>{l.field}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p
              className={`${priorityStyles[l.priority]} text-xs rounded-sm py-1 px-3`}
            >
              {l.priority}
            </p>

            <p className="text-sm text-zinc-500">{l.time}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};
