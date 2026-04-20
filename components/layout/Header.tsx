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

export default function Header() {
  const links = [
    {
      name: "Dashboard",
      route: "/dashboard",
      svg: <TbLayoutDashboard className="text-lg text-dark" />,
    },
    {
      name: "Farms",
      route: "/farms",
      svg: <PiFarm className="text-lg text-dark" />,
    },
    {
      name: "Crops",
      route: "/crops",
      svg: <PiPottedPlant className="text-lg text-dark" />,
    },
    {
      name: "Harvests",
      route: "/harvests",
      svg: <GiFarmTractor className="text-lg text-dark" />,
    },
    {
      name: "Sales",
      route: "/sales",
      svg: <GiMoneyStack className="text-lg text-dark" />,
    },
    {
      name: "Expenses",
      route: "/expenses",
      svg: <FaRegMoneyBill1 className="text-lg text-dark" />,
    },
    {
      name: "Reports",
      route: "/reports",
      svg: <RiFileList3Line className="text-lg text-dark" />,
    },
    {
      name: "Settings",
      route: "/settings",
      svg: <IoSettingsOutline className="text-lg text-dark" />,
    },
  ];
  const route = usePathname();
  const active = links.find((x) => x.route === route);
  return (
    <div className="flex border-b border-border fixed max-w-424 py-3 bg-white px-4  min-w-0    z-50 w-[calc(100%-14rem)] items-center justify-between">
      <div className="flex items-center gap-2">
        <div>{active?.svg}</div>
        <MdArrowForwardIos className="text-zinc-500 text-sm" />
        <p className="text-dark text-base font-normal">{active?.name}</p>
      </div>

      <div className="flex items-center gap-5">
        <Link href="/notifications" className="relative">
          <IoSettingsOutline className="text-lg text-dark" />
        </Link>
        <Link href="/notifications" className="relative">
          <IoMdNotificationsOutline className="text-2xl text-dark" />
          {/* {notify.some((x) => !x.status) && ( */}
          <div className="size-1.5 bg-light-green rounded-full absolute bottom-[70%] left-[50%]" />
          {/* )} */}
        </Link>
        <div className="flex items-center gap-2">
          <Image
            src={User}
            width={35}
            height={35}
            alt="user"
            className="rounded-full object-center object-cover border-2 border-light-green"
          />
          <div>
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
