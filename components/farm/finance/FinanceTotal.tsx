import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { useState } from "react";
export default function FinanceTotal() {
  const [crop, setCrop] = useState("month");

  const crops = [
    { id: 1, name: "This Week", value: "week" },
    { id: 2, name: "This Month", value: "month" },
    { id: 3, name: "This Year", value: "year" },
  ];
  const tot = [
    {
      name: "Total Sales",
      amount: "₦120,000",
      col: "text-primary-green",
    },
    {
      name: "Total Expenses",
      amount: "₦50,000",
      col: "text-red-500",
    },
    {
      name: "Net Profit",
      amount: "₦70,000",
      col: "text-primary-green",
    },
    {
      name: "Profit Margin",
      amount: "58.3%",
      col: "text-dark/80",
    },
  ];
  return (
    <div className="space-y-3  border-b border-border pb-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-dark text-sm font-semibold">Finance Summary</p>
        <Select onValueChange={(e) => setCrop(e)} defaultValue={crop}>
          <SelectTrigger className="text-dark border border-border bg-white rounded-lg">
            <SelectValue placeholder="Corn" />
          </SelectTrigger>
          <SelectContent className="bg-white border-border text-zinc-400">
            {crops.map((x) => (
              <SelectItem
                key={x.id}
                value={x.value}
                className="hover:bg-zinc-900 transition-all duration-500 cursor-pointer"
              >
                {x.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-4">
        {tot.map((t) => (
          <div
            className="flex items-center text-sm justify-between"
            key={t.name}
          >
            <p className="text-zinc-600">{t.name}</p>
            <p className={`${t.col} font-semibold`}>{t.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
