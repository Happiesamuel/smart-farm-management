import FinancePagination from "@/components/layout/FinancePagination";
import { FaEye, FaEllipsisV } from "react-icons/fa";

const sales = [
  {
    id: 1,
    date: "May 25, 2025",
    crop: "Maize",
    emoji: "🌽",
    buyer: "Lagos Farms Ltd.",
    quantity: "50 bags",
    unitPrice: "₦1,000",
    total: "₦50,000",
    payment: "Bank Transfer",
    status: "Paid",
  },
  {
    id: 2,
    date: "May 20, 2025",
    crop: "Rice",
    emoji: "🌾",
    buyer: "FoodBasket Co.",
    quantity: "30 bags",
    unitPrice: "₦1,000",
    total: "₦30,000",
    payment: "Cash",
    status: "Paid",
  },
  {
    id: 3,
    date: "May 15, 2025",
    crop: "Tomatoes",
    emoji: "🍅",
    buyer: "SuperMart Abuja",
    quantity: "20 crates",
    unitPrice: "₦1,000",
    total: "₦20,000",
    payment: "Bank Transfer",
    status: "Paid",
  },
  {
    id: 4,
    date: "May 10, 2025",
    crop: "Pepper",
    emoji: "🫑",
    buyer: "GreenGrocers",
    quantity: "15 crates",
    unitPrice: "₦800",
    total: "₦12,000",
    payment: "Cash",
    status: "Paid",
  },
  {
    id: 5,
    date: "May 05, 2025",
    crop: "Cabbage",
    emoji: "🥬",
    buyer: "Mama Ngozi Market jkjkw",
    quantity: "40 heads",
    unitPrice: "₦500",
    total: "₦20,000",
    payment: "Bank Transfer",
    status: "Paid",
  },
];

const paymentStyles: Record<string, string> = {
  "Bank Transfer": "bg-green-100 text-green-700",
  Cash: "bg-blue-100 text-blue-700",
};

const statusStyles: Record<string, string> = {
  Paid: "bg-green-100 text-green-700",
};

export default function FinanceSalesTable() {
  return (
    <div className=" px-4  overflow-hidden">
      {/* Title */}
      <div className="py-2.5  font-semibold text-base text-dark">
        Sales Records
      </div>

      {/* Desktop Table */}
      <div className="block overflow-x-auto">
        <table className="w-full text-sm ">
          <thead className=" bg-zinc-200/50 border rounded-t-2xl border-border text-gray-600">
            <tr className="text-left ">
              <th className="py-2 truncate max-w-[50px] px-2">Date</th>
              <th className="py-2 truncate max-w-[50px] pl-4">Crop</th>
              <th className="py-2 truncate max-w-[50px] pl-2">Buyer</th>
              <th className="py-2 truncate max-w-[50px] pl-2">Quantity</th>
              <th className="py-2 truncate max-w-[50px] pr-2">Unit Price</th>
              <th className="py-2 truncate max-w-[50px] pl-2">Total Amount</th>
              <th className="py-2 truncate max-w-[50px] pl-2">
                Payment Method
              </th>
              <th className="py-2 truncate max-w-[50px] pl-2">Status</th>
              <th className="py-2 truncate max-w-[50px] px-2 text-right">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {sales.map((s) => (
              <tr key={s.id} className="border-t hover:bg-gray-50">
                <td
                  title={s.date}
                  className="py-3 truncate font-medium max-w-[70px] pl-2 text-xs text-zinc-700"
                >
                  {s.date}
                </td>

                <td
                  title={`${s.emoji} ${s.crop}`}
                  className="py-3 truncate font-medium max-w-[70px] pl-2 text-xs text-zinc-700 flex items-center gap-2"
                >
                  <span>{s.emoji}</span> {s.crop}
                </td>

                <td
                  title={s.buyer}
                  className="py-3 truncate font-medium max-w-[70px] pr-4 text-xs text-zinc-700"
                >
                  {s.buyer}
                </td>
                <td
                  title={s.quantity}
                  className="py-3 truncate font-medium max-w-[70px] pl-2 text-xs text-zinc-700"
                >
                  {s.quantity}
                </td>
                <td
                  title={s.unitPrice}
                  className="py-3 truncate font-medium max-w-[70px] pl-2 text-xs text-zinc-700"
                >
                  {s.unitPrice}
                </td>
                <td
                  title={s.total}
                  className="py-3 truncate font-medium max-w-[70px] pl-2 text-xs text-zinc-700 font-medium"
                >
                  {s.total}
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

                <td
                  title={s.status}
                  className="py-3 truncate font-medium max-w-[70px] pl-2 text-xs text-zinc-700"
                >
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${statusStyles[s.status]}`}
                  >
                    {s.status}
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

      <FinancePagination type="sales" />
    </div>
  );
}
