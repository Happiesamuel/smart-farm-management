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
import { FiSidebar } from "react-icons/fi";
import User from "../../public/user.png";
import { GrMoney } from "react-icons/gr";
export default function Sidebar() {
  const pathname = usePathname();

  const [fir, sec] = pathname.split("/");
  const slug = [fir, sec].join("/");
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
        <GiDigDug
          className={`${slug === "harvests" ? "text-primary-green" : "text-dark"} group-hover:text-primary-green text-lg`}
        />
      ),
    },
    {
      name: "Sales",
      slug: "sales",
      route: "/sales",
      svg: (
        <TbMoneybagMove
          className={`${slug === "sales" ? "text-primary-green" : "text-dark"} group-hover:text-primary-green text-xl`}
        />
      ),
    },
    {
      name: "Expenses",
      slug: "expenses",
      route: "/expenses",
      svg: (
        <GrMoney
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
  const { handleToogleCollapse, collaspe } = useCollaspe();
  return (
    <div
      className={`bg-[#f3f3f3] flex-col flex fixed transition-all duration-300 ease-in-out h-full ${collaspe ? "lg:w-[4.8rem] xl:w-[4.8rem]" : "lg:w-[12.5rem] xl:w-[14rem]"}`}
    >
      <div className="px-2 pt-5">
        <div
          onClick={handleToogleCollapse}
          className="flex items-center justify-end"
        >
          <FiSidebar className="text-dark/80 cursor-pointer" />
        </div>
        <div className="flex items-center gap-2 ">
          <div className="aspect-video hidden lg:block rounded-full  border- border-light-green relative size-12">
            <Image
              src={Logo}
              className="rounded-full   p-1 object-center object-cover "
              fill
              alt=";"
            />
          </div>
          <h6
            className={`transition-opacity text-primary-green  text-sm font-semibold duration-200 ${
              collaspe
                ? "opacity-0 w-0 overflow-hidden"
                : "opacity-100 w-auto delay-300"
            }`}
            // className={` ${collaspe ? "hidden" : "block delay-300"}`}
          >
            S. F. M. S
          </h6>
        </div>
      </div>
      <div className="flex flex-col gap-1 mt-8">
        {links.map((link) => (
          <Tooltip key={link.slug}>
            <TooltipTrigger asChild>
              <Link
                href={link.route}
                className={`flex group items-center cursor-pointer text-dark/90 font-medium py-2 px-4 gap-2 ${
                  slug === link.route && "bg-white text-primary-green"
                } hover:text-primary-green text-sm rounded-md mx-3`}
              >
                <div>{link.svg}</div>

                <p
                  className={`transition-opacity duration-200 ${
                    collaspe
                      ? "opacity-0 w-0 overflow-hidden"
                      : "opacity-100 w-auto delay-300"
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
        ))}
      </div>

      <div className="absolute bottom-6 px-3 w-full ">
        <div className="flex items-center gap-2 border-t border-zinc-300 w-full pt-5">
          <Image
            src={User}
            width={35}
            height={35}
            alt="user"
            className="rounded-full object-center object-cover border-2 border-light-green"
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
