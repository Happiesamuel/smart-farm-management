"use client";

import {
  getWorkspaceAssignOptions,
  getWorkspaceUser,
} from "@/servers/workspace-action";
import { useQuery } from "@tanstack/react-query";

const WORKSPACE_MEMBERS_STALE_TIME = 1000 * 60 * 5; // 5 minutes — members change infrequently

export const useWorkspaceAssignOptions = (workspaceId: string | null) => {
  const { data, status, error } = useQuery({
    queryKey: ["workspace-assign", workspaceId],
    enabled: !!workspaceId,
    queryFn: async () => {
      const result = await getWorkspaceAssignOptions(workspaceId as string);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    staleTime: WORKSPACE_MEMBERS_STALE_TIME,
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
    queryFn: async () => {
      const result = await getWorkspaceUser(workspaceId as string);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    staleTime: WORKSPACE_MEMBERS_STALE_TIME,
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
      value: m.users,
      role: m.role,
    };
  });
}