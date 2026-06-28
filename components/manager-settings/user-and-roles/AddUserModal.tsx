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
import { FaRegUser, FaXmark } from "react-icons/fa6";
import { getGuestByEmail } from "@/servers/user-action";
import { useApp } from "@/stores/useAppStore";
import { inviteUser } from "@/lib/otp";
import { appwriteConfig } from "@/servers/appwrite-client";
import { checkUserInWorkspace } from "@/servers/workspace-action";
const userFormSchema = z.object({
  email: z
    .string({ message: "Please enter your email" })
    .email({ message: "Please enter a valid email address" }),
  fullName: z
    .string({ message: "Please enter full name" })
    .min(4, { message: "name name must be at least 4 characters." }),
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

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);
  const { create, status } = useCreateWorker();
  const { user, workspace } = useApp();
  const [load, setLoad] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
  });

  async function onSubmit(values: z.infer<typeof userFormSchema>) {
    if (values.email === user?.email) {
      setLoad(false);
      onClose();
      form.reset();

      return toast("Failed to send email", {
        description: "Cannot send email to your email",
      });
    }

    try {
      setLoad(true);

      const {data:guest} = await getGuestByEmail(values.email);

      // ✅ IF USER EXISTS → CHECK MEMBERSHIP FIRST
      if (guest) {
        const {data:alreadyJoined} = await checkUserInWorkspace({
          userId: guest.id,
          workspaceId: workspace!.id,
        });

        if (alreadyJoined) {
          setLoad(false);
          onClose();
          form.reset();

          return toast("User already in workspace", {
            description: "This user is already part of this workspace.",
          });
        }

        // ✅ SEND INVITE
        await inviteUser(
          guest.email,
          guest.fullName,
          workspace!.name,
          `${appwriteConfig.appUrl}/worker/join-workspace/${workspace!.id}/${workspace!.inviteCode}-${guest.id}-${guest.password !== "hs_password" ? "xyz" : "abc"}`,
        );

        setLoad(false);
        onClose();
        form.reset();

        return toast("Invite sent successfully", {
          description: "User has been invited to the workspace.",
        });
      }

      // ✅ IF USER DOES NOT EXIST → CREATE + INVITE
      const { users, workspaceId, ...rest } = workspace!;
      const newObj = {
        ...values,
        phone: "",
        password: "hs_password",
        lastSeen: new Date().toISOString(),
      };

      create(
        {
          work: rest,
          obj: newObj,
        },
        {
          onSuccess: async (newUser) => {
         
            try {
              // ✅ CHECK AGAIN AFTER CREATION (SAFETY)
              const {data:alreadyJoined} = await checkUserInWorkspace({
                userId: newUser!.id,
                workspaceId,
              });

              if (!alreadyJoined) {
                await inviteUser(
                  newUser!.email,
                  newUser!.name,
                  workspace!.name,
                  `${appwriteConfig.appUrl}/worker/join-workspace/${workspace!.id}/${workspace!.inviteCode}-${newUser!.id}-abc`,
                );
              }

              setLoad(false);
              onClose();
              form.reset();

              toast("User created & invited", {
                description: "Verification link sent to email.",
              });
            } catch (err) {
              setLoad(false);
              toast("Error sending invite", {
                description: (err as Error).message,
              });
            }
          },

          onError: (err) => {
            setLoad(false);
            toast("Error adding user", {
              description: err.message,
            });
          },
        },
      );
    } catch (error) {
      setLoad(false);
      onClose();

      toast("Error Adding user", {
        description: (error as Error).message,
      });
    }
  }
  // eghogho.odion@physci.uniben.edu
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
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-3  py-4  mx-auto max-w-[95%]">
                <FormField
                  control={form.control}
                  name={"fullName"}
                  render={({ field }) => (
                    <FormItem className="px-2.5 gap-1 md:px-5">
                      <FormLabel className="text-sm p-0 font-semibold text-dark/90">
                        Full name
                      </FormLabel>
                      <div className="flex items-center w-full justify-between">
                        <FormControl>
                          <div className="flex items-center justify-between h-10 px-2 border border-border/80 rounded-md w-full">
                            <FaRegUser className="text-lg text-primary-green " />
                            <Input
                              className="text-sm h-4 border-none rounded-none  "
                              type={"text"}
                              placeholder={"Enter user's full name"}
                              {...field}
                            />
                          </div>
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
              </div>
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
                  disabled={status === "pending" || load == true}
                  className="disabled:opacity-70 text-white transition-all duration-200 bg-primary-green  rounded-md  cursor-pointer border-none flex items-center justify-center px-6 gap-2"
                >
                  {status === "pending" || load === true ? (
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
