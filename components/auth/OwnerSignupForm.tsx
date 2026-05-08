"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { signupFormSchema } from "@/lib/schemas";
import Link from "next/link";
import SignupField from "./SignupField";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { FaRegUser } from "react-icons/fa6";
import { MdLockOutline, MdOutlineEmail } from "react-icons/md";
import { useState } from "react";
import { LuPhone } from "react-icons/lu";
import { Checkbox } from "../ui/checkbox";

export function OwnerSignupForm() {
  //   const { create, status } = useCreateUser();
  const router = useRouter();
  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
  });

  async function onSubmit(values: z.infer<typeof signupFormSchema>) {
    // try {
    //   const newVal = {
    //     email: values.email,
    //     password: values.password,
    //     name: values.username,
    //   };
    //   create(newVal, {
    //     onSuccess: async () => {
    //       await account.createEmailPasswordSession(
    //         values.email,
    //         values.password
    //       );
    //       await account.createVerification(
    //         `${process.env.NEXT_PUBLIC_URL!}/verify`
    //       );
    //       toast("User created successfully", {
    //         description:
    //           "A verification link has been sent to your email address.",
    //         duration: 4000,
    //         closeButton: true,
    //       });
    //       router.push("/login");
    //     },
    //     onError: (err) =>
    //       toast("Error Signing up", {
    //         description: err.message,
    //         duration: 4000,
    //         closeButton: true,
    //       }),
    //   });
    // } catch (error) {
    //   toast("Error Signing up", {
    //     description: (error as Error).message,
    //     duration: 4000,
    //     closeButton: true,
    //   });
    // }
  }
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  function handleClick() {
    setShow(!show);
  }
  function handleClick2() {
    setShow2(!show);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 md:space-y-4 pt-10 w-[98%] md:w-[80%] mx-auto"
      >
        <SignupField
          name="fullName"
          type="text"
          placeholder="Enter your full name"
          label="Full name"
          control={form.control}
          Icon={FaRegUser}
        />
        <SignupField
          name="email"
          type="email"
          placeholder="Enter your email"
          label="Email"
          control={form.control}
          Icon={MdOutlineEmail}
        />

        <SignupField
          name="phone"
          type="text"
          placeholder="Enter your phone number"
          label="Phone number"
          control={form.control}
          Icon={LuPhone}
        />

        <SignupField
          name="password"
          onclick={handleClick}
          type={!show ? "password" : "text"}
          placeholder="Create a password"
          label="Password"
          control={form.control}
          Icon={MdLockOutline}
        />
        <SignupField
          name="confirmPassword"
          onclick={handleClick2}
          type={!show2 ? "password" : "text"}
          placeholder="Confirm your password"
          label="Confirm password"
          control={form.control}
          Icon={MdLockOutline}
        />
        <div>
          <div className="flex items-end text-zinc-700 justify-between py-2">
            <div className="flex items-center gap-2">
              <Checkbox className="border-primary-green" />
              <p className="text-zinc-500 text-center text-xs">
                I agree to the
                <span className="text-primary-green font-medium">
                  {" "}
                  Terms of Use
                </span>{" "}
                and{" "}
                <span className="text-primary-green font-medium">
                  Privacy Policy
                </span>
              </p>
            </div>
          </div>
        </div>
        <Button
          type="submit"
          className="text-white bg-primary-green h-10 rounded-md w-full cursor-pointer border-none"
        >
          {" "}
          Create account
          {/* {status === "pending" || load ? <ButtonLoader /> : "Submit"} */}
        </Button>
      </form>
    </Form>
  );
}
