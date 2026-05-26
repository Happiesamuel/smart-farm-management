"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { json, z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";

import { emailFormSchema } from "@/lib/schemas";
import { toast } from "sonner";
import ButtonLoader from "../layout/ButtonLoader";
import { Input } from "../ui/input";
import { MdOutlineEmail } from "react-icons/md";
import { useGetUserByEmail } from "@/hooks/useGetSession";
import { sendOtp } from "@/lib/otp";
import { createOtp } from "@/servers/email-actions";

export function EmailForm() {
  const { getUser, status } = useGetUserByEmail();
  const router = useRouter();
  const form = useForm<z.infer<typeof emailFormSchema>>({
    resolver: zodResolver(emailFormSchema),
  });

  async function onSubmit(values: z.infer<typeof emailFormSchema>) {
    try {
      getUser(values, {
        onSuccess: async (user) => {
          const otp = await sendOtp(user.email);
          const a = await createOtp(otp, user.id);
          console.log(a);
          localStorage.setItem("user", JSON.stringify(user));
          toast("Email found!", {
            description:
              "A verification link has been sent to your email address.",
            duration: 4000,
            closeButton: true,
          });
          router.push(`/owner/verify-email`);
        },
        onError: (err) =>
          toast("Email not found", {
            description: err.message,
            duration: 4000,
            closeButton: true,
          }),
      });
    } catch (error) {
      toast("Email not found", {
        description: (error as Error).message,
        duration: 4000,
        closeButton: true,
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 md:space-y-4 pt-10 w-[98%] md:w-[80%] mx-auto"
      >
        <FormField
          control={form.control}
          name={"email"}
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-4 border border-border rounded-md px-4 py-2">
                <MdOutlineEmail className="text-xl text-primary-green" />
                <div className="flex items-center w-full justify-between">
                  <div className="w-full">
                    <FormLabel className="text-sm p-0 font-semibold text-dark/90">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="text-sm h-4 w-full rounded-none p-0 border-none"
                        placeholder={"Enter your email"}
                        {...field}
                      />
                    </FormControl>
                  </div>
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={status === "pending"}
          className="disabled:opacity-70 text-white transition-all duration-200 bg-primary-green h-10 rounded-md w-full cursor-pointer border-none flex items-center justify-center gap-2"
        >
          {status === "pending" ? (
            <>
              <ButtonLoader />
              Verifying...
            </>
          ) : (
            "Verify Email"
          )}
        </Button>
      </form>
    </Form>
  );
}
