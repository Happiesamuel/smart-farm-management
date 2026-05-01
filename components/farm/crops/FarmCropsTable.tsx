import { FaEye, FaEllipsisV } from "react-icons/fa";

interface Crops {
  id: number;
  name: string;
  emoji: string;
  field: string;
  status: string;
  planted: string;
  harvest: string;
  progress: number;
}
// type Status = "Growing" | "Pending" | "Inactive";
const crops: Crops[] = [
  {
    id: 1,
    name: "Maize",
    emoji: "🌽",
    field: "Field A",
    status: "Growing",
    planted: "Jan 02, 2025",
    harvest: "Apr 10, 2025",
    progress: 70,
  },
  {
    id: 2,
    name: "Rice",
    emoji: "🌾",
    field: "Field B",
    status: "Growing",
    planted: "Feb 01, 2025",
    harvest: "May 20, 2025",
    progress: 60,
  },
  {
    id: 3,
    name: "Tomatoes",
    emoji: "🍅",
    field: "Field C",
    status: "Growing",
    planted: "Feb 15, 2025",
    harvest: "May 10, 2025",
    progress: 40,
  },
  {
    id: 4,
    name: "Pepper",
    emoji: "🫑",
    field: "Field C",
    status: "Growing",
    planted: "Feb 20, 2025",
    harvest: "May 25, 2025",
    progress: 30,
  },
  {
    id: 5,
    name: "Cabbage",
    emoji: "🥬",
    field: "Field A",
    status: "Pending",
    planted: "Mar 01, 2025",
    harvest: "Jun 10, 2025",
    progress: 10,
  },
  {
    id: 6,
    name: "Yam",
    emoji: "🥔",
    field: "Field D",
    status: "Inactive",
    planted: "Dec 10, 2024",
    harvest: "Mar 15, 2025",
    progress: 0,
  },
];

const statusStyles: Record<string, string> = {
  Growing: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Inactive: "bg-gray-100 text-gray-600",
};

export default function FarmCropsTable() {
  return (
    <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          {/* Header */}
          <thead className="bg-gray-50 text-gray-600">
            <tr className="text-left ">
              <th className="p-4">Crop</th>
              <th className="p-4">Field</th>
              <th className="p-4">Status</th>
              <th className="p-4">Planted Date</th>
              <th className="p-4">Expected Harvest</th>
              <th className="p-4">Progress</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {crops.map((crop) => (
              <tr
                key={crop.id}
                className="border-t hover:bg-gray-50 transition"
              >
                {/* Crop */}
                <td className="p-4  text-dark font-semibold flex items-center gap-2">
                  <span>{crop.emoji}</span>
                  {crop.name}
                </td>

                {/* Field */}
                <td className="p-4 text-zinc-700">{crop.field}</td>

                {/* Status */}
                <td className="p-4">
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${statusStyles[crop.status]}`}
                  >
                    {crop.status}
                  </span>
                </td>

                {/* Dates */}
                <td className="p-4 text-zinc-700">{crop.planted}</td>
                <td className="p-4 text-zinc-700">{crop.harvest}</td>

                {/* Progress */}
                <td className="p-4">
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
                <td className="p-4 text-right">
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

      {/* Mobile View */}
      <div className="md:hidden space-y-3 p-4">
        {crops.map((crop) => (
          <div key={crop.id} className="border rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <div className="flex gap-2 items-center font-medium">
                <span>{crop.emoji}</span>
                {crop.name}
              </div>
              <span
                className={`text-xs px-2 py-1 rounded-full ${statusStyles[crop.status]}`}
              >
                {crop.status}
              </span>
            </div>

            <p className="text-xs text-gray-500">Field: {crop.field}</p>
            <p className="text-xs text-gray-500">Planted: {crop.planted}</p>
            <p className="text-xs text-gray-500">Harvest: {crop.harvest}</p>

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
  );
}
