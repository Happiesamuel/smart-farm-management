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
import { IoMdNotificationsOutline } from "react-icons/io";
import { useCollaspe } from "@/context/SidebarCollasibleContext";
import { GoTasklist } from "react-icons/go";
import { FiActivity } from "react-icons/fi";
import DashboardSheet from "./DashboardSheet";

export default function Header() {
  const links = [
    {
      name: "Dashboard",
      route: "/user/dashboard",
      svg: <TbLayoutDashboard className="text-lg text-dark" />,
    },
    {
      name: "Farms",
      route: "/user/farms",
      svg: <PiFarm className="text-lg text-dark" />,
    },
    {
      name: "Crops",
      route: "/user/crops",
      svg: <PiPottedPlant className="text-lg text-dark" />,
    },
    {
      name: "Harvests",
      route: "/user/harvests",
      svg: <GiFarmTractor className="text-lg text-dark" />,
    },
    {
      name: "Sales",
      route: "/user/sales",
      svg: <GiMoneyStack className="text-lg text-dark" />,
    },
    {
      name: "Expenses",
      route: "/user/expenses",
      svg: <FaRegMoneyBill1 className="text-lg text-dark" />,
    },
    {
      name: "Reports",
      route: "/user/reports",
      svg: <RiFileList3Line className="text-lg text-dark" />,
    },
    {
      name: "Settings",
      route: "/user/settings",
      svg: <IoSettingsOutline className="text-lg text-dark" />,
    },

    {
      name: "Dashboard",
      route: "/worker/dashboard",
      svg: <TbLayoutDashboard className="text-lg text-dark" />,
    },
    {
      name: "My Tasks",
      route: "/worker/tasks",
      svg: <GoTasklist className="text-lg text-dark" />,
    },
    {
      name: "Activity Log",
      route: "/worker/activity",
      svg: <FiActivity className="text-lg text-dark" />,
    },
    {
      name: "Settings",
      route: "/worker/settings",
      svg: <IoSettingsOutline className="text-lg text-dark" />,
    },
  ];
  const route = usePathname();
  const newRou = route.split("/").slice(0, 3).join("/");
  const active = links.find((x) => x.route === newRou);
  const { collaspe } = useCollaspe();
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
        <Link href="/user/notifications" className="relative hidden lg:block">
          <IoSettingsOutline className="text-lg text-dark" />
        </Link>
        <Link href="/user/notifications" className="relative hidden lg:block">
          <IoMdNotificationsOutline className="text-2xl text-dark" />
          {/* {notify.some((x) => !x.status) && ( */}
          <div className="size-1.5 bg-light-green rounded-full absolute bottom-[70%] left-[50%]" />
          {/* )} */}
        </Link>
        <div className="flex items-center gap-3 lg:gap-2">
          <Image
            src={User}
            width={35}
            height={35}
            alt="user"
            className="rounded-full object-center object-cover border-2 border-light-green"
          />
          <div className="lg:hidden">
            <DashboardSheet />
          </div>
          <div className="hidden lg:block">
            <p className="text-dark text-xs font-semibold">John Doe</p>
            <p className="text-zinc-500 text-[10px] font-semibold">
              johndoe@gmail.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
