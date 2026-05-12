import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { infoFormSchema } from "@/lib/schemas";
import { Control, FieldPath } from "react-hook-form";
import z from "zod";

interface Inputs {
  control: Control<z.infer<typeof infoFormSchema>>;
  name: FieldPath<z.infer<typeof infoFormSchema>>;
  label: string;
  placeholder: string;
  disable?: boolean;
}
export default function InfoField({
  name,
  disable,
  label,
  placeholder,
  control,
}: Inputs) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel className="text-sm  text-dark">{label}</FormLabel>
          <FormControl>
            <div className="h-9! border border-border  px-2 rounded-md flex items-center gap-2">
              <Input
                disabled={disable}
                className="text-sm w-full border-none p-0"
                placeholder={placeholder}
                {...field}
              />
            </div>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
