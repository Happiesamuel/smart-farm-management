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

export function OwnerLoginFom() {
  const [load, setLoad] = useState(false);
  //   const { login, status } = useLogin();
  const router = useRouter();
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
  });

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    // try {
    //   setLoad(true);
    //   const existingUser = await getGuestViaEmail(values.email);
    //   setLoad(false);
    //   if (!existingUser) {
    //     return toast("Error logging in", {
    //       description: "User not found",
    //       duration: 4000,
    //       closeButton: true,
    //     });
    //   } else if (existingUser.password !== values.password) {
    //     return toast("Error logging in", {
    //       description: "User Password is incorrect!",
    //       duration: 4000,
    //       closeButton: true,
    //     });
    //   } else
    //     login(values, {
    //       onSuccess: () => {
    //         toast("Signed in successfully", {
    //           description: "User is signed in!",
    //           duration: 4000,
    //           closeButton: true,
    //         });
    //         router.push("/");
    //       },
    //       onError: (err) =>
    //         toast("Error logging in", {
    //           description: err.message,
    //           duration: 4000,
    //           closeButton: true,
    //         }),
    //     });
    // } catch (error) {
    //   setLoad(false);
    //   console.log(error);
    // }
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
        <div>
          <Field
            name="password"
            type="password"
            placeholder="Enter your password"
            label="Password"
            control={form.control}
            Icon={MdLockOutline}
          />
          <div className="flex items-end text-zinc-700 justify-between py-2">
            <div className="flex items-center gap-2">
              <Checkbox className="border-primary-green" />
              <p className="text-sm text-zinc-500 font-medium">Remember me</p>
            </div>

            <Link
              href="/forgot-password"
              className="text-sm text-primary-green font-medium cursor-pointer"
            >
              Forgotten Password?
            </Link>
          </div>
        </div>
        <Button
          type="submit"
          className="text-white bg-primary-green h-10 rounded-md w-full cursor-pointer border-none"
        >
          {" "}
          Sign in
          {/* {status === "pending" || load ? <ButtonLoader /> : "Submit"} */}
        </Button>
      </form>
    </Form>
  );
}
