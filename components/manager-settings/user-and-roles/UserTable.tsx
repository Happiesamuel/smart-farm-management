"use client";

import { DeleteModal } from "@/components/layout/Modals";
import TableActions from "@/components/layout/TableAction";
import { FormLoader, NoResult } from "@/components/loader/GeneralLoader";
import { useWorkspaceUser } from "@/hooks/useAssign";
import { safeUpdateLastSeen } from "@/hooks/useLastSeen";
import { useRemoveWorkspaceMember } from "@/hooks/workspace/useWorkspace";
import { useApp } from "@/stores/useAppStore";
import { LuPencil, LuTrash2 } from "react-icons/lu";
import { toast } from "sonner";

const statusStyles = {
  Online: "bg-green-100 text-green-700",
  "Recently Active": "bg-yellow-100 text-yellow-700",
  "Active Today": "bg-blue-100 text-blue-700",
  Inactive: "bg-gray-100 text-gray-600",
};
const roleMap: Record<string, string> = {
  owner: "Farm Owner",
  manager: "Farm Manager",
  worker: "Worker",
};
const getStatus = (lastSeen: string) => {
  if (!lastSeen) return "Inactive";

  const now = new Date();
  const diff = now.getTime() - new Date(lastSeen).getTime();
  const minutes = diff / (1000 * 60);
  const hours = minutes / 60;

  if (minutes < 5) return "Online";
  if (minutes < 60) return "Recently Active";
  if (hours < 24) return "Active Today";
  return "Inactive";
};
export default function UserTable() {
  const { workspace, user, ready } = useApp();
  const { remove, status } = useRemoveWorkspaceMember();
  const {
    users,
    status: uStat,
    error: uErr,
  } = useWorkspaceUser(workspace?.id ?? null);

  if (!ready)
    return (
      <div className="h-[80vh]">
        <FormLoader>Loading app...</FormLoader>
      </div>
    );

  if (!user || !workspace)
    return (
      <div className="h-[80vh]">
        <NoResult>Unauthorised</NoResult>
      </div>
    );

  const isLoading = uStat === "pending";

  if (isLoading)
    return (
      <div className="h-[80vh]">
        <FormLoader>Loading members details...</FormLoader>
      </div>
    );

  const errorMessage = uErr?.message;

  if (errorMessage)
    return (
      <div className="h-[80vh]">
        <NoResult>{errorMessage}</NoResult>
      </div>
    );

  if (!users.length)
    return (
      <div className="h-[80vh]">
        <NoResult>You don&apos;t hae any member in this workspace</NoResult>
      </div>
    );
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-NG", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const handleRemoveMember = (member: { role: string; mId: string }) => {
    safeUpdateLastSeen(user.id);
    if (member.role === "owner") {
      toast("Action not allowed", {
        description: "You cannot remove the workspace owner",
      });
      return;
    } else
      remove(member.mId, {
        onSuccess: () => {
          toast("Member removed successfully", {
            description: "User has been removed from the workspace",
          });
        },
        onError: (err) => {
          toast("Error removing member", {
            description: err.message,
            duration: 4000,
            closeButton: true,
          });
        },
      });
  };

  return (
    <div className="mt-4  overflow-hidden">
      <div className="block overflow-x-auto">
        <table className="w-full text-sm ">
          <thead className=" bg-zinc-200/50 border rounded-t-2xl border-border text-gray-600">
            <tr className="text-left ">
              <th className="py-2 truncate max-w-[50px] px-2">User</th>
              <th className="py-2 truncate max-w-[50px] pl-1">Email</th>
              <th className="py-2 truncate max-w-[50px] pl-4">Role</th>
              <th className="py-2 truncate max-w-[50px] px-4">Status</th>
              <th className="py-2 truncate max-w-[50px] pl-">Last Active</th>

              <th className="py-2 truncate max-w-[50px] px-2 text-right">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {users.map((s) => (
              <tr key={s.id} className="border-t hover:bg-gray-50">
                <td
                  title={s.name}
                  className="py-3 truncate font-medium max-w-[150px] px-2 text-[13px] text-zinc-600"
                >
                  {s.name}
                </td>

                <td
                  title={`${s.email}`}
                  className="py-3 truncate font-medium max-w-[200px] pl-1 text-[13px] text-zinc-600 flex items-center gap-2"
                >
                  {s.email}
                </td>

                <td
                  title={roleMap[s.role] || s.role}
                  className="py-3 truncate font-medium max-w-[150px] pl-4 pr-1 text-[13px] text-zinc-600"
                >
                  {roleMap[s.role] || s.role}
                </td>
                <td
                  title={getStatus(s.lastSeen)}
                  className="py-3 truncate font-medium max-w-[150px] pl-4 text-[13px] text-zinc-600"
                >
                  <span
                    className={`px-2 py-0.5 text-[12px] rounded-full ${statusStyles[getStatus(s.lastSeen)]}`}
                  >
                    {getStatus(s.lastSeen)}
                  </span>
                </td>

                <td
                  title={formatDate(s.lastSeen)}
                  className="py-3 truncate font-medium max-w-[150px] px-2 pr-3 text-[13px] text-zinc-600"
                >
                  {formatDate(s.lastSeen)}
                </td>

                <td className="py-3 px-2 truncate font-medium max-w-[150px] px- text-[13px] text-zinc-600 text-right">
                  <TableActions
                    actions={[
                      {
                        type: "callback",
                        label:
                          status === "pending"
                            ? "Changinging..."
                            : "Change Role",
                        icon: <LuPencil className="text-sm" />,
                        onClick: () => alert("Feature coming soon."),
                      },
                      {
                        type: "modal",
                        label: "Remove User",
                        variant: "danger",
                        icon: <LuTrash2 className="text-sm" />,
                        modal: (onClose) => (
                          <DeleteModal
                            open={true}
                            onClose={onClose}
                            load={status === "pending"}
                            onClick={() => handleRemoveMember(s)}
                          />
                        ),
                      },
                    ]}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
