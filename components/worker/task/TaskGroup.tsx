import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { Dispatch, SetStateAction, useState } from "react";
import { BsJournalCheck } from "react-icons/bs";
import { GoTasklist } from "react-icons/go";
import { MdOutlinePendingActions } from "react-icons/md";
import { RiProgress2Line } from "react-icons/ri";

export default function TaskGroup({
  active,
  setActive,
}: {
  setActive: Dispatch<SetStateAction<string>>;
  active: string;
}) {
  const groups = [
    {
      name: "All",
      num: 8,
      text: "text-[#2d8952]",
      bg: "bg-[#2d8952]/15",
      icon: GoTasklist,
      slug: "all",
    },
    {
      name: "Pending",
      num: 3,
      text: "text-[#de852c]",
      bg: "bg-[#de852c]/15",
      icon: MdOutlinePendingActions,
      slug: "pending",
    },
    {
      name: "In-Progress",
      num: 2,
      text: "text-[#1058d6]",
      bg: "bg-[#1058d6]/15",
      icon: RiProgress2Line,
      slug: "in-progress",
    },
    {
      name: "Completed",
      num: 3,
      text: "text-[#2d8952]",
      bg: "bg-[#2d8952]/15",
      icon: BsJournalCheck,
      slug: "completed",
    },
  ];

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  function handleClick(slug: string) {
    const params = new URLSearchParams(searchParams);
    params.set("filter", slug);
    router.push(`${pathname}?${params.toString()}`);
    setActive(slug);
  }

  return (
    <div className="overflow-auto no-scroll w-full">
      <div className=" min-w-[450px]  overflow-scroll no-scroll  ">
        <Tabs defaultValue={active} className="py-4">
          <TabsList
            variant="line"
            className="relatve justify-start w-full pb-[6px] border-b border-border"
          >
            <div className="space-x-6">
              {groups.map((tab) => {
                const Icon = tab.icon;
                return (
                  <TabsTrigger
                    className={`cursor-pointer pb-1 hover:text-green-600 data-active:text-green-600 after:bg-green-600`}
                    onClick={() => handleClick(tab.slug)}
                    key={tab.slug}
                    value={tab.slug}
                  >
                    <Icon />
                    <p>{tab.name}</p>
                  </TabsTrigger>
                );
              })}
            </div>
          </TabsList>
        </Tabs>
      </div>
    </div>

    // <div className="grid grid-cols-4 border border-border rounded-md mt-4 p-4 shadow-xs bg-white">
    //   {groups.map((group) => {
    //     const Icon = group.icon;
    //     return (
    //       <div
    //         onClick={() => handleClick(group.slug)}
    //         key={group.slug}
    //         className={`flex ${active === group.slug && group.bg} items-center gap-3 cursor-pointer border-border px-2.5  rounded-md border py-1.5`}
    //       >
    //         <div className="flex items-center gap-1">
    //           <div
    //             className={`${group.bg} ${group.text} size-6 text-base rounded-full flex items-center justify-center`}
    //           >
    //             <Icon />
    //           </div>
    //           <p className={`${group.text} text-sm font-medium`}>
    //             {group.name}
    //           </p>
    //         </div>
    //         <p className="text-sm text-zinc-500 font-normal">{group.num}</p>
    //       </div>
    //     );
    //   })}
    // </div>
  );
}
