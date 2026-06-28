"use client";
import { useForm } from "react-hook-form";
import { infoFormSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import InfoField from "./InfoField";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { UserObjId } from "@/lib/types";
import { useApp } from "@/stores/useAppStore";
import { updateName, updateUserData } from "@/servers/user-action";
import { useState } from "react";
import { toast } from "sonner";
import ButtonLoader from "@/components/layout/ButtonLoader";
import { useRouter } from "next/navigation";
export default function ProfileInformation({ user }: { user: UserObjId }) {
  const { role, setUser } = useApp();
  const router = useRouter();
  const [load, setLoad] = useState(false);
  const form = useForm<z.infer<typeof infoFormSchema>>({
    resolver: zodResolver(infoFormSchema),
    defaultValues: {
      email: user.email,
      fullName: user.fullName,
      role: role
        ? `${role === "owner" ? "Farm" : ""} ${role?.slice(0, 1).toUpperCase() + role?.slice(1)}`
        : "",
    },
  });
  async function onSubmit(values: z.infer<typeof infoFormSchema>) {
    try {
      setLoad(true);

      const updateObj: Record<string, string | undefined> = {
        fullName: values.fullName,
        avatar: user.avatar,
      };

      await updateName(values.fullName);
      const {data:u} = await updateUserData(updateObj, user.id);
      setUser(u?u:null);
      toast("Profile updated successfully", {
        description: "Your name has been updated",
      });
      setLoad(false);
      router.refresh();
    } catch (error) {
      setLoad(false);
      toast("Error updating profile", {
        description: (error as Error).message,
      });
    }
  }
  return (
    <div className="flex flex-col  gap-4 border border-border  rounded-md  p-4 shadow-xs bg-white">
      <div className="space-y-1">
        <h3 className="text-dark-500 text-sm">Profile Information</h3>
        <p className="text-zinc-500 text-xs">
          Update your personal information
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4   w-full "
        >
          <InfoField
            label="Full Name"
            placeholder="Enter full name..."
            name="fullName"
            control={form.control}
          />
          <InfoField
            label="Email Address"
            placeholder="Enter email address..."
            name="email"
            control={form.control}
            disable={true}
          />
          <InfoField
            label="Role"
            placeholder="Enter role..."
            name="role"
            control={form.control}
            disable={true}
          />
          <div className="flex items-center gap-4 relative justify-start">
            <Button
              disabled={load}
              className="bg-primary-green w-[48%] sm:w-fit font-medium cursor-pointer text-white rounded-sm"
            >
              {load ? (
                <>
                  <ButtonLoader />
                  Saving...
                </>
              ) : (
                <div className="flex items-center gap-2">Save Changes</div>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
