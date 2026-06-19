"use client";

import { updateLastSeen } from "@/servers/workspace-action";

export const safeUpdateLastSeen = async (userId: string) => {
  const now = Date.now();

  const lastUpdate = Number(localStorage.getItem("lastSeenUpdate") || 0);

  if (now - lastUpdate < 60000) return;

  localStorage.setItem("lastSeenUpdate", now.toString());

  await updateLastSeen(userId);
};
