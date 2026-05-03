import BothBoxes from "@/components/salesExpense/BothBoxes";
import BothHeader from "@/components/salesExpense/BothHeader";
import BothOverView from "@/components/salesExpense/BothOverView";
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
      border: "border-orange-100",
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

  const arr = [
    {
      name: "Maize",
      value: "₦100,000",
    },
    {
      name: "Rice",
      value: "₦90,000",
    },
    {
      name: "Tomatoes",
      value: "₦80,000",
    },
    {
      name: "Pepper",
      value: "₦70,000",
    },
    {
      name: "Cabbage",
      value: "₦40,000",
    },
  ];
  const data = [
    { food: "Paid", value: 65, fill: "#3d8d54", exp: "₦248,000" },
    { food: "Pending", value: 25, fill: "#e3a133", exp: "₦155,000" },
  ];

  return (
    <div className="pt-18 px-2 sm:px-4 pb-8">
      <BothHeader type="sales" />
      <BothBoxes stats={stats} />

      <div className="grid xl:h-[600px] mt-4 grid-cols-1 xl:grid-cols-[1fr_15rem] border border-border rounded-md">
        <BothTable type="sale" arrayOne={crops} />
        <BothOverView type="sale" data={data} arr={arr} />
      </div>
    </div>
  );
}
