"use client";
import { profileFormSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import ProfileFormField from "./PofileFormField";
import { Form } from "@/components/ui/form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { changePassword } from "@/servers/auth-actions";
import { updateUser } from "@/servers/user-action";
import { UserObjId } from "@/lib/types";
import ButtonLoader from "@/components/layout/ButtonLoader";
import { safeUpdateLastSeen } from "@/hooks/useLastSeen";

export default function ProfileForm({ user }: { user: UserObjId }) {
  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
      curPassword: "",
    },
  });
  const [currentPassword, setCurrentPassword] = useState(false);
  const [newPassword, setNewPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [load, setLoad] = useState(false);
  async function onSubmit(values: z.infer<typeof profileFormSchema>) {
    try {
      setLoad(true);

      await changePassword(values.curPassword, values.password);
      await updateUser({ password: values.password }, user.id);
      safeUpdateLastSeen(user.id);
      toast("Password changed successfully", {
        description: "You can continue with your new password",
      });
      form.reset();
      setLoad(false);
    } catch (error) {
      setLoad(false);
      toast("Error changing password", {
        description: (error as Error).message,
      });
    }
  }
  return (
    <div className="w-full p-4 mt-2 cursor-pointer  bg-white  relative rounded-md border border-border/80 hover:shadow-sm transition shrink-0">
      <h6 className="text-base text-dark/90 pb-4 font-medium">
        Change Password
      </h6>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="pt-2 space-y-5 w-full"
        >
          <div className="flex md:flex-row flex-col items-center gap-5 md:gap-10 justify-between">
            <ProfileFormField
              name="curPassword"
              placeholder="Enter your password"
              type={currentPassword ? "text" : "password"}
              label="Current Password"
              control={form.control}
              onClick={() => setCurrentPassword(!currentPassword)}
            />
            <ProfileFormField
              name="password"
              type={newPassword ? "text" : "password"}
              placeholder="Enter your password"
              label="New Password"
              control={form.control}
              onClick={() => setNewPassword(!newPassword)}
            />
            <ProfileFormField
              name="confirmPassword"
              placeholder="Enter your password"
              label="Confirm Password"
              type={confirmPassword ? "text" : "password"}
              control={form.control}
              onClick={() => setConfirmPassword(!confirmPassword)}
            />
          </div>

          <div className="flex items-center justify-end">
            <Button
              disabled={load}
              className="bg-primary-green w-[48%] sm:w-fit font-medium cursor-pointer text-white rounded-sm"
            >
              {load ? (
                <>
                  <ButtonLoader />
                  Updating...
                </>
              ) : (
                <div className="flex items-center gap-2">Update Password</div>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
