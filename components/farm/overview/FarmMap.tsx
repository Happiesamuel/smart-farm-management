import {
  Map,
  MapControls,
  MapMarker,
  MapRef,
  MarkerContent,
  MarkerLabel,
  MarkerPopup,
} from "@/components/ui/map";
import { Card } from "@/components/ui/card";
import { SlLocationPin } from "react-icons/sl";
import { useRef } from "react";
import { formatLocation } from "@/lib/functions";
import { FarmObj } from "@/lib/types";

export default function FarmMap({ farm }: { farm: FarmObj }) {
  const mapRef = useRef<MapRef | null>(null);

  const lat = Number(farm?.lat);
  const lng = Number(farm?.lng);
  const hasValidLocation = !isNaN(lat) && !isNaN(lng) && lat !== 0 && lng !== 0;

  const DEFAULT_CENTER: [number, number] = [8.6753, 9.082]; // [lng, lat] for MapLibre
  const center: [number, number] = hasValidLocation
    ? [lng, lat]
    : DEFAULT_CENTER;

  const handleMapRef = (instance: MapRef | null) => {
    mapRef.current = instance;
    if (instance && hasValidLocation) {
      instance.once("load", () => {
        instance.flyTo({ center: [lng, lat], zoom: 14 });
      });
    }
  };

  return (
    <Card className="w-full gap-3 h-[400px] bg-white flex-1 p-4 relative rounded-xl border border-border/80 hover:shadow-sm transition flex flex-col shrink-0">
      <h6 className="text-sm text-dark/90 font-normal">Farm Location</h6>
      <Map
        ref={handleMapRef}
        styles={{
          light: "https://tiles.openfreemap.org/styles/bright",
        }}
        theme="light"
        center={center}
        zoom={hasValidLocation ? 14 : 6}
      >
        <MapControls />
        {hasValidLocation && (
          <MapMarker longitude={lng} latitude={lat}>
            <MarkerContent>
              <div className="relative flex items-center justify-center">
                <span className="absolute inline-flex h-4 w-4 rounded-full bg-green-400 opacity-75 animate-ping" />
                <div className="relative size-4 cursor-pointer rounded-full border-2 border-white bg-green-500 shadow-md" />
              </div>
              <MarkerLabel position="bottom">
                {farm?.farmName ?? "Farm"}
              </MarkerLabel>
            </MarkerContent>
            <MarkerPopup className="w-60 p-3">
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground uppercase">
                  Location
                </p>
                <h3 className="font-semibold text-primary-green text-dark/90 text-sm">
                  {farm?.farmName}
                </h3>
                <p className="text-xs text-muted-foreground">
                  Lat: {lat.toFixed(5)} <br />
                  Lng: {lng.toFixed(5)}
                </p>
              </div>
            </MarkerPopup>
          </MapMarker>
        )}
      </Map>
      <div className="flex items-start text-zinc-600 text-xs font-normal gap-3">
        <SlLocationPin />
        <div className="space-y-2">
          <p>{formatLocation(farm?.address as string)}</p>
          {hasValidLocation && (
            <p>
              Lat {lat.toFixed(4)}° N, Lng {lng.toFixed(4)}° E
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}
