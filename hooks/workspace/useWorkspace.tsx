"use client";
import { WorkspaceMemberObj, WorkspaceObj } from "@/lib/types";
import { createWorkspace, createWorkspaceMember } from "@/servers/auth-actions";
import { useMutation } from "@tanstack/react-query";

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
