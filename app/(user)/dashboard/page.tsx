import { DashboardAreachart } from "@/components/dashboard/DashboardAreachart";
import DashboardCropsStatus from "@/components/dashboard/DashboardCropStatus";
import DashboardFarms from "@/components/dashboard/DashboardFarms";

import { DashboardPieChart } from "@/components/dashboard/DashboardPiechart";

import DashboardQucikActions from "@/components/dashboard/DashboardQucikActions";

import DashboardRecentTasks from "@/components/dashboard/DashboardRecentTasks";
import DashboardSmartAlerts from "@/components/dashboard/DashboardSmartAlertts";
import DashboardTopPerforming from "@/components/dashboard/DashboardTopPerforming";
import DashboardWeather from "@/components/dashboard/DashboardWeather";
export const metadata = {
  title: "Dashboard",
};
export default function page() {
  return (
    <div className="pt-18 px-2 sm:px-4 pb-8">
      <div className="pb-5 space-y-1">
        <h6 className="text-dark font-semibold  text-2xl">
          Good Morning, John 👋
        </h6>
        <p className="text-dark/80 text-sm">
          Here&apos;s what&apos;s happening on your farms today.
        </p>
      </div>
      <DashboardFarms />
      {/* <DashboardWeather /> */}
      <div className=" grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-[1fr_0.8fr] items-stretch xl:h-[300px] justify-between gap-4">
        <DashboardAreachart />
        <DashboardPieChart />
      </div>
      <div className=" grid grid-cols-1 pt-4 sm:grid-cols-2 xl:grid-cols-3 items-stretch  justify-between gap-4">
        <DashboardSmartAlerts />
        <DashboardCropsStatus />
        <DashboardRecentTasks />
      </div>
      <div className="w-full   xl:h-[220px] grid grid-cols-[1fr_0.8fr] gap-4 pt-4">
        <DashboardTopPerforming />
        <DashboardQucikActions />
      </div>
    </div>
  );
}
