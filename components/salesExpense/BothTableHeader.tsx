"use client";
import { CiFilter } from "react-icons/ci";
import BothCalendar from "./BothCalender";
import { Button } from "../ui/button";
import BothComboBox from "./BothComboBox";
import BothSelect from "./BothSelect";
import { IoSearch } from "react-icons/io5";
import { Input } from "../ui/input";
import { usePathname } from "next/navigation";

export default function BothTableHeader({ arrayOne }: { arrayOne: string[] }) {
  const farms = [
    {
      value: "all",
      name: "All Farms",
    },
    {
      value: "greenValley",
      name: "Green Valley Farm",
    },
    {
      value: "sunrise",
      name: "Sunrise Farm",
    },
    {
      value: "hilltop",
      name: "Hilltop Farm ",
    },
  ];
  const pathname = usePathname();
  const slug = pathname.slice(1);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex  md:flex items-center gap-2 lg:gap-4 p-2.5  justify-between w-full">
      <div className="flex w-full md:w-full items-center border border-border gap-2 rounded-lg px-2">
        <IoSearch />
        <Input
          placeholder="Search Farms..."
          className="border-none p-0 group focus-visible:none shadow-none"
        />
      </div>
      <BothSelect array={farms} />
      <BothComboBox
        slug={slug}
        array={arrayOne}
        placeholder1={`Search or select ${slug === "sales" ? "crops" : "categories"}...`}
        placeholder2={`Search ${slug === "sales" ? "crops" : "categories"}`}
      />
      <BothCalendar />
    </div>
  );
}
