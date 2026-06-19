import React, { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  useGetWorkspace,
  useGetWorkspaceMembersWithWorkspaceId,
} from "@/hooks/workspace/useWorkspace";
import { useGetFarmInWorkspace } from "@/hooks/farms/useCreateFarm";
import { UserObjId, WorkspaceObjId } from "@/lib/types";
import Cookies from "js-cookie";
import { Skeleton } from "../ui/skeleton";
import { useRouter } from "next/navigation";
import { GoPlus } from "react-icons/go";
import { useApp } from "@/stores/useAppStore";
import { safeUpdateLastSeen } from "@/hooks/useLastSeen";
export default function WorkspaceList({ user }: { user: UserObjId }) {
  const [active, setActive] = useState<string | null>(null);
  const { setWorkspace, setUser } = useApp();
  const router = useRouter();
  const { workspace, status } = useGetWorkspace(user.id);

  function handleActive(id: string) {
    setActive(id);
  }
  function handleClick(works: WorkspaceObjId) {
    setWorkspace(works);
    setUser(user);
    safeUpdateLastSeen(user.id);
    Cookies.set("activeWorkspace", works.workspaceId);
    router.refresh();
  }
  if (status === "pending")
    return (
      <div className="flex items-center h-[400px] justify-center">
        <div className="size-6 border-2 border-light-green/30 border-t-primary-green rounded-full animate-spin"></div>
      </div>
    );
  if (!workspace?.length)
    return (
      <div className="flex items-center flex-col h-[300px] gap-2 justify-center">
        <p className="text-zinc-500 text-sm font-medium">
          You don&apos;t have any workspace
        </p>
        <Button
          onClick={() => localStorage.setItem("manager-id", user.id)}
          className="bg-primary-green text-white h-10 px-6  cursor-pointer"
        >
          <Link
            onClick={() => localStorage.setItem("manager-id", user.id)}
            href={`/create-workspace`}
            className="flex items-center gap-1"
          >
            <GoPlus />
            <p>Create New Workspace</p>
          </Link>
        </Button>
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
          userId={user.id}
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
  handleClick(cli: WorkspaceObjId): void;
}) {
  const { workspaceMember, status } = useGetWorkspaceMembersWithWorkspaceId(
    work.id,
  );
  const router = useRouter();
  const { farms, status: farmStat } = useGetFarmInWorkspace(userId, work.id);
  if (status === "pending" || farmStat === "pending")
    return <Skeleton className="h-28 w-full" />;
  const slice = 3;
  const farmSplit = farms
    ?.map((f) => f.farmName)
    .slice(0, slice)
    .join(", ");
  const lengthMore =
    farms?.length && farms?.length > slice
      ? `and ${farms?.length - slice} more...`
      : "";
  function addHandleClick(works: WorkspaceObjId) {
    if (!farms?.length) {
      localStorage.setItem("workspaceId", work.id);
      localStorage.setItem("manager-id", userId);
      router.push("/create-farm");
    } else handleClick(works);
  }

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
              {farmSplit} {lengthMore}
            </p>
          </div>
        </div>
        <Button
          disabled={active !== work.workspaceId}
          onClick={() => addHandleClick(work)}
          className={`h-10 text-sm px-5 w-full sm:w-fit ${active === work.workspaceId ? "bg-primary-green text-white" : "bg-transparent border border-dark/15 text-dark!"}  `}
        >
          <Link
            onClick={() => addHandleClick(work)}
            href={"#"}
            // href={
            //   farms?.length
            //     ? `/user/${work.workspaceId}/dashboard`
            //     : "/create-farm"
            // }
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
