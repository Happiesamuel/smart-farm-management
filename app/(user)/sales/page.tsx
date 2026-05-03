import BothBoxes from "@/components/salesExpense/BothBoxes";
import BothHeader from "@/components/salesExpense/BothHeader";
import BothTable from "@/components/salesExpense/BothTable";
import { GrMoney } from "react-icons/gr";
import { MdOutlinePendingActions } from "react-icons/md";
import { TbMoneybag, TbMoneybagMove } from "react-icons/tb";

export default function page() {
  const stats = [
    {
      num: "128",
      name: "Total Sales",
      sub: "This Month",
      icon: GrMoney,
      iconColor: "bg-[#fee7e7] text-[#e82a2d] ",
      bg: "bg-[#fef5f5]",
      border: "border-red-100",
    },
    {
      num: "₦120,000",
      name: "Total Revenue",
      sub: "This Month",
      icon: TbMoneybag,
      iconColor: "bg-[#e8f5ec] text-[#2d8952] ",
      bg: "bg-[#f8fdf9]",
      border: "border-green-100",
    },

    {
      num: "₦70,000",
      name: "Paid Amount",
      sub: "This Month",
      icon: TbMoneybagMove,
      iconColor: "bg-[#e1eefd] text-[#1058d6] ",
      bg: "bg-[#f7fafe]",
      border: "border-blue-100",
    },
    {
      num: "58.3%",
      name: "Pending Amount",
      sub: "This Month",
      icon: MdOutlinePendingActions,
      iconColor: "bg-[#fff1dd] text-[#de852c] ",
      bg: "bg-[#fefaf2]",
      border: "border-green-100",
    },
  ];

  const crops = [
    "All Crops",
    "🌽Maize",
    "🌾Rice",
    "🥔Yam",
    "🍅Tomato",
    "🫑Pepper",
    "🥔Cassava",
    "🌾Beans",
    "🌱Wheat",
    "🥜Sorghum",
    "🌾Soyabean",
  ];

  return (
    <div className="pt-18 px-2 sm:px-4 pb-8">
      <BothHeader type="sales" />
      <BothBoxes stats={stats} />

      <div className="grid h-[400px] grid-cols-1 xl:grid-cols-[1fr_20rem] border border-border rounded-md">
        <BothTable arrayOne={crops} />
        <p className="border-l border-border">sam</p>
      </div>
    </div>
  );
}
