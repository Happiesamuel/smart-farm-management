"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { resetPasswordFormSchema } from "@/lib/schemas";
import { MdLockOutline } from "react-icons/md";
import { useLogin } from "@/hooks/auth/useLogin";
import { toast } from "sonner";
import ButtonLoader from "../layout/ButtonLoader";
import PasswordField from "./PasswodFields";
import { UserObjId } from "@/lib/types";
import { changePassword, logout } from "@/servers/auth-actions";
import Cookies from "js-cookie";
import { updateUser } from "@/servers/user-action";
export function PasswordForm({ user }: { user: UserObjId }) {
  const { loginUser, status } = useLogin();
  const router = useRouter();
  const form = useForm<z.infer<typeof resetPasswordFormSchema>>({
    resolver: zodResolver(resetPasswordFormSchema),
  });

  async function onSubmit(values: z.infer<typeof resetPasswordFormSchema>) {
    try {
      // 1. Allow temporary bypass
      Cookies.set("bypass", "true", { path: "/" });

      loginUser(
        { email: user.email, password: user.password },
        {
          onSuccess: async () => {
            // 2. Change password
            await changePassword(user.password, values.password);
            await updateUser({ password: values.password }, user.id);
            toast("Password changed successfully", {
              description: "You can now log in with your new password",
            });

            // 3. Logout + cleanup
            await logout();

            Cookies.remove("bypass");
            localStorage.removeItem("user");

            router.replace("/owner/login");
          },
          onError: (err) => {
            Cookies.remove("bypass");

            toast("Error changing password", {
              description: err.message,
            });
          },
        },
      );
    } catch (error) {
      Cookies.remove("bypass");

      toast("Error changing password", {
        description: (error as Error).message,
      });
    }
  }
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  function handleClick() {
    setShow(!show);
  }
  function handleClick2() {
    setShow2(!show2);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 md:space-y-4 pt-10 w-[98%] md:w-[80%] mx-auto"
      >
        <PasswordField
          name="password"
          onclick={handleClick}
          type={!show ? "password" : "text"}
          placeholder="Enter your password"
          label="Password"
          control={form.control}
          Icon={MdLockOutline}
        />
        <PasswordField
          name="confirmPassword"
          onclick={handleClick2}
          type={!show2 ? "password" : "text"}
          placeholder="Enter your password"
          label="Confirm Password"
          control={form.control}
          Icon={MdLockOutline}
        />

        <Button
          type="submit"
          disabled={status === "pending"}
          className="disabled:opacity-70 text-white transition-all duration-200 bg-primary-green h-10 rounded-md w-full cursor-pointer border-none flex items-center justify-center gap-2"
        >
          {status === "pending" ? (
            <>
              <ButtonLoader />
              Submittimg...
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </Form>
  );
}
