export default function FarmOvervewBoxes() {
  const stats = [
    {
      num: 4,
      name: "Fields",
      sub: "Total Fields",
    },
    {
      num: 6,
      name: "Crops",
      sub: "Total crops",
    },
    {
      num: 5,
      name: "Active Tasks",
      sub: "Pending tasks",
    },
    {
      num: "₦120,000",
      name: "Revenue",
      sub: "This month",
    },
    {
      num: "₦70,000",
      name: "Pofit",
      sub: "This month",
    },
  ];

  return (
    <div className="py-4">
      <div className="grid grid-cols-2  sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {stats.map((item, i) => (
          <div
            key={i}
            className={`p-5  bg-white  rounded-xl border border-border/80  hover:shadow-sm transition flex sm:flex-row flex-col items-start gap-4`}
          >
            <p className="text-sm text-gray-500">{item.name}</p>
            <h3 className="text-xl font-semibold text-gray-900">{item.num}</h3>
            <p className="text-sm text-gray-500">{item.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
