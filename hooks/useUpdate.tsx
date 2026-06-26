"use client";
import {
  CropInfo,
  ExpenseInfo,
  FarmInfo,
  FieldInfo,
  HarvestInfo,
  NoteInfo,
  SalesInfo,
  TaskInfo,
} from "@/lib/types";
import { updateDoc, updateFarm } from "@/servers/crud-actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateDoc = () => {
  const queryClient = useQueryClient();

  const { mutate: update, status } = useMutation({
    mutationFn: (data: {
      collection: string;
      id: string;
      data: Omit<
        | CropInfo
        | FieldInfo
        | HarvestInfo
        | TaskInfo
        | SalesInfo
        | ExpenseInfo
        | FarmInfo
        | NoteInfo,
        "id" | "workspaces" | "users"
      >;
      workspaceId: string;
      userId: string;
    }) => updateDoc(data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [variables.collection, variables.workspaceId],
      });

      queryClient.invalidateQueries({
        queryKey: ["farm-finance", variables.workspaceId],
      });
    },
  });

  return { update, status };
};
export const useUpdateDocWithImg = () => {
  const queryClient = useQueryClient();

  const { mutate: update, status } = useMutation({
    mutationFn: (data: {
      collection: string;
      id: string;
      data: Record<string, number | string | File>;
      workspaceId: string;
      userId: string;
    }) => updateFarm(data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [variables.collection, variables.workspaceId],
      });

      queryClient.invalidateQueries({
        queryKey: ["farm-finance", variables.workspaceId],
      });
    },
  });

  return { update, status };
};
