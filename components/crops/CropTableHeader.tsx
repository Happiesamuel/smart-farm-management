import React, { useState } from "react";
import CropSelect from "./CropSelect";
import { IoSearch } from "react-icons/io5";
import { Input } from "../ui/input";

export default function CropTableHeader() {
  const [season, setSeason] = useState("all");
  const [farm, setFarm] = useState("all");
  const [status, setStatus] = useState("all");
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
  const statuses = [
    {
      value: "all",
      name: "All Status",
    },
    {
      value: "growing",
      name: "Growing",
    },
    {
      value: "pending",
      name: "Pending",
    },
    {
      value: "failed",
      name: "Failed",
    },
  ];
  return (
    <div className="flex gap-2 flex-col sm:flex-row items-center justify-between">
      <div className="flex w-full sm:w-[35%]  items-center border border-border gap-2 rounded-lg px-2">
        <IoSearch />
        <Input
          placeholder="Search tasks..."
          className="border-none p-0 group focus-visible:none shadow-none"
        />
      </div>
      <div className="flex flex-col sm:flex-row w-full items-center gap-2 md:gap-4 justify-between">
        <CropSelect array={farms} val={farm} setVal={setFarm} />
        <CropSelect array={seasons} val={season} setVal={setSeason} />
        <CropSelect array={statuses} val={status} setVal={setStatus} />
      </div>
    </div>
  );
}
