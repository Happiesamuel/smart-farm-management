"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FiDownload, FiShoppingCart } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { FinanceModal } from "../modals/FinanceModal";
import { GrMoney } from "react-icons/gr";
import FinanceSalesFormFetch from "../farm/finance/FinanceSalesForm";
import FinanceExpenseFormFetch from "../farm/finance/FinanceExpenseFom";

export default function BothHeader({ type }: { type: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="pb-5 flex gap-3 sm:flex-row flex-col sm:items-center justify-between">
      <div className=" space-y-1">
        <h6 className="text-dark font-semibold  text-2xl">
          {type === "sales" ? "Sales" : "Expenses"}
        </h6>
        <p className="text-dark/80 text-sm">
          Track and manage all your {type === "sales" ? "sales" : "expenses"}
        </p>
      </div>
      <div className=" flex items-center gap-2">
        <Button
          onClick={() => setOpen(true)}
          className="bg-primary-green w-[48%] sm:w-fit cursor-pointer text-white rounded-sm"
        >
          <GoPlus />
          <p>Add {type === "sales" ? "Sale" : "Expense"}</p>
        </Button>

        <FinanceModal
          text={
            type === "sales"
              ? "Record a new sale made from your farm"
              : "Record a new expense for your farm"
          }
          type={type === "sales" ? "Sale" : "Expense"}
          iconColor={
            type === "sales"
              ? "bg-green-100 text-green-500"
              : "bg-red-100 text-red-500"
          }
          Icon={type === "sales" ? FiShoppingCart : GrMoney}
          open={open}
          onClose={() => setOpen(false)}
        >
          {type === "sales" ? (
            <FinanceSalesFormFetch onClose={() => setOpen(false)} />
          ) : (
            <FinanceExpenseFormFetch onClose={() => setOpen(false)} />
          )}
        </FinanceModal>
      </div>
    </div>
  );
}
