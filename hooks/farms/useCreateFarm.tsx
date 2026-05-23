"use client";

import { FarmObj } from "@/lib/types";
import { createFarm } from "@/servers/farm-actions";
import { useMutation } from "@tanstack/react-query";

export function useCreateFarm() {
  const {
    mutate: create,
    status,
    error,
  } = useMutation({
    mutationFn: async (obj: FarmObj) => await createFarm(obj),
  });

  return { create, status, error };
}
