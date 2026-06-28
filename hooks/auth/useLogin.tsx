"use client";
import { login } from "@/servers/auth-actions";
import { useMutation } from "@tanstack/react-query";

export function useLogin() {
  const { mutate: loginUser, status } = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const result = await login(email, password);

      // Throw here (client-side) so onError still fires normally
      if (!result.success) throw new Error(result.error);

   return result.data;
    },
  });

  return { loginUser, status };
}