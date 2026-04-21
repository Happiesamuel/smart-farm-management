import DashboardActivities from "@/components/dashboard/DashboardActivities";
import DashboardFarm from "@/components/dashboard/DashboardFarm";
import DashboardFarms from "@/components/dashboard/DashboardFarms";
import DashboardLinechart from "@/components/dashboard/DashboardLinechart";
import DashboardMass from "@/components/dashboard/DashboardMass";
import { DashboardProductionOveriew } from "@/components/dashboard/DashboardProductionOverview";
import DashboardSmartAlerts from "@/components/dashboard/DashboardSmartAlertts";
import DashboardWeather from "@/components/dashboard/DashboardWeather";

export default function page() {
  return (
    <div className="pt-18 px-4">
      <div className="pb-5 space-y-1">
        <h6 className="text-dark font-semibold tracking-[3px] text-2xl">
          Good Morning !
        </h6>
        <p className="text-dark/80 text-sm">
          Optimize Your Farm Operations with Real-Time Insights
        </p>
      </div>
      <DashboardFarms />
      <div className="flex md:flex-row flex-col items-stretch lg:h-[220px] justify-between gap-4">
        <DashboardWeather />
        <DashboardProductionOveriew />
        <DashboardMass />
      </div>
      <DashboardSmartAlerts />
      <div className="w-full flex items-center justify-between gap-4 pt-4">
        <DashboardLinechart />
        <DashboardFarm />
      </div>
      <div className="w-full flex items-center justify-between gap-4 pt-4">
        <div className="flex-1 bg-white rounded-xl border border-border/80 shadow shadow-dark/10 flex flex-col h-[300px] shrink-0"></div>
        <DashboardActivities />
      </div>
    </div>
  );
}
