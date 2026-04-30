"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { useState } from "react";
import { createFarmSchema } from "@/lib/schemas";
import { PiPlant } from "react-icons/pi";
import CreateFarmInput, {
  CreateFarmInputSelect,
  CreateFarmSelect,
  CreateFarmText,
  CreateFarmUpload,
  CreateLocationField,
} from "./CreateField";
import { FiUser } from "react-icons/fi";
import { FaRegSave } from "react-icons/fa";
import { MdOutlineSignalWifiStatusbar4Bar } from "react-icons/md";
export default function CreateFarmForm() {
  const [load, setLoad] = useState(false);
  //   const { login, status } = useLogin();
  const form = useForm<z.infer<typeof createFarmSchema>>({
    resolver: zodResolver(createFarmSchema),
  });

  async function onSubmit(values: z.infer<typeof createFarmSchema>) {}

  const soilType = [
    {
      value: "loamy",
      name: "Loamy Soil",
    },
    {
      value: "sandy",
      name: "Sandy Soil ",
    },
    {
      value: "clay",
      name: "Clay Soil ",
    },
  ];
  const arrSize = [
    {
      name: "acres",
      value: "acres",
    },
  ];
  const stat = [
    {
      name: "Active",
      value: "active",
    },
    {
      name: "Inactive",
      value: "inactive",
    },
  ];
  return (
    <div className="w-full lg:w-[90%] mx-auto ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 md:space-y-6 pt-6 w-full "
        >
          <div className="flex gap-4 md:gap-6 items-center flex-col md:flex-row justify-between">
            <CreateFarmInput
              label="Farm Name"
              placeholder="Enter farm name"
              Icon={FiUser}
              name="farmName"
              control={form.control}
            />
            <CreateFarmInputSelect
              array={arrSize}
              control={form.control}
              label="Total Size"
              placeholder="e.g. 100"
              placeholder2="arces"
              name1="size"
              name2="unit"
            />
          </div>
          <CreateLocationField control={form.control} />

          <div className="flex items-start flex-col md:flex-row justify-between gap-4 md:gap-6">
            <CreateFarmText
              label="Description (optional)"
              placeholder="Enter farm description"
              name="description"
              control={form.control}
            />
            <CreateFarmUpload control={form.control} />
          </div>

          <div className="flex gap-4 md:gap-6 items-center flex-col md:flex-row justify-between">
            <CreateFarmSelect
              name="soilType"
              control={form.control}
              label="Soil Type"
              placeholder="Select soil type"
              array={soilType}
              Icon={PiPlant}
            />
            <CreateFarmSelect
              name="status"
              control={form.control}
              label="Status"
              placeholder="Select farm status"
              array={stat}
              Icon={MdOutlineSignalWifiStatusbar4Bar}
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
              <FaRegSave /> Add sale
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
