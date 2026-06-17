"use client";
import { FieldInfo } from "@/lib/types";
import { createDoc, getDocs, getFarmDocs } from "@/servers/crud-actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateField = () => {
  const queryClient = useQueryClient();

  const { mutate: createField, status } = useMutation({
    mutationFn: (data: {
      workspaceId: string;
      userId: string;
      data: Omit<FieldInfo, "id" | "workspaces" | "users">;
    }) =>
      createDoc({
        ...data,
        collection: "fields",
      }),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["fields", variables.workspaceId],
      });
    },
  });
  return { createField, status };
};
export const useGetFarmFields = (
  workspaceId: string | null,
  userId: string | null,
  farmId: string,
) => {
  const {
    data: fields,
    status,
    error,
  } = useQuery({
    queryKey: ["fields", workspaceId, farmId],
    queryFn: () =>
      getFarmDocs({
        collection: "fields",
        workspaceId: workspaceId as string,
        userId: userId as string,
        farmId: farmId as string,
      }),
    enabled: !!workspaceId && !!userId && !!farmId,
  });
  return { fields, error, status };
};
export const useGetFields = (
  workspaceId: string | null,
  userId: string | null,
) => {
  const {
    data: fields,
    status,
    error,
  } = useQuery({
    queryKey: ["fields", workspaceId],
    queryFn: () =>
      getDocs({
        collection: "fields",
        workspaceId: workspaceId as string,
        userId: userId as string,
      }),
    enabled: !!workspaceId && !!userId,
  });
  return { fields, error, status };
};
