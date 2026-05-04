import { FaEye, FaEllipsisV } from "react-icons/fa";
import HarvestTableHeader from "./HarvestTableHeader";

const sales = [
  {
    id: "inv-128",
    date: "May 25, 2025",
    crop: "Maize",
    farm: "Green Valley Farm",
    quantity: "500",
    unit: "kg",
    unitPrice: "₦1,000",
    total: "₦50,000",
    payment: "Bank Transfer",
    status: "Paid",
  },
  {
    id: "inv-127",
    date: "May 20, 2025",
    crop: "Rice",
    farm: "Sunrise Farm",
    quantity: "30",
    unit: "bags",
    unitPrice: "₦1,000",
    total: "₦30,000",
    payment: "Cash",
    status: "Paid",
  },
  {
    id: "inv-126",
    date: "May 15, 2025",
    crop: "Tomatoes",
    farm: "Golden Arces Farm",
    quantity: "20",
    unit: "crates",
    unitPrice: "₦1,000",
    total: "₦20,000",
    payment: "Bank Transfer",
    status: "Paid",
  },
  {
    id: "inv-125",
    date: "May 10, 2025",
    crop: "Pepper",
    farm: "Riverbend Farm",
    quantity: "15",
    unit: "crates",
    unitPrice: "₦800",
    total: "₦12,000",
    payment: "Cash",
    status: "Pending",
  },
  {
    id: "inv-124",
    date: "May 05, 2025",
    crop: "Cabbage",
    farm: "Golden Arces Farm",
    quantity: "40",
    unit: "heads",
    unitPrice: "₦500",
    total: "₦20,000",
    payment: "Bank Transfer",
    status: "Paid",
  },
  {
    id: "inv-123",
    date: "May 10, 2025",
    crop: "Pepper",
    farm: "Riverbend Farm",
    quantity: "15",
    unit: "crates",
    unitPrice: "₦800",
    total: "₦12,000",
    payment: "Cash",
    status: "Pending",
  },
  {
    id: "inv-122",
    date: "May 05, 2025",
    crop: "Cabbage",
    farm: "Golden Arces Farm",
    quantity: "40",
    unit: "heads",
    unitPrice: "₦500",
    total: "₦20,000",
    payment: "Bank Transfer",
    status: "Paid",
  },
  {
    id: "inv-121",
    date: "May 05, 2025",
    crop: "Cabbage",
    farm: "Golden Arces Farm",
    quantity: "40",
    unit: "heads",
    unitPrice: "₦500",
    total: "₦20,000",
    payment: "Bank Transfer",
    status: "Paid",
  },
  {
    id: "inv-120",
    date: "May 05, 2025",
    crop: "Cabbage",
    farm: "Golden Arces Farm",
    quantity: "40",
    unit: "heads",
    unitPrice: "₦500",
    total: "₦20,000",
    payment: "Bank Transfer",
    status: "Paid",
  },
  {
    id: "inv-119",
    date: "May 05, 2025",
    crop: "Cabbage",
    farm: "Golden Arces Farm",
    quantity: "40",
    unit: "heads",
    unitPrice: "₦500",
    total: "₦20,000",
    payment: "Bank Transfer",
    status: "Paid",
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

export default function SalesTable() {
  return (
    <div className="mt-2">
      <HarvestTableHeader />
      {/* <div className="  overflow-hidden">
      <div className="block overflow-x-auto">
        <table className="w-full text-sm ">
          <thead className=" bg-zinc-200/50 border rounded-t-2xl border-border text-gray-600">
            <tr className="text-left ">
              <th className="py-2 truncate max-w-[50px] px-2">Date</th>
              <th className="py-2 truncate max-w-[50px] pl-1">Invoice No.</th>
              <th className="py-2 truncate max-w-[50px] px-4">Farm</th>
              <th className="py-2 truncate max-w-[50px] pl-2">Crop</th>
              <th className="py-2 truncate max-w-[50px] pl-">Quantity</th>
              <th className="py-2 truncate max-w-[50px] pl-2">Unit</th>
              <th className="py-2 truncate max-w-[50px] pr-2">Unit Price</th>
              <th className="py-2 truncate max-w-[50px] pl-2">Amount</th>
              <th className="py-2 truncate max-w-[50px] pl-2">
                Payment Method
              </th>
              <th className="py-2 truncate max-w-[50px] pl-5">Status</th>
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
                  title={` ${s.id}`}
                  className="py-3 truncate font-medium max-w-[70px] pl-1 text-[13px] text-zinc-600 flex items-center gap-2"
                >
                  {s.id}
                </td>
                <td
                  title={s.farm}
                  className="py-3 truncate font-medium max-w-[70px] px-2 text-[13px] text-zinc-600"
                >
                  {s.farm}
                </td>
                <td
                  title={` ${s.crop}`}
                  className="py-3 truncate font-medium max-w-[70px] pl-2 text-[13px] text-zinc-600 flex items-center gap-2"
                >
                  {s.crop}
                </td>

                <td
                  title={s.quantity}
                  className="py-3 truncate font-medium max-w-[70px] pl-2 text-[13px] text-zinc-600"
                >
                  {s.quantity}
                </td>
                <td
                  title={s.unit}
                  className="py-3 truncate font-medium max-w-[70px] pl-2 text-[13px] text-zinc-600"
                >
                  {s.unit}
                </td>
                <td
                  title={s.unitPrice}
                  className="py-3 truncate font-semibold max-w-[70px] pl-4 pr-2 text-[13px] text-zinc-600"
                >
                  {s.unitPrice}
                </td>
                <td
                  title={s.total}
                  className="py-3 truncate font-semibold max-w-[70px] pl-2 text-[13px] text-zinc-600 "
                >
                  {s.total}
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
      </div> */}
    </div>
  );
}
