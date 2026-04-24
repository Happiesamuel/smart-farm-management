"use client";
import FarmIdHeader from "@/components/farm/FarmIdHeader";
import FarmTab from "@/components/farm/FarmTab";
import FarmFields from "@/components/farm/fields/FarmFields";
import FarmOverview from "@/components/farm/overview/FarmOverview";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const tabs = [
    { name: "overview", component: <FarmOverview /> },
    { name: "fields", component: <FarmFields /> },
  ];
  const searchParmas = useSearchParams();
  const tab = searchParmas.get("tab") || "overview";
  return (
    <div className="pt-18 px-2 sm:px-4">
      <FarmIdHeader />
      <FarmTab />
      <div>{tabs.find((t) => t.name === tab)?.component}</div>
    </div>
  );
}
