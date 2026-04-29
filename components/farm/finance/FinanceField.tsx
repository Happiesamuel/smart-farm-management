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
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Control, FieldPath } from "react-hook-form";
import { IconType } from "react-icons";

import z from "zod";
import { financeSaleSchema } from "@/lib/schemas";
interface Input {
  control: Control<z.infer<typeof financeSaleSchema>>;
  name: FieldPath<z.infer<typeof financeSaleSchema>>;
  label: string;
  placeholder: string;
}
interface InputSelect {
  control: Control<z.infer<typeof financeSaleSchema>>;
  name1: FieldPath<z.infer<typeof financeSaleSchema>>;
  name2: FieldPath<z.infer<typeof financeSaleSchema>>;
  label: string;
  placeholder: string;
  placeholder2: string;
  array: { [key: string]: string }[];
}
interface Select {
  control: Control<z.infer<typeof financeSaleSchema>>;
  name: FieldPath<z.infer<typeof financeSaleSchema>>;
  label: string;
  placeholder: string;
  array: { [key: string]: string }[];
  Icon: IconType;
}
interface Dates {
  control: Control<z.infer<typeof financeSaleSchema>>;
  name: FieldPath<z.infer<typeof financeSaleSchema>>;
  label: string;
}
export function FinanceSelect({
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
export function FinanceInputSelect({
  control,
  name1,
  name2,
  label,
  placeholder,
  placeholder2,
  array,
}: InputSelect) {
  return (
    <div className="space-y-2 w-full">
      <div className="text-sm  text-dark">{label}</div>
      <div className="flex items-cente">
        <FormField
          control={control}
          name={name1}
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  className="text-sm h-9 rounded-r-none border-r-0"
                  placeholder={placeholder}
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={name2}
          render={({ field }) => (
            <FormItem className="flex-[0.5] w-full min-w-[2px]">
              <div className="w-full flex justify-center items-center min-w-[2px]">
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="rounded-l-none! cursor-pointer h-9! w-full  bg-transparent  focus-visible:outline-primary rounded-[8px] p-3 text-sm  focus:ring text-dark ring-green-500  data-[placeholder]:text-gray-500 ">
                      <SelectValue placeholder={placeholder2} className="" />
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
      </div>
    </div>
  );
}
export function FinanceAmount({ control, name, label, placeholder }: Input) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel className="text-sm  text-dark">{label}</FormLabel>
          <FormControl>
            <div className="flex border border-border rounded-md h-9 px-3 items-center gap-2">
              <p className="text-dark/80 border-r pr-2 border-border">₦</p>
              <Input
                type="number"
                className="text-sm w-full border-none h-full p-0"
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

export function FinanceDate({ control, name, label }: Dates) {
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

export default function FinanceInput({
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
