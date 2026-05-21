import { AiOutlineTeam } from "react-icons/ai";
import { BiTask } from "react-icons/bi";
import { GrMoney, GrWorkshop } from "react-icons/gr";
import { IoNotificationsOutline } from "react-icons/io5";
import { LuHouse } from "react-icons/lu";
import { MdOutlineReport, MdSecurity } from "react-icons/md";
import { TbPlant2 } from "react-icons/tb";
import { TiWeatherPartlySunny } from "react-icons/ti";
const modules = [
  {
    id: "farm-field",
    title: "Farm & Field Management",
    description:
      "Organize your farms and fields with ease. Keep all your information in one place.",
    icon: <LuHouse />,
    iconBg: "bg-green-50",
    iconColor: "text-green-600",
  },
  {
    id: "crop",
    title: "Crop Management",
    description: "Track crop growth stages, health, and get smart insights.",
    icon: <TbPlant2 />,
    iconBg: "bg-green-50",
    iconColor: "text-green-600",
  },
  {
    id: "task",
    title: "Task Management",
    description:
      "Create tasks, assign to team, track progress and meet deadlines.",
    icon: <BiTask />,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    id: "financial",
    title: "Financial Tracking",
    description: "Manage expenses, sales, income and analyze profit or loss.",
    icon: <GrMoney />,
    iconBg: "bg-yellow-50",
    iconColor: "text-yellow-600",
  },
  {
    id: "team",
    title: "Team Collaboration",
    description: "Add team members, assign roles and work together seamlessly.",
    icon: <AiOutlineTeam />,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
  },
  {
    id: "reports",
    title: "Reports & Analytics",
    description: "Get detailed reports and analytics to make better decisions.",
    icon: <MdOutlineReport />,
    iconBg: "bg-green-50",
    iconColor: "text-green-600",
  },
  {
    id: "alerts",
    title: "Smart Alerts",
    description: "Get notifications for important activities and deadlines.",
    icon: <IoNotificationsOutline />,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
  },
  {
    id: "weather",
    title: "Weather Updates",
    description: "Real-time weather forecast to plan your farm activities.",
    icon: <TiWeatherPartlySunny />,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
  },
  {
    id: "security",
    title: "Data Security",
    description: "Your data is encrypted and safe with our secure database.",
    icon: <MdSecurity />,
    iconBg: "bg-green-50",
    iconColor: "text-green-600",
  },
  {
    id: "workspace",
    title: "Multi-Workspace",
    description: "Manage multiple farms and teams with isolated workspaces.",
    icon: <GrWorkshop />,
    iconBg: "bg-teal-50",
    iconColor: "text-teal-600",
  },
];

export default function Features() {
  return (
    <section id="features" className="w-full py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6">
          <p className="text-primary-green pb-2 text-[13px] font-semibold">
            CORE FEATURES
          </p>
          <h2 className="text-xl sm:text-2xl lg:text-3xl  font-semibold text-dark">
            Everything You Need to Manage Your Farm
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full">
          {modules.map((mod) => (
            <div
              key={mod.id}
              className="group flex w-full gap-3 p-3 bg-white rounded-2xl border border-border/80  hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            >
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center text-xl ${mod.iconBg} ${mod.iconColor} flex-shrink-0`}
              >
                {mod.icon}
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-1 group-hover:text-green-600 transition-colors">
                  {mod.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {mod.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
