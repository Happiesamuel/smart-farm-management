"use client";
import { ExpenseInfo } from "@/lib/types";
import { createDoc, getDocs, getFarmDocs } from "@/servers/crud-actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
export const useGetFarmExpenses = (
  workspaceId: string|null,
  userId: string|null,
  farmId: string,
) => {
  const {
    data: expenses,
    status,
    error,
  } = useQuery({
    queryKey: ["expenses", workspaceId, farmId],
    queryFn: () =>
      getFarmDocs({
        collection: "expenses",
        workspaceId:workspaceId as string,
        userId:userId as string,
        farmId,
      }),
    enabled: !!workspaceId && !!userId && !!farmId,
  });
  return { expenses, error, status };
};
export const useGetExpenses = (workspaceId: string|null, userId: string|null) => {
  const {
    data: expenses,
    status,
    error,
  } = useQuery({
    queryKey: ["expenses", workspaceId],
    queryFn: () =>
      getDocs({
        collection: "expenses",
        workspaceId:workspaceId as string,
        userId:userId as string,
      }),
      enabled: !!workspaceId && !!userId ,
  });
  return { expenses, error, status };
};
