"use client";
import { deleteDoc } from "@/servers/crud-actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteDoc = () => {
  const queryClient = useQueryClient();

  const { mutate: remove, status } = useMutation({
    mutationFn: async (data: {
      collection: string;
      id: string;
      workspaceId: string;
      userId: string;
    }) => {
      const result = await deleteDoc(data);
      if (!result.success) throw new Error(result.error);
      return result;
    },

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [variables.collection, variables.workspaceId] });
      queryClient.invalidateQueries({ queryKey: ["workspace", variables.userId] });
      queryClient.invalidateQueries({ queryKey: ["farm-finance", variables.workspaceId] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats", variables.workspaceId] });
      queryClient.invalidateQueries({ queryKey: ["analytics", variables.workspaceId] });
      queryClient.invalidateQueries({ queryKey: ["farms-with-stats", variables.workspaceId] });
      queryClient.invalidateQueries({ queryKey: ["all-farm-stats", variables.workspaceId] });
    },
  });

  return { remove, status };
};