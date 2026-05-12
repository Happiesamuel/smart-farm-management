"use client";
import { useForm } from "react-hook-form";
import { infoFormSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import InfoField from "./InfoField";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FaRegSave } from "react-icons/fa";
export default function ProfileInformation() {
  const form = useForm<z.infer<typeof infoFormSchema>>({
    resolver: zodResolver(infoFormSchema),
  });

  async function onSubmit(values: z.infer<typeof infoFormSchema>) {}
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
              type="submit"
              className="text-white bg-dark-green rounded-md w-fit px-4 h-9 cursor-pointer border-none"
            >
              <FaRegSave /> Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
