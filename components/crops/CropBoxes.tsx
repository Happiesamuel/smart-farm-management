import { GiDigDug } from "react-icons/gi";
import { GrGrow } from "react-icons/gr";
import { LuFlower } from "react-icons/lu";
import { RiLandscapeLine } from "react-icons/ri";
import { TbPlant2 } from "react-icons/tb";

export default function CropBoxes() {
  const stats = [
    {
      num: 42,
      name: "Total Crops",
      icon: <TbPlant2 />,
      iconColor: "bg-[#e1eefd] text-[#1058d6] ",
      bg: "bg-[#f7fafe]",
      sub: "All Time",
      border: "border-blue-100",
    },
    {
      num: 23,
      name: "Growing",
      icon: <GrGrow />,
      iconColor: "bg-[#e8f5ec] text-[#2d8952] ",
      bg: "bg-[#f8fdf9]",
      sub: "Currently",
      border: "border-green-100",
    },
    {
      num: 6,
      name: "Flowering",
      icon: <LuFlower />,
      iconColor: "bg-[#fff1dd] text-[#de852c] ",
      bg: "bg-[#fefaf2]",
      border: "border-orange-100",
      sub: "Currently",
    },
    {
      num: 13,
      name: "Harvested",
      icon: <GiDigDug />,
      iconColor: "bg-[#fff1dd] text-[#de852c] ",
      bg: "bg-[#fefaf2]",
      border: "border-orange-100",
      sub: "This Season",
    },
    {
      num: "320 arces",
      name: "Total Area Planted",
      icon: <RiLandscapeLine />,
      iconColor: "bg-[#e7f5eb] text-[#056b36] ",
      bg: "bg-[#f5faf6]",
      border: "border-green-100",
      sub: "This Season",
    },
  ];
  return (
    <div className="pb-4">
      <div className="grid grid-cols-2 sm:grid-cols-3  lg:grid-cols-5 gap-2">
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
