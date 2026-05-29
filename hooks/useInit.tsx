"use client";

import { useEffect } from "react";
import { useApp } from "@/stores/useAppStore";
import { useGetUser } from "./useGetSession";

export function useInitApp() {
  const { setUser } = useApp();
  const { data, userStat, error } = useGetUser();

  useEffect(() => {
    if (userStat === "success" && data) {
      setUser(data);
    }

    if (userStat === "error" || error?.message) {
      setUser(null);
    }
  }, [userStat, data, setUser, error]);
}
