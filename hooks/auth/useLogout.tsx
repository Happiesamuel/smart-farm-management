// logout-hook.ts
"use client";
import { logout } from "@/servers/auth-actions";
import { useApp } from "@/stores/useAppStore";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useLogout() {
  const { clearAll } = useApp();

  const { mutate: logoutUser, status } = useMutation({
    mutationFn: async () => {
      const result = await logout();
      if (!result.success) throw new Error(result.error);
      return result;
    },
    onSuccess: () => {
      clearAll();
      window.location.href = "/";
      toast("Logged out successfully", {
        description: "You have been logged out.",
      });
    },
    onError: (err) => {
      clearAll();
      toast("Logout Failed", {
        description: err.message || "Failed to logout",
      });
    },
  });

  return { logoutUser, status };
}