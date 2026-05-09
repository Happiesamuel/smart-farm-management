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
import { workerLoginFormSchema } from "@/lib/schemas";
import z from "zod";
import { IconType } from "react-icons";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
interface FieldType {
  type: string;
  control: Control<z.infer<typeof workerLoginFormSchema>>;
  name: FieldPath<z.infer<typeof workerLoginFormSchema>>;
  label: string;
  placeholder: string;
  Icon?: IconType;
  onclick?(): void;
}
export default function WorkerLoginField({
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
            {Icon && <Icon className="text-xl text-[#f0782d]" />}
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
