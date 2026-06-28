"use client";
import { FieldInfo } from "@/lib/types";
import { createDoc, getDocs, getFarmDocs } from "@/servers/crud-actions";
import { getSingleFieldDocs } from "@/servers/farm-actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const FIELDS_STALE_TIME = 1000 * 60 * 10; // 10 minutes

export const useCreateField = () => {
  const queryClient = useQueryClient();

  const { mutate: createField, status } = useMutation({
    mutationFn: async (data: {
      workspaceId: string;
      userId: string;
      data: Omit<FieldInfo, "id" | "workspaces" | "users">;
    }) => {
      const result = await createDoc({ ...data, collection: "fields" });
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["fields", variables.workspaceId] });
    },
  });

  return { createField, status };
};

export const useGetFarmFields = (
  workspaceId: string | null,
  userId: string | null,
  farmId: string,
) => {
  const { data: fields, status, error } = useQuery({
    queryKey: ["fields", workspaceId, farmId],
    queryFn: async () => {
      const result = await getFarmDocs({
        collection: "fields",
        workspaceId: workspaceId as string,
        userId: userId as string,
        farmId: farmId as string,
      });
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    enabled: !!workspaceId && !!userId && !!farmId,
    staleTime: FIELDS_STALE_TIME,
  });

  return { fields, error, status };
};

export const useGetFields = (
  workspaceId: string | null,
  userId: string | null,
) => {
  const { data: fields, status, error } = useQuery({
    queryKey: ["fields", workspaceId],
    queryFn: async () => {
      const result = await getDocs({
        collection: "fields",
        workspaceId: workspaceId as string,
        userId: userId as string,
      });
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    enabled: !!workspaceId && !!userId,
    staleTime: FIELDS_STALE_TIME,
  });

  return { fields, error, status };
};

export const useGetSingleField = (
  workspaceId: string | null,
  userId: string | null,
  farmId: string,
  fieldId: string,
) => {
  const { data: field, status, error } = useQuery({
    queryKey: ["fields", workspaceId, farmId, fieldId],
    queryFn: async () => {
      const result = await getSingleFieldDocs({
        collection: "fields",
        workspaceId: workspaceId as string,
        userId: userId as string,
        farmId,
        fieldId,
      });
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    enabled: !!workspaceId && !!userId && !!farmId && !!fieldId,
    staleTime: FIELDS_STALE_TIME,
  });

  return { field, error, status };
};