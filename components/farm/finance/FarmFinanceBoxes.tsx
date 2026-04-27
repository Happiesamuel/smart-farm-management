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
    },
    {
      num: "₦50,000",
      name: "Total Expenses",
      sub: "-8.3% vs last month",
      slug: "expenses",
      icon: GrMoney,
    },
    {
      num: "₦70,000",
      name: "Net Profit",
      sub: "25.3% vs last month",
      slug: "profit",
      icon: GiTakeMyMoney,
    },
    {
      num: "58.3%",
      name: "Profit Margin",
      sub: "6.7% vs last month",
      slug: "margin",
      icon: TbPigMoney,
    },
  ];

  const slugStyles: Record<string, string> = {
    revenue: "bg-green-100 border-green-200 text-green-500",
    expenses: "bg-red-100 border-red-200 text-red-500",
    profit: "bg-green-100 border-green-200 text-green-500",
    margin: "bg-purple-100 border-purple-200 text-purple-500",
  };
  return (
    <div className="pb-4">
      <div className="grid grid-cols-2   md:grid-cols-4 lg:gap-4 md:gap-1 gap-2">
        {stats.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className={`p-5  bg-white  rounded-xl border border-border/80  hover:shadow-sm transition flex  flex-col sm:flex-row items-start sm:items-center gap-2`}
            >
              <div
                className={`size-8 border ${slugStyles[item.slug]} flex items-center justify-center rounded-full`}
              >
                <Icon className="text-xl" />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-500">{item.name}</p>
                <h3 className="text-xl font-semibold text-dark">{item.num}</h3>
                <p className="text-sm text-gray-500">{item.sub}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
