"use client";
import { logout } from "@/servers/auth-actions";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function useLogout() {
  const router = useRouter();
  const { mutate: logoutUser, status } = useMutation({
    mutationFn: async () => await logout(),
    onSuccess: () => {
      router.push("/");
    },
  });

  return { logoutUser, status };
}
