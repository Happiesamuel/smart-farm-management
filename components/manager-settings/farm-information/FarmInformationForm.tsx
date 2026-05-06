"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { useState } from "react";
import { FarmInformationSchema } from "@/lib/schemas";
import { FaRegSave } from "react-icons/fa";
import FarmInformationInput, {
  FarmInformationDate,
  FarmInformationInputSelect,
  FarmInformationSelect,
  FarmInformationText,
  FarmLocationField,
} from "./FarmInformationField";

export default function FarmInformationForm() {
  const [load, setLoad] = useState(false);
  //   const { login, status } = useLogin();
  const form = useForm<z.infer<typeof FarmInformationSchema>>({
    resolver: zodResolver(FarmInformationSchema),
  });

  async function onSubmit(values: z.infer<typeof FarmInformationSchema>) {}

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
    {
      value: "silty",
      name: "Silty",
    },
    {
      value: "peaty",
      name: "Peaty",
    },
    {
      value: "chalky",
      name: "Chalky",
    },
  ];

  const area = [
    {
      name: "acres",
      value: "acre",
    },
    {
      name: "hectares",
      value: "ha",
    },
    {
      name: "square.m",
      value: "mm",
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
    {
      name: "Manual",
      value: "manual",
    },
    {
      name: "Flood",
      value: "flood",
    },
    {
      name: "Pivot",
      value: "pivot",
    },
  ];

  const stat = [
    {
      name: "growing",
      value: "growing",
    },
    {
      name: "harvested",
      value: "harvested",
    },
    {
      name: "failed",
      value: "failed",
    },
    {
      name: "planted",
      value: "planted",
    },
    {
      name: "drying",
      value: "drying",
    },
    {
      name: "stored",
      value: "stored",
    },
  ];

  return (
    <div className="w-full lg:w-[90%] mx-auto ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 md:space-y-6 pt-6 w-full "
        >
          <div className="w-full bg-white space-y-4 p-4 cursor-pointer  bg-transparent  relative rounded-md border border-border/80 hover:shadow-sm transition shrink-0">
            <div className="flex gap-4 md:gap-6 items-center flex-col md:flex-row justify-between">
              <FarmInformationInput
                label="Farm Name"
                placeholder="Enter farm name..."
                name="farmName"
                control={form.control}
              />
              <FarmInformationDate
                label="Established Date"
                name="date"
                control={form.control}
              />
            </div>

            <div className="flex gap-4 md:gap-6 items-center flex-col md:flex-row justify-between">
              <FarmInformationInputSelect
                array={area}
                control={form.control}
                label="Farm Size"
                placeholder="e.g. 100"
                placeholder2="arces"
                name1="farmSize"
                name2="unit"
              />
              <FarmInformationSelect
                name="soilType"
                control={form.control}
                label="Soil Type"
                placeholder="Select soil type"
                array={soil}
              />
            </div>
            {/* <FarmInformationSelect
            name="irrigationType"
            control={form.control}
            label="Irrigation Type"
            placeholder="Select irrigation type"
            array={irrigation}
          /> */}

            <FarmLocationField control={form.control} />

            <div className="flex gap-4 md:gap-6 items-start flex-col md:flex-row justify-between">
              <FarmInformationSelect
                name="status"
                control={form.control}
                label="Status"
                placeholder="Select status"
                array={stat}
              />
              <FarmInformationText
                label="Description (optional)"
                placeholder="Enter Field description"
                name="description"
                control={form.control}
              />
            </div>
          </div>
          <div className="flex items-center gap-4 relative justify-between">
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
              <FaRegSave /> Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
