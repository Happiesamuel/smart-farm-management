"use client";
import { updateUser } from "@/servers/user-action";
import { useMutation } from "@tanstack/react-query";

export function useUpdateUser() {
  const { mutate: update, status } = useMutation({
    mutationFn: async ({
      obj,
      userId,
    }: {
      obj: Record<string, string>;
      userId: string;
    }) => await updateUser(obj, userId),
  });

  return { update, status };
}
