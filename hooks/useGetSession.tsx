"use client";

import {
  getCurrentUser,
  getGuestByEmail,
  getGuestByGuestId,
  getGuestById,
} from "@/servers/user-action";
import { useMutation, useQuery } from "@tanstack/react-query";

export default function useGetSession() {
  const {
    data: user,
    status,
    error,
    refetch,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => await getCurrentUser(),
    retry: false,
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
    queryKey: ["guest", user?.id],
    queryFn: async () => await getGuestById(user!.id),
    staleTime: 1000 * 60 * 10,
    enabled: status === "success" && !!user?.id,
  });

  return { data, userStat, error };
}
export function useGetUserWithoutSeeion(userId: string) {
  const {
    data,
    status: userStat,
    error,
  } = useQuery({
    queryKey: ["guest", userId],
    queryFn: async () => await getGuestByGuestId(userId),
    enabled: !!userId,
  });

  return { data, userStat, error };
}

export function useGetUserByEmail() {
  const { mutate: getUser, status } = useMutation({
    mutationFn: async ({ email }: { email: string }) =>
      await getGuestByEmail(email),
  });

  return { getUser, status };
}
