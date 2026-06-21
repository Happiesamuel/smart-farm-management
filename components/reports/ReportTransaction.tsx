"use client";

import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const transactions = [
  {
    id: 1,
    type: "sale",
    description: "Maize harvest sale",
    farm: "Green Acres Farm",
    amount: 320000,
    date: "May 31, 2025",
  },
  {
    id: 2,
    type: "expense",
    description: "Fertilizer (NPK 15:15:15)",
    farm: "Green Acres Farm",
    amount: 85500,
    date: "May 31, 2025",
  },
];

const formatNaira = (amount: number) => `₦${amount.toLocaleString("en-NG")}`;

export default function ReportTransactions() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 pt-4 gap-4">
      {/* ================= LEFT: TRANSACTIONS ================= */}
      <div className="lg:col-span-2 bg-white border rounded-xl p-4">
        <h3 className="text-sm font-medium text-dark mb-4">
          Recent Transactions
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className=" bg-zinc-200/50 border rounded-t-2xl border-border text-gray-600">
              <tr className="text-left  ">
                <th className="py-2 px-2">Type</th>
                <th className="py-2">Description</th>
                <th className="py-2">Farm</th>
                <th className="py-2">Amount (₦)</th>
                <th className="py-2 px-2">Date</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((t) => (
                <tr key={t.id} className="border-t">
                  {/* TYPE */}
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      {t.type === "sale" ? (
                        <ArrowUpRight className="text-green-600" size={16} />
                      ) : (
                        <ArrowDownRight className="text-red-500" size={16} />
                      )}
                      <span className="capitalize text-zinc-700">{t.type}</span>
                    </div>
                  </td>

                  {/* DESCRIPTION */}
                  <td className="py-3 text-zinc-600">{t.description}</td>

                  {/* FARM */}
                  <td className="py-3 text-zinc-600">{t.farm}</td>

                  {/* AMOUNT */}
                  <td
                    className={`py-3 font-medium ${
                      t.type === "sale" ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {t.type === "sale" ? "+" : "-"}
                    {formatNaira(t.amount)}
                  </td>

                  {/* DATE */}
                  <td className="py-3 text-zinc-500">{t.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
              <span className="text-green-600 font-medium">₦2,220,000</span> in
              profit, which is{" "}
              <span className="text-green-600 font-medium">28.1% higher</span>{" "}
              than the previous period.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
