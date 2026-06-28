// update-user-hook.ts
"use client";
import { updateUser } from "@/servers/user-action";
import { useMutation } from "@tanstack/react-query";

export function useUpdateUser() {
  const { mutate: update, status } = useMutation({
    mutationFn: async ({ obj, userId }: { obj: Record<string, string>; userId: string }) => {
      const result = await updateUser(obj, userId);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
  });

  return { update, status };
}