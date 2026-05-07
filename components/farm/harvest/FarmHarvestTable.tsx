import { FaEllipsisV } from "react-icons/fa";

import BothPagination from "../../salesExpense/BothPagination";
import FarmHarvestTableHeader from "./FarmHarvestTableHeader";

const sales = [
  {
    id: "inv-128",
    date: "May 25, 2025",
    crop: "Maize",
    field: "Field A",
    quality: "Good",
    revenue: "₦50,000",
    quantity: "500",
    unit: "kg",
    status: "Sold",
  },
  {
    id: "inv-127",
    date: "May 20, 2025",
    crop: "Rice",
    status: "Sold",
    quantity: "30",
    unit: "bags",
    revenue: "₦30,000",
    field: "Field B",
    quality: "Good",
  },
  {
    id: "inv-126",
    date: "May 15, 2025",
    crop: "Tomatoes",
    status: "Sold",
    quantity: "20",
    unit: "crates",
    revenue: "₦20,000",
    field: "Field C",
    quality: "Excellent",
  },
  {
    id: "inv-125",
    date: "May 10, 2025",
    crop: "Pepper",
    status: "Sold",
    quantity: "15",
    unit: "crates",
    revenue: "₦12,000",
    field: "Field D",
    quality: "Good",
  },
  {
    id: "inv-124",
    date: "May 05, 2025",
    crop: "Cabbage",
    status: "Sold",
    quantity: "40",
    unit: "heads",
    revenue: "₦20,000",
    field: "Field E",
    quality: "Good",
  },
  {
    id: "inv-123",
    date: "May 10, 2025",
    crop: "Pepper",
    status: "Sold",
    quantity: "15",
    unit: "crates",
    revenue: "₦12,000",
    field: "Field A",
    quality: "Good",
  },
];

//10 result per page

const qualityStyles: Record<string, string> = {
  Good: "bg-green-100 text-green-700",
  Excellent: "bg-green-100 text-green-700",
  Pending: "bg-[#fff1dd] text-[#de852c]",
};
const statusStyles: Record<string, string> = {
  Sold: "bg-green-100 text-green-700",
  Excellent: "bg-green-100 text-green-700",
  Pending: "bg-[#fff1dd] text-[#de852c]",
};

export default function FarmHarvestTable() {
  return (
    <div className="mt-2">
      <FarmHarvestTableHeader />
      <div className="  overflow-hidden mt-4">
        <div className="block overflow-x-auto">
          <table className="w-full text-sm ">
            <thead className=" bg-zinc-200/50 border rounded-t-2xl border-border text-gray-600">
              <tr className="text-left ">
                <th className="py-2 truncate max-w-[50px] px-2">Crop</th>
                <th className="py-2 truncate max-w-[50px] pl-2">Field</th>
                <th className="py-2 truncate max-w-[50px] pr-4 pl-2">
                  Harvest Date
                </th>
                <th className="py-2 truncate max-w-[50px] pl-">Quantity</th>
                <th className="py-2 truncate max-w-[50px] pl-">Unit</th>
                <th className="py-2 truncate max-w-[50px] pl-2">Quality</th>
                <th className="py-2 truncate max-w-[50px] pl-2">Revenue</th>
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
                    title={`${s.crop}`}
                    className="py-3 truncate font-medium max-w-[70px] pl-2 pr-4 text-[13px] text-zinc-600 flex items-center gap-2"
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
                    title={s.date}
                    className="py-3 truncate font-medium max-w-[70px] px-2 text-[13px] text-zinc-600"
                  >
                    {s.date}
                  </td>

                  <td
                    title={s.quantity}
                    className="py-3 truncate font-medium max-w-[70px] pl-2 text-[13px] text-zinc-600"
                  >
                    {s.quantity}
                  </td>
                  <td
                    title={s.unit}
                    className="py-3 truncate font-medium max-w-[70px] pr-4 text-[13px] text-zinc-600"
                  >
                    {s.unit}
                  </td>
                  <td
                    title={s.quality}
                    className={`py-3 truncate  font-medium max-w-[70px] pl-2 pr- text-[13px] text-zinc-600`}
                  >
                    <span
                      className={`px-2 py-0.5 text-[12px] rounded-full ${qualityStyles[s.quality]} `}
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
                    title={s.quality}
                    className={`py-3 truncate  font-medium max-w-[70px] pl-2 pr- text-[13px] text-zinc-600`}
                  >
                    <span
                      className={`px-2 py-0.5 text-[12px] rounded-full ${statusStyles[s.status]} `}
                    >
                      {s.status}
                    </span>
                  </td>

                  <td className="py-3 px-2 truncate font-medium max-w-[70px] px- text-[13px] text-zinc-600 text-right">
                    <div className="flex justify-end gap-3 text-gray-500">
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
