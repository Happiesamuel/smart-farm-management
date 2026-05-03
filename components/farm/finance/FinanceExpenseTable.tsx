import FinancePagination from "@/components/layout/FinancePagination";
import { FaEye, FaEllipsisV } from "react-icons/fa";

const expenses = [
  {
    id: 1,
    date: "May 27, 2025",
    category: "Fertilizer",
    description: "NPK 20:10:10",
    icon: "🧪", // or use react-icons later
    quantity: "10 bags",
    unitCost: 1000,
    total: 10000,
    payment: "Bank Transfer",
  },
  {
    id: 2,
    date: "May 24, 2025",
    category: "Labor",
    description: "Field Workers (10 days)",
    icon: "👷",
    quantity: "10 days",
    unitCost: 1500,
    total: 15000,
    payment: "Cash",
  },
  {
    id: 3,
    date: "May 21, 2025",
    category: "Seeds",
    description: "Maize Seeds (Hybrid)",
    icon: "🌱",
    quantity: "5 bags",
    unitCost: 1200,
    total: 6000,
    payment: "Bank Transfer",
  },
  {
    id: 4,
    date: "May 18, 2025",
    category: "Transport",
    description: "Delivery to Market",
    icon: "🚚",
    quantity: "1 trip",
    unitCost: 5000,
    total: 5000,
    payment: "Cash",
  },
  {
    id: 5,
    date: "May 14, 2025",
    category: "Irrigation",
    description: "Water Pump Fuel",
    icon: "💧",
    quantity: "20 liters",
    unitCost: 600,
    total: 12000,
    payment: "Cash",
  },
];
const paymentStyles: Record<string, string> = {
  "Bank Transfer": "bg-green-100 text-green-700",
  Cash: "bg-blue-100 text-blue-700",
};

export default function FinanceExpenseTable() {
  return (
    <div className=" px-4  overflow-hidden">
      {/* Title */}
      <div className="py-2.5 border-t border-border font-semibold text-base text-dark">
        Expense Records
      </div>

      {/* Desktop Table */}
      <div className="block overflow-x-auto">
        <table className="w-full text-sm ">
          <thead className=" bg-zinc-200/50 border rounded-t-2xl border-border text-gray-600">
            <tr className="text-left ">
              <th className="py-2 truncate max-w-[50px] px-2">Date</th>
              <th className="py-2 truncate max-w-[50px] pl-4">Category</th>
              <th className="py-2 truncate max-w-[50px] pl-2">Description</th>
              <th className="py-2 truncate max-w-[50px] pl-2">Quantity</th>
              <th className="py-2 truncate max-w-[50px] pr-2">Unit Cost</th>
              <th className="py-2 truncate max-w-[50px] pl-2">Total Amount</th>
              <th className="py-2 truncate max-w-[50px] pl-2">
                Payment Method
              </th>
              <th className="py-2 truncate max-w-[50px] px-2 text-right">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {expenses.map((s) => (
              <tr key={s.id} className="border-t hover:bg-gray-50">
                <td
                  title={s.date}
                  className="py-3 truncate font-medium max-w-[70px] pl-2 text-xs text-zinc-700"
                >
                  {s.date}
                </td>

                <td
                  title={`${s.icon} ${s.category}`}
                  className="py-3 truncate font-medium max-w-[70px] pl-2 text-xs text-zinc-700 flex items-center gap-2"
                >
                  <span>{s.icon}</span> {s.category}
                </td>

                <td
                  title={s.description}
                  className="py-3 truncate font-medium max-w-[70px] px-4 text-xs text-zinc-700"
                >
                  {s.description}
                </td>
                <td
                  title={s.quantity}
                  className="py-3 truncate font-medium max-w-[70px] pl-2 text-xs text-zinc-700"
                >
                  {s.quantity}
                </td>
                <td
                  title={s.unitCost.toString()}
                  className="py-3 truncate font-medium max-w-[70px] pl-2 text-xs text-zinc-700"
                >
                  ₦{s.unitCost}
                </td>
                <td
                  title={s.total.toString()}
                  className="py-3 truncate font-medium max-w-[70px] pl-2 text-xs text-zinc-700 font-medium"
                >
                  ₦{s.total}
                </td>

                <td
                  title={s.payment}
                  className="py-3 truncate font-medium max-w-[70px] pl-2 text-xs text-zinc-700"
                >
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${paymentStyles[s.payment]}`}
                  >
                    {s.payment}
                  </span>
                </td>

                <td className="py-3 px-2 truncate font-medium max-w-[70px] px- text-xs text-zinc-700 text-right">
                  <div className="flex justify-end gap-3 text-gray-500">
                    <FaEye className="cursor-pointer hover:text-black" />
                    <FaEllipsisV className="cursor-pointer hover:text-black" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      {/* <div className="md:hidden space-y-3 p-4">
        {sales.map((s) => (
          <div key={s.id} className="border rounded-lg p-4 shadow-sm">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">{s.date}</span>
              <span
                className={`text-xs px-2 py-1 rounded-full ${statusStyles[s.status]}`}
              >
                {s.status}
              </span>
            </div>

            <div className="flex items-center gap-2 font-medium mt-2">
              {s.emoji} {s.crop}
            </div>

            <p className="text-sm mt-1">{s.buyer}</p>

            <div className="text-xs text-gray-500 mt-2">Qty: {s.quantity}</div>

            <div className="text-xs text-gray-500">Unit: {s.unitPrice}</div>

            <div className="font-semibold mt-2">{s.total}</div>

            <div className="mt-2">
              <span
                className={`text-xs px-2 py-1 rounded-full ${paymentStyles[s.payment]}`}
              >
                {s.payment}
              </span>
            </div>
          </div>
        ))}
      </div> */}

      <FinancePagination type="expenses" />
    </div>
  );
}
