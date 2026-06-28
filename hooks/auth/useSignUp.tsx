// auth-hooks.ts
"use client";

import { UserObj, WorkspaceObjId } from "@/lib/types";
import {
  createManagerUser,
  createWorkerUser,
  recreateOtp,
  validateOTP,
} from "@/servers/auth-actions";
import { useMutation } from "@tanstack/react-query";

export function useCreateManager() {
  const { mutate: create, status } = useMutation({
    mutationFn: async (obj: UserObj) => {
      const result = await createManagerUser(obj);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
  });

  return { create, status };
}

export function useCreateWorker() {
  const { mutate: create, status } = useMutation({
    mutationFn: async ({
      work,
      obj,
    }: {
      work: Omit<WorkspaceObjId, "users" | "workspaceId">;
      obj: UserObj;
    }) => {
      const result = await createWorkerUser(obj, work);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
  });

  return { create, status };
}

export function useResendOtp() {
  const { mutate: resend, status, error } = useMutation({
    mutationFn: async ({ email, userId }: { email: string; userId: string }) => {
      const result = await recreateOtp(email, userId);
      if (!result.success) throw new Error(result.error);
      return result;
    },
  });

  return { resend, status, error };
}

export function useValidateOtp() {
  const { mutate: validate, status, error } = useMutation({
    mutationFn: async ({ otp, userId }: { otp: string; userId: string }) => {
      const result = await validateOTP(userId, otp);
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
  });

  return { validate, status, error };
}