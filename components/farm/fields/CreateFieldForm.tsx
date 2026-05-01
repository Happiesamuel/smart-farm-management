"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { useState } from "react";
import { createFieldSchema } from "@/lib/schemas";
import { PiFarm, PiPlantDuotone } from "react-icons/pi";
import { ImDroplet } from "react-icons/im";
import { FiUser } from "react-icons/fi";
import { FaRegSave } from "react-icons/fa";
import { GrFlag } from "react-icons/gr";
import CreateFieldInput, {
  CreateFieldDate,
  CreateFieldInputSelect,
  CreateFieldSelect,
  CreateFieldText,
} from "./CreateFieldField";
import { TbRipple } from "react-icons/tb";
export default function CreateFieldForm() {
  const [load, setLoad] = useState(false);
  //   const { login, status } = useLogin();
  const form = useForm<z.infer<typeof createFieldSchema>>({
    resolver: zodResolver(createFieldSchema),
  });

  async function onSubmit(values: z.infer<typeof createFieldSchema>) {}

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
  const soil = [
    {
      value: "sandy",
      name: "Sandy",
    },
    {
      value: "loamy",
      name: "Loamy",
    },
    {
      value: "clay",
      name: "Clay",
    },
  ];

  const arrSize = [
    {
      name: "acres",
      value: "acres",
    },
    {
      name: "hectares",
      value: "hectares",
    },
  ];
  const irrigation = [
    {
      name: "Rain-fed",
      value: "rain-fed",
    },
    {
      name: "Drip",
      value: "drip",
    },
    {
      name: "Sprinkler",
      value: "sprinkler",
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
            Field Information
          </p>
          <div className="flex gap-4 md:gap-6 items-center flex-col md:flex-row justify-between">
            <CreateFieldInput
              label="Field Name"
              placeholder="e.g Field A"
              Icon={FiUser}
              name="fieldName"
              control={form.control}
            />
            <CreateFieldSelect
              name="farm"
              control={form.control}
              label="Select Farm"
              placeholder="Select farm"
              array={farm}
              Icon={PiFarm}
            />
          </div>

          <div className="flex gap-4 md:gap-6 items-center flex-col md:flex-row justify-between">
            <CreateFieldInputSelect
              array={arrSize}
              control={form.control}
              label="Field Size"
              placeholder="e.g. 100"
              placeholder2="arces"
              name1="size"
              name2="unit"
            />
            <CreateFieldSelect
              name="soilType"
              control={form.control}
              label="Soil Type"
              placeholder="Select soil type"
              array={soil}
              Icon={TbRipple}
            />
          </div>
          <div className="flex gap-4 md:gap-6 items-center flex-col md:flex-row justify-between">
            <CreateFieldSelect
              name="irrigationType"
              control={form.control}
              label="Irrigation Type (Optional)"
              placeholder="Select irrigation type"
              array={irrigation}
              Icon={ImDroplet}
            />
            <CreateFieldDate
              label="Planting Date to Harvest Date"
              name="plantingToHarvest"
              control={form.control}
            />
          </div>
          <div className="flex gap-4 md:gap-6 items-start flex-col md:flex-row justify-between">
            <CreateFieldInput
              label="Crop Type"
              placeholder="e.g Maize"
              Icon={PiPlantDuotone}
              name="cropType"
              control={form.control}
            />
            <CreateFieldText
              label="Description (optional)"
              placeholder="Enter Field description"
              name="description"
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
              <FaRegSave /> Add Field
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
