"use client";

import { getCurrentUser, getGuestById } from "@/servers/user-action";
import { useQuery } from "@tanstack/react-query";

export default function useGetSession() {
  const {
    data: user,
    status,
    error,
    refetch,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        return await getCurrentUser();
      } catch (error) {
        throw error;
      }
    },
    enabled: true,
  });

  return { user, status, error, refetch };
}

export function useGetUser() {
  const { user, status } = useGetSession();
  const {
    data,
    status: userStat,
    error,
  } = useQuery({
    queryKey: ["guest"],
    queryFn: async () => await getGuestById(user?.id),
    staleTime: 1000 * 60 * 10,
    enabled: status !== "pending",
  });

  return { data, userStat, error };
}
