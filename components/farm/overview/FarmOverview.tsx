import FarmOvervewBoxes from "./FarmOverviewBoxes";
import { FarmAreachart } from "./FarmLineChart";
import { FarmPieChart } from "./FarmPieChart";
import FarmActivites from "./FarmActivites";
import FarmUpcomingHarvest from "./FarmUpcomingHarvest";
import FarmSmartAlerts from "./FarmSmartAlert";

import {
  Map,
  MapControls,
  MapMarker,
  MarkerContent,
  MarkerLabel,
  MarkerPopup,
} from "@/components/ui/map";
import { Card } from "@/components/ui/card";
import DashboardWeather from "@/components/dashboard/DashboardWeather";
import { SlLocationPin } from "react-icons/sl";
import FarmFieldOverview from "./FarmFieldOverview";
export default function FarmOverview() {
  return (
    <div>
      <FarmOvervewBoxes />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-4 ">
        <Card className="w-full gap-3 h-[400px] bg-white flex-1 p-4 relative rounded-xl border border-border/80 hover:shadow-sm transition flex flex-col  shrink-0">
          <h6 className="text-sm text-dark/90 font-normal">Farm Location</h6>
          <Map
            styles={{
              light: "https://tiles.openfreemap.org/styles/bright",
            }}
            theme="light"
            key={`${5.61601}-${6.40024}`}
            center={[5.61601, 6.40024]}
            zoom={16}
          >
            <MapControls />

            <MapMarker longitude={5.61601} latitude={6.40024}>
              <MarkerContent>
                <div className="size-4 cursor-pointer rounded-full border-2 border-white bg-green-500 shadow-md hover:scale-110 transition-transform" />

                <MarkerLabel position="bottom">Selected</MarkerLabel>
              </MarkerContent>

              <MarkerPopup className="w-60 p-3">
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground uppercase">
                    Location
                  </p>

                  <h3 className="font-semibold text-sm">Selected</h3>

                  <p className="text-xs text-muted-foreground">
                    Lat: {(6.40024).toFixed(5)} <br />
                    Lng: {(5.61601).toFixed(5)}
                  </p>
                </div>
              </MarkerPopup>
            </MapMarker>
          </Map>
          <div className="flex items-start text-zinc-600 text-xs font-normal gap-3">
            <SlLocationPin />
            <div className="space-y-2">
              <p>Bwari, Abuja, FCT, Nigeria</p>
              <p>Lat 9.1651&#xb0; N, Long 7.3986&#xb0; E</p>
            </div>
          </div>
        </Card>
        <DashboardWeather />
      </div>

      <div className=" grid grid-cols-1 lg:grid-cols-[1fr_0.5fr] xl:grid-cols-[1fr_0.8fr] items-stretch xl:h-[300px] justify-between gap-4">
        <FarmAreachart />
        <FarmPieChart />
      </div>

      <div className="flex lg:flex-row flex-col pt-4 items-center justify-between gap-4">
        <FarmActivites />
        <FarmFieldOverview />
        <FarmUpcomingHarvest />
      </div>
      <FarmSmartAlerts />
    </div>
  );
}
