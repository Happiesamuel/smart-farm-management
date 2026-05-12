"use client";
import { profileFormSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Form } from "@/components/ui/form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ProfileFormField from "@/components/manager-settings/profile/PofileFormField";

export default function WorkerPasswordForm() {
  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
  });
  const [currentPassword, setCurrentPassword] = useState(false);
  const [newPassword, setNewPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);

  async function onSubmit(values: z.infer<typeof profileFormSchema>) {}
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
            <Button className="bg-primary-green w-[48%] sm:w-fit font-medium cursor-pointer text-white rounded-sm">
              Update Password
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
