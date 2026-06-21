"use client";

import Link from "next/link";
import { MdArrowForwardIos } from "react-icons/md";

const formatNaira = (amount: number) => `${amount.toLocaleString("en-NG")}`;

export default function ReportCropPerfomance({
  farmData,
}: {
  farmData: {
    id: string;
    crop: string;
    yield: number;
    revenue: number;
    profit: number;
  }[];
}) {
  return (
    <div className="w-full p-4 bg-white relative flex-1 rounded-xl border border-border/80 hover:shadow-sm transition flex flex-col h-[300px] lg:h-[300px] no-scroll shrink-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-base  text-sm text-dark">
          Crop Performcance
        </h3>
      </div>

      {/* Desktop Table */}
      <div className="hidden sm:block no-scroll overflow-x-auto">
        <table className="w-full no-scroll text-sm">
          <thead className=" bg-zinc-200/50 border rounded-t-2xl border-border text-gray-600">
            <tr className="text-left  ">
              <th className="py-2 px-2">Crop</th>
              <th className="py-2">Total Yield</th>
              <th className="py-2">Revenue (₦)</th>
              <th className="py-2">Profit (₦)</th>
            </tr>
          </thead>

          <tbody>
            {farmData.map((f) => (
              <tr key={f.id} className="border-t">
                <td
                  title={f.crop}
                  className="py-3 px-3 truncate text-zinc-900 max-w-[100px] pr-3 font-medium"
                >
                  {f.crop}
                </td>

                <td
                  title={formatNaira(f.yield)}
                  className="py-3 px-3 truncate text-zinc-700 max-w-[70px] pr-3"
                >
                  {formatNaira(f.yield)}
                </td>

                <td
                  title={formatNaira(f.revenue)}
                  className="py-3 px-3 truncate text-zinc-700 max-w-[70px] pr-3"
                >
                  {formatNaira(f.revenue)}
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
              <h4 className="font-medium text-base text-dark/80">{f.crop}</h4>
            </div>

            <p className="text-xs text-zinc-700 mt-1">
              Revenue: {formatNaira(f.revenue)}
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

            <div className="mt-2"></div>
          </div>
        ))}
      </div>

      <Link
        href={"#"}
        className="flex items-center justify-between w-[90%] absolute bottom-3 text-primary-green text-sm pt-2"
      >
        <p>View full report</p>
        <MdArrowForwardIos />
      </Link>
    </div>
  );
}
