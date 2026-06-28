"use client";
import { ExpenseInfo } from "@/lib/types";
import { createDoc, getDocs, getFarmDocs } from "@/servers/crud-actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const EXPENSES_STALE_TIME = 1000 * 60 * 2; // 2 minutes — financial data, same as sales

export const useCreateExpenses = () => {
  const queryClient = useQueryClient();

  const { mutate: createExpense, status } = useMutation({
    mutationFn: async (data: {
      workspaceId: string;
      userId: string;
      data: Omit<ExpenseInfo, "id" | "workspaces" | "users">;
    }) => {
      const result = await createDoc({ ...data, collection: "expenses" });
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["expenses", variables.workspaceId] });
      queryClient.invalidateQueries({ queryKey: ["farm-finance", variables.workspaceId] });
    },
  });

  return { createExpense, status };
};

export const useGetFarmExpenses = (
  workspaceId: string | null,
  userId: string | null,
  farmId: string,
) => {
  const { data: expenses, status, error } = useQuery({
    queryKey: ["expenses", workspaceId, farmId],
    queryFn: async () => {
      const result = await getFarmDocs({
        collection: "expenses",
        workspaceId: workspaceId as string,
        userId: userId as string,
        farmId,
      });
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    enabled: !!workspaceId && !!userId && !!farmId,
    staleTime: EXPENSES_STALE_TIME,
  });

  return { expenses, error, status };
};

export const useGetExpenses = (
  workspaceId: string | null,
  userId: string | null,
) => {
  const { data: expenses, status, error } = useQuery({
    queryKey: ["expenses", workspaceId],
    queryFn: async () => {
      const result = await getDocs({
        collection: "expenses",
        workspaceId: workspaceId as string,
        userId: userId as string,
      });
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    enabled: !!workspaceId && !!userId,
    staleTime: EXPENSES_STALE_TIME,
  });

  return { expenses, error, status };
};