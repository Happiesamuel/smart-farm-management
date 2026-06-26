"use client";
import { NoteInfo } from "@/lib/types";
import { createDoc, getDocs, getFarmDocs } from "@/servers/crud-actions";
import { getWorkerNotes } from "@/servers/task-actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateNote = () => {
  const queryClient = useQueryClient();

  const { mutate: createNote, status } = useMutation({
    mutationFn: (data: {
      workspaceId: string;
      userId: string;
      data: Omit<NoteInfo, "id" | "workspaces" | "users">;
    }) =>
      createDoc({
        ...data,
        collection: "notes",
      }),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["notes", variables.workspaceId],
      });
    },
  });
  return { createNote, status };
};

export const useGetFarmNotes = (
  workspaceId: string | null,
  userId: string | null,
  farmId: string,
) => {
  const {
    data: notes,
    status,
    error,
  } = useQuery({
    queryKey: ["notes", workspaceId, farmId],
    queryFn: () =>
      getFarmDocs({
        collection: "notes",
        workspaceId: workspaceId as string,
        userId: userId as string,
        farmId,
      }),
    enabled: !!workspaceId && !!userId && !!farmId,
  });
  return { notes, error, status };
};

export const useGetNotes = (
  workspaceId: string | null,
  userId: string | null,
) => {
  const {
    data: notes,
    status,
    error,
  } = useQuery({
    queryKey: ["notes", workspaceId],
    queryFn: () =>
      getDocs({
        collection: "notes",
        workspaceId: workspaceId as string,
        userId: userId as string,
      }),
    enabled: !!workspaceId && !!userId,
  });
  return { notes, error, status };
};
export const useWorkerNotes = (
  workspaceId: string | null,
  userId: string | null,
) => {
  const {
    data: notes,
    status,
    error,
  } = useQuery({
    queryKey: ["notes", workspaceId, userId],
    queryFn: () =>
      getWorkerNotes({
        workspaceId: workspaceId!,
        userId: userId!,
      }),
    enabled: !!workspaceId && !!userId,
  });
  return { notes, error, status };
};
