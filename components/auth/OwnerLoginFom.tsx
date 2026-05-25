"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { loginFormSchema } from "@/lib/schemas";
import Field from "./Field";
import { MdLockOutline, MdOutlineEmail } from "react-icons/md";
import { Checkbox } from "../ui/checkbox";
import { useLogin } from "@/hooks/auth/useLogin";
import { toast } from "sonner";
import ButtonLoader from "../layout/ButtonLoader";

export function OwnerLoginFom() {
  const { loginUser, status } = useLogin();
  const router = useRouter();
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
  });

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    try {
      loginUser(values, {
        onSuccess: async (user) => {
          toast("Logged in successfully", {
            description: "Select a workspace to continue managing your farm.",
            duration: 4000,
            closeButton: true,
          });

          router.push(`/select-workspace`);
        },
        onError: (err) =>
          toast("Error logging in", {
            description: err.message,
            duration: 4000,
            closeButton: true,
          }),
      });
    } catch (error) {
      toast("Error logging in", {
        description: (error as Error).message,
        duration: 4000,
        closeButton: true,
      });
    }
  }
  const [show, setShow] = useState(false);
  function handleClick() {
    setShow(!show);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 md:space-y-4 pt-10 w-[98%] md:w-[80%] mx-auto"
      >
        <Field
          name="email"
          type="email"
          placeholder="Enter your email"
          label="Email"
          control={form.control}
          Icon={MdOutlineEmail}
        />

        <Field
          name="password"
          onclick={handleClick}
          type={!show ? "password" : "text"}
          placeholder="Enter your password"
          label="Password"
          control={form.control}
          Icon={MdLockOutline}
        />

        <div className="flex items-end text-zinc-700 justify-between py-2">
          <div className="flex items-center gap-2">
            <Checkbox className="border-primary-green" />
            <p className="md:text-sm text-xs text-zinc-500 font-medium">
              Remember me
            </p>
          </div>

          <Link
            href="/forgot-password"
            className="md:text-sm text-xs text-primary-green font-medium cursor-pointer"
          >
            Forgotten Password?
          </Link>
        </div>
        <Button
          type="submit"
          disabled={status === "pending"}
          className="disabled:opacity-70 text-white transition-all duration-200 bg-primary-green h-10 rounded-md w-full cursor-pointer border-none flex items-center justify-center gap-2"
        >
          {status === "pending" ? (
            <>
              <ButtonLoader />
              Signing in...
            </>
          ) : (
            "Sign in"
          )}
        </Button>
      </form>
    </Form>
  );
}
