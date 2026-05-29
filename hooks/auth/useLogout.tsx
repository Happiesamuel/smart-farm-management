"use client";
import { logout } from "@/servers/auth-actions";
import { useApp } from "@/stores/useAppStore";
import { useMutation } from "@tanstack/react-query";

export function useLogout() {
  const { clearAll } = useApp();
  const { mutate: logoutUser, status } = useMutation({
    mutationFn: async () => await logout(),
    onSuccess: () => {
      window.location.href = "/";
      clearAll();
    },
  });

  return { logoutUser, status };
}
