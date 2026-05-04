"use client";
import BothPagination from "../salesExpense/BothPagination";
import CropTableHeader from "./CropTableHeader";
import { FaEye, FaEllipsisV } from "react-icons/fa";
export default function CropTable() {
  const crops = [
    {
      id: 1,
      name: "Maize",
      farm: "Green Valley Farm",
      area: "25 arces",
      field: "Field A",
      status: "Growing",
      planted: "Jan 02, 2025",
      harvest: "Apr 10, 2025",
      progress: 70,
    },
    {
      id: 2,
      name: "Rice",
      farm: "Sunrise Farm",
      area: "30 arces",
      field: "Field B",
      status: "Growing",
      planted: "Feb 01, 2025",
      harvest: "May 20, 2025",
      progress: 60,
    },
    {
      id: 3,
      name: "Tomatoes",
      farm: "Golden Arces Farm",
      area: "15 arces",
      field: "Field C",
      status: "Growing",
      planted: "Feb 15, 2025",
      harvest: "May 10, 2025",
      progress: 40,
    },
    {
      id: 4,
      name: "Pepper",
      farm: "Green Valley Farm",
      area: "20 arces",
      field: "Field C",
      status: "Growing",
      planted: "Feb 20, 2025",
      harvest: "May 25, 2025",
      progress: 30,
    },
    {
      id: 5,
      name: "Cabbage",
      farm: "Riverbend Farm",
      area: "25 arces",
      field: "Field A",
      status: "Pending",
      planted: "Mar 01, 2025",
      harvest: "Jun 10, 2025",
      progress: 10,
    },
    {
      id: 6,
      name: "Yam",
      farm: "Sunrise Farm",
      area: "10 arces",
      field: "Field D",
      status: "Inactive",
      planted: "Dec 10, 2024",
      harvest: "Mar 15, 2025",
      progress: 0,
    },
  ];

  //10 result per page

  const statusStyles: Record<string, string> = {
    Growing: "bg-green-100 text-green-700",
    Inactive: "bg-zinc-100 text-gray-600",
    Pending: "bg-[#fff1dd] text-[#de852c]",
  };

  return (
    <div className="mt-2">
      <CropTableHeader />

      <div className="mt-4  overflow-hidden">
        {/* Desktop Table */}
        <div className="md:block hidden overflow-x-auto">
          <table className="w-full text-sm ">
            <thead className=" bg-zinc-200/50 border rounded-t-2xl border-border text-gray-600">
              <tr className="text-left ">
                <th className="py-2 truncate max-w-[50px] px-2">Crop</th>
                <th className="py-2 truncate max-w-[50px] pl-4">Farm</th>
                <th className="py-2 truncate max-w-[50px] pl-4">Field</th>
                <th className="py-2 truncate max-w-[50px] pr-2">
                  Planted Date
                </th>
                <th className="py-2 truncate max-w-[50px] pr-2">
                  Harvest Date
                </th>
                <th className="py-2 truncate max-w-[50px] pl-2">Area</th>

                <th className="py-2 truncate max-w-[50px] pl-2">Status</th>
                <th className="py-2 truncate max-w-[50px] pl-5">Progress</th>
                <th className="py-2 truncate max-w-[50px] px-2 text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {crops.map((crop) => (
                <tr
                  key={crop.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  {/* Crop */}
                  <td className="py-4 pl-2 max-w-[70px] truncate  text-dark/90 font-semibold flex items-center gap-2">
                    {crop.name}
                  </td>

                  {/* Field */}
                  <td className="py-4 pr-2  max-w-[70px] truncate text-gray-600">
                    {crop.farm}
                  </td>
                  <td className="py-4 px-4 max-w-[70px] truncate text-gray-600">
                    {crop.field}
                  </td>
                  <td className="py-4 pr-2 max-w-[70px] truncate text-gray-600">
                    {crop.planted}
                  </td>
                  <td className="py-4 pr-2 max-w-[70px] truncate text-gray-600">
                    {crop.harvest}
                  </td>
                  <td className="py-4 pl-2 max-w-[70px] truncate text-gray-600">
                    {crop.area}
                  </td>
                  <td className="py-4 pl-2 max-w-[70px] truncate">
                    <span
                      className={`px-3 py-1 text-xs rounded-full ${statusStyles[crop.status]}`}
                    >
                      {crop.status}
                    </span>
                  </td>

                  {/* Dates */}

                  {/* Progress */}
                  <td className="py-4 max-w-[70px] truncate">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-gray-200 rounded-full">
                        <div
                          className="h-2 bg-green-600 rounded-full"
                          style={{ width: `${crop.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-600">
                        {crop.progress}%
                      </span>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="py-4 max-w-[70px] truncate text-right">
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
        <div className="md:hidden space-y-3 p-4">
          {crops.map((crop) => (
            <div
              key={crop.id}
              className="border space-y-0.5 rounded-lg p-4 shadow-sm"
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex gap-2 items-center font-medium">
                  {crop.name}
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${statusStyles[crop.status]}`}
                >
                  {crop.status}
                </span>
              </div>

              <p className="text-xs text-gray-500">Farm: {crop.farm}</p>
              <p className="text-xs text-gray-500">Field: {crop.field}</p>
              <p className="text-xs text-gray-500">Area Planted: {crop.area}</p>
              <div className="flex items-center gap-2">
                <p className="text-xs text-gray-500">Planted: {crop.planted}</p>
                <p className="text-xs text-gray-500">Harvest: {crop.harvest}</p>
              </div>

              <div className="mt-2 flex items-center gap-2">
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-green-600 rounded-full"
                    style={{ width: `${crop.progress}%` }}
                  />
                </div>
                <span className="text-xs">{crop.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <BothPagination type="crops" />
      </div>
    </div>
  );
}
