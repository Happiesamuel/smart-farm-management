"use client";
import { WorkspaceMemberObj, WorkspaceObj } from "@/lib/types";
import { createWorkspace, createWorkspaceMember } from "@/servers/auth-actions";
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
export function useGetWorkspaceMembersWithRole(
  userId: string,
  role: "owner" | "worker",
) {
  const {
    data: workspace,
    status,
    error,
    refetch,
  } = useQuery({
    queryKey: ["workspace", userId],
    queryFn: async () => await getUserWorkspacesWithRole({ userId, role }),
    enabled: !!userId && !!role,
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

export const useRemoveWorkspaceMember = () => {
  const queryClient = useQueryClient();
const {user,workspace} = useApp()
  const { mutate: remove, status } = useMutation({
    mutationFn: (id: string) => removeWorkspaceMember(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["workspaceMembers"],
      });
      queryClient.invalidateQueries({
 queryKey: ["workspaceMembers", workspace?.id],
      });
      queryClient.invalidateQueries({
         queryKey: ["workspace",user?.id],
      });
    },
  });

  return { remove, status };
};

export const useUpdateMemberRole = () => {
  const queryClient = useQueryClient();

  const { mutate: update, status } = useMutation({
    mutationFn: ({
      memberId,
      role,
    }: {
      memberId: string;
      role: "worker" | "manager" | "owner";
    }) => updateWorkspaceMemberRole({ memberId, role }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["workspaceMembers"],
      });
    },
  });
  return { update, status };
};
