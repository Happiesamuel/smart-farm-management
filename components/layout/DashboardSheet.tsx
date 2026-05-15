"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { RiMenu3Fill } from "react-icons/ri";

import { TbLayoutDashboard, TbMoneybagMove } from "react-icons/tb";
import { PiFarm, PiPottedPlant } from "react-icons/pi";
import { GiDigDug } from "react-icons/gi";
import { RiFileList3Line } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import Link from "next/link";
import { usePathname } from "next/navigation";
("react-icons/fi");
import { GrMoney } from "react-icons/gr";
import { GoTasklist } from "react-icons/go";
import { FiActivity } from "react-icons/fi";

export function DashboardSheet() {
  const pathname = usePathname();
  const slug = pathname.slice(6).split("/").at(0);
  const sidebarLinks = [
    {
      group: "Main",
      items: [
        {
          name: "Dashboard",
          slug: "dashboard",
          route: "/user/dashboard",
          icon: TbLayoutDashboard,
        },
      ],
    },
    {
      group: "Management",
      items: [
        {
          name: "Farms",
          slug: "farms",
          route: "/user/farms",
          icon: PiFarm,
        },
        {
          name: "Crops",
          slug: "crops",
          route: "/user/crops",
          icon: PiPottedPlant,
        },
        {
          name: "Harvests",
          slug: "harvests",
          route: "/user/harvests",
          icon: GiDigDug,
        },
      ],
    },
    {
      group: "Finance",
      items: [
        {
          name: "Sales",
          slug: "sales",
          route: "/user/sales",
          icon: TbMoneybagMove,
        },
        {
          name: "Expenses",
          slug: "expenses",
          route: "/user/expenses",
          icon: GrMoney,
        },
      ],
    },
    {
      group: "Others",
      items: [
        {
          name: "Reports",
          slug: "reports",
          route: "/user/reports",
          icon: RiFileList3Line,
        },
        {
          name: "Settings",
          slug: "settings",
          route: "/user/settings",
          icon: IoSettingsOutline,
        },
      ],
    },
  ];

  return (
    <Sheet>
      <SheetTrigger className="flex items-center justify-center size-8 rounded-full bg-primary-green text-white text-base">
        <RiMenu3Fill />
      </SheetTrigger>
      <SheetTitle />
      <SheetContent className="bg-[#f3f3f3] lg:hidden z-100 data-[side=right]:w-[250px]">
        <div className="flex flex-col gap-4 mt-12">
          {sidebarLinks.map((section) => (
            <div key={section.group}>
              <p className="text-[10px] text-zinc-400 px-4 mb-1 uppercase">
                {section.group}
              </p>
              <div className="flex flex-col gap-1">
                {section.items.map((link) => {
                  const Icon = link.icon;
                  return (
                    <SheetClose asChild key={link.slug}>
                      <Link
                        href={link.route}
                        className={`flex group items-center cursor-pointer text-dark/90 font-medium py-2 px-3 gap-3 ${
                          slug === link.slug && "bg-white text-primary-green"
                        } hover:text-primary-green text-sm rounded-md mx-2`}
                      >
                        <Icon
                          className={`text-xl ${
                            slug === link.slug
                              ? "text-primary-green"
                              : "text-dark"
                          } group-hover:text-primary-green`}
                        />

                        <p className={`transition-all duration-200 `}>
                          {link.name}
                        </p>
                      </Link>
                    </SheetClose>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
export function WorkerDashboardSheet() {
  const pathname = usePathname();
  const slug = pathname.slice(8).split("/").at(0);
  const sidebarLinks = [
    {
      group: "Main",
      items: [
        {
          name: "Dashboard",
          slug: "dashboard",
          route: "/worker/dashboard",
          icon: TbLayoutDashboard,
        },
        {
          name: "My Tasks",
          slug: "tasks",
          route: "/worker/tasks",
          icon: GoTasklist,
        },
        {
          name: "Activity Log",
          slug: "activity",
          route: "/worker/activity",
          icon: FiActivity,
        },
      ],
    },
    {
      group: "Others",
      items: [
        {
          name: "Settings",
          slug: "settings",
          route: "/worker/settings",
          icon: IoSettingsOutline,
        },
      ],
    },
  ];
  return (
    <Sheet>
      <SheetTrigger className="flex items-center justify-center size-8 rounded-full bg-primary-green text-white text-base">
        <RiMenu3Fill />
      </SheetTrigger>
      <SheetTitle />
      <SheetContent className="bg-[#f3f3f3] lg:hidden z-100 data-[side=right]:w-[250px]">
        <div className="flex flex-col gap-4 mt-12">
          {sidebarLinks.map((section) => (
            <div key={section.group}>
              <p className="text-[10px] text-zinc-400 px-4 mb-1 uppercase">
                {section.group}
              </p>
              <div className="flex flex-col gap-1">
                {section.items.map((link) => {
                  const Icon = link.icon;
                  return (
                    <SheetClose asChild key={link.slug}>
                      <Link
                        href={link.route}
                        className={`flex group items-center cursor-pointer text-dark/90 font-medium py-2 px-3 gap-3 ${
                          slug === link.slug && "bg-white text-primary-green"
                        } hover:text-primary-green text-sm rounded-md mx-2`}
                      >
                        <Icon
                          className={`text-xl ${
                            slug === link.slug
                              ? "text-primary-green"
                              : "text-dark"
                          } group-hover:text-primary-green`}
                        />

                        <p className={`transition-all duration-200 `}>
                          {link.name}
                        </p>
                      </Link>
                    </SheetClose>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
