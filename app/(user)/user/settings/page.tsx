import Link from "next/link";
import { FaRegBell, FaRegUser } from "react-icons/fa6";
import { LuUsers } from "react-icons/lu";
import { MdCurrencyPound, MdSecurity } from "react-icons/md";
import { PiRanking } from "react-icons/pi";

export default function page() {
  const boxes = [
    {
      name: "Profile",
      text: "Manage your personal information and password.",
      icon: FaRegUser,
      iconColor: "bg-[#e8f5ec] text-[#2d8952] ",
      bg: "bg-[#f8fdf9]",
      route: "/user/settings/profile",
    },
    {
      name: "Farm Information",
      text: "Update your farm details, address and preferences.",
      icon: PiRanking,
      iconColor: "bg-[#e8f5ec] text-[#2d8952] ",
      bg: "bg-[#f8fdf9]",
      route: "/user/settings/farm-information",
    },
    {
      name: "Users & Roles",
      text: "Manage your personal information and password.",
      icon: LuUsers,
      iconColor: "bg-[#f1ecfd] text-[#5837e8] ",
      bg: "bg-[#f9f7fd]",
      route: "/user/settings/user-and-roles",
    },
    {
      name: "Notifications",
      text: "Configure notifications and alert preferences.",
      icon: FaRegBell,
      iconColor: "bg-[#fff1dd] text-[#de852c] ",
      bg: "bg-[#fefaf2]",
      route: "/user/settings/notifications",
    },
    {
      name: "Units & Currency",
      text: "Set measurement units and currency",
      icon: MdCurrencyPound,
      iconColor: "bg-[#e1eefd] text-[#1058d6] ",
      bg: "bg-[#f7fafe]",
      route: "/user/settings#",
    },

    {
      name: "Secuity",
      text: "Manage security settings and sessions.",
      icon: MdSecurity,
      iconColor: "bg-[#fee7e7] text-[#e82a2d] ",
      bg: "bg-[#fef5f5]",
      route: "/user/settings#",
    },
  ];

  return (
    <div className="pt-18 px-2 sm:px-4 pb-8">
      <div className="pb-5 flex gap-3 sm:flex-row flex-col md:items-center justify-between">
        <div className=" space-y-1">
          <h6 className="text-dark font-semibold  text-2xl">Settings</h6>
          <p className="text-dark/80 text-sm">
            Manage your account preference and organisation settings
          </p>
        </div>
        {/* <div className="text-lg text-dark/90 cursor-pointer">
          <FaRegBell />
        </div> */}
      </div>
      <div className="grid grid-cols-1 place-items-center sm:grid-cols-2 lg:grid-cols-3 mx-auto w-full sm:w-[90%] lg:w-full xl:w-[90%] gap-4 mt-6">
        {boxes.map((box) => {
          const Icon = box.icon;
          return (
            <Link
              href={box.route}
              key={box.name}
              className="w-full p-4 cursor-pointer h-[125px] max-w-sm gap-4 bg-white items-start justify-center relative rounded-md border border-border/80 hover:shadow-sm transition flex shrink-0"
            >
              <div
                className={`text-lg size-10 flex items-center justify-center rounded-md ${box.iconColor}`}
              >
                <Icon />
              </div>
              <div className="space-y-2">
                <h6 className="text-dark text-sm">{box.name}</h6>
                <p className="text-sm text-zinc-500 font-normal">{box.text}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
