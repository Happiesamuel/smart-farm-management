"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
  FinanceUpload,
} from "./FinanceExpenseField";

import { MdOutlinePayment } from "react-icons/md";
import { FaRegSave } from "react-icons/fa";
import { useApp } from "@/stores/useAppStore";
import { useParams } from "next/navigation";
import ButtonLoader from "@/components/layout/ButtonLoader";
import { toast } from "sonner";
import { useCreateExpenses } from "@/hooks/expense/useExpense";
export default function FinanceExpenseFom() {
  const form = useForm<z.infer<typeof financeExpenseSchema>>({
    resolver: zodResolver(financeExpenseSchema),
  });
  const { farmId } = useParams();
  const { createExpense, status } = useCreateExpenses();
  const { workspace, user } = useApp();
  async function onSubmit(values: z.infer<typeof financeExpenseSchema>) {
    const obj = {
      userId: user!.id,
      workspaceId: workspace!.id,
      data: {
        ...values,
        farmId: farmId!.toString(),
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
      name: "Labour",
      value: "labour",
    },
    {
      name: "Seeds",
      value: "seeds",
    },
    {
      name: "Transport",
      value: "transport",
    },
  ];
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
  const arrPayment = [
    {
      name: "Cash",
      value: "cash",
    },
    {
      name: "Bank Transfer",
      value: "bankTransfer",
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
              label="Farm"
              placeholder="Select farm"
              array={farm}
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
            <FinanceAmount
              label="Amount"
              placeholder="e.g. 5000"
              name="amount"
              control={form.control}
            />
          </div>

          <div className="flex items-start justify-between flex-col md:flex-row gap-4 md:gap-6">
            <FinanceText
              label="Description"
              placeholder="Enter expense description"
              name="description"
              control={form.control}
            />
            <FinanceUpload control={form.control} />
          </div>
          <div className="flex items-start justify-between flex-col md:flex-row gap-4 md:gap-6">
            <FinanceDate label="Date" name="date" control={form.control} />
            <FinanceInput
              label="Notes (Optional)"
              placeholder="Add any additonal notes..."
              name="notes"
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
