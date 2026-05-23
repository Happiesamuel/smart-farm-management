"use client";

import { REGEXP_ONLY_DIGITS } from "input-otp";

import { Field } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { ChangeEvent, useEffect, useState } from "react";
import { Button } from "../ui/button";
import ButtonLoader from "../layout/ButtonLoader";
import { useResendOtp, useValidateOtp } from "@/hooks/auth/useSignUp";
import { toast } from "sonner";

export default function OTPForm({ email, id }: { email: string; id: string }) {
  const { resend, status: resendStat, error: resendErr } = useResendOtp();
  const {
    validate,
    status: validateStat,
    error: validateErr,
  } = useValidateOtp();
  const [otpError, setOtpError] = useState(false);
  const [timer, setTimer] = useState(300);
  const [disabled, setDisabled] = useState(true);
  const [otp, setOtp] = useState("");

  const startOtpTimer = () => {
    const newStart = Date.now();
    localStorage.setItem("otp_start_time", newStart.toString());
  };

  useEffect(() => {
    const storedStart = localStorage.getItem("otp_start_time");

    if (!storedStart) {
      localStorage.setItem("otp_start_time", Date.now().toString());
    }
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      const stored = localStorage.getItem("otp_start_time");
      if (!stored) return;

      const startTime = Number(stored);
      const expiryTime = startTime + 5 * 60 * 1000;

      const remaining = Math.max(
        0,
        Math.floor((expiryTime - Date.now()) / 1000),
      );

      setTimer(remaining);
      setDisabled(remaining > 0);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  const formattedTime = `${minutes.toString().padStart(2, "0")} : ${seconds
    .toString()
    .padStart(2, "0")}`;

  const handleResendOtp = async () => {
    resend(
      { userId: id, email: email },
      {
        onSuccess: () => {
          startOtpTimer();

          setDisabled(true);

          toast("OTP sent", {
            description: "A new OTP has been sent to your email",
            duration: 4000,
            closeButton: true,
          });
        },
        onError: () => {
          toast("Failed", {
            description: resendErr?.message || "Failed",
            duration: 4000,
            closeButton: true,
          });
        },
      },
    );
  };

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (otp.length !== 6) {
      setOtpError(true);
      return;
    }
    setOtpError(false);
    validate(
      { userId: id, otp: otp },
      {
        onSuccess: () => {
          toast("OTP verified", {
            description: "Create your workspace to continue",
            duration: 4000,
            closeButton: true,
          });
        },
        onError: () => {
          setOtpError(true);
          toast("Failed", {
            description: validateErr?.message || "Failed",
            duration: 4000,
            closeButton: true,
          });
        },
      },
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <Field className="w-fit space-y-6 mt-12">
        <InputOTP
          value={otp}
          onChange={(value) => setOtp(value)}
          id="digits-only"
          maxLength={6}
          pattern={REGEXP_ONLY_DIGITS}
        >
          <InputOTPGroup className="flex items-center gap-4">
            {Array.from({ length: 6 }, (v, i) => (
              <InputOTPSlot
                onChange={(value: ChangeEvent<HTMLDivElement, Element>) => {
                  setOtp(value as unknown as string);
                  if (otpError) setOtpError(false);
                }}
                className={`border  ${otpError ? "border-red-500" : "border-dark/15"}  size-10 rounded-md data-[active=true]:border-primary-green`}
                index={i}
                key={i + 1}
              />
            ))}
          </InputOTPGroup>
        </InputOTP>

        <p className="text-center text-sm text-zinc-500">
          Code expires in{" "}
          <span className="text-primary-green font-semibold">
            {" "}
            {formattedTime}
          </span>
        </p>

        <Button
          type="submit"
          disabled={validateStat === "pending"}
          className="disabled:opacity-70 text-white transition-all duration-200 bg-primary-green h-10 rounded-md w-full cursor-pointer border-none flex items-center justify-center gap-2"
        >
          {validateStat === "pending" ? (
            <>
              <ButtonLoader />
              Verifying...
            </>
          ) : (
            "Verify Code"
          )}
        </Button>

        <div className="flex justify-center items-center pt-2 font-medium text-dark/90 gap-1 text-sm">
          <p>Didn&apos;t recieve code?</p>
          <button
            type="reset"
            disabled={disabled}
            onClick={handleResendOtp}
            className="cursor-pointer text-primary-green disabled:text-primary-green/50"
          >
            Resend Code
          </button>
        </div>
      </Field>
    </form>
  );
}
