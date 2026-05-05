import { FaEye, FaEllipsisV } from "react-icons/fa";
import HarvestTableHeader from "./HarvestTableHeader";
import BothPagination from "../salesExpense/BothPagination";

const sales = [
  {
    id: "inv-128",
    date: "May 25, 2025",
    crop: "Maize",
    farm: "Green Valley Farm",
    field: "Field A",
    quality: "Good",
    buyer: "Green Foods Ltd",
    revenue: "₦50,000",
    quantity: "500",
    unit: "kg",
  },
  {
    id: "inv-127",
    date: "May 20, 2025",
    crop: "Rice",
    farm: "Sunrise Farm",
    quantity: "30",
    unit: "bags",
    revenue: "₦30,000",
    field: "Field B",
    quality: "Good",
    buyer: "Rice Traders",
  },
  {
    id: "inv-126",
    date: "May 15, 2025",
    crop: "Tomatoes",
    farm: "Golden Arces Farm",
    quantity: "20",
    unit: "crates",
    revenue: "₦20,000",
    field: "Field C",
    quality: "Excellent",
    buyer: "Fresh Mort",
  },
  {
    id: "inv-125",
    date: "May 10, 2025",
    crop: "Pepper",
    farm: "Riverbend Farm",
    quantity: "15",
    unit: "crates",
    revenue: "₦12,000",
    field: "Field D",
    quality: "Good",
    buyer: "Spice World",
  },
  {
    id: "inv-124",
    date: "May 05, 2025",
    crop: "Cabbage",
    farm: "Golden Arces Farm",
    quantity: "40",
    unit: "heads",
    revenue: "₦20,000",
    field: "Field E",
    quality: "Good",
    buyer: "Veggie Store",
  },
  {
    id: "inv-123",
    date: "May 10, 2025",
    crop: "Pepper",
    farm: "Riverbend Farm",
    quantity: "15",
    unit: "crates",
    revenue: "₦12,000",
    field: "Field A",
    quality: "Good",
    buyer: "Healthy Store",
  },
];

//10 result per page
const paymentStyles: Record<string, string> = {
  "Bank Transfer": "bg-green-100 text-green-700",
  Cash: "bg-blue-100 text-blue-700",
};

const statusStyles: Record<string, string> = {
  Good: "bg-green-100 text-green-700",
  Excellent: "bg-green-100 text-green-700",
  Pending: "bg-[#fff1dd] text-[#de852c]",
};

export default function HarvestTable() {
  return (
    <div className="mt-2">
      <HarvestTableHeader />
      <div className="  overflow-hidden mt-4">
        <div className="block overflow-x-auto">
          <table className="w-full text-sm ">
            <thead className=" bg-zinc-200/50 border rounded-t-2xl border-border text-gray-600">
              <tr className="text-left ">
                <th className="py-2 truncate max-w-[50px] px-2">Date</th>
                <th className="py-2 truncate max-w-[50px] pl-1">Farm</th>
                <th className="py-2 truncate max-w-[50px] px-4">Crop</th>
                <th className="py-2 truncate max-w-[50px] pl-2">Field</th>
                <th className="py-2 truncate max-w-[50px] pl-">Quantity</th>
                <th className="py-2 truncate max-w-[50px] pl-">Unit</th>
                <th className="py-2 truncate max-w-[50px] pl-2">Quality</th>
                <th className="py-2 truncate max-w-[50px] pl-2">Revenue</th>
                <th className="py-2 truncate max-w-[50px] pl-2">Buyer</th>
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
                    title={s.farm}
                    className="py-3 truncate font-medium max-w-[70px] pr-2 text-[13px] text-zinc-600"
                  >
                    {s.farm}
                  </td>

                  <td
                    title={`${s.crop}`}
                    className="py-3 truncate font-medium max-w-[70px] px-4 text-[13px] text-zinc-600 flex items-center gap-2"
                  >
                    {s.crop}
                  </td>
                  <td
                    title={`${s.field}`}
                    className="py-3 truncate font-medium max-w-[70px] px-2 text-[13px] text-zinc-600 fle items-center gap-2"
                  >
                    {s.field}
                  </td>
                  <td
                    title={s.quantity}
                    className="py-3 truncate font-medium max-w-[70px] pl-2 text-[13px] text-zinc-600"
                  >
                    {s.quantity}
                  </td>
                  <td
                    title={s.unit}
                    className="py-3 truncate font-medium max-w-[70px] px-2 text-[13px] text-zinc-600"
                  >
                    {s.unit}
                  </td>
                  <td
                    title={s.quality}
                    className={`py-3 truncate  font-medium max-w-[70px] pl-2 pr- text-[13px] text-zinc-600`}
                  >
                    {" "}
                    <span
                      className={`px-2 py-0.5 text-[12px] rounded-full ${statusStyles[s.quality]} `}
                    >
                      {s.quality}
                    </span>
                  </td>
                  <td
                    title={s.revenue}
                    className="py-3 truncate font-semibold max-w-[70px] px-2 text-[13px] text-zinc-700 "
                  >
                    {s.revenue}
                  </td>
                  <td
                    title={s.buyer}
                    className="py-3 truncate  font-medium max-w-[70px]  pr-4 text-[13px] text-zinc-600"
                  >
                    {s.buyer}
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
      </div>
      <div className="mt-4">
        <BothPagination type="harvests" />
      </div>
    </div>
  );
}
