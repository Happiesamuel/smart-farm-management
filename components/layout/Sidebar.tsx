"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
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
import { Plus } from "lucide-react";
import { useApp } from "@/stores/useAppStore";
import { LuNotepadText } from "react-icons/lu";
export function ManagerSidebar() {
  const pathname = usePathname();
  const { workspaceId } = useParams();
  const sidebarLinks = [
    {
      group: "Main",
      items: [
        {
          name: "Dashboard",
          slug: "dashboard",
          icon: TbLayoutDashboard,
        },
      ],
    },
    {
      group: "Management",
      items: [
        { name: "Farms", slug: "farms", icon: PiFarm },
        { name: "Crops", slug: "crops", icon: PiPottedPlant },
        { name: "Harvests", slug: "harvests", icon: GiDigDug },
      ],
    },
    {
      group: "Finance",
      items: [
        { name: "Sales", slug: "sales", icon: TbMoneybagMove },
        { name: "Expenses", slug: "expenses", icon: GrMoney },
      ],
    },
    {
      group: "Others",
      items: [
        { name: "Reports", slug: "reports", icon: RiFileList3Line },
        { name: "Settings", slug: "settings", icon: IoSettingsOutline },
      ],
    },
  ];

  const navItems = [
    {
      name: "Dashboard",
      slug: "dashboard",
      icon: TbLayoutDashboard,
    },
    {
      name: "Farms",
      slug: "farms",
      icon: PiFarm,
    },
    {
      name: "Sales",
      slug: "sales",
      icon: TbMoneybagMove,
    },
    {
      name: "Expenses",
      slug: "expenses",
      icon: GrMoney,
    },
  ];
  const { handleToogleCollapse, collaspe } = useCollaspe();
  const { ready, user, role } = useApp();
  if (!workspaceId) return null;
  const slug = pathname.split("/")[3];
  return (
    <>
      <div
        className={`bg-[#f3f3f3]  flex-col hidden lg:flex fixed transition-all duration-300 ease-in-out h-full ${
          collaspe
            ? "lg:w-[4.8rem] xl:w-[4.8rem]"
            : "lg:w-[12.5rem] xl:w-[14rem]"
        }`}
      >
        <div className="px-2 pt-5">
          <div
            onClick={handleToogleCollapse}
            className="flex items-center justify-end"
          >
            <FiSidebar className="text-dark/80 cursor-pointer" />
          </div>

          <div className="flex items-center gap-2">
            <div className="size-9 text-3xl rounded-xl btn-primary flex items-center justify-center text-white ">
              🌿
            </div>
            <div>
              <div
                className={`font-bold text-gray-900 leading-tight text-sm ${
                  collaspe
                    ? "opacity-0 w-0 overflow-hidden"
                    : "opacity-100 w-auto delay-300"
                } `}
              >
                SmartFarm
              </div>
              <div
                className={` ${
                  collaspe
                    ? "opacity-0 w-0 overflow-hidden"
                    : "opacity-100 w-auto delay-300"
                } text-xs text-gray-500 leading-tight`}
              >
                Management System
              </div>
            </div>
          </div>
        </div>

        <div className="flex h-[65vh] overflow-y-scroll no-scroll flex-col gap-4 mt-8">
          {sidebarLinks.map((section) => (
            <div key={section.group}>
              {!collaspe && (
                <p className="text-[10px] text-zinc-400 px-4 mb-1 uppercase">
                  {section.group}
                </p>
              )}

              <div className="flex flex-col gap-1">
                {section.items.map((link) => {
                  const Icon = link.icon;

                  const href = `/user/${workspaceId}/${link.slug}`;

                  return (
                    <Tooltip key={link.slug}>
                      <TooltipTrigger asChild>
                        <Link
                          href={href}
                          className={`flex group items-center cursor-pointer text-dark/90 font-medium py-2 px-3 gap-3 ${
                            slug === link.slug
                              ? "bg-white text-primary-green"
                              : ""
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
                        <TooltipContent
                          side="right"
                          className="bg-primary-green"
                        >
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

        <div className="absolute z-50 bg-[#f3f3f3]   bottom-6 px-3 w-full">
          {!ready ? (
            <div className="flex items-center gap-2">
              <div className="size-9 bg-zinc-200 rounded-full animate-pulse" />
              <div className="flex flex-col gap-1">
                <div
                  className={`  ${
                    collaspe
                      ? "opacity-0 w-0 overflow-hidden"
                      : "opacity-100 w-auto delay-300"
                  } transition-opacity duration-200   h-3 w-24  bg-zinc-200 rounded-full animate-pulse`}
                />
                <div
                  className={` ${
                    collaspe
                      ? "opacity-0 w-0 overflow-hidden"
                      : "opacity-100 w-auto delay-300"
                  } transition-opacity duration-200 h-2 w-32 bg-zinc-200 rounded-full animate-pulse`}
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 border-t border-zinc-300 w-full pt-5">
              <div className="relative size-9 aspect-video">
                <Image
                  src={user?.avatar || User}
                  fill
                  alt="user"
                  className="rounded-full object-top object-cover "
                />
              </div>

              <div>
                <p
                  className={`transition-opacity text-dark text-xs font-semibold duration-200 ${
                    collaspe
                      ? "opacity-0 w-0 overflow-hidden"
                      : "opacity-100 w-auto delay-300"
                  }`}
                >
                  {user?.fullName}
                </p>

                <p
                  className={`transition-opacity text-zinc-500 text-[10px] font-semibold duration-200 ${
                    collaspe
                      ? "opacity-0 w-0 overflow-hidden"
                      : "opacity-100 w-auto delay-300"
                  }`}
                >
                  {`${role === "owner" && "Farm"} ${role!.slice(0, 1).toUpperCase() + role!.slice(1)}`}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="lg:hidden block fixed bottom-1.5 left-1/2 -translate-x-1/2 z-50">
        <div className="relative w-[340px] h-[50px] bg-white backdrop-blur-md  border border-border rounded-xl shadow-xl flex items-center justify-between px-8">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-24 h-12 bg-transparent mb-4 rounded-b-full" />

          <div className="flex items-center gap-8">
            {navItems.slice(0, 2).map((item) => {
              const Icon = item.icon;
              const href = `/user/${workspaceId}/${item.slug}`;
              return (
                <Link
                  href={href}
                  key={item.name}
                  className={`transition text-dark/90 ${
                    slug === item.slug && "text-primary-green"
                  }`}
                >
                  <Icon className="size-6" />
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-8">
            {navItems.slice(2).map((item) => {
              const Icon = item.icon;
              const href = `/user/${workspaceId}/${item.slug}`;
              return (
                <Link
                  href={href}
                  key={item.name}
                  className={`transition text-dark/90 ${
                    slug === item.slug && " text-primary-green"
                  }`}
                >
                  <Icon className="size-5" />
                </Link>
              );
            })}
          </div>

          <div className="absolute -top-7 left-1/2 -translate-x-1/2">
            <button
              onClick={() => alert("Open Quick Actions")}
              className="size-12 rounded-full bg-primary-green  flex items-center justify-center shadow-2xl hover:scale-110 transition"
            >
              <Plus className="text-white w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export function WorkerSidebar() {
  const { workspaceId } = useParams();
  const { ready, user, role } = useApp();
  const pathname = usePathname();
  const { handleToogleCollapse, collaspe } = useCollaspe();
  const segments = pathname.split("/");
  const slug = segments[3] || "";

  if (!workspaceId) return null;
  const sidebarLinks = [
    {
      group: "Main",
      items: [
        {
          name: "Dashboard",
          slug: "dashboard",
          icon: TbLayoutDashboard,
        },
        {
          name: "My Tasks",
          slug: "tasks",
          icon: GoTasklist,
        },
        {
          name: "Notes",
          slug: "notes",
          icon: LuNotepadText,
        },
        {
          name: "Activity Log",
          slug: "activity",
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
          icon: IoSettingsOutline,
        },
      ],
    },
  ];
  const navItems = [
    {
      name: "Dashboard",
      slug: "dashboard",
      icon: TbLayoutDashboard,
    },
    {
      name: "My Tasks",
      slug: "tasks",
      icon: GoTasklist,
    },
    {
      name: "Notes",
      slug: "notes",
      icon: LuNotepadText,
    },
    {
      name: "Settings",
      slug: "settings",
      icon: IoSettingsOutline,
    },
  ];
  return (
    <>
      <div
        className={`bg-[#f3f3f3] flex-col flex fixed transition-all duration-300 ease-in-out h-full ${
          collaspe
            ? "lg:w-[4.8rem] xl:w-[4.8rem]"
            : "lg:w-[12.5rem] xl:w-[14rem]"
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
            <div className="size-9 text-3xl rounded-xl btn-primary flex items-center justify-center text-white ">
              🌿
            </div>
            <div>
              <div
                className={`font-bold text-gray-900 leading-tight text-sm ${
                  collaspe
                    ? "opacity-0 w-0 overflow-hidden"
                    : "opacity-100 w-auto delay-300"
                } `}
              >
                SmartFarm
              </div>
              <div
                className={` ${
                  collaspe
                    ? "opacity-0 w-0 overflow-hidden"
                    : "opacity-100 w-auto delay-300"
                } text-xs text-gray-500 leading-tight`}
              >
                Management System
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-8">
          {sidebarLinks.map((section) => (
            <div key={section.group}>
              {!collaspe && (
                <p className="text-[10px] text-zinc-400 px-4 mb-1 uppercase">
                  {section.group}
                </p>
              )}

              <div className="flex flex-col gap-1">
                {section.items.map((link) => {
                  const Icon = link.icon;

                  const href = `/worker/${workspaceId}/${link.slug}`;

                  return (
                    <Tooltip key={link.slug}>
                      <TooltipTrigger asChild>
                        <Link
                          href={href}
                          className={`flex group items-center cursor-pointer text-dark/90 font-medium py-2 px-3 gap-3 ${
                            slug === link.slug
                              ? "bg-white text-primary-green"
                              : ""
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
                        <TooltipContent
                          side="right"
                          className="bg-primary-green"
                        >
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

        <div className="absolute z-50 bg-[#f3f3f3]   bottom-6 px-3 w-full">
          {!ready ? (
            <div className="flex items-center gap-2">
              <div className="size-9 bg-zinc-200 rounded-full animate-pulse" />
              <div className="flex flex-col gap-1">
                <div
                  className={`  ${
                    collaspe
                      ? "opacity-0 w-0 overflow-hidden"
                      : "opacity-100 w-auto delay-300"
                  } transition-opacity duration-200   h-3 w-24  bg-zinc-200 rounded-full animate-pulse`}
                />
                <div
                  className={` ${
                    collaspe
                      ? "opacity-0 w-0 overflow-hidden"
                      : "opacity-100 w-auto delay-300"
                  } transition-opacity duration-200 h-2 w-32 bg-zinc-200 rounded-full animate-pulse`}
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 border-t border-zinc-300 w-full pt-5">
              <div className="relative size-9 aspect-video">
                <Image
                  src={user?.avatar || User}
                  fill
                  alt="user"
                  className="rounded-full object-top object-cover "
                />
              </div>

              <div>
                <p
                  className={`transition-opacity text-dark text-xs font-semibold duration-200 ${
                    collaspe
                      ? "opacity-0 w-0 overflow-hidden"
                      : "opacity-100 w-auto delay-300"
                  }`}
                >
                  {user?.fullName}
                </p>

                <p
                  className={`transition-opacity text-zinc-500 text-[10px] font-semibold duration-200 ${
                    collaspe
                      ? "opacity-0 w-0 overflow-hidden"
                      : "opacity-100 w-auto delay-300"
                  }`}
                >
                  {`${role === "owner" ? "Farm" : ""} ${role!.slice(0, 1).toUpperCase() + role!.slice(1)}`}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="lg:hidden block fixed bottom-1.5 left-1/2 -translate-x-1/2 z-50">
        <div className="relative w-[340px] h-[50px] bg-white backdrop-blur-md  border border-border rounded-xl shadow-xl flex items-center justify-between px-8">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-24 h-12 bg-transparent mb-4 rounded-b-full" />

          <div className="flex items-center gap-8">
            {navItems.slice(0, 2).map((item) => {
              const Icon = item.icon;
              const href = `/worker/${workspaceId}/${item.slug}`;
              return (
                <Link
                  href={href}
                  key={item.name}
                  className={`transition text-dark/90 ${
                    slug === item.slug && "text-primary-green"
                  }`}
                >
                  <Icon className="size-6" />
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-8">
            {navItems.slice(2).map((item) => {
              const Icon = item.icon;
              const href = `/worker/${workspaceId}/${item.slug}`;
              return (
                <Link
                  href={href}
                  key={item.name}
                  className={`transition text-dark/90 ${
                    slug === item.slug && " text-primary-green"
                  }`}
                >
                  <Icon className="size-5" />
                </Link>
              );
            })}
          </div>

          <div className="absolute -top-7 left-1/2 -translate-x-1/2">
            <button
              onClick={() => alert("Open Quick Actions")}
              className="size-12 rounded-full bg-primary-green  flex items-center justify-center shadow-2xl hover:scale-110 transition"
            >
              <Plus className="text-white w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
