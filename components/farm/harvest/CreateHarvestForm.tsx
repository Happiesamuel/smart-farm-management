"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Resolver } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { createHarvestSchema } from "@/lib/schemas";
import { PiFarm } from "react-icons/pi";
import { FaRegSave } from "react-icons/fa";
import {
  CreateHarvestAmount,
  CreateHarvestInputSelect,
  CreateHarvestSelect,
  CreateHarvestText,
  CreateHavestDate,
} from "./CreateHarvestField";
import { MdSignalWifiStatusbar1Bar } from "react-icons/md";
import { IoGrid } from "react-icons/io5";
import CreateHarvestInput from "./CreateHarvestField";
import { useParams } from "next/navigation";
import { useApp } from "@/stores/useAppStore";
import { toast } from "sonner";
import ButtonLoader from "@/components/layout/ButtonLoader";
import { useCreateHavest } from "@/hooks/harvest/useHarvest";
import { FormLoader } from "@/components/loader/GeneralLoader";
import { useGetFarmFields, useGetFields } from "@/hooks/fields/useFields";
import { useGetFarm } from "@/hooks/farms/useFarm";
import { useGetCrops, useGetFarmCrops } from "@/hooks/crops/useCrops";
import { TbPlant2 } from "react-icons/tb";

export default function CreateHarvestFormFetch() {
  const { workspace, user, ready } = useApp();
  const { farmId: x } = useParams();
  const { farms, status, error } = useGetFarm(
    workspace?.id ?? null,
    user?.id ?? null,
  );
  const {
    error: fieldErr,
    fields,
    status: fieldStat,
  } = useGetFarmFields(workspace?.id ?? null, user?.id ?? null, x as string);

  const {
    error: fieldsErr,
    fields: fieldss,
    status: fieldsStat,
  } = useGetFields(workspace?.id ?? null, user?.id ?? null);
  const {
    error: cropsErr,
    crops: cropss,
    status: cropsStat,
  } = useGetCrops(workspace?.id ?? null, user?.id ?? null);

  const {
    crops,
    error: cropErr,
    status: cropStat,
  } = useGetFarmCrops(workspace?.id ?? null, user?.id ?? null, x as string);
  const isLoading = x
    ? fieldStat === "pending" || cropStat === "pending"
    : cropsStat === "pending" || fieldsStat === "pending";
  if (!ready)
    return (
      <div className="h-100">
        <FormLoader>Loading...</FormLoader>
      </div>
    );
  if (!user && ready) return <p>error</p>;
  if (status === "pending" || isLoading)
    return (
      <div className="h-100">
        <FormLoader>Loading form...</FormLoader>
      </div>
    );
  const errMssg =
    fieldErr?.message ||
    cropErr?.message ||
    fieldsErr?.message ||
    cropsErr?.message === "error";
  const isErr = x
    ? fieldStat === "error" || cropStat === "error"
    : cropsStat === "error" || fieldsStat === "error";
  if (status === "error" || isErr) return <p>{error?.message || errMssg}</p>;
  const farmId = farms?.find((y) => y.$id === x)?.$id ?? undefined;
  const farmOptions =
    farms?.map((f) => ({
      name: f.farmName,
      value: f.$id,
    })) ?? [];

  return (
    <CreateHarvestForm
      workspaceId={workspace!.id}
      userId={user!.id}
      farms={farmOptions}
      field={fields}
      crop={crops}
      fieldss={fieldss}
      cropss={cropss}
      farmId={farmId as string}
    />
  );
}

function CreateHarvestForm({
  workspaceId,
  userId,
  farms,
  fieldss,
  cropss,
  crop,
  field,
  farmId,
}: {
  workspaceId: string;
  userId: string;
  farms: { name: string; value: string }[];
  field: { [key: string]: string | number }[] | undefined;
  fieldss: { [key: string]: string | number }[] | undefined;
  cropss: { [key: string]: string | number }[] | undefined;
  crop: { [key: string]: string | number }[] | undefined;
  farmId: string;
}) {
  const form = useForm<z.infer<typeof createHarvestSchema>>({
    resolver: zodResolver(createHarvestSchema) as Resolver<
      z.infer<typeof createHarvestSchema>
    >,
    defaultValues: {
      farm: farmId ? farmId : "",
    },
  });

  const { createHarvest, status } = useCreateHavest();
  const { farmId: id } = useParams();

  const watchedFarmId = form.watch("farm");
  const watchedFieldId = form.watch("field");
  const filteredFields =
    fieldss?.filter((f) => f.farms === watchedFarmId) ?? [];
  const filteredCrops =
    cropss?.filter((f) => f.fields === watchedFieldId) ?? [];

  const fields = !farmId
    ? (filteredFields?.map((f) => ({
        name: f.fieldName,
        value: f.$id,
      })) ?? [])
    : (field?.map((f) => ({
        name: f.fieldName,
        value: f.$id,
      })) ?? []);
  const crops =
    filteredCrops?.map((f) => ({
      name: f.cropName,
      value: f.$id,
    })) ?? [];

  async function onSubmit(values: z.infer<typeof createHarvestSchema>) {
    const { farm, field, crop, ...val } = values;
    const obj = {
      userId: userId,
      workspaceId: workspaceId,
      data: {
        ...val,
        fields: field,
        crops: crop,
        totalAmount: +values.totalAmount,
        pricePerUnit: +values.pricePerUnit,
        quantity: +values.quantity,
        farms: farm,
      },
    };

    createHarvest(obj, {
      onSuccess: () => {
        toast("Harvest created successfully", {
          description: "You can now proceed to managing your crop",
        });
      },
      onError: (err) =>
        toast("Error creating harvest", {
          description: err.message,
          duration: 4000,
          closeButton: true,
        }),
    });
  }

  const quantity = [
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
  const stat = [
    {
      name: "Sold",
      value: "sold",
    },
    {
      name: "Stored",
      value: "stored",
    },
    {
      name: "Wasted",
      value: "wasted",
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
    {
      name: "Average",
      value: "average",
    },
    {
      name: "Poor",
      value: "poor",
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
            Harvest Information
          </p>
          <div className="flex gap-4 md:gap-6 items-center flex-col md:flex-row justify-between">
            <CreateHarvestSelect
              name="farm"
              control={form.control}
              label="Select Farm"
              placeholder={
                farmId
                  ? (farms.find((x) => x.value === farmId)?.name ?? "")
                  : "Select farm"
              }
              setValue={form.setValue}
              array={farmId || id ? [] : farms}
              disabled={farmId ? true : false}
              Icon={PiFarm}
            />
            <CreateHarvestSelect
              name="field"
              control={form.control}
              key={watchedFarmId}
              label="Select Field"
              placeholder="Select field"
              setValue={form.setValue}
              array={fields as { [key: string]: string }[]}
              Icon={IoGrid}
            />
          </div>

          <div className="flex gap-4 md:gap-6 items-start flex-col md:flex-row justify-between">
            <CreateHarvestSelect
              name="crop"
              control={form.control}
              label="Select Crop"
              placeholder="Select crop"
              key={watchedFieldId}
              array={crops as { [key: string]: string }[]}
              Icon={TbPlant2}
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
            <CreateHarvestSelect
              name="quality"
              control={form.control}
              label="Quality"
              placeholder="Select quality"
              array={quality}
            />
          </div>

          <div className="flex gap-4 md:gap-6 items-start flex-col md:flex-row justify-between">
            <CreateHarvestAmount
              label="Price per Unit"
              placeholder="e.g. 0.00"
              name="pricePerUnit"
              control={form.control}
            />
            <CreateHarvestAmount
              label="Total Amount"
              placeholder="e.g. 0.00"
              name="totalAmount"
              control={form.control}
            />
          </div>
          <div className="flex gap-4 md:gap-6 items-start flex-col md:flex-row justify-between">
            <CreateHarvestInput
              control={form.control}
              label="Buyer's Name (optional)"
              name={"buyer"}
              placeholder="Enter buyer's name"
            />
            <CreateHavestDate
              label="Harvest Date"
              name="harvestDate"
              control={form.control}
            />
          </div>
          <div className="flex gap-4 md:gap-6 items-start flex-col md:flex-row justify-between">
            <CreateHarvestText
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
                  <FaRegSave /> Add Harvest
                </div>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
