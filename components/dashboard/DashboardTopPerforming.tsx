"use client";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
const farms = [
  {
    id: 1,
    name: "Green Valley Farm",
    revenue: 750000,
    expenses: 320000,
    profit: 430000,
    margin: 57,
  },
  {
    id: 2,
    name: "Sunrise Farm",
    revenue: 350000,
    expenses: 180000,
    profit: 170000,
    margin: 49,
  },
  {
    id: 3,
    name: "Golden Acres Farm",
    revenue: 100000,
    expenses: 70000,
    profit: 30000,
    margin: 30,
  },
  {
    id: 4,
    name: "Hope Farm",
    revenue: 50000,
    expenses: 50000,
    profit: 0,
    margin: 0,
  },
];

const formatNaira = (amount: number) => `₦${amount.toLocaleString("en-NG")}`;

export default function DashboardTopPerforming() {
  const [val, setVal] = useState("year");

  const year = [
    { id: 1, value: "year", name: "This Year" },
    { id: 2, value: "month", name: "This Month" },
  ];

  return (
    <div className="w-full p-4 bg-white flex-1 rounded-xl border border-border/80 hover:shadow-sm transition flex flex-col h-[300px] lg:h-[250px] no-scroll shrink-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-base text-dark">
          Top Performing Farms
        </h3>

        <Select onValueChange={(e) => setVal(e)} defaultValue={val}>
          <SelectTrigger className="text-dark border border-border bg-white rounded-lg">
            <SelectValue placeholder="2024" />
          </SelectTrigger>
          <SelectContent className="bg-white border-border text-zinc-400">
            {year.map((x) => (
              <SelectItem
                key={x.id}
                value={x.value.toString()}
                className="hover:bg-zinc-900 transition-all duration-500 cursor-pointer"
              >
                {x.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Desktop Table */}
      <div className="hidden sm:block no-scroll overflow-x-auto">
        <table className="w-full no-scroll text-sm">
          <thead className="text-gray-500 text-left">
            <tr>
              <th className="pb-3">Farm</th>
              <th className="pb-3">Total Revenue</th>
              <th className="pb-3">Total Expenses</th>
              <th className="pb-3">Net Profit</th>
              <th className="pb-3">Profit Margin</th>
            </tr>
          </thead>

          <tbody>
            {farms.map((f) => (
              <tr key={f.id} className="border-t">
                <td
                  title={f.name}
                  className="py-3 truncate text-zinc-900 max-w-[95px] pr-3 font-medium"
                >
                  {f.name}
                </td>

                <td
                  title={formatNaira(f.revenue)}
                  className="py-3 truncate text-zinc-700 max-w-[70px] pr-3"
                >
                  {formatNaira(f.revenue)}
                </td>

                <td
                  title={formatNaira(f.expenses)}
                  className="py-3 truncate text-zinc-700 max-w-[70px] pr-3"
                >
                  {formatNaira(f.expenses)}
                </td>

                <td
                  title={
                    f.profit > 0
                      ? formatNaira(f.profit)
                      : f.profit === 0
                        ? "₦0"
                        : `-${formatNaira(Math.abs(f.profit))}`
                  }
                  className={`py-3 pr-3 font-medium ${
                    f.profit > 0
                      ? "text-green-600"
                      : f.profit === 0
                        ? "text-gray-500"
                        : "text-red-500"
                  }`}
                >
                  {f.profit > 0
                    ? formatNaira(f.profit)
                    : f.profit === 0
                      ? "₦0"
                      : `-${formatNaira(Math.abs(f.profit))}`}
                </td>

                {/* Profit Margin */}
                <td className="py-3 truncate text-zinc-700 max-w-[70px] pr-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs w-8">{f.margin}%</span>

                    <div className="w-24 h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-green-600 rounded-full"
                        style={{ width: `${f.margin}%` }}
                      />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="sm:hidden overflow-scroll no-scroll space-y-3">
        {farms.map((f) => (
          <div key={f.id} className="border rounded-lg p-3">
            <div className="flex justify-between">
              <h4 className="font-medium text-base text-dark/80">{f.name}</h4>
              <span className="text-xs">{f.margin}%</span>
            </div>

            <p className="text-xs text-zinc-700 mt-1">
              Revenue: {formatNaira(f.revenue)}
            </p>

            <p className="text-xs text-zinc-700">
              Expenses: {formatNaira(f.expenses)}
            </p>

            <p
              className={`text-sm font-medium  pt-1.5 ${
                f.profit > 0
                  ? "text-green-600"
                  : f.profit === 0
                    ? "text-gray-500"
                    : "text-red-500"
              }`}
            >
              Profit:{" "}
              {f.profit > 0
                ? formatNaira(f.profit)
                : f.profit === 0
                  ? "₦0"
                  : `-${formatNaira(Math.abs(f.profit))}`}
            </p>

            <div className="mt-2">
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 bg-green-600 rounded-full"
                  style={{ width: `${f.margin}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
