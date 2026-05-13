"use client";
import Image from "next/image";
import Logo from "../../public/logo.png";
import { TbLayoutDashboard, TbMoneybagMove } from "react-icons/tb";
import { PiFarm, PiPottedPlant } from "react-icons/pi";
import { GiDigDug } from "react-icons/gi";
import { RiFileList3Line } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCollaspe } from "@/context/SidebarCollasibleContext";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { FiActivity, FiSidebar } from "react-icons/fi";
import User from "../../public/user.png";
import { GrMoney } from "react-icons/gr";
import { GoTasklist } from "react-icons/go";
export function ManagerSidebar() {
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
  const { handleToogleCollapse, collaspe } = useCollaspe();

  return (
    <div
      className={`bg-[#f3f3f3] flex-col flex fixed transition-all duration-300 ease-in-out h-full ${
        collaspe ? "lg:w-[4.8rem] xl:w-[4.8rem]" : "lg:w-[12.5rem] xl:w-[14rem]"
      }`}
    >
      {/* HEADER */}
      <div className="px-2 pt-5">
        <div
          onClick={handleToogleCollapse}
          className="flex items-center justify-end"
        >
          <FiSidebar className="text-dark/80 cursor-pointer" />
        </div>

        <div className="flex items-center gap-2">
          <div className="aspect-video hidden lg:block rounded-full  relative size-12">
            <Image
              src={Logo}
              className="rounded-full p-1 object-cover"
              fill
              alt="logo"
            />
          </div>

          <h6
            className={`transition-opacity text-primary-green text-sm font-semibold duration-200 ${
              collaspe
                ? "opacity-0 w-0 overflow-hidden"
                : "opacity-100 w-auto delay-300"
            }`}
          >
            S. F. M. S
          </h6>
        </div>
      </div>

      {/* NAV */}
      <div className="flex flex-col gap-4 mt-8">
        {sidebarLinks.map((section) => (
          <div key={section.group}>
            {/* GROUP TITLE */}
            {!collaspe && (
              <p className="text-[10px] text-zinc-400 px-4 mb-1 uppercase">
                {section.group}
              </p>
            )}

            {/* LINKS */}
            <div className="flex flex-col gap-1">
              {section.items.map((link) => {
                const Icon = link.icon;
                return (
                  <Tooltip key={link.slug}>
                    <TooltipTrigger asChild>
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

                        <p
                          className={`transition-all duration-200 ${
                            collaspe
                              ? "opacity-0 w-0 overflow-hidden"
                              : "opacity-100 w-auto delay-200"
                          }`}
                        >
                          {link.name}
                        </p>
                      </Link>
                    </TooltipTrigger>

                    {collaspe && (
                      <TooltipContent side="right" className="bg-primary-green">
                        <p>{link.name}</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* USER */}
      <div className="absolute bottom-6 px-3 w-full">
        <div className="flex items-center gap-2 border-t border-zinc-300 w-full pt-5">
          <Image
            src={User}
            width={35}
            height={35}
            alt="user"
            className="rounded-full object-cover border-2 border-light-green"
          />

          <div>
            <p
              className={`transition-opacity text-dark text-xs font-semibold duration-200 ${
                collaspe
                  ? "opacity-0 w-0 overflow-hidden"
                  : "opacity-100 w-auto delay-300"
              }`}
            >
              John Doe
            </p>

            <p
              className={`transition-opacity text-zinc-500 text-[10px] font-semibold duration-200 ${
                collaspe
                  ? "opacity-0 w-0 overflow-hidden"
                  : "opacity-100 w-auto delay-300"
              }`}
            >
              Farm Manager
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export function WorkerSidebar() {
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
  const { handleToogleCollapse, collaspe } = useCollaspe();

  return (
    <div
      className={`bg-[#f3f3f3] flex-col flex fixed transition-all duration-300 ease-in-out h-full ${
        collaspe ? "lg:w-[4.8rem] xl:w-[4.8rem]" : "lg:w-[12.5rem] xl:w-[14rem]"
      }`}
    >
      {/* HEADER */}
      <div className="px-2 pt-5">
        <div
          onClick={handleToogleCollapse}
          className="flex items-center justify-end"
        >
          <FiSidebar className="text-dark/80 cursor-pointer" />
        </div>

        <div className="flex items-center gap-2">
          <div className="aspect-video hidden lg:block rounded-full  relative size-12">
            <Image
              src={Logo}
              className="rounded-full p-1 object-cover"
              fill
              alt="logo"
            />
          </div>

          <h6
            className={`transition-opacity text-primary-green text-sm font-semibold duration-200 ${
              collaspe
                ? "opacity-0 w-0 overflow-hidden"
                : "opacity-100 w-auto delay-300"
            }`}
          >
            S. F. M. S
          </h6>
        </div>
      </div>

      {/* NAV */}
      <div className="flex flex-col gap-4 mt-8">
        {sidebarLinks.map((section) => (
          <div key={section.group}>
            {/* GROUP TITLE */}
            {!collaspe && (
              <p className="text-[10px] text-zinc-400 px-4 mb-1 uppercase">
                {section.group}
              </p>
            )}

            {/* LINKS */}
            <div className="flex flex-col gap-1">
              {section.items.map((link) => {
                const Icon = link.icon;
                return (
                  <Tooltip key={link.slug}>
                    <TooltipTrigger asChild>
                      <Link
                        href={link.route}
                        className={`flex group items-center  cursor-pointer text-dark/90 font-medium py-2 px-3 gap-3 ${
                          slug === link.slug && "bg-white text-primary-green "
                        } hover:text-primary-green text-sm rounded-md mx-2`}
                      >
                        <Icon
                          className={`text-xl  ${
                            slug === link.slug
                              ? "text-primary-green"
                              : "text-dark"
                          } group-hover:text-primary-green`}
                        />

                        <p
                          className={`transition-all  duration-200 ${
                            collaspe
                              ? "opacity-0 w-0 overflow-hidden"
                              : "opacity-100 w-auto delay-200"
                          }`}
                        >
                          {link.name}
                        </p>
                      </Link>
                    </TooltipTrigger>

                    {collaspe && (
                      <TooltipContent side="right" className="bg-primary-green">
                        <p>{link.name}</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* USER */}
      <div className="absolute bottom-6 px-3 w-full">
        <div className="flex items-center gap-2 border-t border-zinc-300 w-full pt-5">
          <Image
            src={User}
            width={35}
            height={35}
            alt="user"
            className="rounded-full object-cover border-2 border-light-green"
          />

          <div>
            <p
              className={`transition-opacity text-dark text-xs font-semibold duration-200 ${
                collaspe
                  ? "opacity-0 w-0 overflow-hidden"
                  : "opacity-100 w-auto delay-300"
              }`}
            >
              John Doe
            </p>

            <p
              className={`transition-opacity text-zinc-500 text-[10px] font-semibold duration-200 ${
                collaspe
                  ? "opacity-0 w-0 overflow-hidden"
                  : "opacity-100 w-auto delay-300"
              }`}
            >
              Farm Manager
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
