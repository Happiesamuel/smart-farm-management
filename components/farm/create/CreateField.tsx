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

import { useRef, useState } from "react";
import { Control, FieldPath } from "react-hook-form";
import { IconType } from "react-icons";

import z from "zod";
import { createFarmSchema } from "@/lib/schemas";
import { IoLocationOutline } from "react-icons/io5";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Map,
  MapControls,
  MapMarker,
  MarkerContent,
  MarkerLabel,
  MarkerPopup,
} from "@/components/ui/map";
interface Inputs {
  control: Control<z.infer<typeof createFarmSchema>>;
  name: FieldPath<z.infer<typeof createFarmSchema>>;
  label: string;
  placeholder: string;
  Icon?: IconType;
}
interface InputSelect {
  control: Control<z.infer<typeof createFarmSchema>>;
  name1: FieldPath<z.infer<typeof createFarmSchema>>;
  name2: FieldPath<z.infer<typeof createFarmSchema>>;
  label: string;
  placeholder: string;
  placeholder2: string;
  array: { [key: string]: string }[];
}
interface Select {
  control: Control<z.infer<typeof createFarmSchema>>;
  name: FieldPath<z.infer<typeof createFarmSchema>>;
  label: string;
  placeholder: string;
  array: { [key: string]: string }[];
  Icon: IconType;
}

type LocationResult = {
  display_name: string;
  lat: string;
  lon: string;
};

export function CreateFarmSelect({
  control,
  name,
  label,
  placeholder,
  Icon,
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
                    {Icon && <Icon className="text-primary-green" />}
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
export function CreateFarmInputSelect({
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

export default function CreateFarmInput({
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

export function CreateFarmText({ name, label, placeholder, control }: Inputs) {
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

export function CreateLocationField({
  control,
}: {
  control: Control<z.infer<typeof createFarmSchema>>;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<LocationResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
        // 🔥 cancel previous request
        if (abortRef.current) {
          abortRef.current.abort();
        }

        const controller = new AbortController();
        abortRef.current = controller;

        setLoading(true);

        const res = await fetch(
          `https://us1.locationiq.com/v1/autocomplete?key=${process.env.NEXT_PUBLIC_LOCATIONIQ_KEY}&q=${value}&format=json`,
          { signal: controller.signal },
        );

        if (!res.ok) {
          throw new Error("Failed to fetch locations");
        }

        const data: LocationResult[] = await res.json();

        // ⚠️ Empty results
        if (!data.length) {
          setResults([]);
          setError("No locations found");
          return;
        }

        setResults(data);
        console.log(data);
      } catch (err: unknown) {
        const e = err as unknown as Error;
        if (e.name === "AbortError") return; // ignore cancelled

        setError("Failed to fetch location");
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 400);
  };

  return (
    <FormField
      control={control}
      name="location"
      render={({ field }) => (
        <FormItem className="w-full relative">
          <div className="flex items-center justify-between">
            <FormLabel className="text-sm text-dark">Farm Location</FormLabel>

            {field.value?.address ? (
              <p className="text-xs max-w-[200px] md:max-w-full truncate text-green-600">
                {field.value.address}
              </p>
            ) : (
              <p className="text-xs text-zinc-400">Select a location</p>
            )}
          </div>

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

              {loading && (
                <span className="text-xs text-zinc-400">Loading...</span>
              )}
            </div>
          </FormControl>

          {error && <p className="text-xs text-red-500 mt-1">{error}</p>}

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

          {field?.value?.lat && field?.value?.lng ? (
            <Card className="h-[320px] p-0 overflow-hidden">
              <Map
                theme="light"
                key={`${field.value.lng}-${field.value.lat}`}
                center={[field.value.lng, field.value.lat]}
                zoom={16}
              >
                <MapControls />

                <MapMarker
                  longitude={field.value.lng}
                  latitude={field.value.lat}
                >
                  <MarkerContent>
                    <div className="size-4 cursor-pointer rounded-full border-2 border-white bg-green-500 shadow-md hover:scale-110 transition-transform" />

                    <MarkerLabel className="text-xs" position="bottom">
                      {field.value.address}
                    </MarkerLabel>
                  </MarkerContent>

                  <MarkerPopup className="w-60 p-3">
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground uppercase">
                        Location
                      </p>

                      <h3 className="font-semibold text-sm">
                        {field.value.address || "Unknown location"}
                      </h3>

                      <p className="text-xs text-muted-foreground">
                        Lat: {field.value.lat.toFixed(5)} <br />
                        Lng: {field.value.lng.toFixed(5)}
                      </p>
                    </div>
                  </MarkerPopup>
                </MapMarker>
              </Map>
            </Card>
          ) : (
            <Card className="h-[320px] flex items-center justify-center text-sm text-muted-foreground">
              No location selected
            </Card>
          )}

          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function CreateFarmUpload({
  control,
}: {
  control: Control<z.infer<typeof createFarmSchema>>;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <FormField
      control={control}
      name="farmImage"
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel className="text-sm text-dark">Farm Image</FormLabel>

          <FormControl>
            <div
              onClick={() => inputRef.current?.click()}
              className="border border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition"
            >
              <input
                type="file"
                ref={inputRef}
                className="hidden"
                accept=".jpg,.jpeg,.png"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;

                  field.onChange(file);

                  // Create preview only for images
                  if (file.type.startsWith("image/")) {
                    const url = URL.createObjectURL(file);
                    setPreview(url);
                  } else {
                    setPreview(null);
                  }
                }}
              />

              {/* Upload UI */}
              {!preview && (
                <div className="flex flex-col items-center justify-center gap-2">
                  <Upload className="w-6 h-6 text-gray-500" />

                  <p className="text-sm font-medium text-gray-700">
                    Upload Farm Image
                  </p>

                  <p className="text-xs text-gray-500">JPG, PNG (Max 5MB)</p>
                </div>
              )}

              {/* IMAGE PREVIEW */}
              {preview && (
                <img
                  src={preview}
                  alt="image preview"
                  className="mt-2 w-full h-40 object-cover object-center rounded-md"
                />
              )}

              {/* File name fallback */}
              {field.value && !preview && (
                <p className="mt-3 text-xs text-green-600">
                  {field.value.name}
                </p>
              )}
            </div>
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
