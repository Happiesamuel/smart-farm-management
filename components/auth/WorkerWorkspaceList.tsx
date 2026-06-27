import { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useGetWorkspaceMembersWithRole, useRemoveWorkspaceMember } from "@/hooks/workspace/useWorkspace";
import { UserObjId, WorkerWorspace, WorkspaceObjId } from "@/lib/types";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useApp } from "@/stores/useAppStore";
import { safeUpdateLastSeen } from "@/hooks/useLastSeen";
import TableActions from "../layout/TableAction";
import { toast } from "sonner";
import {LeaveWorkspaceModal } from "../layout/Modals";
import { LuLogOut } from "react-icons/lu";
export default function WorkerWorkspaceList({ user }: { user: UserObjId }) {
  const [active, setActive] = useState<string | null>(null);
  const [leaveId, setLeaveId] = useState<string | null>(null); // 👈 lifted state

  const { setWorkspace, setUser, role } = useApp();
  const router = useRouter();
  const { workspace, status } = useGetWorkspaceMembersWithRole(
    user.id,
    role as "worker" | "owner",
  );
  const { remove, status: leaveStat } = useRemoveWorkspaceMember();

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

  function handleLeave() {
    if (!leaveId) return;
remove(leaveId,
      {
        onSuccess: () => {
          toast("Left workspace", {
            description: "You've left the workspace",
          });
          setLeaveId(null);
        },
        onError: (err) =>
          toast("Error leaving workspace", {
            description: err.message,
            duration: 4000,
            closeButton: true,
          }),
      },
    );
  }

  if (status === "pending")
    return (
      <div className="flex items-center h-[400px] justify-center">
        <div className="size-6 border-2 border-light-green/30 border-t-[#f0782d] rounded-full animate-spin" />
      </div>
    );

  if (!workspace?.length)
    return (
      <div className="flex items-center flex-col h-[300px] gap-2 justify-center">
        <p className="text-zinc-500 text-sm font-medium">
          You don&apos;t have any workspace
        </p>
      </div>
    );

  return (
    <>
      <div className="space-y-4 pt-10">
        {workspace!.map((work) => (
          <WorkItem
            work={work as WorkerWorspace}
            active={active}
            handleActive={handleActive}
            key={work.id}
            handleClick={handleClick}
            onLeave={(id) => setLeaveId(id)} // 👈 pass down
          />
        ))}
      </div>

      {/* single are you sure modal */}
      <LeaveWorkspaceModal
        open={!!leaveId}
        load={leaveStat === "pending"}
        onClick={handleLeave}
        onClose={() => setLeaveId(null)}
      />
    </>
  );
}

function WorkItem({
  work,
  active,
  handleActive,
  handleClick,
  onLeave,
}: {
  active: string | null;
  work: WorkerWorspace;
  handleActive(id: string): void;
  handleClick(cli: WorkerWorspace): void;
  onLeave(id: string): void; // 👈 new prop
}) {
  return (
    <div
      onClick={() => handleActive(work.workspaceId)}
      className={`${active === work.workspaceId ? "border-[#f0782d]" : "border-border"} p-6 cursor-pointer rounded-lg border flex items-center justify-between gap-4`}
    >
      <div className="flex sm:flex-row flex-col gap-2 sm:items-center justify-between w-full">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center rounded-full size-16 text-xl font-semibold bg-[#f0782d]/10 text-[#f0782d]">
            {work.name.split(" ").slice(0, 2).map((x) => x.charAt(0)).join("")}
          </div>
          <div className="space-y-1.5">
            <h6 className="text-lg font-semibold">{work.name}</h6>
          </div>
        </div>
        <Button
          disabled={active !== work.workspaceId}
          onClick={() => handleClick(work)}
          className={`h-10 text-sm px-5 w-full sm:w-fit ${active === work.workspaceId ? "bg-[#f0782d] text-white" : "bg-transparent border border-dark/15 text-dark!"}`}
        >
          <Link onClick={() => handleClick(work)} href="#" className="w-full">
            Enter Workspace
          </Link>
        </Button>
      </div>

      <div className="w-[2%]">
        <TableActions
          actions={[
            {
              type: "callback",
              label: "Leave Workspace",
              icon: <LuLogOut className="text-sm" />,
              variant: "danger",
              onClick: () => onLeave(work.memberId), 
            },
          ]}
        />
      </div>
    </div>
  );
}