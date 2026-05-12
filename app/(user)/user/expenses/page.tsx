import BothHeader from "@/components/salesExpense/BothHeader";
import { GrMoney } from "react-icons/gr";
import { MdOutlinePendingActions } from "react-icons/md";
import { TbMoneybagMove } from "react-icons/tb";
import { BiCategory } from "react-icons/bi";
import BothBoxes from "@/components/salesExpense/BothBoxes";
import BothTable from "@/components/salesExpense/BothTable";
import BothOverView from "@/components/salesExpense/BothOverView";
export default function page() {
  const stats = [
    {
      num: "₦50,000",
      name: "Total Expenses",
      sub: "This Month",
      icon: GrMoney,
      iconColor: "bg-[#e1eefd] text-[#1058d6] ",
      bg: "bg-[#f7fafe]",
      border: "border-blue-100",
    },
    {
      num: "8",
      name: "Total Categories",
      sub: "This Month",
      icon: BiCategory,
      iconColor: "bg-[#f1ecfd] text-[#5837e8] ",
      bg: "bg-[#f9f7fd]",
      border: "border-purple-100",
    },

    {
      num: "₦70,000",
      name: "Paid Amount",
      sub: "This Month",
      icon: TbMoneybagMove,
      iconColor: "bg-[#e8f5ec] text-[#2d8952] ",
      bg: "bg-[#f8fdf9]",
      border: "border-green-100",
    },
    {
      num: "58.3%",
      name: "Pending Amount",
      sub: "This Month",
      icon: MdOutlinePendingActions,
      iconColor: "bg-[#fff1dd] text-[#de852c] ",
      bg: "bg-[#fefaf2]",
      border: "border-orange-100",
    },
  ];
  const categories = [
    "All Categories",
    "Fertilizer",
    "Labour",
    "Seeds",
    "Pesticides",
    "Fuel",
    "Irrigation",
    "Equipment",
    "Transport",
  ];

  const arr = [
    {
      name: "Labour",
      value: "₦100,000",
    },
    {
      name: "Fertilizer",
      value: "₦90,000",
    },
    {
      name: "Fuel",
      value: "₦80,000",
    },
    {
      name: "Seeds",
      value: "₦70,000",
    },
    {
      name: "Pesticides",
      value: "₦40,000",
    },
  ];
  const data = [
    { food: "Paid", value: 85, fill: "#3d8d54", exp: "₦248,000" },
    { food: "Pending", value: 15, fill: "#e3a133", exp: "₦155,000" },
  ];

  return (
    <div className="pt-18 px-2 sm:px-4 pb-8">
      <BothHeader type="expenses" />
      <BothBoxes stats={stats} />
      <div className="grid h-fit lg:h-[600px] mt-4 grid-cols-1 xl:grid-cols-[1fr_15rem] border border-border rounded-md">
        <BothTable type="expense" arrayOne={categories} />
        <BothOverView type="expense" data={data} arr={arr} />
      </div>
    </div>
  );
}
