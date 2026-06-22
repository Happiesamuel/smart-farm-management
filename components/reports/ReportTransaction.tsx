"use client";

import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { NoResult } from "../loader/GeneralLoader";

const formatNaira = (amount: number) => `${amount.toLocaleString("en-NG")}`;

export default function ReportTransactions({
  transactions,
  profit,
  totalRevenue,
  totalExpenses,
}: {
  transactions: {
    id: string;
    type: string;
    description: string;
    farm: string;
    amount: number;
    date: string;
  }[];
  profit: number;
  totalRevenue: number;
  totalExpenses: number;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 pt-4 gap-4">
      {/* ================= LEFT: TRANSACTIONS ================= */}
      <div className="lg:col-span-2 bg-white border rounded-xl p-4">
        <h3 className="text-sm font-medium text-dark mb-4">
          Recent Transactions
        </h3>

        <div className="overflow-x-auto h-[200px] no-scroll">
          {!transactions.length ? (
            <div className="h-[90%]">
              <NoResult>No transaction found</NoResult>
            </div>
          ) : (
            <table className="w-full text-sm ">
              <thead className=" bg-zinc-200/50 border rounded-t-2xl border-border text-gray-600">
                <tr className="text-left  ">
                  <th className="p-2">Type</th>
                  <th className="p-2">Vendor/Category</th>
                  <th className="p-2">Farm</th>
                  <th className="p-2">Amount(₦)</th>
                  <th className="p-2">Date</th>
                </tr>
              </thead>

              <tbody className="">
                {transactions.map((t) => (
                  <tr key={t.id} className="border-t">
                    {/* TYPE */}
                    <td className="py-3 px-2 max-w-full">
                      <div className="flex items-center gap-2">
                        {t.type === "sale" ? (
                          <ArrowUpRight className="text-green-600" size={16} />
                        ) : (
                          <ArrowDownRight className="text-red-500" size={16} />
                        )}
                        <span className="capitalize text-zinc-700">
                          {t.type}
                        </span>
                      </div>
                    </td>

                    {/* DESCRIPTION */}
                    <td className="py-3 px-2 max-w-full text-zinc-600">
                      {t.description}
                    </td>

                    {/* FARM */}
                    <td className="py-3 px-2 max-w-full text-zinc-600">
                      {t.farm}
                    </td>

                    {/* AMOUNT */}
                    <td
                      className={`py-3 px-2 max-w-full font-medium ${
                        t.type === "sale" ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      {t.type === "sale" ? "+" : "-"}
                      {formatNaira(t.amount)}
                    </td>

                    {/* DATE */}
                    <td className="py-3 px-2 max-w-full text-zinc-500">
                      {t.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* ================= RIGHT: REPORT SUMMARY ================= */}
      <div className="bg-white border rounded-xl p-4 flex flex-col gap-4">
        <h3 className="text-sm font-medium text-dark  mb-4">Report Summary</h3>

        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className="bg-green-100 text-green-600 p-2 rounded-full">
            <ArrowUpRight size={18} />
          </div>

          {/* Text */}
          <div className="text-sm text-zinc-600 space-y-2">
            <p>Your farm business is performing well this month.</p>

            <p>
              You earned{" "}
              <span className="text-green-600 font-medium">
                ₦{formatNaira(profit)}
              </span>{" "}
              this period.
            </p>

            <p>
              Total revenue:{" "}
              <span className="font-medium text-green-600">
                ₦{formatNaira(totalRevenue)}
              </span>{" "}
              and expenses:{" "}
              <span className="font-medium text-red-500">
                ₦{formatNaira(totalExpenses)}
              </span>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
