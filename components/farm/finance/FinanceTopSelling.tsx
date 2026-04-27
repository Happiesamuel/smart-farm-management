import React from "react";

export default function FinanceTopSelling() {
  const tot = [
    {
      name: "Maize",
      amount: "₦50,000",
    },
    {
      name: "Rice",
      amount: "₦30,000",
    },
    {
      name: "Tomatoes",
      amount: "₦20,000",
    },
    {
      name: "Pepper",
      amount: "₦12,000",
    },
    {
      name: "Cabbage",
      amount: "₦8,000",
    },
  ];
  return (
    <div className="space-y-3 pt-3 border-t border-border">
      <div className="flex items-center justify-between gap-3">
        <p className="text-dark text-sm font-semibold">Top Selling Crops</p>
      </div>
      <div className="space-y-2">
        {tot.map((t) => (
          <div
            className="flex border-b border-border pb-3 last:border-none items-center text-sm justify-between"
            key={t.name}
          >
            <p className="text-zinc-600">{t.name}</p>
            <p className={`text-dark/80 font-semibold`}>{t.amount}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
