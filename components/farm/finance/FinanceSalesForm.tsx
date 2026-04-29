"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { useState } from "react";
import { financeSaleSchema } from "@/lib/schemas";
import FinanceInput, {
  FinanceAmount,
  FinanceDate,
  FinanceInputSelect,
  FinanceSelect,
} from "./FinanceField";
import { IoMdGrid } from "react-icons/io";
import { PiPlant } from "react-icons/pi";
import { MdOutlinePayment } from "react-icons/md";
import { FaRegSave } from "react-icons/fa";
// import Field from "./Field";
export default function FinanceSalesForm() {
  const [load, setLoad] = useState(false);
  //   const { login, status } = useLogin();
  const form = useForm<z.infer<typeof financeSaleSchema>>({
    resolver: zodResolver(financeSaleSchema),
  });

  async function onSubmit(values: z.infer<typeof financeSaleSchema>) {}
  const arrCrop = [
    {
      name: "Maize",
      value: "maize",
    },
    {
      name: "Rice",
      value: "rice",
    },
    {
      name: "Wheat",
      value: "wheat",
    },
  ];
  const arrField = [
    {
      value: "fieldA",
      name: "Field A ",
    },
    {
      value: "fieldB",
      name: "Field B ",
    },
    {
      value: "fieldC",
      name: "Field C ",
    },
    {
      value: "fieldD",
      name: "Field D ",
    },
  ];
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
      name: "crates",
      value: "crates",
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
        Sale Information
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 md:space-y-6 pt-6 w-full overflow-scroll no-scroll max-h-[73vh]"
        >
          <div className="flex gap-4 md:gap-6 items-center flex-col md:flex-row justify-between">
            <FinanceSelect
              name="crop"
              control={form.control}
              label="Crop"
              placeholder="Select crop"
              array={arrCrop}
              Icon={PiPlant}
            />
            <FinanceSelect
              name="field"
              control={form.control}
              label="Field"
              placeholder="Select field"
              array={arrField}
              Icon={IoMdGrid}
            />
          </div>

          <div className="flex item flex-col md:flex-row justify-between gap-4 md:gap-6">
            <FinanceInputSelect
              array={arrQuantity}
              control={form.control}
              label="Quantity"
              placeholder="e.g. 50"
              placeholder2="kg"
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
            <FinanceAmount
              label="Total Amount"
              placeholder="e.g. 0.00"
              name="totalAmount"
              control={form.control}
            />
            <FinanceDate
              label="Sale Date"
              name="saleDate"
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
              placeholder="Select payment method"
              array={arrPayment}
              Icon={MdOutlinePayment}
            />
          </div>
          <FinanceInput
            label="Notes (Optional)"
            placeholder="Add any additonal notes..."
            name="notes"
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
              <FaRegSave /> Save sale
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
