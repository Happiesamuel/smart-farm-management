import { NoResult } from "@/components/loader/GeneralLoader";
import { buildTaskActivities } from "@/lib/stat";
import { useMemo } from "react";
import { FaUserClock } from "react-icons/fa6";

export default function TaskActivity({
  task,
  users,
}: {
  task: { [key: string]: string };
  users: { [key: string]: string }[];
}) {
  const acts = useMemo(() => {
    return buildTaskActivities(task, users);
  }, [task, users]);
  return (
    <div className="flex flex-col  gap-4 border border-border  rounded-md  p-4 shadow-xs bg-white">
      <div className="flex items-center gap-2 pb-1">
        <FaUserClock className="text-lg text-primary-green" />
        <p className="text-base text-dark/90">Activity Timeline</p>
      </div>
      <div className="space-y-3 overflow-scroll no-scroll h-[200px]">
        {acts.length === 0 ? (
          <div className="h-full">
            <NoResult>No activity yet</NoResult>
          </div>
        ) : (
          acts.map((act) => {
            const Icon = act.icon;

            return (
              <div key={act.id} className="flex items-center gap-3">
                <div
                  className={`flex items-center justify-center rounded-full size-8 text-sm ${act.iconColor}`}
                >
                  <Icon />
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-dark/90 font-medium">
                    {act.title}
                  </p>

                  <p className="text-xs text-zinc-500">{act.dateFormatted}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
