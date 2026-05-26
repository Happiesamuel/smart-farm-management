import React, { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  useGetWorkspace,
  useGetWorkspaceMembersWithWorkspaceId,
} from "@/hooks/workspace/useWorkspace";
import { useGetFarmInWorkspace } from "@/hooks/farms/useCreateFarm";
import { WorkspaceObjId } from "@/lib/types";
import Cookies from "js-cookie";
import { Skeleton } from "../ui/skeleton";
import { useRouter } from "next/navigation";
export default function WorkspaceList({ userId }: { userId: string }) {
  const [active, setActive] = useState<string | null>(null);
  const router = useRouter();
  const { workspace, status } = useGetWorkspace(userId);

  function handleActive(id: string) {
    setActive(id);
  }
  function handleClick(cli: string) {
    Cookies.set("activeWorkspace", cli);
    router.refresh();
  }
  if (status === "pending")
    return (
      <div className="flex items-center h-[300px] justify-center">
        <div className="size-6 border-2 border-light-green/30 border-t-primary-green rounded-full animate-spin"></div>
      </div>
    );
  return (
    <div className="space-y-4 pt-10">
      {workspace!.map((work) => (
        <WorkItem
          work={work}
          active={active}
          handleActive={handleActive}
          key={work.id}
          handleClick={handleClick}
          userId={userId}
        />
      ))}
    </div>
  );
}
function WorkItem({
  work,
  active,
  userId,
  handleActive,
  handleClick,
}: {
  active: string | null;
  userId: string;
  work: WorkspaceObjId;
  handleActive(id: string): void;
  handleClick(cli: string): void;
}) {
  const { workspaceMember, status } = useGetWorkspaceMembersWithWorkspaceId(
    work.id,
    userId,
  );
  const { farms, status: farmStat } = useGetFarmInWorkspace(userId, work.id);
  if (status === "pending" || farmStat === "pending")
    return <Skeleton className="h-28 w-full" />;

  return (
    <div
      key={work.id}
      onClick={() => handleActive(work.workspaceId)}
      className={`${active === work.workspaceId ? "border-primary-green" : "border-border"} p-6 cursor-pointer rounded-lg border flex items-center justify-between gap-4`}
    >
      <div className="flex sm:flex-row flex-col gap-2 sm:items-center justify-between w-full ">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center rounded-full size-16 text-xl font-semibold bg-[#e8f5ec] text-[#2d8952]">
            {work.name
              .split(" ")
              .slice(0, 2)
              .map((x) => x.charAt(0))
              .join("")}
          </div>
          <div className="space-y-1.5">
            <h6 className="text-lg font-semibold">{work.name}</h6>
            <div className="flex items-center gap-2 text-sm font-normal text-zinc-500">
              <p>{farms?.length} Farms</p>
              <p className="bg-zinc-500 rounded-full size-1" />
              <p>{workspaceMember?.length} Members</p>
            </div>
            <p className="text-zinc-500 text-sm font-normal">
              {farms?.map((f) => f.farmName).join(", ")}
            </p>
          </div>
        </div>
        <Button
          disabled={active !== work.workspaceId}
          onClick={() => handleClick(work.workspaceId)}
          className={`h-10 text-sm px-5 w-full sm:w-fit ${active === work.workspaceId ? "bg-primary-green text-white" : "bg-transparent border border-dark/15 text-dark!"}  `}
        >
          <Link
            onClick={() => handleClick(work.workspaceId)}
            href={`/user/${work.workspaceId}/dashboard`}
            className="w-full"
          >
            Enter Workspace
          </Link>
        </Button>
      </div>
      <div className="w-[2%]">
        <BsThreeDotsVertical className="text-2xl text-zinc-500" />
      </div>
    </div>
  );
}
