"use client";
import Image from "next/image";
import Logo from "../../public/logo.png";
import { TbLayoutDashboard } from "react-icons/tb";
import { PiFarm, PiPottedPlant } from "react-icons/pi";
import { GiFarmTractor, GiMoneyStack } from "react-icons/gi";
import { FaRegMoneyBill1 } from "react-icons/fa6";
import { RiFileList3Line } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Sidebar() {
  const pathname = usePathname();

  const slug = pathname.slice(1);
  const links = [
    {
      name: "Dashboard",
      slug: "dashboard",
      route: "/dashboard",
      svg: (
        <TbLayoutDashboard
          className={`${slug === "dashboard" && "text-primary-green"} group-hover:text-primary-green text-xl`}
        />
      ),
    },
    {
      name: "Farms",
      slug: "farms",
      route: "/farms",
      svg: (
        <PiFarm
          className={`${slug === "farms" ? "text-primary-green" : "text-dark"} group-hover:text-primary-green text-xl`}
        />
      ),
    },
    {
      name: "Crops",
      slug: "crops",
      route: "/crops",
      svg: (
        <PiPottedPlant
          className={`${slug === "crops" ? "text-primary-green" : "text-dark"} group-hover:text-primary-green text-xl`}
        />
      ),
    },
    {
      name: "Harvests",
      slug: "harvests",
      route: "/harvests",
      svg: (
        <GiFarmTractor
          className={`${slug === "harvests" ? "text-primary-green" : "text-dark"} group-hover:text-primary-green text-xl`}
        />
      ),
    },
    {
      name: "Sales",
      slug: "sales",
      route: "/sales",
      svg: (
        <GiMoneyStack
          className={`${slug === "sales" ? "text-primary-green" : "text-dark"} group-hover:text-primary-green text-xl`}
        />
      ),
    },
    {
      name: "Expenses",
      slug: "expenses",
      route: "/expenses",
      svg: (
        <FaRegMoneyBill1
          className={`${slug === "expenses" ? "text-primary-green" : "text-dark"} group-hover:text-primary-green text-lg`}
        />
      ),
    },
    {
      name: "Reports",
      slug: "reports",
      route: "/reports",
      svg: (
        <RiFileList3Line
          className={`${slug === "reports" ? "text-primary-green" : "text-dark"} group-hover:text-primary-green text-lg`}
        />
      ),
    },
    {
      name: "Settings",
      slug: "settings",
      route: "/settings",
      svg: (
        <IoSettingsOutline
          className={`${slug === "settings" ? "text-primary-green" : "text-dark"} group-hover:text-primary-green text-lg`}
        />
      ),
    },
  ];

  return (
    <div className="bg-[#f3f3f3] flex-col flex lg:w-[12.5rem] xl:w-[14rem] fixed h-full">
      <div className="flex items-center gap-2 px-2 pt-5">
        <div className="aspect-video hidden lg:block rounded-full  border- border-light-green relative size-12">
          <Image
            src={Logo}
            className="rounded-full   p-1 object-center object-cover "
            fill
            alt=";"
          />
        </div>
        <h6 className="text-primary-green  text-sm font-semibold">
          Smart Farm Management System
        </h6>
      </div>
      <div className="flex flex-col gap-1 mt-6">
        {links.map((link) => (
          <Link
            key={link.slug}
            href={link.route}
            className={`flex group items-center cursor-pointer text-dark font-medium py-2 px-4 gap-2 ${slug === link.slug && "  bg-white text-primary-green"} hover:text-primary-green text-sm rounded-md  mx-3`}
          >
            <div>{link.svg}</div> <p className=""> {link.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
