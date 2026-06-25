"use client";

import { NoResult } from "@/components/loader/GeneralLoader";
import { activityConfig } from "@/lib/constants";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { ReactElement } from "react";
import { FaPersonDigging } from "react-icons/fa6";
import { GiPlantRoots } from "react-icons/gi";
import { MdPestControl } from "react-icons/md";
type UserMapValue = {
  name: string;
  id: string;
  avatar?: string;
  email: string;
  role: string;
  mId: string;
  lastSeen?: string;
};

const activityIcons: Record<string, ReactElement> = {
  created: <Plus />,
  updated: <FaPersonDigging />,
  deleted: <MdPestControl />,
};

const formatTimeAgo = (date: string) => {
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  const hrs = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (mins < 60) return `${mins} mins ago`;
  if (hrs < 24) return `${hrs} hours ago`;
  return `${days} days ago`;
};

export default function FarmActivites({
  activities,
  userMap,
}: {
  activities: { [key: string]: string }[];
  userMap: Map<string, UserMapValue>;
}) {
  const { farmId, workspaceId } = useParams();
  const router = useRouter();
  return (
    <div className="w-full p-4 h-[300px] bg-white flex-1 rounded-xl border border-border/80 hover:shadow-sm transition flex flex-col shrink-0">
      {/* Header */}
      <div className="flex pb-4 items-center justify-between">
        <p className="text-dark text-base font-semibold">Recent Activities</p>
        <p
          onClick={() =>
            router.push(`/user/${workspaceId}/farms/${farmId}?tab=activity`)
          }
          className="text-sm text-primary-green font-normal cursor-pointer"
        >
          View All
        </p>
      </div>

      {!activities.length ? (
        <div className="h-[90%]">
          <NoResult>No activity record</NoResult>
        </div>
      ) : (
        <div className="space-y-4 overflow-y-auto no-scroll">
          {activities?.slice(0, 6).map((act) => {
            const config = activityConfig[act.action] ?? activityConfig.created;

            const user = userMap.get(act.users);
            const userName = user?.name || "Someone";

            return (
              <div key={act.$id} className="flex items-center gap-3.5">
                <div
                  className={`flex items-center justify-center size-7 rounded ${config.bg} ${config.color}`}
                >
                  {config.icon}
                </div>

                <div className="space-y-1">
                  <p className="text-dark/95 text-sm max-w-[300px] truncate">
                    {act.message.split(" ").slice(0, 20).join(" ")}
                  </p>

                  <p className="text-zinc-500 text-xs">
                    {userName} • {formatTimeAgo(act.$createdAt)}
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
