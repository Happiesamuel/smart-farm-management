"use client";

import { UserObj } from "@/lib/types";
import {
  createManagerUser,
  recreateOtp,
  validateOTP,
} from "@/servers/auth-actions";
import { useMutation } from "@tanstack/react-query";

export function useCreateManager() {
  const { mutate: create, status } = useMutation({
    mutationFn: async (obj: UserObj) => await createManagerUser(obj),
  });

  return { create, status };
}
export function useResendOtp() {
  const {
    mutate: resend,
    status,
    error,
  } = useMutation({
    mutationFn: async ({ email, userId }: { email: string; userId: string }) =>
      await recreateOtp(email, userId),
  });

  return { resend, status, error };
}
export function useValidateOtp() {
  const {
    mutate: validate,
    status,
    error,
  } = useMutation({
    mutationFn: async ({ otp, userId }: { otp: string; userId: string }) =>
      await validateOTP(userId, otp),
  });

  return { validate, status, error };
}
