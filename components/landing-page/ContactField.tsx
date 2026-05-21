import { Control, FieldPath } from "react-hook-form";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import z from "zod";
import { contactFormSchema } from "@/lib/schemas";
interface Inputs {
  control: Control<z.infer<typeof contactFormSchema>>;
  name: FieldPath<z.infer<typeof contactFormSchema>>;
  placeholder: string;
}
export default function ContactInput({ name, placeholder, control }: Inputs) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormControl className="w-full">
            <Input
              className="text-xs border h-9 border-gray-200 rounded-lg px-3 py-2.5 outline-none focus:border-green-400 transition-colors placeholder:text-gray-400 w-full"
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

export function ContactText({ name, placeholder, control }: Inputs) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormControl className="w-full">
            <Textarea
              placeholder={placeholder}
              maxLength={2000}
              rows={4}
              className="text-xs border resize-none border-gray-200 rounded-lg px-3 py-2.5 outline-none focus:border-green-400 transition-colors placeholder:text-gray-400 w-full"
              {...field}
              onChange={(e) => field.onChange(e.target.value)}
              value={typeof field.value === "string" ? field.value : ""}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
