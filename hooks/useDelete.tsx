"use client";
import { deleteDoc } from "@/servers/crud-actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteDoc = () => {
  const queryClient = useQueryClient();

  const { mutate: remove, status } = useMutation({
    mutationFn: (data: {
      collection: string;
      id: string;
      workspaceId: string;
      userId: string;
    }) => deleteDoc(data),

    onSuccess: (_, variables) => {
      // 🔥 invalidate main collection
      queryClient.invalidateQueries({
        queryKey: [variables.collection, variables.workspaceId],
      });

      // 🔥 invalidate related finance (important for your app)
      queryClient.invalidateQueries({
        queryKey: ["farm-finance", variables.workspaceId],
      });
    },
  });

  return { remove, status };
};
