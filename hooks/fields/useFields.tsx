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
  workspaceId: string,
  userId: string,
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
        workspaceId,
        userId,
        farmId,
      }),
    enabled: !!workspaceId && !!userId && !!farmId,
  });
  return { fields, error, status };
};
export const useGetFields = (workspaceId: string, userId: string) => {
  const {
    data: fields,
    status,
    error,
  } = useQuery({
    queryKey: ["fields", workspaceId],
    queryFn: () =>
      getDocs({
        collection: "fields",
        workspaceId,
        userId,
      }),
  });
  return { fields, error, status };
};
