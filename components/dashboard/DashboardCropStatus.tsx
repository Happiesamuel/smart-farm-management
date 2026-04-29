const crops = [
  {
    id: 1,
    crop: "Maize",
    farm: "Green Valley Farm",
    field: "Field A",
    status: "Growing",
    progress: 70,
  },
  {
    id: 2,
    crop: "Rice",
    farm: "Sunrise Farm",
    field: "Field B",
    status: "Growing",
    progress: 60,
  },
  {
    id: 3,
    crop: "Tomatoes",
    farm: "Green Valley Farm",
    field: "Field C",
    status: "Flowering",
    progress: 40,
  },
  {
    id: 4,
    crop: "Pepper",
    farm: "Green Valley Farm",
    field: "Field D",
    status: "Growing",
    progress: 30,
  },
  {
    id: 5,
    crop: "Cabbage",
    farm: "Sunrise Farm",
    field: "Field E",
    status: "Nursery",
    progress: 20,
  },
];

const statusStyles: Record<string, string> = {
  Growing: "bg-green-100 text-green-700",
  Flowering: "bg-yellow-100 text-yellow-700",
  Nursery: "bg-blue-100 text-blue-700",
};

export default function DashboardCropsStatus() {
  return (
    <div className="w-full p-4 bg-white flex-1 rounded-xl border border-border/80 hover:shadow-sm transition flex flex-col h-[320px] shrink-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-dark text-base">Crops Status</h3>
        <button className="text-primary-green text-sm hover:underline">
          View All
        </button>
      </div>

      <div className="hidden md:block no-scroll overflow-x-auto">
        <table className="w-full no-scroll text-sm">
          <thead className="text-gray-500 text-left">
            <tr>
              <th className="pb-3">Crop</th>
              <th className="pb-3">Farm</th>
              <th className="pb-3">Field</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Progress</th>
            </tr>
          </thead>

          <tbody className="overflow-scroll no-scroll">
            {crops.map((c) => (
              <tr key={c.id} className="border-t">
                <td
                  title={c.crop}
                  className="py-3 pr-2 max-w-[70px] text-dark/90 truncate font-medium"
                >
                  {c.crop}
                </td>
                <td
                  title={c.farm}
                  className="py-3 px-2 max-w-[70px] truncate text-gray-600"
                >
                  {c.farm}
                </td>
                <td
                  title={c.field}
                  className="py-3 pr-2 max-w-[70px] truncate text-gray-600"
                >
                  {c.field}
                </td>

                <td title={c.status} className="py-3 pr-2">
                  <span
                    className={`px-2 py-1 max-w-[70px] truncate text-xs rounded-full ${statusStyles[c.status]}`}
                  >
                    {c.status}
                  </span>
                </td>

                <td className="py-3 px-2 max-w-[70px] truncate">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-2 bg-green-600 rounded-full"
                        style={{ width: `${c.progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-600">{c.progress}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {crops.map((c) => (
          <div key={c.id} className="border rounded-lg p-3">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">{c.crop}</h4>
              <span
                className={`text-xs px-2 py-1 rounded-full ${statusStyles[c.status]}`}
              >
                {c.status}
              </span>
            </div>

            <p title={c.farm} className="text-sm  text-gray-500 mt-1">
              {c.farm}
            </p>
            <p className="text-xs text-gray-400">{c.field}</p>

            <div className="mt-2 flex items-center gap-2">
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 bg-green-600 rounded-full"
                  style={{ width: `${c.progress}%` }}
                />
              </div>
              <span className="text-xs">{c.progress}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
