"use client";
import { WorkspaceMemberObj, WorkspaceObj } from "@/lib/types";
import { createWorkspace, createWorkspaceMember } from "@/servers/auth-actions";
import {
  getUserWorkspacesWithRole,
  getWorkspace,
  getWorkspaceByWorkspaceId,
  getWorkspaceMembers,
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
    queryKey: ["workspace", userId],
    queryFn: async () => await getWorkspace(userId),
    enabled: !!userId,
  });

  return { workspace, status, error, refetch };
}
export function useGetWorkspaceByWorkspaceId(workspaceId: string | undefined) {
  const {
    data: workspace,
    status,
    error,
    refetch,
  } = useQuery({
    queryKey: ["workspace", workspaceId],
    queryFn: async () => await getWorkspaceByWorkspaceId(workspaceId!),
    enabled: !!workspaceId,
  });

  return { workspace, status, error, refetch };
}
export function useGetWorkspaceMembersWithWorkspaceId(
  workspaceId: string | null,
) {
  const {
    data: workspaceMember,
    status,
    error,
    refetch,
  } = useQuery({
    queryKey: ["workspaceMembers", workspaceId],
    queryFn: async () => await getWorkspaceMembers(workspaceId as string),
    enabled: !!workspaceId,
  });

  return { workspaceMember, status, error, refetch };
}
export function useGetWorkspaceMembersWithRole(userId: string) {
  const {
    data: workspace,
    status,
    error,
    refetch,
  } = useQuery({
    queryKey: ["workspace", userId],
    queryFn: async () => await getUserWorkspacesWithRole({ userId }),
    enabled: !!userId,
  });

  return { workspace, status, error, refetch };
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
