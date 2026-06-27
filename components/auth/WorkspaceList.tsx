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
import TableActions from "../layout/TableAction";
import { LuPencil, LuTrash2 } from "react-icons/lu";
import { toast } from "sonner";
import { useDeleteDoc } from "@/hooks/useDelete";
import { DeleteWorkspaceModal, ValidationDeleteWorkspaceModal } from "../layout/Modals";
export default function WorkspaceList({ user }: { user: UserObjId }) {
  const [active, setActive] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const { setWorkspace, setUser,role:r,setRole } = useApp();
  const router = useRouter();
  const { workspace, status } = useGetWorkspace(user.id);
  const { remove, status: deleteStat } = useDeleteDoc();
const role = Cookies.get('role') || r
  function handleActive(id: string) {
    setActive(id);
  }

  function handleClick(works: WorkspaceObjId) {
    setWorkspace(works);
    setUser(user);
    setRole(role)
    safeUpdateLastSeen(user.id);
    Cookies.set("activeWorkspace", works.workspaceId);
    router.refresh();
  }

  function handleFirstConfirm() {
    setDeleteId(deleteId);
    setConfirmOpen(true);
  }

  function handleDelete() {
    if (!deleteId) return;
    remove(
      {
        collection: "workspaces",
        id: deleteId,
        workspaceId: deleteId,
        userId: user.id,
      },
      {
        onSuccess: () => {
          toast("Deleted successfully", {
            description: "You've deleted the workspace",
          });
          setConfirmOpen(false);
          setDeleteId(null);
        },
        onError: (err) =>
          toast("Error deleting workspace", {
            description: err.message,
            duration: 4000,
            closeButton: true,
          }),
      },
    );
  }

  const selectedWorkspace = workspace?.find((w) => w.id === deleteId);

  if (status === "pending")
    return (
      <div className="flex items-center h-[400px] justify-center">
        <div className="size-6 border-2 border-light-green/30 border-t-primary-green rounded-full animate-spin" />
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
          className="bg-primary-green text-white h-10 px-6 cursor-pointer"
        >
          <Link
            onClick={() => localStorage.setItem("manager-id", user.id)}
            href="/create-workspace"
            className="flex items-center gap-1"
          >
            <GoPlus />
            <p>Create New Workspace</p>
          </Link>
        </Button>
      </div>
    );

  return (
    <>
      <div className="space-y-4 pt-10">
        {workspace!.map((work) => (
          <WorkItem
            work={work}
            active={active}
            handleActive={handleActive}
            key={work.id}
            handleClick={handleClick}
            userId={user.id}
            onDelete={(id) => setDeleteId(id)} // 👈 pass down
          />
        ))}
      </div>

      {/* Modal 1 — are you sure? */}
      <DeleteWorkspaceModal
        open={!!deleteId && !confirmOpen}
        load={false}
        onClick={handleFirstConfirm}
        onClose={() => setDeleteId(null)}
      />

      {/* Modal 2 — type workspace name */}
      <ValidationDeleteWorkspaceModal
        open={confirmOpen}
        load={deleteStat === "pending"}
        farmName={selectedWorkspace?.workspaceId ?? ""}
        onClick={handleDelete}
        onClose={() => {
          setConfirmOpen(false);
          setDeleteId(null);
        }}
      />
    </>
  );
}

function WorkItem({
  work,
  active,
  userId,
  handleActive,
  handleClick,
  onDelete,
}: {
  active: string | null;
  userId: string;
  work: WorkspaceObjId;
  handleActive(id: string): void;
  handleClick(cli: WorkspaceObjId): void;
  onDelete(id: string): void; // 👈 new prop
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { workspaceMember, status } = useGetWorkspaceMembersWithWorkspaceId(work.id);
  const { farms, status: farmStat } = useGetFarmInWorkspace(userId, work.id);

  if (status === "pending" || farmStat === "pending")
    return <Skeleton className="h-28 w-full" />;

  const slice = 3;
  const farmSplit = farms?.map((f) => f.farmName).slice(0, slice).join(", ");
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
      <div className="flex sm:flex-row flex-col gap-2 sm:items-center justify-between w-full">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center rounded-full size-16 text-xl font-semibold bg-[#e8f5ec] text-[#2d8952]">
            {work.name.split(" ").slice(0, 2).map((x) => x.charAt(0)).join("")}
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
          className={`h-10 text-sm px-5 w-full sm:w-fit ${active === work.workspaceId ? "bg-primary-green text-white" : "bg-transparent border border-dark/15 text-dark!"}`}
        >
          <Link onClick={() => addHandleClick(work)} href="#" className="w-full">
            Enter Workspace
          </Link>
        </Button>
      </div>

      <div className="w-[2%]">
        <TableActions
          actions={[
            {
              type: "callback",
              label: "Edit",
              icon: <LuPencil className="text-sm" />,
              onClick: () => setOpen(true),
            },
            {
              type: "callback",
              label: "Delete",
              icon: <LuTrash2 className="text-sm" />,
              variant: "danger",
              onClick: () => onDelete(work.id), // 👈 just signal parent
            },
          ]}
        />
      </div>
    </div>
  );
}