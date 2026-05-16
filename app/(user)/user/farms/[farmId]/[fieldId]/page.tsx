"use client";
import FieldActivity from "@/components/field/activity/FieldActivity";
import FieldCrops from "@/components/field/FieldCrops";
import FieldHeader from "@/components/field/FieldHeader";
import FieldTab from "@/components/field/FieldTab";
import FieldNotes from "@/components/field/notes/FieldNotes";
import FieldTasks from "@/components/field/tasks/FieldTasks";
import { useSearchParams } from "next/navigation";
import { ReactNode } from "react";

type Tab = "crops" | "notes" | "activity" | "tasks";
export default function Page() {
  const tabs: Record<Tab, ReactNode> = {
    crops: <FieldCrops />,
    notes: <FieldNotes />,
    activity: <FieldActivity />,
    tasks: <FieldTasks />,
  };
  const searchParmas = useSearchParams();
  const tab = (searchParmas.get("tab") || "crops") as Tab;
  return (
    <div className="pt-18 px-2 sm:px-4 pb-16 lg:pb-4">
      <FieldHeader />
      <FieldTab />
      <main>{tabs[tab]}</main>
    </div>
  );
}
