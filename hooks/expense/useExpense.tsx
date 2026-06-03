"use client";
import { ExpenseInfo } from "@/lib/types";
import { createDoc } from "@/servers/crud-actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateExpenses = () => {
  const queryClient = useQueryClient();

  const { mutate: createExpense, status } = useMutation({
    mutationFn: (data: {
      workspaceId: string;
      userId: string;
      data: Omit<ExpenseInfo, "id" | "workspaces" | "users">;
    }) =>
      createDoc({
        ...data,
        collection: "expenses",
      }),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["expenses", variables.workspaceId],
      });
    },
  });
  return { createExpense, status };
};
