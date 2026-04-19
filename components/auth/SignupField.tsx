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
import { signupFormSchema } from "@/lib/schemas";
import z from "zod";
interface FieldType {
  type: string;
  control: Control<z.infer<typeof signupFormSchema>>;
  name: FieldPath<z.infer<typeof signupFormSchema>>;
  label: string;
  placeholder: string;
}
export default function SignupField({
  name,
  label,
  placeholder,
  type,
  control,
}: FieldType) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm font-semibold text-dark">
            {label}
          </FormLabel>
          <FormControl>
            <Input
              className="text-sm"
              type={type}
              placeholder={placeholder}
              {...field}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
