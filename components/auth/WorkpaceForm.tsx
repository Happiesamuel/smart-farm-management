"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { usePathname, useRouter } from "next/navigation";
import { nanoid } from "nanoid";
import { workspaceFormSchema } from "@/lib/schemas";
import { BsPersonWorkspace } from "react-icons/bs";
import WorkspaceField from "./WorkspaceField";
import { RiUserCommunityLine } from "react-icons/ri";
import { toast } from "sonner";
import ButtonLoader from "../layout/ButtonLoader";
import { useCreateWorkspace } from "@/hooks/workspace/useWorkspace";
import { createWorkspaceMember } from "@/servers/auth-actions";

export function WorkspaceForm({ id }: { id: string }) {
  const { create, status, error } = useCreateWorkspace();
  const pathname = usePathname();
  const router = useRouter();
  const form = useForm<z.infer<typeof workspaceFormSchema>>({
    resolver: zodResolver(workspaceFormSchema),
  });

  const push =
    pathname === "/create-workspace" ? "/create-farm" : "/owner/create-farm";

  function callFunc(workspace: string) {
    if (pathname !== "/create-workspace") {
      sessionStorage.setItem("activeWorkspace", workspace);
    } else return;
  }

  async function onSubmit(values: z.infer<typeof workspaceFormSchema>) {
    try {
      const newObj = {
        ...values,
        inviteCode: nanoid(6),
        users: id,
      };

      create(
        { obj: newObj, slug: values.workspaceId },
        {
          onSuccess: async (data) => {
            await createWorkspaceMember({
              users: id,
              workspaces: data.id,
              role: "owner",
              joinedAt: new Date().toISOString(),
            });

            toast("Workspace created successfully", {
              description: "You can now proceed to creating your first farm",
            });
            localStorage.setItem("workspaceId", data.id);
            callFunc(values.workspaceId);

            setTimeout(() => {
              router.push(push);
            }, 100);
          },
          onError: (err) =>
            toast("Error creating workspace", {
              description: error?.message || err.message,
              duration: 4000,
              closeButton: true,
            }),
        },
      );
    } catch (error) {
      toast("Error creating workspace", {
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
        <WorkspaceField
          name="name"
          type="text"
          placeholder="Enter your workspace name"
          label="Workspace Name"
          control={form.control}
          Icon={RiUserCommunityLine}
        />
        <WorkspaceField
          name="workspaceId"
          type="text"
          placeholder="Example green-valley-farms"
          label="Workspace ID"
          control={form.control}
          Icon={BsPersonWorkspace}
        />

        <Button
          type="submit"
          disabled={status === "pending"}
          className="disabled:opacity-70 text-white transition-all duration-200 bg-primary-green h-10 rounded-md w-full cursor-pointer border-none flex items-center justify-center gap-2"
        >
          {status === "pending" ? (
            <>
              <ButtonLoader />
              Creating...
            </>
          ) : (
            "Create Wokspace"
          )}
        </Button>
      </form>
    </Form>
  );
}
