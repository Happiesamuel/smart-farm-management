import Link from "next/link";
import { BiTask } from "react-icons/bi";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { NoResult } from "@/components/loader/GeneralLoader";
import { useParams } from "next/navigation";
const priorityStyles: Record<string, string> = {
  Low: "bg-green-100 text-green-700",
  Medium: "bg-yellow-100 text-yellow-700",
  High: "bg-red-100 text-red-600",
};

const statusStyles: Record<string, string> = {
  Pending: "bg-yellow-100 text-yellow-700",
  In_progress: "bg-blue-100 text-blue-700",
  Completed: "bg-green-100 text-green-700",
  Cancelled: "bg-gray-100 text-gray-600",
  Delayed: "bg-orange-100 text-orange-700",
};
export default function TaskList({
  tasks,
}: {
  filter: string;
  tasks: {
    title: string;
    field: string;
    farm: string;
    status: string;
    date: string;
    priority: string;
    id: string;
    time: string;
  }[];
}) {
  const { workspaceId } = useParams();
  return (
    <div className="mt-4">
      {!tasks.length ? (
        <div className="h-[50vh]">
          <NoResult>No task found!</NoResult>
        </div>
      ) : (
        <>
          <div className="space-y-2">
            {tasks.map((l) => (
              <Link
                href={`/worker/${workspaceId}/tasks/${l.id}`}
                key={l.id}
                className="grid grid-cols-1 gap-2 md:grid-cols-[1fr_20rem] lg:grid-cols-[1fr_30rem] px-2.5 py-3 rounded-xl border border-border/80 shadow-xs hover:shadow-sm transition bg-white"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex items-center justify-center size-10 text-lg rounded-md ${statusStyles[l.status]}`}
                  >
                    <BiTask />
                  </div>
                  <div className="space-y-1">
                    <p className="text-dark/90 text-base font-medium">
                      {l.title}
                    </p>
                    <div className="text-zinc-500  text-sm flex items-center gap-1.5 font-medium">
                      <span>{l.field}</span>
                      <div className="size-1 rounded-full bg-zinc-500" />
                      <span>{l.farm}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pr-2">
                  <p
                    className={`${priorityStyles[l.priority]} text-xs rounded-sm py-1 px-3`}
                  >
                    {l.priority}
                  </p>
                  <p
                    className={`${statusStyles[l.status]}  text-xs rounded-sm py-1 px-3`}
                  >
                    {l.status}
                  </p>
                  <div className="text-zinc-500 text-end space-y-1 text-xs">
                    <p>{l.date}</p>
                    <p>{l.time}</p>
                  </div>
                  <MdOutlineKeyboardArrowRight className="hidden md:block text-zinc-500 text-xl" />
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
