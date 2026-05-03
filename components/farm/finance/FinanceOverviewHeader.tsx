import { Button } from "@/components/ui/button";
import { useState } from "react";
import { GoPlus } from "react-icons/go";
import FinanceCalendar from "./FinanceCalendar";
import { CiFilter } from "react-icons/ci";
import { FiShoppingCart } from "react-icons/fi";
import { GrMoney } from "react-icons/gr";
import FinanceSalesForm from "./FinanceSalesForm";
import FinanceExpenseFom from "./FinanceExpenseFom";
import { FinanceModal } from "@/components/modals/FinanceModal";
export default function FinanceOverviewHeader() {
  const [type, setType] = useState("sales");
  const [open, setOpen] = useState(false);
  const rec = [
    {
      slug: "sales",
      name: "Sales Records",
    },
    {
      slug: "expense",
      name: "Expense Records",
    },
  ];
  function handleChangeType(rec: string) {
    setType(rec);
  }
  return (
    <div className="flex gap-2 flex-col sm:flex-row items-center p-2 justify-between border-border border-b">
      <div className="flex items-center gap-4">
        {rec.map((r) => (
          <div
            onClick={() => handleChangeType(r.slug)}
            key={r.slug}
            className={`text-sm cursor-pointer sm:pb-2.5 font-medium ${type === r.slug ? "text-primary-green  border-b border-primary-green" : "text-zinc-500"}`}
          >
            {r.name}
          </div>
        ))}
      </div>

      <div className="flex flex-col w-full sm:w-fit   sm:flex-row items-center gap-2 sm:gap-4">
        <FinanceCalendar />

        <Button className="bg-white w-full sm:w-fit cursor-pointer text-dark border border-border rounded">
          <CiFilter />
          <p>Filter</p>
        </Button>

        <Button
          onClick={() => setOpen(true)}
          className="bg-primary-green w-full sm:w-fit cursor-pointer text-white rounded"
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
          {type === "sales" ? <FinanceSalesForm /> : <FinanceExpenseFom />}
        </FinanceModal>
      </div>
    </div>
  );
}
