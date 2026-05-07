"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { useState } from "react";
import { createHarvestSchema } from "@/lib/schemas";
import { PiFarm, PiPlant } from "react-icons/pi";
import { FaRegSave } from "react-icons/fa";
import {
  CreateHarvestAmount,
  CreateHarvestCombo,
  CreateHarvestInputSelect,
  CreateHarvestSelect,
  CreateHarvestText,
  CreateHavestDate,
} from "./CreateHarvestField";
import { MdSignalWifiStatusbar1Bar } from "react-icons/md";
import { IoGrid } from "react-icons/io5";
import CreateHarvestInput from "./CreateHarvestField";
export default function CreateHarvestForm() {
  const [load, setLoad] = useState(false);
  //   const { login, status } = useLogin();
  const form = useForm<z.infer<typeof createHarvestSchema>>({
    resolver: zodResolver(createHarvestSchema),
  });

  async function onSubmit(values: z.infer<typeof createHarvestSchema>) {}

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

  const quantity = [
    {
      name: "kg",
      value: "kg",
    },
    {
      name: "g",
      value: "g",
    },
    {
      name: "bags",
      value: "bags",
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
  const stat = [
    {
      name: "Sold",
      value: "sold",
    },
    {
      name: "Pending",
      value: "pending",
    },
  ];
  const quality = [
    {
      name: "Good",
      value: "good",
    },
    {
      name: "Excellent",
      value: "excellent",
    },
  ];
  const cropOptions = [
    "🌽Maize",
    "🌾Rice",
    "🥔Yam",
    "🍅Tomato",
    "🫑Pepper",
    "🥔Cassava",
    "🌾Beans",
    "🌱Wheat",
    "🥜Sorghum",
    "🌾Soyabean",
  ];

  return (
    <div className="w-full lg:w-[90%] mx-auto ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 md:space-y-6 pt-6 w-full "
        >
          <p className="text-primary-green  pb-1 text-sm w-full font-semibold border-border border-b">
            Harvest Information
          </p>
          <div className="flex gap-4 md:gap-6 items-center flex-col md:flex-row justify-between">
            <CreateHarvestCombo
              Icon={PiPlant}
              array={cropOptions}
              label="Crop Name"
              placeholder1="Select or search crop"
              placeholder2="Select"
              name="cropName"
              control={form.control}
            />
            <CreateHarvestSelect
              name="farm"
              control={form.control}
              label="Select Farm"
              placeholder="Select farm"
              array={farm}
              Icon={PiFarm}
            />
          </div>

          <div className="flex gap-4 md:gap-6 items-center flex-col md:flex-row justify-between">
            <CreateHarvestSelect
              name="field"
              control={form.control}
              label="Select Field"
              placeholder="Select field"
              array={field}
              Icon={IoGrid}
            />
            <CreateHarvestSelect
              name="status"
              control={form.control}
              label="Status"
              placeholder="Select status"
              array={stat}
              Icon={MdSignalWifiStatusbar1Bar}
            />
          </div>

          <div className="flex gap-4 md:gap-6 items-center flex-col md:flex-row justify-between">
            <CreateHarvestInputSelect
              array={quantity}
              control={form.control}
              label="Quantity"
              placeholder="e.g. 100"
              placeholder2="bags"
              name1="quantity"
              name2="unit"
            />

            <CreateHarvestInput
              control={form.control}
              label="Buyer's Name (optional)"
              name={"buyer"}
              placeholder="Enter buyer's name"
            />
          </div>

          <div className="flex gap-4 md:gap-6 items-start flex-col md:flex-row justify-between">
            <CreateHarvestAmount
              label="Total Amount"
              placeholder="e.g. 0.00"
              name="amount"
              control={form.control}
            />
            <CreateHarvestSelect
              name="quality"
              control={form.control}
              label="Quality"
              placeholder="Select quality"
              array={quality}
            />
          </div>
          <div className="flex gap-4 md:gap-6 items-start flex-col md:flex-row justify-between">
            <CreateHarvestText
              label="Description (optional)"
              placeholder="Enter Field description"
              name="description"
              control={form.control}
            />
            <CreateHavestDate
              label="Harvest Date"
              name="date"
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
              <FaRegSave /> Add Harvest
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
