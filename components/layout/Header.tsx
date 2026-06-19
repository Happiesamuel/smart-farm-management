"use client";
import { TbLayoutDashboard } from "react-icons/tb";
import { PiFarm, PiPottedPlant } from "react-icons/pi";
import { GiFarmTractor, GiMoneyStack } from "react-icons/gi";
import { FaRegMoneyBill1 } from "react-icons/fa6";
import { RiFileList3Line } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import Link from "next/link";
import { usePathname } from "next/navigation";
import User from "../../public/user.png";
import { MdArrowForwardIos } from "react-icons/md";
import Image from "next/image";
import { useCollaspe } from "@/context/SidebarCollasibleContext";
import { GoTasklist } from "react-icons/go";
import { FiActivity } from "react-icons/fi";
import { DashboardSheet, WorkerDashboardSheet } from "./DashboardSheet";
import { useApp } from "@/stores/useAppStore";

export default function Header() {
  const links = [
    {
      name: "Dashboard",
      base: "user",
      slug: "dashboard",
      svg: <TbLayoutDashboard className="text-lg text-dark" />,
    },
    {
      name: "Farms",
      base: "user",
      slug: "farms",
      svg: <PiFarm className="text-lg text-dark" />,
    },
    {
      name: "Crops",
      base: "user",
      slug: "crops",
      svg: <PiPottedPlant className="text-lg text-dark" />,
    },
    {
      name: "Harvests",
      base: "user",
      slug: "harvests",
      svg: <GiFarmTractor className="text-lg text-dark" />,
    },
    {
      name: "Sales",
      base: "user",
      slug: "sales",
      svg: <GiMoneyStack className="text-lg text-dark" />,
    },
    {
      name: "Expenses",
      base: "user",
      slug: "expenses",
      svg: <FaRegMoneyBill1 className="text-lg text-dark" />,
    },
    {
      name: "Reports",
      base: "user",
      slug: "reports",
      svg: <RiFileList3Line className="text-lg text-dark" />,
    },
    {
      name: "Settings",
      base: "user",
      slug: "settings",
      svg: <IoSettingsOutline className="text-lg text-dark" />,
    },

    {
      name: "Dashboard",
      base: "worker",
      slug: "dashboard",
      svg: <TbLayoutDashboard className="text-lg text-dark" />,
    },
    {
      name: "My Tasks",
      base: "worker",
      slug: "tasks",
      svg: <GoTasklist className="text-lg text-dark" />,
    },
    {
      name: "Activity Log",
      base: "worker",
      slug: "activity",
      svg: <FiActivity className="text-lg text-dark" />,
    },
    {
      name: "Settings",
      base: "worker",
      slug: "settings",
      svg: <IoSettingsOutline className="text-lg text-dark" />,
    },
  ];
  const route = usePathname();
  const { collaspe } = useCollaspe();

  const { ready, user, role } = useApp();
  const segments = route.split("/");
  const ownerPath = route.startsWith("/user");
  const workerPath = route.startsWith("/worker");
  const base = segments[1];
  const workspaceId = segments[2];
  const slug = segments[3];

  const newRou = `/${base}/${workspaceId}/${slug}`;

  const active = links.find((x) => x.base === base && x.slug === slug);

  return (
    <div
      className={`flex border-b border-border fixed max-w-424 py-3 bg-white px-2 md:px-4  min-w-0 z-100 w-full  ${collaspe ? "lg:w-[calc(100%-4.8rem)]" : "lg:w-[calc(100%-14rem)]"} items-center justify-between`}
    >
      <div className="flex items-center gap-2">
        <div>{active?.svg}</div>
        <MdArrowForwardIos className="text-zinc-500 text-sm" />
        <Link href={`${newRou}`} className="text-dark text-base font-normal">
          {active?.name}
        </Link>
      </div>

      <div className="flex items-center gap-5">
        <Link
          href={`/user/${workspaceId}/settings`}
          className="relative hidden lg:block"
        >
          <IoSettingsOutline className="text-lg text-dark" />
        </Link>

        {!ready ? (
          <div className="flex items-center gap-2">
            <div className="size-9 bg-zinc-200 rounded-full animate-pulse" />
            <div className="flex flex-col gap-1">
              <div className="h-3 w-24 bg-zinc-200 rounded-full animate-pulse" />
              <div className="h-2 w-32 bg-zinc-200 rounded-full animate-pulse" />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 lg:gap-2">
            <div className="relative size-9 aspect-video">
              <Image
                src={user?.avatar || User}
                fill
                alt="user"
                className="rounded-full object-top object-cover "
              />
            </div>
            <div className="lg:hidden">
              {role === "owner" || ownerPath ? (
                <DashboardSheet />
              ) : role === "worker" || workerPath ? (
                <WorkerDashboardSheet />
              ) : (
                ""
              )}

              {/* */}
            </div>
            <div className="hidden lg:block">
              <p className="text-dark text-xs font-semibold">
                {user?.fullName}
              </p>
              <p className="text-zinc-500 text-[10px] font-semibold">
                {user?.email}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
