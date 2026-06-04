"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Resolver } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { createCropSchema } from "@/lib/schemas";
import { PiFarm, PiPlant } from "react-icons/pi";
import { ImDroplet } from "react-icons/im";
import { FaRegSave } from "react-icons/fa";
import {
  CreateCropCombo,
  CreateCropDate,
  CreateCropInputSelect,
  CreateCropSelect,
  CreateCropText,
} from "./CreateCropField";
import { MdSignalWifiStatusbar1Bar } from "react-icons/md";
import { IoGrid } from "react-icons/io5";
import { useCreateCrop } from "@/hooks/crops/useCrops";
import { useApp } from "@/stores/useAppStore";
import { useParams } from "next/navigation";
import ButtonLoader from "@/components/layout/ButtonLoader";
import { toast } from "sonner";
import GeneralLoader from "@/components/loader/GeneralLoader";
import { useGetFarm } from "@/hooks/farms/useFarm";
import { useGetFarmFields } from "@/hooks/fields/useFields";

export default function CreateCropFormFetch() {
  const { workspace, user, ready } = useApp();
  const { farmId } = useParams();
  const { farms, status, error } = useGetFarm(
    workspace?.id ?? null,
    user?.id ?? null,
  );
  const {
    error: fieldErr,
    fields,
    status: fieldStat,
  } = useGetFarmFields(
    workspace?.id ?? null,
    user?.id ?? null,
    farmId as string,
  );

  if (!ready) return <GeneralLoader>Loading...</GeneralLoader>;
  if (!user && ready) return <p>error</p>;
  if (status === "pending" || fieldStat === "pending")
    return <GeneralLoader>Loading form...</GeneralLoader>;
  if (status === "error" || fieldStat === "error")
    return <p>{error?.message || fieldErr?.message}</p>;

  const farmOptions =
    farms?.map((f) => ({
      name: f.farmName,
      value: f.$id,
    })) ?? [];
  const fieldOptions =
    fields?.map((f) => ({
      name: f.fieldName,
      value: f.$id,
    })) ?? [];
  return (
    <CreateCropForm
      workspaceId={workspace!.id}
      userId={user!.id}
      farms={farmOptions}
      fields={fieldOptions}
    />
  );
}

function CreateCropForm({
  workspaceId,
  userId,
  farms,
  fields,
}: {
  workspaceId: string;
  userId: string;
  farms: { name: string; value: string }[];
  fields: { name: string; value: string }[];
}) {
  const form = useForm<z.infer<typeof createCropSchema>>({
    resolver: zodResolver(createCropSchema) as Resolver<
      z.infer<typeof createCropSchema>
    >,
  });
  const { createCrop, status } = useCreateCrop();
  async function onSubmit(values: z.infer<typeof createCropSchema>) {
    const { plantingToHarvest, farm, field, ...val } = values;
    const obj = {
      userId: userId,
      workspaceId: workspaceId,
      data: {
        ...val,
        plantedDate: plantingToHarvest.from,
        expectedHarvestDate: plantingToHarvest.to,
        fields: values.field,
        areaPlanted: +values.areaPlanted,
        seedQuantity: +values.seedQuantity,
        farms: values.farm,
        expectedYield: +values.expectedYield,
      },
    };
    createCrop(obj, {
      onSuccess: () => {
        toast("Crop created successfully", {
          description: "You can now proceed to managing your crop",
        });
      },
      onError: (err) =>
        toast("Error creating crop", {
          description: err.message,
          duration: 4000,
          closeButton: true,
        }),
    });
  }

  const area = [
    {
      name: "acres",
      value: "acres",
    },
    {
      name: "hectares",
      value: "hectares",
    },
    {
      name: "square.m",
      value: "square.m",
    },
  ];
  const seedQuantity = [
    {
      name: "kg",
      value: "kg",
    },
    {
      name: "grams",
      value: "grams",
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
      name: "tons",
      value: "tons",
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

  const stat = [
    {
      name: "Growing",
      value: "growing",
    },
    {
      name: "Harvested",
      value: "harvested",
    },
    {
      name: "Failed",
      value: "failed",
    },
    {
      name: "Planted",
      value: "planted",
    },
    {
      name: "Drying",
      value: "drying",
    },
    {
      name: "Stored",
      value: "stored",
    },
  ];
  const cropOptions = [
    "Maize",
    "Rice",
    "Yam",
    "Tomato",
    "Pepper",
    "Cassava",
    "Beans",
    "Wheat",
    "Sorghum",
    "Soyabean",
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
              array={farms}
              Icon={PiFarm}
            />
          </div>
          <div className="flex gap-4 md:gap-6 items-center flex-col md:flex-row justify-between">
            <CreateCropSelect
              name="irrigationType"
              control={form.control}
              label="Irrigation Type (Optional)"
              placeholder="Select irrigation type"
              array={irrigation}
              Icon={ImDroplet}
            />
            <CreateCropSelect
              name="field"
              control={form.control}
              label="Select Field"
              placeholder="Select field"
              array={fields}
              Icon={IoGrid}
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
            <CreateCropInputSelect
              array={seedQuantity}
              control={form.control}
              label="Seed Quantity"
              placeholder="e.g. 100"
              placeholder2="bags"
              name1="seedQuantity"
              name2="seedUnit"
            />
          </div>

          <div className="flex gap-4 md:gap-6 items-center flex-col md:flex-row justify-between">
            <CreateCropInputSelect
              array={expectedYield}
              control={form.control}
              label="Expected Yield"
              placeholder="e.g. 100"
              placeholder2="kg"
              name1="expectedYield"
              name2="yieldUnit"
            />
            <CreateCropInputSelect
              array={area}
              control={form.control}
              label="Area Planted"
              placeholder="e.g. 100"
              placeholder2="arces"
              name1="areaPlanted"
              name2="areaUnit"
            />
          </div>

          <div className="flex gap-4 md:gap-6 items-start flex-col md:flex-row justify-between">
            <CreateCropDate
              label="Planting Date to Harvest Date"
              name="plantingToHarvest"
              control={form.control}
            />
            <CreateCropText
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
              disabled={status === "pending"}
              className="text-white bg-dark-green rounded-md w-fit px-6 h-9 cursor-pointer border-none"
            >
              {status === "pending" ? (
                <>
                  <ButtonLoader />
                  Creating...
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <FaRegSave /> Add Crop
                </div>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
