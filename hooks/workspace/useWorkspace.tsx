"use client";
import { WorkspaceMemberObj, WorkspaceObj } from "@/lib/types";
import { createWorkspace, createWorkspaceMember } from "@/servers/auth-actions";
import {
  getWorkspace,
  getWorkspaceMembersWithWorkspaceId,
} from "@/servers/workspace-action";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useCreateWorkspace() {
  const {
    mutate: create,
    status,
    error,
  } = useMutation({
    mutationFn: async ({ obj, slug }: { obj: WorkspaceObj; slug: string }) =>
      await createWorkspace(slug, obj),
  });

  return { create, status, error };
}

export function useGetWorkspace(userId: string) {
  const {
    data: workspace,
    status,
    error,
    refetch,
  } = useQuery({
    queryKey: ["workspace"],
    queryFn: async () => await getWorkspace(userId),
    enabled: !!userId,
  });

  return { workspace, status, error, refetch };
}
export function useGetWorkspaceMembersWithWorkspaceId(
  workspaceId: string,
  userId: string,
) {
  const {
    data: workspaceMember,
    status,
    error,
    refetch,
  } = useQuery({
    queryKey: ["workspaceMembers", workspaceId],
    queryFn: async () =>
      await getWorkspaceMembersWithWorkspaceId(workspaceId, userId),
    enabled: !!workspaceId && !!userId,
  });

  return { workspaceMember, status, error, refetch };
}

export function useCreateWorkspaceMember() {
  const {
    mutate: create,
    status,
    error,
  } = useMutation({
    mutationFn: async (obj: WorkspaceMemberObj) =>
      await createWorkspaceMember(obj),
  });

  return { create, status, error };
}
