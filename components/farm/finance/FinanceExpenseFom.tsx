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
import { useGetFarmCrops } from "@/hooks/crops/useCrops";
import { useGetFarm } from "@/hooks/farms/useFarm";
import { useGetFarmFields } from "@/hooks/fields/useFields";
import { FormLoader } from "@/components/loader/GeneralLoader";

export default function FinanceExpenseFormFetch() {
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
  const {
    crops,
    error: cropErr,
    status: cropStat,
  } = useGetFarmCrops(
    workspace?.id ?? null,
    user?.id ?? null,
    farmId as string,
  );

  if (!ready)
    return (
      <div className="h-125">
        <FormLoader>Loading...</FormLoader>
      </div>
    );
  if (!user && ready) return <p>error</p>;
  if (status === "pending" || cropStat === "pending" || fieldStat === "pending")
    return (
      <div className="h-125">
        <FormLoader>Loading form...</FormLoader>
      </div>
    );
  if (status === "error" || cropStat === "error" || fieldStat === "error")
    return <p>{error?.message || cropErr?.message || fieldErr?.message}</p>;

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
  const cropOptions =
    crops?.map((f) => ({
      name: f.cropName,
      value: f.$id,
    })) ?? [];
  return (
    <FinanceExpenseFom
      workspaceId={workspace!.id}
      userId={user!.id}
      farms={farmOptions}
      fields={fieldOptions}
      crops={cropOptions}
    />
  );
}

function FinanceExpenseFom({
  workspaceId,
  userId,
  farms,
  fields,
  crops,
}: {
  workspaceId: string;
  userId: string;
  farms: { name: string; value: string }[];
  fields: { name: string; value: string }[];
  crops: { name: string; value: string }[];
}) {
  const form = useForm<z.infer<typeof financeExpenseSchema>>({
    resolver: zodResolver(financeExpenseSchema) as Resolver<
      z.infer<typeof financeExpenseSchema>
    >,
  });
  const { createExpense, status } = useCreateExpenses();
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
    createExpense(obj, {
      onSuccess: () => {
        toast("Expenses created successfully", {
          description: "You can now proceed to managing your task",
        });
      },
      onError: (err) =>
        toast("Error creating expenses", {
          description: err.message,
          duration: 4000,
          closeButton: true,
        }),
    });
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
      <p className="text-primary-green pb-1 text-sm w-full font-semibold border-border border-b">
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
              placeholder="Select category"
              array={category}
              Icon={AiOutlineTag}
            />
            <FinanceSelect
              name="farm"
              control={form.control}
              label="Farm (optional)"
              placeholder="Select farm"
              array={farms}
              Icon={AiOutlineTag}
            />
          </div>

          <div className="flex item justify-between flex-col md:flex-row gap-4 md:gap-6">
            <FinanceSelect
              name="field"
              control={form.control}
              label="Field (optional)"
              placeholder="Select field"
              array={fields}
              Icon={AiOutlineTag}
            />
            <FinanceSelect
              name="crop"
              control={form.control}
              label="Crop (optional)"
              placeholder="Select crop"
              array={crops}
              Icon={AiOutlineTag}
            />
          </div>
          <div className="flex item justify-between flex-col md:flex-row gap-4 md:gap-6">
            <FinanceSelect
              name="paymentMethod"
              control={form.control}
              label="Payment Method"
              placeholder="Select payment method"
              array={arrPayment}
              Icon={MdOutlinePayment}
            />
            <FinanceSelect
              name="status"
              control={form.control}
              label="Payment status"
              placeholder="Select payment status"
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
              disabled={status === "pending"}
              className="text-white bg-red-600 rounded-md w-fit px-6 h-9 cursor-pointer border-none"
            >
              {status === "pending" ? (
                <>
                  <ButtonLoader />
                  Creating...
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <FaRegSave /> Save expense
                </div>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
