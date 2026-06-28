"use client";
import { WorkspaceMemberObj, WorkspaceObj } from "@/lib/types";
import { createWorkspace, createWorkspaceMember } from "@/servers/auth-actions";
import { updateWorkspace } from "@/servers/crud-actions";
import {
  getUserWorkspacesWithRole,
  getWorkspace,
  getWorkspaceByWorkspaceId,
  getWorkspaceMembers,
  removeWorkspaceMember,
  updateWorkspaceMemberRole,
} from "@/servers/workspace-action";
import { useApp } from "@/stores/useAppStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const WORKSPACE_STALE_TIME = 1000 * 60 * 5; // 5 minutes — workspace config rarely changes

export function useCreateWorkspace() {
  const { mutate: create, status, error } = useMutation({
    mutationFn: async ({ obj, slug }: { obj: WorkspaceObj; slug: string }) => {
      const result = await createWorkspace(slug, obj);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
  });

  return { create, status, error };
}

export function useGetWorkspace(userId: string) {
  const { data: workspace, status, error, refetch } = useQuery({
    queryKey: ["workspace", userId],
    queryFn: async () => {
      const result = await getWorkspace(userId);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    enabled: !!userId,
    staleTime: WORKSPACE_STALE_TIME,
  });

  return { workspace, status, error, refetch };
}

export function useGetWorkspaceByWorkspaceId(workspaceId: string | undefined) {
  const { data: workspace, status, error, refetch } = useQuery({
    queryKey: ["workspace", workspaceId],
    queryFn: async () => {
      const result = await getWorkspaceByWorkspaceId(workspaceId!);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    enabled: !!workspaceId,
    staleTime: WORKSPACE_STALE_TIME,
  });

  return { workspace, status, error, refetch };
}

export function useGetWorkspaceMembersWithWorkspaceId(workspaceId: string | null) {
  const { data: workspaceMember, status, error, refetch } = useQuery({
    queryKey: ["workspaceMembers", workspaceId],
    queryFn: async () => {
      const result = await getWorkspaceMembers(workspaceId as string);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    enabled: !!workspaceId,
    staleTime: WORKSPACE_STALE_TIME,
  });

  return { workspaceMember, status, error, refetch };
}

export function useGetWorkspaceMembersWithRole(userId: string, role: "owner" | "worker") {
  const { data: workspace, status, error, refetch } = useQuery({
    queryKey: ["workspace", userId],
    queryFn: async () => {
      const result = await getUserWorkspacesWithRole({ userId, role });
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    enabled: !!userId && !!role,
    staleTime: WORKSPACE_STALE_TIME,
  });

  return { workspace, status, error, refetch };
}

export function useCreateWorkspaceMember() {
  const { mutate: create, status, error } = useMutation({
    mutationFn: async (obj: WorkspaceMemberObj) => {
      const result = await createWorkspaceMember(obj);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
  });

  return { create, status, error };
}

export const useRemoveWorkspaceMember = () => {
  const queryClient = useQueryClient();
  const { user, workspace } = useApp();

  const { mutate: remove, status } = useMutation({
    mutationFn: async (id: string) => {
      const result = await removeWorkspaceMember(id);
      if (!result.success) throw new Error(result.error);
      return result
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspaceMembers"] });
      queryClient.invalidateQueries({ queryKey: ["workspaceMembers", workspace?.id] });
      queryClient.invalidateQueries({ queryKey: ["workspace", user?.id] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
      queryClient.invalidateQueries({ queryKey: ["analytics"] });
    },
  });

  return { remove, status };
};

export const useUpdateMemberRole = () => {
  const queryClient = useQueryClient();

  const { mutate: update, status } = useMutation({
    mutationFn: async ({ memberId, role }: { memberId: string; role: "worker" | "manager" | "owner" }) => {
      const result = await updateWorkspaceMemberRole({ memberId, role });
      if (!result.success) throw new Error(result.error);
      return result
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workspaceMembers"] });
    },
  });

  return { update, status };
};

export const useUpdateWorkspace = () => {
  const queryClient = useQueryClient();

  const { mutate: update, status } = useMutation({
    mutationFn: async (vars: Parameters<typeof updateWorkspace>[0]) => {
      const result = await updateWorkspace(vars);
      if (!result.success) throw new Error(result.error);
      return result
    },
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({ queryKey: ["workspaceMembers"] });
      queryClient.invalidateQueries({ queryKey: ["workspaceMembers", vars.workspaceId] });
      queryClient.invalidateQueries({ queryKey: ["workspace", vars.userId] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
      queryClient.invalidateQueries({ queryKey: ["analytics"] });
    },
  });

  return { update, status };
};