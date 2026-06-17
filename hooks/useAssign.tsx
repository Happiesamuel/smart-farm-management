"use client";

import {
  getWorkspaceAssignOptions,
  getWorkspaceUser,
} from "@/servers/workspace-action";
import { useQuery } from "@tanstack/react-query";

export const useWorkspaceAssignOptions = (workspaceId: string | null) => {
  const { data, status, error } = useQuery({
    queryKey: ["workspace-assign", workspaceId],
    enabled: !!workspaceId,
    queryFn: async () => {
      if (!workspaceId) return [];

      return await getWorkspaceAssignOptions(workspaceId);
    },
  });

  return {
    assignOptions: data ?? [],
    status,
    error,
  };
};
export const useWorkspaceUser = (workspaceId: string | null) => {
  const { data, status, error } = useQuery({
    queryKey: ["workspaceMembers", workspaceId],
    enabled: !!workspaceId,
    queryFn: async () => await getWorkspaceUser(workspaceId as string),
  });

  return {
    users: data ?? [],
    status,
    error,
  };
};
export function buildAssignOptions(
  members: { users: string; role: string }[],
  users: { $id: string; name?: string; email?: string }[],
) {
  const userMap = new Map(users.map((u) => [u.$id, u]));

  return members.map((m) => {
    const user = userMap.get(m.users);

    return {
      name: user?.name || user?.email || "Unknown User",
      value: m.users, // ✅ always userId
      role: m.role,
    };
  });
}
