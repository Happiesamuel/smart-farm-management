"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { useState } from "react";
import { createCropSchema } from "@/lib/schemas";
import { PiFarm, PiPlant, PiPlantDuotone } from "react-icons/pi";
import { ImDroplet } from "react-icons/im";
import { FiUser } from "react-icons/fi";
import { FaRegSave } from "react-icons/fa";
import CreateCropInput, {
  CreateCropCombo,
  CreateCropDate,
  CreateCropInputSelect,
  CreateCropSelect,
  CreateCropText,
} from "./CreateCropField";
import { TbRipple } from "react-icons/tb";
import { MdSignalWifiStatusbar1Bar } from "react-icons/md";
import { IoGrid } from "react-icons/io5";
export default function CreateCropForm() {
  const [load, setLoad] = useState(false);
  //   const { login, status } = useLogin();
  const form = useForm<z.infer<typeof createCropSchema>>({
    resolver: zodResolver(createCropSchema),
  });

  async function onSubmit(values: z.infer<typeof createCropSchema>) {}

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
  const seedQuantity = [
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
  const expectedYield = [
    {
      name: "kg",
      value: "kg",
    },
    {
      name: "tonnes",
      value: "tonnes",
    },
    {
      name: "bags",
      value: "bags",
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
            Crop Information
          </p>
          <div className="flex gap-4 md:gap-6 items-center flex-col md:flex-row justify-between">
            <CreateCropCombo
              Icon={PiPlant}
              array={cropOptions}
              label="Crop Name"
              placeholder1="Select or search crop"
              placeholder2="Select"
              name="cropName"
              control={form.control}
            />
            <CreateCropSelect
              name="farm"
              control={form.control}
              label="Select Farm"
              placeholder="Select farm"
              array={farm}
              Icon={PiFarm}
            />
          </div>
          <div className="flex gap-4 md:gap-6 items-center flex-col md:flex-row justify-between">
            <CreateCropSelect
              name="soilType"
              control={form.control}
              label="Soil Type"
              placeholder="Select soil type"
              array={soil}
              Icon={TbRipple}
            />
            <CreateCropSelect
              name="irrigationType"
              control={form.control}
              label="Irrigation Type (Optional)"
              placeholder="Select irrigation type"
              array={irrigation}
              Icon={ImDroplet}
            />
          </div>
          <div className="flex gap-4 md:gap-6 items-center flex-col md:flex-row justify-between">
            <CreateCropSelect
              name="status"
              control={form.control}
              label="Status"
              placeholder="Select status"
              array={stat}
              Icon={MdSignalWifiStatusbar1Bar}
            />
            <CreateCropSelect
              name="field"
              control={form.control}
              label="Select Field"
              placeholder="Select field"
              array={field}
              Icon={IoGrid}
            />
          </div>

          <div className="flex gap-4 md:gap-6 items-center flex-col md:flex-row justify-between">
            <CreateCropInputSelect
              array={seedQuantity}
              control={form.control}
              label="Seed Quantity"
              placeholder="e.g. 100"
              placeholder2="bags"
              name1="seedQuantity"
              name2="seedUnit"
            />
            <CreateCropInputSelect
              array={expectedYield}
              control={form.control}
              label="Expected Yield"
              placeholder="e.g. 100"
              placeholder2="kg"
              name1="expectedYield"
              name2="yieldUnit"
            />
          </div>

          <div className="flex gap-4 md:gap-6 items-start flex-col md:flex-row justify-between">
            <CreateCropInputSelect
              array={area}
              control={form.control}
              label="Area Planted"
              placeholder="e.g. 100"
              placeholder2="arces"
              name1="areaPlanted"
              name2="areaUnit"
            />

            <CreateCropDate
              label="Planting Date to Harvest Date"
              name="plantingToHarvest"
              control={form.control}
            />
          </div>
          <CreateCropText
            label="Description (optional)"
            placeholder="Enter Field description"
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
              <FaRegSave /> Add Field
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
