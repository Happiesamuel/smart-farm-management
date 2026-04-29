import { GiMoneyStack, GiTakeMyMoney } from "react-icons/gi";
import { GrMoney } from "react-icons/gr";
import { TbPigMoney } from "react-icons/tb";

export default function FarmFinanceBoxes() {
  const stats = [
    {
      num: "₦120,000",
      name: "Total Revenue",
      sub: "12.5% vs last month",
      slug: "revenue",
      icon: GiMoneyStack,
      iconColor: "bg-[#e8f5ec] text-[#2d8952] ",
      bg: "bg-[#f8fdf9]",
      border: "border-green-100",
    },
    {
      num: "₦50,000",
      name: "Total Expenses",
      sub: "-8.3% vs last month",
      slug: "expenses",
      icon: GrMoney,
      iconColor: "bg-[#fee7e7] text-[#e82a2d] ",
      bg: "bg-[#fef5f5]",
      border: "border-red-100",
    },
    {
      num: "₦70,000",
      name: "Net Profit",
      sub: "25.3% vs last month",
      slug: "profit",
      icon: GiTakeMyMoney,
      iconColor: "bg-[#e1eefd] text-[#1058d6] ",
      bg: "bg-[#f7fafe]",
      border: "border-blue-100",
    },
    {
      num: "58.3%",
      name: "Profit Margin",
      sub: "6.7% vs last month",
      slug: "margin",
      icon: TbPigMoney,
      iconColor: "bg-[#f1ecfd] text-[#5837e8] ",
      bg: "bg-[#f9f7fd]",
      border: "border-green-100",
    },
  ];

  return (
    <div className="pb-4">
      <div className="grid grid-cols-2   md:grid-cols-4 lg:gap-4 md:gap-1 gap-2">
        {stats.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className={`p-5  ${item.bg}  rounded-xl border ${item.border} hover:shadow-sm transition flex  flex-col sm:flex-row justify-between items-start sm:items-center gap-2`}
            >
              <div className="space-y-2">
                <p className="text-sm text-gray-500">{item.name}</p>
                <h3 className="text-xl font-semibold text-dark">{item.num}</h3>
                <p className="text-sm text-gray-500">{item.sub}</p>
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
