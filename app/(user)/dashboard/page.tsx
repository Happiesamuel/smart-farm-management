import DashboardFarm from "@/components/dashboard/DashboardFarm";
import DashboardFarms from "@/components/dashboard/DashboardFarms";
import DashboardLinechart from "@/components/dashboard/DashboardLinechart";
import DashboardMass from "@/components/dashboard/DashboardMass";
import { DashboardProductionOveriew } from "@/components/dashboard/DashboardProductionOverview";
import DashboardRecentTask from "@/components/dashboard/DashboardRecentTask";
import DashboardSmartAlerts from "@/components/dashboard/DashboardSmartAlertts";
import DashboardTaskManagement from "@/components/dashboard/DashboardTaskManagement";
import DashboardWeather from "@/components/dashboard/DashboardWeather";

export default function page() {
  return (
    <div className="pt-18 px-2 sm:px-4">
      <div className="pb-5 space-y-1">
        <h6 className="text-dark font-semibold tracking-[3px] text-2xl">
          Good Morning !
        </h6>
        <p className="text-dark/80 text-sm">
          Optimize Your Farm Operations with Real-Time Insights
        </p>
      </div>
      <DashboardFarms />
      <div className=" grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 items-stretch xl:h-[220px] justify-between gap-4">
        <DashboardWeather />
        <DashboardProductionOveriew />
        <DashboardMass />
      </div>
      <DashboardSmartAlerts />
      <div className="w-full lg:flex-row flex-col flex lg:items-center justify-between gap-4 pt-4">
        <DashboardLinechart />
        <DashboardFarm />
      </div>
      <div className="w-full  xl:flex-row flex-col flex items-start  xl:h-[220px] justify-between gap-4 pt-4">
        <DashboardTaskManagement />
        <DashboardRecentTask />
      </div>
    </div>
  );
}
