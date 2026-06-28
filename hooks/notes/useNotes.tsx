"use client";
import { NoteInfo } from "@/lib/types";
import { createDoc, getDocs, getFarmDocs } from "@/servers/crud-actions";
import { getWorkerNotes } from "@/servers/task-actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const NOTES_STALE_TIME = 1000 * 60 * 3; // 3 minutes

export const useCreateNote = () => {
  const queryClient = useQueryClient();

  const { mutate: createNote, status } = useMutation({
    mutationFn: async (data: {
      workspaceId: string;
      userId: string;
      data: Omit<NoteInfo, "id" | "workspaces" | "users">;
    }) => {
      const result = await createDoc({ ...data, collection: "notes" });
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["notes", variables.workspaceId] });
    },
  });

  return { createNote, status };
};

export const useGetFarmNotes = (
  workspaceId: string | null,
  userId: string | null,
  farmId: string,
) => {
  const { data: notes, status, error } = useQuery({
    queryKey: ["notes", workspaceId, farmId],
    queryFn: async () => {
      const result = await getFarmDocs({
        collection: "notes",
        workspaceId: workspaceId as string,
        userId: userId as string,
        farmId,
      });
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    enabled: !!workspaceId && !!userId && !!farmId,
    staleTime: NOTES_STALE_TIME,
  });

  return { notes, error, status };
};

export const useGetNotes = (
  workspaceId: string | null,
  userId: string | null,
) => {
  const { data: notes, status, error } = useQuery({
    queryKey: ["notes", workspaceId],
    queryFn: async () => {
      const result = await getDocs({
        collection: "notes",
        workspaceId: workspaceId as string,
        userId: userId as string,
      });
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    enabled: !!workspaceId && !!userId,
    staleTime: NOTES_STALE_TIME,
  });

  return { notes, error, status };
};

export const useWorkerNotes = (
  workspaceId: string | null,
  userId: string | null,
) => {
  const { data: notes, status, error } = useQuery({
    queryKey: ["notes", workspaceId, userId],
    queryFn: async () => {
      const result = await getWorkerNotes({
        workspaceId: workspaceId!,
        userId: userId!,
      });
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    enabled: !!workspaceId && !!userId,
    staleTime: NOTES_STALE_TIME,
  });

  return { notes, error, status };
};