import { FaEye, FaEllipsisV } from "react-icons/fa";

const sales = [
  {
    id: "EXP-128",
    date: "May 25, 2025",
    farm: "Green Valley Farm",
    total: "₦50,000",
    payment: "Bank Transfer",
    status: "Paid",
    category: "Fertilizer",
    description: "NPK 20:10:10",
  },
  {
    id: "EXP-127",
    date: "May 20, 2025",
    farm: "Sunrise Farm",
    category: "Labor",
    description: "Field Workers (10 days)",
    total: "₦30,000",
    payment: "Cash",
    status: "Paid",
  },
  {
    id: "EXP-126",
    date: "May 15, 2025",
    farm: "Golden Arces Farm",
    total: "₦20,000",
    payment: "Bank Transfer",
    category: "Seeds",
    description: "Maize Seeds (Hybrid)",
    status: "Paid",
  },
  {
    id: "EXP-125",
    date: "May 10, 2025",
    farm: "Riverbend Farm",
    total: "₦12,000",
    payment: "Cash",
    status: "Pending",
    category: "Transport",
    description: "Delivery to Market",
  },
  {
    id: "EXP-124",
    date: "May 05, 2025",
    farm: "Golden Arces Farm",
    total: "₦20,000",
    payment: "Bank Transfer",
    status: "Paid",
    category: "Irrigation",
    description: "Water Pump Fuel",
  },
  {
    id: "EXP-123",
    date: "May 10, 2025",
    farm: "Riverbend Farm",
    total: "₦12,000",
    payment: "Cash",
    status: "Pending",
    category: "Fertilizer",
    description: "NPK 20:10:10",
  },
  {
    id: "EXP-122",
    date: "May 05, 2025",
    farm: "Golden Arces Farm",
    total: "₦20,000",
    payment: "Bank Transfer",
    status: "Paid",
    category: "Transport",
    description: "Delivery to Market",
  },
  {
    id: "EXP-121",
    date: "May 05, 2025",
    farm: "Golden Arces Farm",
    total: "₦20,000",
    payment: "Bank Transfer",
    status: "Paid",
    category: "Seeds",
    description: "Maize Seeds (Hybrid)",
  },
  {
    id: "EXP-120",
    date: "May 05, 2025",
    farm: "Golden Arces Farm",
    total: "₦20,000",
    payment: "Bank Transfer",
    status: "Paid",
    category: "Fertilizer",
    description: "NPK 20:10:10",
  },
  {
    id: "EXP-119",
    date: "May 05, 2025",
    farm: "Golden Arces Farm",
    total: "₦20,000",
    payment: "Bank Transfer",
    status: "Paid",
    category: "Irrigation",
    description: "Water Pump Fuel",
  },
];

//10 result per page
const paymentStyles: Record<string, string> = {
  "Bank Transfer": "bg-green-100 text-green-700",
  Cash: "bg-blue-100 text-blue-700",
};

const statusStyles: Record<string, string> = {
  Paid: "bg-green-100 text-green-700",
  Pending: "bg-[#fff1dd] text-[#de852c]",
};

export default function ExpenseTable() {
  return (
    <div className="  overflow-hidden">
      {/* Desktop Table */}
      <div className="block overflow-x-auto">
        <table className="w-full text-sm ">
          <thead className=" bg-zinc-200/50 border rounded-t-2xl border-border text-gray-600">
            <tr className="text-left ">
              <th className="py-2 truncate max-w-[50px] px-2">Date</th>
              <th className="py-2 truncate max-w-[50px] pl-1">Expense No.</th>
              <th className="py-2 truncate max-w-[50px] pl-4">Category</th>
              <th className="py-2 truncate max-w-[50px] px-4">Farm</th>
              <th className="py-2 truncate max-w-[50px] pl-">Description</th>
              <th className="py-2 truncate max-w-[50px] pl-2">Amount</th>
              <th className="py-2 truncate max-w-[50px] pl-5">
                Payment Status
              </th>
              <th className="py-2 truncate max-w-[50px] pl-2">
                Payment Method
              </th>
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
                  className="py-3 truncate font-medium max-w-[70px] px-2 text-[13px] text-zinc-600"
                >
                  {s.date}
                </td>

                <td
                  title={`${s.id}`}
                  className="py-3 truncate font-medium max-w-[70px] pl-1 text-[13px] text-zinc-600 flex items-center gap-2"
                >
                  {s.id}
                </td>

                <td
                  title={s.category}
                  className="py-3 truncate font-medium max-w-[70px] pl-4 pr-1 text-[13px] text-zinc-600"
                >
                  {s.category}
                </td>
                <td
                  title={s.farm}
                  className="py-3 truncate font-medium max-w-[70px] px-1 text-[13px] text-zinc-600"
                >
                  {s.farm}
                </td>

                <td
                  title={s.description}
                  className="py-3 truncate font-medium max-w-[70px] px-2 pr-3 text-[13px] text-zinc-600"
                >
                  {s.description}
                </td>

                <td
                  title={s.total}
                  className="py-3 truncate font-semibold max-w-[70px] pl-2 text-[13px] text-zinc-600 "
                >
                  {s.total}
                </td>

                <td
                  title={s.status}
                  className="py-3 truncate font-medium max-w-[70px] pl-4 text-[13px] text-zinc-600"
                >
                  <span
                    className={`px-2 py-0.5 text-[12px] rounded-full ${statusStyles[s.status]}`}
                  >
                    {s.status}
                  </span>
                </td>
                <td
                  title={s.payment}
                  className="py-3 truncate font-medium max-w-[70px] pl-2 text-[13px] text-zinc-600"
                >
                  <span
                    className={`px-2 py-0.5 text-[12px] rounded-full ${paymentStyles[s.payment]}`}
                  >
                    {s.payment}
                  </span>
                </td>

                <td className="py-3 px-2 truncate font-medium max-w-[70px] px- text-[13px] text-zinc-600 text-right">
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
                className={`text-[13px] px-2 py-1 6ounded-full ${statusStyles[s.status]}`}
              >
                {s.status}
              </span>
            </div>

            <div className="flex items-center gap-2 font-medium mt-2">
              {s.emoji} {s.crop}
            </div>

            <p className="text-sm mt-1">{s.farm}</p>

            <div className="text-[13px] text-gray-600 mt-2">Qty: {s.quantity}</div>

            <div className="text-[13px] text-gray-600">Unit: {s.unitPrice}</div>

            <div className="font-semibold mt-2">{s.total}</div>

            <div className="mt-2">
              <span
                className={`text-[13px] px-2 py-1 6ounded-full ${paymentStyles[s.payment]}`}
              >
                {s.payment}
              </span>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
}
