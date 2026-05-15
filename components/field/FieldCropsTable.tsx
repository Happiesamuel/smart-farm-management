import { FaEye, FaEllipsisV } from "react-icons/fa";

interface Crops {
  id: number;
  name: string;
  status: string;
  season: string;
  planted: string;
  harvest: string;
  yield: string;
}
// type Status = "Growing" | "Pending" | "Inactive";
const crops: Crops[] = [
  {
    id: 1,
    name: "Maize",
    season: "2024",
    status: "Harvested",
    planted: "Jan 10, 2024",
    harvest: "Apr 10, 2025",
    yield: "35 bags/acre",
  },
  {
    id: 2,
    name: "Rice",
    season: "2023",
    status: "Harvested",
    planted: "May 12, 2023",
    harvest: "Aug 20, 2023",
    yield: "28 bags/acre",
  },
  {
    id: 3,
    name: "Tomatoes",
    season: "2022",
    status: "Harvested",
    planted: "Feb 05, 2022",
    harvest: "Jun 10, 2022",
    yield: "18 crates/acre",
  },
  {
    id: 4,
    name: "Pepper",
    season: "2021",
    status: "Harvested",
    planted: "May 05, 2021",
    harvest: "Oct 10, 2021",
    yield: "18 crates/acre",
  },
];

const statusStyles: Record<string, string> = {
  Harvested: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Inactive: "bg-gray-100 text-gray-600",
};

export default function FieldsCropsTable() {
  return (
    <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
      <div className="block no-scroll overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr className="text-left ">
              <th className="p-4 max-w-[120px] truncate">Crop</th>
              <th className="p-4 max-w-[120px] truncate">Season</th>
              <th className="p-4 max-w-[120px] truncate">Planted Date</th>
              <th className="p-4 max-w-[120px] truncate">Harvest Date</th>
              <th className="p-4 max-w-[120px] truncate">Yield</th>
              <th className="p-4 max-w-[120px] truncate">Status</th>
              <th className="p-4 max-w-[120px] truncate text-right">Action</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {crops.map((crop) => (
              <tr
                key={crop.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-4 max-w-[120px] truncate  text-dark font-semibold flex items-center gap-2">
                  {crop.name}
                </td>

                <td className="p-4 max-w-[120px] truncate text-zinc-700">
                  {crop.season}
                </td>
                <td className="p-4 max-w-[120px] truncate text-zinc-700">
                  {crop.planted}
                </td>
                <td className="p-4 max-w-[120px] truncate text-zinc-700">
                  {crop.harvest}
                </td>
                <td className="p-4 max-w-[120px] truncate text-zinc-700">
                  {crop.yield}
                </td>

                <td className="p-4 max-w-[120px] truncate">
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${statusStyles[crop.status]}`}
                  >
                    {crop.status}
                  </span>
                </td>
                <td className="p-4 max-w-[120px] truncate text-right">
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
  );
}
