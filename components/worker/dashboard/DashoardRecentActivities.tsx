import { NoResult } from "@/components/loader/GeneralLoader";
import { activityConfig } from "@/lib/constants";
import Link from "next/link";
import { useParams } from "next/navigation";

const formatTimeAgo = (date: string) => {
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  const hrs = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (mins < 60) return `${mins} mins ago`;
  if (hrs < 24) return `${hrs} hours ago`;
  return `${days} days ago`;
};

export default function DashoardRecentActivities({
  activities,
}: {
  activities: { [key: string]: string }[];
}) {
  const { workspaceId } = useParams();
  return (
    <div className="flex flex-col  gap-2 border border-border h-[320px] rounded-md  p-4 shadow-xs bg-white">
      <div className="flex items-center justify-between gap-2  py-2">
        <h3 className="text-dark  text-base">Recent Activity</h3>
        <Link
          className="text-[#1058d6] text-sm"
          href={`/worker/${workspaceId}/activity`}
        >
          View all activity
        </Link>
      </div>

      {!activities.length ? (
        <div className="h-[90%]">
          <NoResult>No activity record</NoResult>
        </div>
      ) : (
        <div className="space-y-4 overflow-y-auto no-scroll">
          {activities?.slice(0, 6).map((act) => {
            const config = activityConfig[act.action] ?? activityConfig.created;

            return (
              <div key={act.$id} className="flex items-center gap-3.5">
                <div
                  className={`flex items-center justify-center size-7 rounded ${config.bg} ${config.color}`}
                >
                  {config.icon}
                </div>

                <div className="space-y-1">
                  <p className="text-dark/80 text-sm max-w-[300px] truncate">
                    {act.message}
                  </p>

                  <p className="text-zinc-500 text-xs">
                    {formatTimeAgo(act.$createdAt)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
