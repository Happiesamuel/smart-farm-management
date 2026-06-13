"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Resolver } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { financeSaleSchema } from "@/lib/schemas";
import FinanceInput, {
  FinanceAmount,
  FinanceDate,
  FinanceInputSelect,
  FinanceSelect,
  FinanceText,
} from "./FinanceField";
import { IoMdGrid } from "react-icons/io";
import { MdOutlinePayment } from "react-icons/md";
import { FaRegSave } from "react-icons/fa";
import { useParams } from "next/navigation";
import { useApp } from "@/stores/useAppStore";
import { toast } from "sonner";
import { useCreateSales } from "@/hooks/sales/useSales";
import ButtonLoader from "@/components/layout/ButtonLoader";
import { useGetFarm } from "@/hooks/farms/useFarm";
import { useGetCrops, useGetFarmCrops } from "@/hooks/crops/useCrops";
import { useGetFarmHarvest, useGetHarvest } from "@/hooks/harvest/useHarvest";
import { PiPlant } from "react-icons/pi";
import { FormLoader } from "@/components/loader/GeneralLoader";
import { format } from "date-fns";
import { useUpdateDoc } from "@/hooks/useUpdate";
export default function FinanceSalesFormFetch({
  onClose,
  def,
  type = "create",
}: {
  onClose?(): void;
  def?: { [key: string]: string | number };
  type?: string;
}) {
  const { workspace, user, ready } = useApp();
  const { farmId: x } = useParams();
  const { farms, status, error } = useGetFarm(
    workspace?.id ?? null,
    user?.id ?? null,
  );
  const {
    crops,
    error: cropErr,
    status: cropStat,
  } = useGetFarmCrops(workspace?.id ?? null, user?.id ?? null, x as string);
  const {
    harvests,
    error: harvestsErr,
    status: harvestsStat,
  } = useGetFarmHarvest(workspace?.id ?? null, user?.id ?? null, x as string);
  const {
    error: cropsErr,
    crops: cropss,
    status: cropsStat,
  } = useGetCrops(workspace?.id ?? null, user?.id ?? null);
  const {
    harvests: harvestss,
    error: harvestErr,
    status: harvestStat,
  } = useGetHarvest(workspace?.id ?? null, user?.id ?? null);

  const isLoading = x
    ? cropStat === "pending" || harvestsStat === "pending"
    : cropsStat === "pending" || harvestStat === "pending";
  if (!ready)
    return (
      <div className="h-125">
        <FormLoader>Loading...</FormLoader>
      </div>
    );
  if (!user && ready) return <p>error</p>;
  if (status === "pending" || isLoading)
    return (
      <div className="h-125">
        <FormLoader>Loading form...</FormLoader>
      </div>
    );

  const errMssg =
    cropErr?.message ||
    cropsErr?.message ||
    harvestErr?.message ||
    harvestsErr?.message === "error";
  const isErr = x
    ? cropStat === "error" || harvestsStat === "error"
    : cropsStat === "error" || harvestStat === "error";
  if (status === "error" || isErr) return <p>{error?.message || errMssg}</p>;
  const farmId = farms?.find((y) => y.$id === x)?.$id ?? undefined;
  const farmOptions =
    farms?.map((f) => ({
      name: f.farmName,
      value: f.$id,
    })) ?? [];

  return (
    <FinanceSalesForm
      workspaceId={workspace!.id}
      userId={user!.id}
      farms={farmOptions}
      crop={crops}
      harvest={harvests}
      cropss={cropss}
      harvestss={harvestss}
      farmId={farmId as string}
      onClose={onClose}
      def={def}
      type={type}
    />
  );
}

function FinanceSalesForm({
  workspaceId,
  userId,
  farms,
  harvest,
  harvestss,
  crop,
  cropss,
  farmId,
  onClose,
  type,
  def,
}: {
  workspaceId: string;
  userId: string;
  farms: { name: string; value: string }[];
  harvest: { [key: string]: string | number }[] | undefined;
  harvestss: { [key: string]: string | number }[] | undefined;
  cropss: { [key: string]: string | number }[] | undefined;
  crop: { [key: string]: string | number }[] | undefined;
  def?: { [key: string]: string | number };
  type?: string;
  farmId: string;
  onClose?(): void;
}) {
  const defaultValue = def?.id
    ? {
        farm: farmId ?? def.farmId ?? "",
        harvest: def?.harvestId ?? "",
        totalAmount: (def?.total as string).replace(/[₦,]/g, ""),
        unitPrice: (def?.unitPrice as string).replace(/[₦,]/g, ""),
        quantity: def?.quantity.toString(),
        unit: def?.unit ?? "",
        paymentMethod:
          (def?.payment as string).toLowerCase().split(" ").join("-") ?? "",
        status: (def?.status as string).toLowerCase() ?? "",
        buyer: def?.buyer ?? "",
        saleDate: def.date ? new Date(def.date) : new Date(),
      }
    : {
        farm: farmId ? farmId : "",
      };
  const form = useForm<z.infer<typeof financeSaleSchema>>({
    resolver: zodResolver(financeSaleSchema) as Resolver<
      z.infer<typeof financeSaleSchema>
    >,
    defaultValues: defaultValue as z.infer<typeof financeSaleSchema>,
  });
  const { farmId: id } = useParams();
  const { createSales, status } = useCreateSales();
  const watchedFarmId = form.watch("farm");
  const { update, status: upStat } = useUpdateDoc();
  const filteredHarvests =
    harvestss?.filter((f) => f.farms === watchedFarmId) ?? [];
  const cropMap = farmId
    ? new Map(crop?.map((c) => [c.$id, c]) ?? [])
    : new Map(cropss?.map((c) => [c.$id, c]) ?? []);
  const h = farmId ? harvest : filteredHarvests;
  const harvestOptions =
    h?.map((harvest) => {
      const crop = cropMap.get(harvest.crops);

      return {
        name: `${crop?.cropName ?? "Unknown"} (${harvest.quantity}${harvest.unit})`,
        value: harvest.$id,
      };
    }) ?? [];

  async function onSubmit(values: z.infer<typeof financeSaleSchema>) {
    const { farm, harvest, ...val } = values;
    const obj = {
      userId: userId,
      workspaceId: workspaceId,
      data: {
        ...val,
        totalAmount: +values.totalAmount,
        harvests: harvest,
        unitPrice: +values.unitPrice,
        quantity: +values.quantity,
        farms: farm,
      },
    };
    if (def?.id) {
      const o = obj.data;
      const newO = {
        ...o,
        saleDate: format(o.saleDate, "PPP"),
      };
      update(
        {
          collection: "sales",
          id: (def.id as string).slice(4) as string,
          data: newO,
          workspaceId: workspaceId,
          userId: userId,
        },
        {
          onSuccess: () => {
            toast("Sale updated successfully", {
              description: "You've updated your sale record",
            });

            onClose?.();
          },
          onError: (err) =>
            toast("Error updating sale record", {
              description: err.message,
              duration: 4000,
              closeButton: true,
            }),
        },
      );
    } else {
      createSales(obj, {
        onSuccess: () => {
          toast("Sales created successfully", {
            description: "You can now proceed to managing your task",
          });
          onClose?.();
        },
        onError: (err) =>
          toast("Error creating sales", {
            description: err.message,
            duration: 4000,
            closeButton: true,
          }),
      });
    }
  }

  const arrQuantity = [
    {
      name: "kg",
      value: "kg",
    },
    {
      name: "bags",
      value: "bags",
    },
    {
      name: "tons",
      value: "tons",
    },
  ];
  const stat = [
    {
      name: "Completed",
      value: "completed",
    },
    {
      name: "Pending",
      value: "pending",
    },
    {
      name: "Cancelled",
      value: "cancelled",
    },
  ];
  const arrPayment = [
    {
      name: "Cash",
      value: "cash",
    },
    {
      name: "Transfer",
      value: "transfer",
    },
    {
      name: "Card",
      value: "card",
    },
    {
      name: "Mobile Money",
      value: "mobile-money",
    },
  ];

  return (
    <div className="w-full pt-3">
      <p className="text-primary-green text-start pb-1 text-sm w-full font-semibold border-border border-b">
        Sale Information
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 md:space-y-6 pt-6 w-full overflow-scroll no-scroll max-h-[73vh]"
        >
          <div className="flex gap-4 md:gap-6 items-center flex-col md:flex-row justify-between">
            <FinanceSelect
              name="farm"
              control={form.control}
              label="Farm"
              placeholder={
                farmId
                  ? (farms.find((x) => x.value === farmId)?.name ?? "")
                  : def?.id
                    ? (farms.find((x) => x.value === def.farmId)?.name ?? "")
                    : "Select farm"
              }
              setValue={form.setValue}
              array={farmId || id ? [] : farms}
              disabled={farmId ? true : false}
              Icon={IoMdGrid}
            />
            <FinanceSelect
              name="harvest"
              control={form.control}
              label="Harvested Crop"
              key={watchedFarmId}
              placeholder={
                def?.id
                  ? ((harvestOptions.find((x) => x.value === def.harvestId)
                      ?.name ?? "Select harvested crop") as string)
                  : "Select harvested crop"
              }
              array={harvestOptions as { [key: string]: string }[]}
              Icon={PiPlant}
            />
          </div>

          <div className="flex item flex-col md:flex-row justify-between gap-4 md:gap-6">
            <FinanceInputSelect
              array={arrQuantity}
              control={form.control}
              label="Quantity"
              placeholder="e.g. 50"
              placeholder2={
                def?.id
                  ? ((arrQuantity.find((x) => x.value === def.unit)?.name ??
                      "kg") as string)
                  : "kg"
              }
              type="number"
              name1="quantity"
              name2="unit"
            />
            <FinanceAmount
              label="Unit Price"
              placeholder="e.g. 1000"
              name="unitPrice"
              control={form.control}
            />
          </div>
          <div className="flex item flex-col md:flex-row justify-between gap-4 md:gap-6">
            <FinanceSelect
              name="status"
              control={form.control}
              label="Payment Status"
              placeholder={
                def?.id
                  ? ((stat.find(
                      (x) => x.value === (def.status as string).toLowerCase(),
                    )?.name ?? "Select Status") as string)
                  : "Select Status"
              }
              array={stat}
              Icon={IoMdGrid}
            />
            <FinanceAmount
              label="Total Amount"
              placeholder="e.g. 0.00"
              name="totalAmount"
              control={form.control}
            />
          </div>
          <div className="flex item flex-col md:flex-row justify-between gap-4 md:gap-6">
            <FinanceInput
              label="Buyer"
              placeholder="Enter buyer name or company"
              name="buyer"
              control={form.control}
            />

            <FinanceSelect
              name="paymentMethod"
              control={form.control}
              label="Payment Method"
              placeholder={
                def?.id
                  ? ((arrPayment.find(
                      (x) =>
                        x.value ===
                        (def.payment as string)
                          .toLowerCase()
                          .split(" ")
                          .join("-"),
                    )?.name ?? "Select payment method") as string)
                  : "Select payment method"
              }
              array={arrPayment}
              Icon={MdOutlinePayment}
            />
          </div>
          <div className="flex item flex-col md:flex-row justify-between gap-4 md:gap-6">
            <FinanceDate
              label="Sale Date"
              name="saleDate"
              control={form.control}
            />
            <FinanceText
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
              disabled={status === "pending" || upStat === "pending"}
              className="text-white bg-dark-green rounded-md w-fit px-6 h-9 cursor-pointer border-none"
            >
              {status === "pending" || upStat === "pending" ? (
                <>
                  <ButtonLoader />
                  {def?.id ? "Updating..." : "Creating..."}
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <FaRegSave /> {def?.id ? "Update Sale" : "Save Sale"}
                </div>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
