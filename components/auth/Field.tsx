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
import { loginFormSchema } from "@/lib/schemas";
import z from "zod";
interface FieldType {
  type: string;
  control: Control<z.infer<typeof loginFormSchema>>;
  name: FieldPath<z.infer<typeof loginFormSchema>>;
  label: string;
  placeholder: string;
}
export default function Field({
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
