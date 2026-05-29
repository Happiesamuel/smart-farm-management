"use client";
import { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { toast } from "sonner";

import { useCreateWorker } from "@/hooks/auth/useSignUp";
import { Input } from "@/components/ui/input";
import ButtonLoader from "@/components/layout/ButtonLoader";
import { useRouter } from "next/navigation";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaXmark } from "react-icons/fa6";
import { getGuestByEmail } from "@/servers/user-action";
import { useApp } from "@/stores/useAppStore";
const userFormSchema = z.object({
  email: z
    .string({ message: "Please enter your email" })
    .email({ message: "Please enter a valid email address" }),
});

export default function AddUserModal() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button
        onClick={() => setOpen(true)}
        className="bg-primary-green w-full sm:w-fit cursor-pointer text-white rounded-sm"
      >
        <GoPlus />
        <p>Add User</p>
      </Button>
      <AddUserFormModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}

export function AddUserFormModal({
  open,
  onClose,
}: {
  onClose(): void;
  open: boolean;
}) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // cleanup (important)
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);
  const { create, status } = useCreateWorker();
  const { user } = useApp();
  const router = useRouter();
  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
  });

  async function onSubmit(values: z.infer<typeof userFormSchema>) {
    try {
      console.log(values);
      const guest = await getGuestByEmail(values.email);
      if (!guest) {
        console.log("fetch");
        //if no user...create acc in appwrite...create user table...send link to email...that enables user to update ther acc both in appwrit and user table and join/create workspacemember
        //  /worker/join-workspace/workspaceSlug/{workspaceInviteCode}-{newGuestId}-abc
      } else {
        if (guest.email === user?.email) {
          console.log(true);
        } else {
          console.log(guest, values);
          //if user exists send link diifent from first link..that enable users to just create workspacemember..or join workspcemember
          ///worker/join-workspace/workspaceSlug/{workspaceInviteCode}-{newGuestId}-xyz
        }
      }

      onClose();
      // form.reset();
      const newObj = { fullName: "", phone: "", email: "", password: "" };
      //   create(newObj, {
      //     onSuccess: async (user) => {
      //       toast("User added successfully", {
      //         description:
      //           "A verification link has been sent to user's email address.",
      //         duration: 4000,
      //         closeButton: true,
      //       });
      //     },
      //     onError: (err) =>
      //       toast("Error adding user", {
      //         description: err.message,
      //         duration: 4000,
      //         closeButton: true,
      //       }),
      //   });
    } catch (error) {
      toast("Error Signing up", {
        description: (error as Error).message,
        duration: 4000,
        closeButton: true,
      });
    }
  }

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-150 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 " />

      <div className="relative bg-white w-full max-w-[310px] sm:max-w-sm rounded-lg shadow-lg  animate-fadeIn">
        <div>
          <div className="pb-3 flex items-center pt-4 px-2.5 md:px-5 justify-between ">
            <p className="font-semibold text-base text-dark/90">Add User</p>
            <FaXmark onClick={onClose} className="text-xl cursor-pointer" />
          </div>
        </div>
        <div className="space-y-3">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-3 md:space-y-4 pt-4  mx-auto"
            >
              <FormField
                control={form.control}
                name={"email"}
                render={({ field }) => (
                  <FormItem className="px-2.5 gap-1 md:px-5">
                    <FormLabel className="text-sm p-0 font-semibold text-dark/90">
                      Email
                    </FormLabel>
                    <div className="flex items-center w-full justify-between">
                      <FormControl>
                        <div className="flex items-center justify-between h-10 px-2 border border-border/80 rounded-md w-full">
                          <MdOutlineMailOutline className="text-xl text-primary-green " />
                          <Input
                            className="text-sm h-4 border-none rounded-none  "
                            type={"email"}
                            placeholder={"Enter user's email"}
                            {...field}
                          />
                        </div>
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex rounded-b-xl px-2.5 md:px-5  items-center gap-2 justify-end bg-zinc-100 py-3">
                <Button
                  type="reset"
                  onClick={onClose}
                  className="cursor-pointer bg-transparent border border-border text-dark/90 px-6"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={status === "pending"}
                  className="disabled:opacity-70 text-white transition-all duration-200 bg-primary-green  rounded-md  cursor-pointer border-none flex items-center justify-center px-6 gap-2"
                >
                  {status === "pending" ? (
                    <>
                      <ButtonLoader />
                      Adding user...
                    </>
                  ) : (
                    "Add User"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
