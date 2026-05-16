"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { useState } from "react";
import { activitySchema } from "@/lib/schemas";

import { FaRegSave } from "react-icons/fa";
import { RiFileList2Line } from "react-icons/ri";
import NoteInput, { NoteSelect, NoteText } from "./NoteField";
// import Field from "./Field";
export default function NoteForm() {
  const [load, setLoad] = useState(false);
  //   const { login, status } = useLogin();
  const form = useForm<z.infer<typeof activitySchema>>({
    resolver: zodResolver(activitySchema),
  });

  async function onSubmit(values: z.infer<typeof activitySchema>) {
    // get who chreated the note when form is selected
  }

  const arrField = [
    {
      value: "fieldA",
      name: "Field A ",
    },
    {
      value: "fieldB",
      name: "Field B ",
    },
    {
      value: "fieldC",
      name: "Field C ",
    },
    {
      value: "fieldD",
      name: "Field D ",
    },
  ];
  const farm = [
    {
      value: "greenValley",
      name: "Green Valley Farm",
    },
    {
      value: "sunrise",
      name: "Sunrise Farm",
    },
    {
      value: "hilltop",
      name: "Hilltop Farm ",
    },
  ];
  const notArr = [
    {
      name: "Peter Ojo",
      value: "peter-ojo",
    },
    {
      name: "John Doe",
      value: "john-doe",
    },
  ];
  return (
    <div className="w-full pt-3">
      <p className="text-primary-green pb-1 text-sm w-full font-semibold border-border border-b">
        Note Information
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 md:space-y-6 pt-6 w-full overflow-scroll no-scroll max-h-[73vh]"
        >
          <div className="flex gap-4 md:gap-6 items-center flex-col md:flex-row justify-between">
            <NoteSelect
              name="farm"
              control={form.control}
              label="Farm"
              placeholder="Select Farm"
              array={farm}
              Icon={RiFileList2Line}
            />
            <NoteSelect
              name="field"
              control={form.control}
              label="Field"
              placeholder="Select Field"
              array={arrField}
              Icon={RiFileList2Line}
            />
          </div>
          <div className="flex gap-4 md:gap-6 items-center flex-col md:flex-row justify-between">
            <NoteText
              label="Notes"
              placeholder="Write note..."
              name="notes"
              control={form.control}
            />
          </div>

          <div className="flex items-center gap-4 relative justify-end">
            <Button
              type="reset"
              className="text-dark bg-transparent rounded-md w-fit px-6 h-9 cursor-pointer border-border border"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="text-white bg-dark-green rounded-md w-fit px-6 h-9 cursor-pointer border-none"
            >
              <FaRegSave /> Save Note
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
