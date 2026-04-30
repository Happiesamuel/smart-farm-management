import React from "react";
import FarmOvervewBoxes from "./FarmOverviewBoxes";
import FarmLineChart from "./FarmLineChart";
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
export default function FarmOverview() {
  return (
    <div>
      <FarmOvervewBoxes />

      <div className="flex items-center gap-4 flex-col lg:flex-row">
        <FarmLineChart />
        <FarmPieChart />
      </div>
      {/* <div className="grid grid-cols-[0.5fr_1fr] gap-4 my-4 ">
        <DashboardWeather />
        <Card className="h-[320px] p-0 overflow-hidden">
          <Map
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
        </Card>
      </div> */}

      <div className="flex md:flex-row flex-col pt-4 items-center justify-between gap-4">
        <FarmActivites />
        <FarmUpcomingHarvest />
      </div>
      <FarmSmartAlerts />
    </div>
  );
}
