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

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Control, FieldPath } from "react-hook-form";
import { IconType } from "react-icons";

import z from "zod";
import { createTaskSchema } from "@/lib/schemas";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

interface Inputs {
  control: Control<z.infer<typeof createTaskSchema>>;
  name: FieldPath<z.infer<typeof createTaskSchema>>;
  label: string;
  placeholder: string;
  Icon?: IconType;
}

interface Dates {
  control: Control<z.infer<typeof createTaskSchema>>;
  name: FieldPath<z.infer<typeof createTaskSchema>>;
  label: string;
}

interface Select {
  control: Control<z.infer<typeof createTaskSchema>>;
  name: FieldPath<z.infer<typeof createTaskSchema>>;
  label: string;
  placeholder: string;
  array: { [key: string]: string }[];
  Icon: IconType;
}

export function CreateTaskSelect({
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

export default function CreateTaskInput({
  name,
  label,
  placeholder,
  control,
  Icon,
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
              {Icon && <Icon className="text-primary-green" />}
              <Input
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

export function CreateTaskText({ name, label, placeholder, control }: Inputs) {
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

export function CreateTaskDate({ control, name, label }: Dates) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel className="text-sm text-dark">{label}</FormLabel>

          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  className={`w-full h-9! justify-start text-dark/90 text-left font-normal ${
                    !field.value && "text-muted-foreground"
                  }`}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />

                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </FormControl>
            </PopoverTrigger>

            <PopoverContent className="w-auto z-200 p-0">
              <Calendar
                mode="single"
                selected={field.value ? new Date(field.value) : undefined}
                onSelect={(date) => field.onChange(date?.toISOString())}
              />
            </PopoverContent>
          </Popover>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
