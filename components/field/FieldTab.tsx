"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function FieldTab() {
  const tabs = [
    {
      name: "Crops",
      slug: "crops",
    },
    {
      name: "Tasks",
      slug: "tasks",
    },
  ];
  const router = useRouter();
  const searchparams = useSearchParams();
  const [active, setActive] = useState(searchparams.get("tab") || "overview");
  const pathname = usePathname();
  function handleClick(slug: string) {
    const params = new URLSearchParams(searchparams);
    params.set("tab", slug);
    router.push(`${pathname}?${params.toString()}`);
    setActive(slug);
  }
  return (
    <div className="overflow-auto no-scroll w-full">
      <div className=" min-w-[500px]  overflow-scroll no-scroll  ">
        <Tabs defaultValue={active} className="py-4">
          <TabsList
            variant="line"
            className="relatve justify-start w-full pb-[6px] border-b border-border"
          >
            <div className="space-x-6">
              {tabs.map((tab) => (
                <TabsTrigger
                  className={`cursor-pointer pb-1 hover:text-green-600 data-active:text-green-600 after:bg-green-600`}
                  onClick={() => handleClick(tab.slug)}
                  key={tab.slug}
                  value={tab.slug}
                >
                  {tab.name}
                </TabsTrigger>
              ))}
            </div>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}
