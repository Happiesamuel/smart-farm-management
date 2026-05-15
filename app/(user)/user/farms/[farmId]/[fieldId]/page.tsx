"use client";
import FarmCrops from "@/components/farm/crops/FarmCrops";
import FarmTasks from "@/components/farm/tasks/FarmTasks";
import FieldHeader from "@/components/field/FieldHeader";
import FieldTab from "@/components/field/FieldTab";
import { useSearchParams } from "next/navigation";
import { ReactNode } from "react";

type Tab = "crops" | "tasks";
export default function Page() {
  const tabs: Record<Tab, ReactNode> = {
    crops: <FarmCrops />,
    tasks: <FarmTasks />,
  };
  const searchParmas = useSearchParams();
  const tab = (searchParmas.get("tab") || "overview") as Tab;
  return (
    <div className="pt-18 px-2 sm:px-4">
      <FieldHeader />
      <FieldTab />
      <main>{tabs[tab]}</main>
    </div>
  );
}
