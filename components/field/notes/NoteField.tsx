import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Control, FieldPath } from "react-hook-form";
import { IconType } from "react-icons";

import z from "zod";
import { activitySchema } from "@/lib/schemas";
import { Textarea } from "@/components/ui/textarea";
interface Input {
  control: Control<z.infer<typeof activitySchema>>;
  name: FieldPath<z.infer<typeof activitySchema>>;
  label: string;
  placeholder: string;
}

interface Select {
  control: Control<z.infer<typeof activitySchema>>;
  name: FieldPath<z.infer<typeof activitySchema>>;
  label: string;
  placeholder: string;
  array: { [key: string]: string }[];
  Icon: IconType;
}
interface Dates {
  control: Control<z.infer<typeof activitySchema>>;
  name: FieldPath<z.infer<typeof activitySchema>>;
  label: string;
}
export function NoteSelect({
  control,
  name,
  label,
  placeholder,
  Icon,
  array,
}: Select) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className=" w-full min-w-[2px]">
          <FormLabel className="text-sm text-sidebar-content gap-1 font-normal">
            {label}
          </FormLabel>
          <div className="w-full flex justify-center items-center min-w-[2px]">
            <Select onValueChange={field.onChange}>
              <FormControl>
                <SelectTrigger className="cursor-pointer h-9! w-full  bg-transparent  focus-visible:outline-primary rounded-[8px] p-3 text-sm  focus:ring text-dark ring-green-500  data-[placeholder]:text-gray-500 ">
                  <div className="flex items-center  gap-2">
                    {Icon && <Icon className="text-primary-green" />}
                    <SelectValue placeholder={placeholder} className="" />
                  </div>
                </SelectTrigger>
              </FormControl>
              <SelectContent className="max-h-[160px] z-200 bg-[#fff] border border-border text-dark">
                {array.map((select) => (
                  <SelectItem
                    className="cursor-pointer text-sm hover:bg-primary hover:text-white"
                    key={select.name}
                    value={select.value}
                  >
                    {select.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function NoteText({ name, label, placeholder, control }: Input) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel className="text-sm   text-dark">{label}</FormLabel>
          <FormControl>
            <Textarea
              placeholder={placeholder}
              maxLength={2000}
              className="resize-none font-normal"
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

export default function NoteInput({
  name,
  label,
  placeholder,
  control,
}: Input) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel className="text-sm  text-dark">{label}</FormLabel>
          <FormControl>
            <Input
              className="text-sm w-full h-9!"
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
