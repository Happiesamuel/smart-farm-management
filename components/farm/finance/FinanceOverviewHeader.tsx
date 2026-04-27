import React from "react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { GoPlus } from "react-icons/go";
import FinanceCalendar from "./FinanceCalendar";
import { CiFilter } from "react-icons/ci";
export default function FinanceOverviewHeader() {
  const [type, setType] = useState("sales");
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
    <div className="flex items-center p-2 justify-between border-border border-b">
      <div className="flex items-center gap-4">
        {rec.map((r) => (
          <div
            onClick={() => handleChangeType(r.slug)}
            key={r.slug}
            className={`text-sm cursor-pointer pb-2.5 font-medium ${type === r.slug ? "text-primary-green  border-b border-primary-green" : "text-zinc-500"}`}
          >
            {r.name}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <FinanceCalendar />

        <Button className="bg-white w-[48%] sm:w-fit cursor-pointer text-dark border border-border rounded">
          <CiFilter />
          <p>Filter</p>
        </Button>
        <Button className="bg-primary-green w-[48%] sm:w-fit cursor-pointer text-white rounded">
          <GoPlus />
          <p>Add {type === "sales" ? "Sale" : "Expense"}</p>
        </Button>
      </div>
    </div>
  );
}
