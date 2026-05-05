import { Input } from "../../ui/input";
import {
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Control, FieldPath } from "react-hook-form";
import { profileFormSchema } from "@/lib/schemas";
import z from "zod";
import { FiEye, FiEyeOff } from "react-icons/fi";
interface FieldType {
  type: string;
  control: Control<z.infer<typeof profileFormSchema>>;
  name: FieldPath<z.infer<typeof profileFormSchema>>;
  label: string;
  placeholder: string;
  onClick(): void;
}
export default function ProfileFormField({
  name,
  label,
  placeholder,
  type,
  control,
  onClick,
}: FieldType) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel className="text-sm font-medium text-dark/90">
            {label}
          </FormLabel>
          <FormControl>
            <div className="flex items-center gap-2 border w-full border-border px-3 py-1 rounded-md">
              <Input
                className="text-sm w-full border-none p-0 "
                type={type}
                placeholder={placeholder}
                {...field}
              />
              <div className="text-dark/90 cursor-pointer">
                {type === "password" ? (
                  <FiEye onClick={onClick} />
                ) : (
                  <FiEyeOff onClick={onClick} />
                )}
              </div>
            </div>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
