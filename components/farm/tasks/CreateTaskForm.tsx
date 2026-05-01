"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { useState } from "react";
import { createTaskSchema } from "@/lib/schemas";
import { PiFarm } from "react-icons/pi";

import { FiUser, FiUsers } from "react-icons/fi";
import { FaRegSave } from "react-icons/fa";
import { IoMdGrid } from "react-icons/io";
import { GrFlag } from "react-icons/gr";
import CreateTaskInput, {
  CreateTaskDate,
  CreateTaskSelect,
  CreateTaskText,
} from "./CreateTaskField";
export default function CreateTaskForm() {
  const [load, setLoad] = useState(false);
  //   const { login, status } = useLogin();
  const form = useForm<z.infer<typeof createTaskSchema>>({
    resolver: zodResolver(createTaskSchema),
  });

  async function onSubmit(values: z.infer<typeof createTaskSchema>) {}

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
  const priority = [
    {
      name: "High",
      value: "high",
    },
    {
      name: "Medium",
      value: "medium",
    },
    {
      name: "Low",
      value: "low",
    },
  ];
  const field = [
    {
      name: "Field A",
      value: "fieldA",
    },
    {
      name: "Field B",
      value: "fieldB",
    },
    {
      name: "Field C",
      value: "fieldC",
    },
  ];
  const assign = [
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
    <div className="w-full lg:w-[90%] mx-auto ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 md:space-y-6 pt-6 w-full "
        >
          <p className="text-primary-green  pb-1 text-sm w-full font-semibold border-border border-b">
            Task Information
          </p>
          <div className="flex gap-4 md:gap-6 items-center flex-col md:flex-row justify-between">
            <CreateTaskInput
              label="Task Title"
              placeholder="e.g Irrigate Field A"
              Icon={FiUser}
              name="taskTitle"
              control={form.control}
            />
            <CreateTaskSelect
              name="farm"
              control={form.control}
              label="Select Farm"
              placeholder="Select farm"
              array={farm}
              Icon={PiFarm}
            />
          </div>

          <div className="flex gap-4 md:gap-6 items-center flex-col md:flex-row justify-between">
            <CreateTaskSelect
              name="field"
              control={form.control}
              label="Select Field"
              placeholder="Select field"
              array={field}
              Icon={IoMdGrid}
            />
            <CreateTaskSelect
              name="priority"
              control={form.control}
              label="Priority"
              placeholder="Select priority"
              array={priority}
              Icon={GrFlag}
            />
          </div>
          <div className="flex gap-4 md:gap-6 items-center flex-col md:flex-row justify-between">
            <CreateTaskSelect
              name="assignTo"
              control={form.control}
              label="Assign To"
              placeholder="Select assignee"
              array={assign}
              Icon={FiUsers}
            />
            <CreateTaskDate
              label="Due Date"
              name="dueDate"
              control={form.control}
            />
          </div>

          <CreateTaskText
            label="Description (optional)"
            placeholder="Enter task description"
            name="description"
            control={form.control}
          />

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
              <FaRegSave /> Add Task
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
