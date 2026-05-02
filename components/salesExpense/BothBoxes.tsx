import { IconType } from "react-icons";

interface Stat {
  num: string | number;
  name: string;
  sub: string;
  icon: IconType;
  iconColor: string;
  bg: string;

  border: string;
}
export default function BothBoxes({ stats }: { stats: Stat[] }) {
  return (
    <div className="pb-4">
      <div className="grid grid-cols-2   md:grid-cols-4 lg:gap-4 md:gap-1 gap-2">
        {stats.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className={`p-5  ${item.bg}  rounded-xl border ${item.border} hover:shadow-sm transition flex  flex-col sm:flex-row justify-between items-center gap-2`}
            >
              <div className="space-y-2 sm:text-start text-center">
                <p className="text-sm text-gray-500">{item.name}</p>
                <h3 className="text-xl font-semibold text-dark">{item.num}</h3>
                <p className="text-sm text-center sm:text-start text-gray-500">
                  {item.sub}
                </p>
              </div>
              <div
                className={`size-10 ${item.iconColor} flex items-center justify-center rounded-md`}
              >
                <Icon className="text-2xl" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
