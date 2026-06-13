"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Resolver } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { AiOutlineTag } from "react-icons/ai";
import { financeExpenseSchema } from "@/lib/schemas";
import FinanceInput, {
  FinanceAmount,
  FinanceDate,
  FinanceSelect,
  FinanceText,
} from "./FinanceExpenseField";

import { MdOutlinePayment } from "react-icons/md";
import { FaRegSave } from "react-icons/fa";
import { useApp } from "@/stores/useAppStore";
import { useParams } from "next/navigation";
import ButtonLoader from "@/components/layout/ButtonLoader";
import { toast } from "sonner";
import { useCreateExpenses } from "@/hooks/expense/useExpense";
import { useGetCrops, useGetFarmCrops } from "@/hooks/crops/useCrops";
import { useGetFarm } from "@/hooks/farms/useFarm";
import { useGetFarmFields, useGetFields } from "@/hooks/fields/useFields";
import { FormLoader } from "@/components/loader/GeneralLoader";
import { useUpdateDoc } from "@/hooks/useUpdate";
import { format } from "date-fns";

export default function FinanceExpenseFormFetch({
  onClose,
  def,
}: {
  onClose?(): void;
  def?: { [key: string]: string | number };
}) {
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
    crops,
    error: cropErr,
    status: cropStat,
  } = useGetFarmCrops(workspace?.id ?? null, user?.id ?? null, x as string);
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
  const isLoading = x
    ? fieldStat === "pending" || cropStat === "pending"
    : cropsStat === "pending" || fieldsStat === "pending";
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
    <FinanceExpenseFom
      workspaceId={workspace!.id}
      userId={user!.id}
      farmId={farmId as string}
      farms={farmOptions}
      field={fields}
      crop={crops}
      fieldss={fieldss}
      cropss={cropss}
      def={def}
      onClose={onClose}
    />
  );
}

function FinanceExpenseFom({
  workspaceId,
  userId,
  farms,
  fieldss,
  cropss,
  field,
  crop,
  def,
  farmId,
  onClose,
}: {
  workspaceId: string;
  userId: string;
  farmId: string;
  farms: { name: string; value: string }[];
  field: { [key: string]: string | number }[] | undefined;
  fieldss: { [key: string]: string | number }[] | undefined;
  cropss: { [key: string]: string | number }[] | undefined;
  crop: { [key: string]: string | number }[] | undefined;
  onClose?(): void;
  def?: { [key: string]: string | number };
}) {
  const defaultValue = def?.id
    ? {
        farm: farmId ?? def.farmId ?? "",
        field: def?.fieldId ?? "",
        crop: def.cropId ?? "",
        category: (def?.category as string).toLowerCase() ?? "",
        paymentMethod:
          (def?.payment as string).toLowerCase().split(" ").join("-") ?? "",
        status: (def?.status as string).toLowerCase() ?? "",
        vendor: def?.vendor ?? "",
        amount: (def?.total as string).replace(/[₦,]/g, ""),
        description: def?.description ?? "",
        expenseDate: def.date ? new Date(def.date) : new Date(),
      }
    : {
        farm: farmId ? farmId : "",
      };
  const form = useForm<z.infer<typeof financeExpenseSchema>>({
    resolver: zodResolver(financeExpenseSchema) as Resolver<
      z.infer<typeof financeExpenseSchema>
    >,
    defaultValues: defaultValue as z.infer<typeof financeExpenseSchema>,
  });
  const { farmId: id } = useParams();
  const { update, status: upStat } = useUpdateDoc();
  const { createExpense, status } = useCreateExpenses();
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
  async function onSubmit(values: z.infer<typeof financeExpenseSchema>) {
    const { farm, field, crop, ...val } = values;
    const obj = {
      userId: userId,
      workspaceId: workspaceId,
      data: {
        ...val,
        amount: +values.amount,
        crops: crop,
        farms: farm,
        fields: field,
      },
    };
    if (def?.id) {
      const o = obj.data;
      const newO = {
        ...o,
        expenseDate: format(o.expenseDate, "PPP"),
      };
      update(
        {
          collection: "expenses",
          id: (def.id as string).slice(4) as string,
          data: newO,
          workspaceId: workspaceId,
          userId: userId,
        },
        {
          onSuccess: () => {
            toast("Expense updated successfully", {
              description: "You've updated your expense record",
            });

            onClose?.();
          },
          onError: (err) =>
            toast("Error updating expense record", {
              description: err.message,
              duration: 4000,
              closeButton: true,
            }),
        },
      );
    } else {
      createExpense(obj, {
        onSuccess: () => {
          toast("Expenses created successfully", {
            description: "You can now proceed to managing your task",
          });
          onClose?.();
        },
        onError: (err) =>
          toast("Error creating expenses", {
            description: err.message,
            duration: 4000,
            closeButton: true,
          }),
      });
    }
  }

  const category = [
    {
      name: "Fertilizer",
      value: "fertilizer",
    },
    {
      name: "Labor",
      value: "labor",
    },
    {
      name: "Seeds",
      value: "seeds",
    },
    {
      name: "Transport",
      value: "transport",
    },
    {
      name: "Pesticide",
      value: "pesticide",
    },
    {
      name: "Equipment",
      value: "equipment",
    },
    {
      name: "Maintenance",
      value: "maintenance",
    },
    {
      name: "Other",
      value: "other",
    },
  ];

  const stat = [
    {
      name: "Paid",
      value: "paid",
    },
    {
      name: "Pending",
      value: "pending",
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
        Expense Information
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 md:space-y-6 pt-6 w-full overflow-scroll no-scroll max-h-[73vh]"
        >
          <div className="flex gap-4 md:gap-6 items-center justify-between flex-col md:flex-row">
            <FinanceSelect
              name="category"
              control={form.control}
              label="Category"
              placeholder={
                def?.id
                  ? ((category.find(
                      (x) => x.value === (def.category as string).toLowerCase(),
                    )?.name ?? "Select category") as string)
                  : "Select category"
              }
              array={category}
              Icon={AiOutlineTag}
            />
            <FinanceSelect
              name="farm"
              control={form.control}
              label="Farm (optional)"
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
              Icon={AiOutlineTag}
            />
          </div>

          <div className="flex item justify-between flex-col md:flex-row gap-4 md:gap-6">
            <FinanceSelect
              name="field"
              control={form.control}
              label="Field (optional)"
              placeholder={
                def?.id
                  ? ((fields.find((x) => x.value === def.fieldId)?.name ??
                      "Select Field") as string)
                  : "Select field"
              }
              key={watchedFarmId}
              setValue={form.setValue}
              array={fields as { [key: string]: string }[]}
              Icon={AiOutlineTag}
            />
            <FinanceSelect
              name="crop"
              control={form.control}
              label="Crop (optional)"
              placeholder={
                def?.id
                  ? ((crops.find((x) => x.value === def.cropId)?.name ??
                      "Select crop") as string)
                  : "Select crop"
              }
              key={watchedFieldId}
              array={crops as { [key: string]: string }[]}
              Icon={AiOutlineTag}
            />
          </div>
          <div className="flex item justify-between flex-col md:flex-row gap-4 md:gap-6">
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
            <FinanceSelect
              name="status"
              control={form.control}
              label="Payment status"
              placeholder={
                def?.id
                  ? ((stat.find(
                      (x) => x.value === (def.status as string).toLowerCase(),
                    )?.name ?? "Select Status") as string)
                  : "Select Status"
              }
              array={stat}
              Icon={MdOutlinePayment}
            />
          </div>

          <div className="flex items-start justify-between flex-col md:flex-row gap-4 md:gap-6">
            <FinanceInput
              label="Vendor (optional)"
              placeholder="e.g. John Doe"
              name="vendor"
              control={form.control}
            />
            <FinanceAmount
              label="Amount"
              placeholder="e.g. 5000"
              name="amount"
              control={form.control}
            />
          </div>
          <div className="flex items-start justify-between flex-col md:flex-row gap-4 md:gap-6">
            <FinanceDate
              label="Date"
              name="expenseDate"
              control={form.control}
            />
            <FinanceText
              label="Description (optional)"
              placeholder="Enter expense description"
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
              className="text-white bg-red-600 rounded-md w-fit px-6 h-9 cursor-pointer border-none"
            >
              {status === "pending" || upStat === "pending" ? (
                <>
                  <ButtonLoader />
                  {def?.id ? "Updating..." : "Creating..."}
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <FaRegSave /> {def?.id ? "Update Expense" : "Save Expense"}
                </div>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
