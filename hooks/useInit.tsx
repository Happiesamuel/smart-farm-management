"use client";

import { useEffect } from "react";
import { useApp } from "@/stores/useAppStore";
import { useGetUser } from "./useGetSession";
import { safeUpdateLastSeen } from "./useLastSeen";

export function useInitApp() {
  const { setUser, setReady } = useApp();
  const { data, userStat, error } = useGetUser();

  useEffect(() => {
    if (userStat === "success" && data) {
      setUser(data);
      setReady(true);
      safeUpdateLastSeen(data.id);
    }

    if (userStat === "error" || error?.message) {
      setUser(null);
      setReady(true); // ✅ also mark ready on failure so app doesn't hang
    }
  }, [userStat, data, setUser, setReady, error]);
}
