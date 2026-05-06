import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Control, FieldPath } from "react-hook-form";
import { IconType } from "react-icons";

import z from "zod";
import { FarmInformationSchema } from "@/lib/schemas";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Map, MapControls, MapMarker, useMap } from "@/components/ui/map";
import { IoLocationOutline } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";

interface Inputs {
  control: Control<z.infer<typeof FarmInformationSchema>>;
  name: FieldPath<z.infer<typeof FarmInformationSchema>>;
  label: string;
  placeholder: string;
  Icon?: IconType;
}
interface Dates {
  control: Control<z.infer<typeof FarmInformationSchema>>;
  name: FieldPath<z.infer<typeof FarmInformationSchema>>;
  label: string;
}

interface InputSelect {
  control: Control<z.infer<typeof FarmInformationSchema>>;
  name1: FieldPath<z.infer<typeof FarmInformationSchema>>;
  name2: FieldPath<z.infer<typeof FarmInformationSchema>>;
  label: string;
  placeholder: string;
  placeholder2: string;
  array: { [key: string]: string }[];
}

interface Select {
  control: Control<z.infer<typeof FarmInformationSchema>>;
  name: FieldPath<z.infer<typeof FarmInformationSchema>>;
  label: string;
  placeholder: string;
  array: { [key: string]: string }[];
}
type LocationResult = {
  display_name: string;
  lat: string;
  lon: string;
};

export function FarmInformationSelect({
  control,
  name,
  label,
  placeholder,
  array,
}: Select) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className=" w-full min-w-[2px]">
          <FormLabel className="text-sm text-sidebar-content gap-1 font-normal">
            {label}
          </FormLabel>
          <div className="w-full flex justify-center items-center min-w-[2px]">
            <Select onValueChange={field.onChange}>
              <FormControl>
                <SelectTrigger className="cursor-pointer h-9! w-full  bg-transparent  focus-visible:outline-primary rounded-[8px] p-3 text-sm  focus:ring text-dark ring-green-500  data-[placeholder]:text-gray-500 ">
                  <div className="flex items-center  gap-2">
                    <SelectValue placeholder={placeholder} className="" />
                  </div>
                </SelectTrigger>
              </FormControl>
              <SelectContent className="max-h-[160px] z-200 bg-[#fff] border border-border text-dark">
                {array.map((select) => (
                  <SelectItem
                    className="cursor-pointer text-sm hover:bg-primary hover:text-white"
                    key={select.name}
                    value={select.value}
                  >
                    {select.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function FarmInformationInputSelect({
  control,
  name1,
  name2,
  label,
  placeholder,
  placeholder2,
  array,
}: InputSelect) {
  return (
    <div className="space-y-2 w-full">
      <div className="text-sm  text-dark">{label}</div>
      <div className="flex items-cente">
        <FormField
          control={control}
          name={name1}
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  className="text-sm h-9 rounded-r-none border-r-0"
                  placeholder={placeholder}
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={name2}
          render={({ field }) => (
            <FormItem className="flex-[0.5] w-full min-w-[2px]">
              <div className="w-full flex justify-center items-center min-w-[2px]">
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="rounded-l-none! cursor-pointer h-9! w-full  bg-transparent  focus-visible:outline-primary rounded-[8px] p-3 text-sm  focus:ring text-dark ring-green-500  data-[placeholder]:text-gray-500 ">
                      <SelectValue placeholder={placeholder2} className="" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-[160px] z-200 bg-[#fff] border border-border text-dark">
                    {array.map((select) => (
                      <SelectItem
                        className="cursor-pointer text-sm hover:bg-primary hover:text-white"
                        key={select.name}
                        value={select.value}
                      >
                        {select.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}

export default function FarmInformationInput({
  name,
  label,
  placeholder,
  control,
  Icon,
}: Inputs) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel className="text-sm  text-dark">{label}</FormLabel>
          <FormControl>
            <div className="h-9! border border-border  px-2 rounded-md flex items-center gap-2">
              {Icon && <Icon className="text-primary-green" />}
              <Input
                className="text-sm w-full border-none p-0"
                placeholder={placeholder}
                {...field}
              />
            </div>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function FarmInformationText({
  name,
  label,
  placeholder,
  control,
}: Inputs) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel className="text-sm   text-dark">{label}</FormLabel>
          <FormControl>
            <Textarea
              placeholder={placeholder}
              maxLength={2000}
              className="resize-none font-normal"
              {...field}
              onChange={(e) => field.onChange(e.target.value)}
              value={typeof field.value === "string" ? field.value : ""}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function FarmInformationDate({ control, name, label }: Dates) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel className="text-sm text-dark">{label}</FormLabel>

          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  className={`w-full h-9! justify-start text-dark/90 text-left font-normal ${
                    !field.value && "text-muted-foreground"
                  }`}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />

                  {field.value ? (
                    format(field.value as string, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </FormControl>
            </PopoverTrigger>

            <PopoverContent className="w-auto z-200 p-0">
              <Calendar
                mode="single"
                selected={
                  field.value ? new Date(field.value as string) : undefined
                }
                onSelect={(date) => field.onChange(date?.toISOString())}
              />
            </PopoverContent>
          </Popover>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function FarmLocationField({
  control,
}: {
  control: Control<z.infer<typeof FarmInformationSchema>>;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<LocationResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mapMode, setMapMode] = useState(false);

  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const fetchLocations = (value: string) => {
    setQuery(value);
    setError("");

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      if (!value || value.length < 3) {
        setResults([]);
        return;
      }

      try {
        if (abortRef.current) abortRef.current.abort();

        const controller = new AbortController();
        abortRef.current = controller;

        setLoading(true);

        const res = await fetch(
          `https://us1.locationiq.com/v1/autocomplete?key=${process.env.NEXT_PUBLIC_LOCATIONIQ_KEY}&q=${value}&format=json`,
          { signal: controller.signal },
        );

        if (!res.ok) throw new Error("Failed to fetch");

        const data: LocationResult[] = await res.json();

        if (!data.length) {
          setError("No locations found");
          setResults([]);
          return;
        }

        setResults(data);
      } catch (err) {
        const e = err as unknown as Error;
        if (e.name === "AbortError") return;
        setError("Failed to fetch location");
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 400);
  };

  const handleMapClick = async (
    lat: number,
    lng: number,
    onChange: (val: { address: string; lat: number; lng: number }) => void,
  ) => {
    try {
      const res = await fetch(
        `https://us1.locationiq.com/v1/reverse?key=${process.env.NEXT_PUBLIC_LOCATIONIQ_KEY}&lat=${lat}&lon=${lng}&format=json`,
      );

      const data = await res.json();

      onChange({
        address: data.display_name || "Selected location",
        lat,
        lng,
      });

      setQuery(data.display_name || "");
      setResults([]);
      setError("");
      setMapMode(false); // exit map mode after selection
    } catch {
      onChange({
        address: "Selected from map",
        lat,
        lng,
      });
      setMapMode(false);
    }
  };

  return (
    <FormField
      control={control}
      name="location"
      render={({ field }) => {
        function MapClickListener() {
          const { map, isLoaded } = useMap();

          useEffect(() => {
            if (!map || !isLoaded) return;

            const handleClick = (e: maplibregl.MapMouseEvent) => {
              // if (!mapMode) return; // ignore clicks when not in map mode
              const { lng, lat } = e.lngLat;
              handleMapClick(lat, lng, field.onChange);
            };

            map.on("click", handleClick);
            return () => {
              map.off("click", handleClick);
            };
          }, [map, isLoaded, mapMode]); // re-register when mapMode changes

          return null;
        }

        // Show map if location selected OR if map mode is active
        const showMap = mapMode || (field?.value?.lat && field?.value?.lng);

        // Default center (e.g. Lagos) when no location selected yet
        const center: [number, number] =
          field?.value?.lng && field?.value?.lat
            ? [field.value.lng, field.value.lat]
            : [3.3792, 6.5244];

        return (
          <FormItem className="w-full relative">
            {/* ================= HEADER ================= */}
            <div className="flex items-center justify-between">
              <FormLabel className="text-sm text-dark">Farm Location</FormLabel>

              {field.value?.address ? (
                <p className="text-xs truncate max-w-[200px] text-green-600">
                  {field.value.address}
                </p>
              ) : (
                <p className="text-xs text-zinc-400">No location selected</p>
              )}
            </div>

            {/* ================= INPUT ================= */}
            <FormControl>
              <div className="h-9 border border-border px-2 rounded-md flex items-center gap-2">
                <IoLocationOutline className="text-primary-green" />

                <input
                  type="text"
                  value={query}
                  onChange={(e) => fetchLocations(e.target.value)}
                  placeholder="Search location..."
                  className="text-sm w-full border-none p-0 focus:outline-none"
                />

                {loading && <span className="text-xs text-zinc-400">...</span>}
              </div>
            </FormControl>

            {/* ================= HELP TEXT ================= */}
            <div className="flex justify-between items-center mt-1">
              <p className="text-xs text-zinc-500">Search or pick from map</p>

              <button
                type="button"
                onClick={() => setMapMode(!mapMode)}
                className="text-xs text-primary-green"
              >
                {mapMode ? "Cancel" : "Pick from map"}
              </button>
            </div>

            {/* ================= ERROR ================= */}
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}

            {/* ================= SEARCH RESULTS ================= */}
            {results.length > 0 && (
              <div className="absolute z-50 mt-16 max-h-[200px] overflow-y-auto w-full bg-white border rounded-md shadow">
                {results.map((item, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      setQuery(item.display_name);
                      setResults([]);
                      setError("");

                      field.onChange({
                        address: item.display_name,
                        lat: parseFloat(item.lat),
                        lng: parseFloat(item.lon),
                      });
                    }}
                    className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100"
                  >
                    {item.display_name}
                  </div>
                ))}
              </div>
            )}

            {/* ================= MAP ================= */}
            {showMap && (
              <Card
                className={`h-[320px] mt-3 p-0 overflow-hidden transition-all ${
                  mapMode ? "ring-2 ring-primary-green ring-offset-1" : ""
                }`}
              >
                <Map
                  theme="light"
                  key={`${field.value.lng}-${field.value.lat}`}
                  styles={{
                    light: "https://tiles.openfreemap.org/styles/bright",
                  }}
                  center={center}
                  zoom={field?.value?.lat ? 16 : 11}
                >
                  <MapClickListener />
                  <MapControls />

                  {field?.value?.lat && field?.value?.lng && (
                    <MapMarker
                      longitude={field.value.lng}
                      latitude={field.value.lat}
                    >
                      <div className="size-4 rounded-full border-2 border-white bg-green-500 shadow-md" />
                    </MapMarker>
                  )}
                </Map>

                {/* Hint overlay when in map mode */}
                {mapMode && (
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-3 py-1.5 rounded-full pointer-events-none">
                    Click anywhere on the map to select location
                  </div>
                )}
              </Card>
            )}

            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
