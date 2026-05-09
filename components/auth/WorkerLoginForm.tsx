"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { workerLoginFormSchema } from "@/lib/schemas";
import { BsPersonWorkspace } from "react-icons/bs";
import { MdLockOutline, MdOutlineEmail } from "react-icons/md";
import { Checkbox } from "../ui/checkbox";
import WorkerLoginField from "./WorkerLoginField";

export function WorkerLoginFom() {
  const [load, setLoad] = useState(false);
  //   const { login, status } = useLogin();
  const router = useRouter();
  const form = useForm<z.infer<typeof workerLoginFormSchema>>({
    resolver: zodResolver(workerLoginFormSchema),
  });

  async function onSubmit(values: z.infer<typeof workerLoginFormSchema>) {
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
        <WorkerLoginField
          name="email"
          type="email"
          placeholder="Enter your email"
          label="Email"
          control={form.control}
          Icon={MdOutlineEmail}
        />

        <WorkerLoginField
          name="password"
          onclick={handleClick}
          type={!show ? "password" : "text"}
          placeholder="Enter your password"
          label="Password"
          control={form.control}
          Icon={MdLockOutline}
        />
        <WorkerLoginField
          name="workspaceId"
          type="text"
          placeholder="Enter workspace id"
          label="Workspace ID"
          control={form.control}
          Icon={BsPersonWorkspace}
        />
        <div className="flex items-end text-zinc-700 justify-between py-2">
          <div className="flex items-center gap-2">
            <Checkbox className="border-[#f0782d]" />
            <p className="md:text-sm text-xs text-zinc-500 font-medium">
              Remember me
            </p>
          </div>

          <Link
            href="/forgot-password"
            className="md:text-sm text-xs text-[#f0782d] font-medium cursor-pointer"
          >
            Forgotten Password?
          </Link>
        </div>
        <Button
          type="submit"
          className="text-white bg-[#f0782d] h-10 rounded-md w-full cursor-pointer border-none"
        >
          {" "}
          Sign in
          {/* {status === "pending" || load ? <ButtonLoader /> : "Submit"} */}
        </Button>
      </form>
    </Form>
  );
}
