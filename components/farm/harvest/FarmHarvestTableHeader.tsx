"use client";
import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { Input } from "../../ui/input";
import HarvestSelect from "@/components/harvests/HarvestSelect";
import BothComboBox from "@/components/salesExpense/BothComboBox";

export default function FarmHarvestTableHeader() {
  const [season, setSeason] = useState("all");
  const [field, setField] = useState("all");
  const fields = [
    {
      name: "Field A",
      value: "fieldA",
    },
    {
      name: "Field B",
      value: "fieldB",
    },
    {
      name: "Field C",
      value: "fieldC",
    },
  ];
  const seasons = [
    {
      value: "all",
      name: "All Seasons",
    },
    {
      value: "summer",
      name: "Summer",
    },
    {
      value: "Wwnter",
      name: "Winter",
    },
    {
      value: "autum",
      name: "Autum ",
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
    <div className="flex gap-2 flex-col sm:flex-row items-center justify-between">
      <div className="flex w-full sm:w-[35%]  items-center border border-border gap-2 rounded-lg px-2">
        <IoSearch />
        <Input
          placeholder="Search harvests..."
          className="border-none p-0 group focus-visible:none shadow-none"
        />
      </div>
      <div className="flex flex-col sm:flex-row w-full items-center gap-2 md:gap-4 justify-between">
        <BothComboBox
          slug={"sales"}
          array={crops}
          placeholder1={`Search or select crops...`}
          placeholder2={`Search crop`}
        />
        <HarvestSelect array={fields} val={field} setVal={setField} />
        <HarvestSelect array={seasons} val={season} setVal={setSeason} />
      </div>
    </div>
  );
}
