"use client";

import Link from "next/link";
import { MdArrowForwardIos } from "react-icons/md";

const formatNaira = (amount: number) => `${amount.toLocaleString("en-NG")}`;

export default function ReportTopPerforming({
  farmData,
}: {
  farmData: {
    id: string;
    name: string;
    revenue: number;
    expenses: number;
    profit: number;
    margin: number;
  }[];
}) {
  return (
    <div className="w-full p-4 bg-white flex-1 relative rounded-xl border border-border/80 hover:shadow-sm transition flex flex-col h-[300px] lg:h-[300px] no-scroll shrink-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-base  text-sm text-dark">
          Top Performing Farms
        </h3>
      </div>

      {/* Desktop Table */}
      <div className="hidden sm:block no-scroll overflow-x-auto">
        <table className="w-full no-scroll text-sm">
          <thead className=" bg-zinc-200/50 border rounded-t-2xl border-border text-gray-600">
            <tr className="text-left  ">
              <th className="py-2 px-2">Farm</th>
              <th className="py-2">Revenue (₦)</th>
              <th className="py-2">Expenses (₦)</th>
              <th className="py-2">Profit (₦)</th>
              <th className="py-2 px-2">Margin</th>
            </tr>
          </thead>

          <tbody>
            {farmData.map((f) => (
              <tr key={f.id} className="border-t">
                <td
                  title={f.name}
                  className="py-3 px-3 truncate text-zinc-900 max-w-[100px] pr-3 font-medium"
                >
                  {f.name}
                </td>

                <td
                  title={formatNaira(f.revenue)}
                  className="py-3 px-3 truncate text-zinc-700 max-w-[70px] pr-3"
                >
                  {formatNaira(f.revenue)}
                </td>

                <td
                  title={formatNaira(f.expenses)}
                  className="py-3 px-3 truncate text-zinc-700 max-w-[70px] pr-3"
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
                  className={`py-3 px-3  font-medium ${
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
                <td className="py-3 px-3 truncate text-zinc-700 max-w-[70px] pr-3">
                  <span className="text-xs bg-green-100 text-center px-2 py-0.5 rounded-full text-green-600  w-8">
                    {f.margin}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="sm:hidden overflow-scroll no-scroll space-y-3">
        {farmData.map((f) => (
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

      <Link
        href={"#"}
        className="flex items-center justify-between w-[90%] absolute bottom-3 text-primary-green text-sm pt-2"
      >
        <p>View all farms</p>
        <MdArrowForwardIos />
      </Link>
    </div>
  );
}
