import React from "react";
import { Input } from "../ui/input";
import {
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Control, FieldPath } from "react-hook-form";
import z from "zod";
import { IconType } from "react-icons";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { signupFormSchema } from "@/lib/schemas";
interface FieldType {
  type: string;
  control: Control<z.infer<typeof signupFormSchema>>;
  name: FieldPath<z.infer<typeof signupFormSchema>>;
  label: string;
  placeholder: string;
  Icon: IconType;
  onclick?(): void;
}
export default function SignupField({
  name,
  label,
  placeholder,
  type,
  control,
  Icon,
  onclick,
}: FieldType) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center gap-4 border border-border rounded-md px-4 py-2">
            <Icon className="text-xl text-dark/90" />
            <div className="flex items-center w-full justify-between">
              <div className="">
                <FormLabel className="text-sm p-0 font-semibold text-dark/90">
                  {label}
                </FormLabel>
                <FormControl>
                  <Input
                    className="text-sm h-4 rounded-none p-0 border-none"
                    type={type}
                    placeholder={placeholder}
                    {...field}
                  />
                </FormControl>
              </div>

              {onclick && (
                <div className="cursor-pointer text-lg text-dark/90">
                  {type === "password" ? (
                    <FaRegEye onClick={onclick} />
                  ) : (
                    <FaRegEyeSlash onClick={onclick} />
                  )}
                </div>
              )}
            </div>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
