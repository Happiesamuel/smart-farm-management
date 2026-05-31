"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { signupFormSchema } from "@/lib/schemas";
import SignupField from "./SignupField";

import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { FaLinkSlash, FaRegUser } from "react-icons/fa6";
import { MdEngineering, MdLockOutline, MdOutlineEmail } from "react-icons/md";
import { useState } from "react";
import { LuPhone } from "react-icons/lu";
import { Checkbox } from "../ui/checkbox";
import ButtonLoader from "../layout/ButtonLoader";
import { useGetUserWithoutSeeion } from "@/hooks/useGetSession";
import { useGetWorkspaceByWorkspaceId } from "@/hooks/workspace/useWorkspace";
import { parseInviteDetails } from "@/lib/constants";
import GeneralLoader from "../loader/GeneralLoader";
import { UserObjId } from "@/lib/types";
import { useUpdateUser } from "@/hooks/auth/useUpdateUser";
import {
  changePassword,
  createWorkspaceMember,
  login,
  setupUserSessionAndProfile,
} from "@/servers/auth-actions";
import { createAdminClient } from "@/servers/appCli";
import { createSessionClient } from "@/servers/appwrite";
import { getWorkspaceMembersWithWorkspaceId } from "@/servers/workspace-action";

export function JoinWorkspaceForm({
  user,
  workspaceId,
}: {
  workspaceId: string;
  user: UserObjId;
}) {
  const { status, update } = useUpdateUser();
  const router = useRouter();
  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      fullName: user.fullName,
      email: user.email,
    },
  });
  const [checked, setChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  async function onSubmit(values: z.infer<typeof signupFormSchema>) {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const { confirmPassword, ...rest } = values;

      const { avatar } = await createAdminClient();

      const avatarUrl = avatar.getInitials({
        name: rest.fullName,
        width: 200,
        height: 200,
      });

      const data = { ...rest, avatar: avatarUrl };

      update(
        { obj: data, userId: user.id },
        {
          onSuccess: async () => {
            try {
              await setupUserSessionAndProfile({
                email: user.email,
                oldPassword: user.password,
                newPassword: data.password,
                fullName: data.fullName,
              });

              await createWorkspaceMember({
                users: user.id,
                workspaces: workspaceId,
                role: "worker",
                joinedAt: new Date().toISOString(),
              });

              toast("Joined workspace successfully", {
                description: "Proceed to select workspace.",
                duration: 4000,
                closeButton: true,
              });
            } catch (err) {
              toast("Error setting up account", {
                description: (err as Error).message,
                duration: 4000,
                closeButton: true,
              });
            } finally {
              setIsSubmitting(false);
            }
          },

          onError: (err) => {
            setIsSubmitting(false);

            toast("Error joining workspace", {
              description: err.message,
              duration: 4000,
              closeButton: true,
            });
          },
        },
      );
    } catch (error) {
      setIsSubmitting(false);

      toast("Error joining workspace", {
        description: (error as Error).message,
        duration: 4000,
        closeButton: true,
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
          disable={true}
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
              <Checkbox
                onCheckedChange={() => setChecked(!checked)}
                className="border-[#f0782d] data-checked:border-[#f0782d] data-checked:bg-[#f0782d]"
              />
              <p className="text-zinc-500 text-center text-xs">
                I agree to the
                <span className="text-[#f0782d] font-medium">
                  {" "}
                  Terms of Use
                </span>{" "}
                and{" "}
                <span className="text-[#f0782d] font-medium">
                  Privacy Policy
                </span>
              </p>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          disabled={status === "pending" || checked === false || isSubmitting}
          className="disabled:opacity-70 text-white transition-all duration-200 bg-[#f0782d] h-10 rounded-md w-full cursor-pointer border-none flex items-center justify-center gap-2"
        >
          {status === "pending" ? (
            <>
              <ButtonLoader />
              Joining...
            </>
          ) : (
            "Join workspace"
          )}
        </Button>
      </form>
    </Form>
  );
}

export function JoinWorkspace({
  workspaceId,
  parsed,
}: {
  workspaceId: string;
  parsed: { inviteCode: string; userId: string };
}) {
  const { userId } = parsed;

  const { data, userStat } = useGetUserWithoutSeeion(userId);
  const { workspace, status } = useGetWorkspaceByWorkspaceId(workspaceId);

  if (userStat === "pending" || status === "pending") {
    return <GeneralLoader>Verifying invitation...</GeneralLoader>;
  }

  if (!data || !workspace) {
    return (
      <div className="flex items-center flex-col gap-2 justify-center h-[50vh] lg:h-full">
        <div className="bg-[#f0782d]/10 size-16 flex items-center justify-center rounded-full">
          <FaLinkSlash className="text-[#f0782d] text-3xl" />
        </div>
        <div className="flex items-center justify-center flex-col ">
          <p className="text-red-500 font-medium text-lg">Invite not found</p>
          <p className="text-dark/90 font-medium text-xl">Ask for a new link</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 overflow-scroll no-scroll  lg:max-h-[94vh] lg:pt-28 relative items-center justify-center  flex-col">
      <div className="flex items-center justify-center flex-col gap-2">
        <div className="bg-[#f0782d]/10 size-16 flex items-center justify-center rounded-full">
          <MdEngineering className="text-[#f0782d] text-3xl" />
        </div>
        <div className="text-center space-y-1">
          <h3 className="font-semibold text-xl lg:text-3xl text-dark/90">
            Join workspace
          </h3>
          <p className="text-sm lg:text-base text-zinc-500 font-normal">
            You have been invited to join {workspace.name} workspace
          </p>
        </div>
      </div>

      <JoinWorkspaceForm workspaceId={workspaceId} user={data} />
    </div>
  );
}
export function WorkspaceChecker() {
  const params = useParams();

  const workspaceId = params.workspaceId as string;
  const userDetails = params.userDetails as string;

  const parsed = parseInviteDetails(userDetails);

  if (!parsed) {
    return (
      <div className="flex items-center flex-col gap-2 justify-center h-[50vh] lg:h-full">
        <div className="bg-[#f0782d]/10 size-16 flex items-center justify-center rounded-full">
          <FaLinkSlash className="text-[#f0782d] text-3xl" />
        </div>
        <div className="flex items-center justify-center flex-col ">
          <p className="text-red-500 font-medium text-lg">
            Invalid invite link
          </p>
          <p className="text-dark/90 font-medium text-xl">Ask for a new link</p>
        </div>
      </div>
    );
  }

  return <JoinWorkspace workspaceId={workspaceId} parsed={parsed} />;
}
