import { GiDigDug, GiGrassMushroom } from "react-icons/gi";
import { TbDatabaseEdit } from "react-icons/tb";

export default function FarmHarvestBoxes() {
  const stats = [
    {
      num: 12,
      name: "Total Harvests",
      icon: <GiDigDug />,
      iconColor: "bg-[#e8f5ec] text-[#2d8952] ",
      bg: "bg-[#f8fdf9]",
      sub: "All Time",
      border: "border-green-100",
    },
    {
      num: "1,450 kg",
      name: "Total Quantity",
      icon: <GiGrassMushroom />,
      iconColor: "bg-[#e8f5ec] text-[#2d8952] ",
      bg: "bg-[#f8fdf9]",
      sub: "This Time",
      border: "border-green-100",
    },
    {
      num: "₦1,250,000",
      name: "Total Revenue",
      icon: <TbDatabaseEdit />,
      iconColor: "bg-[#f1ecfd] text-[#5837e8] ",
      bg: "bg-[#f9f7fd]",
      border: "border-purple-100",
      sub: "All Time",
    },
    {
      num: 3,
      name: "This Season",
      icon: <GiDigDug />,
      iconColor: "bg-[#fff1dd] text-[#de852c] ",
      bg: "bg-[#fefaf2]",
      border: "border-orange-100",
      sub: "Harvests",
    },
    {
      num: 2,
      name: "This Month",
      icon: <GiDigDug />,
      iconColor: "bg-[#fee7e7] text-[#e82a2d] ",
      bg: "bg-[#fef5f5]",
      border: "border-red-100",
      sub: "This Harvests",
    },
  ];
  return (
    <div className="pb-4">
      <div className="grid grid-cols-2 sm:grid-cols-3  xl:grid-cols-5 gap-2">
        {stats.map((item, i) => (
          <div
            key={i}
            className={`px-4 py-4 rounded-md border ${item.bg} ${item.border} flex sm:flex-row flex-col items-center md:items-start gap-3`}
          >
            <div
              className={`text-xl size-8 flex items-center justify-center rounded-md ${item.iconColor}`}
            >
              {item.icon}
            </div>

            <div className="text-center sm:text-left space-y-1">
              <p className="text-sm text-dark/80 font-medium">{item.name}</p>
              <h3 className={`text-xl font-medium text-dark `}>{item.num}</h3>
              <p className="text-xs text-gray-500">{item.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
