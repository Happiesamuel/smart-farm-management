"use client";

import {
  getCurrentUser,
  getGuestByEmail,
  getGuestByGuestId,
  getGuestById,
} from "@/servers/user-action";
import { useMutation, useQuery } from "@tanstack/react-query";

const USER_STALE_TIME = 1000 * 60 * 10; // 10 minutes — user profile rarely changes

export default function useGetSession() {
  const { data: user, status, error, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: async () => await getCurrentUser(), // intentionally no { success } wrap — returns null on no session
    retry: false,
  });

  return { user, status, error, refetch };
}

export function useGetUser() {
  const { user, status } = useGetSession();

  const { data, status: userStat, error } = useQuery({
    queryKey: ["guest", user?.id],
    queryFn: async () => {
      const result = await getGuestById(user!.id);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    staleTime: USER_STALE_TIME,
    enabled: status === "success" && !!user?.id,
  });

  return { data, userStat, error };
}

export function useGetUserWithoutSession(userId: string) {
  const { data, status: userStat, error } = useQuery({
    queryKey: ["guest", userId],
    queryFn: async () => {
      const result = await getGuestByGuestId(userId);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    enabled: !!userId,
    staleTime: USER_STALE_TIME,
  });

  return { data, userStat, error };
}

export function useGetUserByEmail() {
  const { mutate: getUser, status } = useMutation({
    mutationFn: async ({ email }: { email: string }) => {
      const result = await getGuestByEmail(email);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
  });

  return { getUser, status };
}