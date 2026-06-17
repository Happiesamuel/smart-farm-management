"use client";
import { login } from "@/servers/auth-actions";
import { useMutation } from "@tanstack/react-query";

export function useLogin() {
  const { mutate: loginUser, status } = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => await login(email, password),
  });

  return { loginUser, status };
}
