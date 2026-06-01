import { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useGetWorkspaceMembersWithRole } from "@/hooks/workspace/useWorkspace";
import { UserObjId, WorkerWorspace, WorkspaceObjId } from "@/lib/types";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useApp } from "@/stores/useAppStore";
export default function WorkerWorkspaceList({ user }: { user: UserObjId }) {
  const [active, setActive] = useState<string | null>(null);
  const { setWorkspace, setUser } = useApp();
  const router = useRouter();
  const { workspace, status } = useGetWorkspaceMembersWithRole(user.id);
  function handleActive(id: string) {
    setActive(id);
  }
  function handleClick(works: WorkspaceObjId) {
    setWorkspace(works);
    setUser(user);
    Cookies.set("activeWorkspace", works.workspaceId);
    router.refresh();
  }
  if (status === "pending")
    return (
      <div className="flex items-center h-[400px] justify-center">
        <div className="size-6 border-2 border-light-green/30 border-t-primary-green rounded-full animate-spin"></div>
      </div>
    );
  console.log(workspace);
  if (!workspace?.length)
    return (
      <div className="flex items-center flex-col h-[300px] gap-2 justify-center">
        <p className="text-zinc-500 text-sm font-medium">
          You don&apos;t have any workspace
        </p>
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
        />
      ))}
    </div>
  );
}
function WorkItem({
  work,
  active,
  handleActive,
  handleClick,
}: {
  active: string | null;
  work: WorkerWorspace;
  handleActive(id: string): void;
  handleClick(cli: WorkerWorspace): void;
}) {
  function addHandleClick(works: WorkerWorspace) {
    // if (!farms?.length) {
    //   localStorage.setItem("workspaceId", work.id);
    //   localStorage.setItem("manager-id", userId);
    //   // handleClick(id);
    // } else
    handleClick(works);
  }

  return (
    <div
      key={work.id}
      onClick={() => handleActive(work.workspaceId)}
      className={`${active === work.workspaceId ? "border-[#f0782d]" : "border-border"} p-6 cursor-pointer rounded-lg border flex items-center justify-between gap-4`}
    >
      <div className="flex sm:flex-row flex-col gap-2 sm:items-center justify-between w-full ">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center rounded-full size-16 text-xl font-semibold bg-[#f0782d]/10 text-[#f0782d]">
            {work.name
              .split(" ")
              .slice(0, 2)
              .map((x) => x.charAt(0))
              .join("")}
          </div>
          <div className="space-y-1.5">
            <h6 className="text-lg font-semibold">{work.name}</h6>
          </div>
        </div>
        <Button
          disabled={active !== work.workspaceId}
          onClick={() => addHandleClick(work)}
          className={`h-10 text-sm px-5 w-full sm:w-fit ${active === work.workspaceId ? "bg-[#f0782d] text-white" : "bg-transparent border border-dark/15 text-dark!"}  `}
        >
          <Link
            onClick={() => addHandleClick(work)}
            href={"#"}
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
