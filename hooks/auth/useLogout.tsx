"use client";
import { logout } from "@/servers/auth-actions";
import { useApp } from "@/stores/useAppStore";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useLogout() {
  const { clearAll } = useApp();
  const { mutate: logoutUser, status } = useMutation({
    mutationFn: async () => await logout(),
    onSuccess: () => {
      window.location.href = "/";
      toast("Logged out successfully", {
        description: "You can continue with your new password",
      });
      clearAll();
    },
    onError: (err) => {
      toast("Logout Failed", {
        description: err.message || "Failed to logout",
      });
      clearAll();
    },
  });

  return { logoutUser, status };
}
