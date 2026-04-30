"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";
type WeatherType = {
  location: {
    name: string;
    country: string;
  };
  current: {
    temp_c: number;
    temp_f: number;
    feelslike_c: number;
    feelslike_f: number;
    dewpoint_c: number;
    dewpoint_f: number;
    humidity: number;
    condition: {
      text: string;
      icon: string;
    };
  };
};

export default function DashboardWeather() {
  const [active, setActive] = useState("C");
  const temps = ["C", "F"];
  const [weather, setWeather] = useState<WeatherType | null>(null);
  const key = "4fd0c9a7195a43ac88e135848261904";
  useEffect(() => {
    const fetchWeather = async () => {
      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${key}&q=Lagos&aqi=no`,
      );
      const data = await res.json();
      setWeather(data);
    };

    fetchWeather();
  }, []);

  if (!weather) return <p>Loading...</p>;
  const today = new Date();

  const day = today.toLocaleDateString("en-US", { weekday: "long" });
  const date = today.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  return (
    <div className=" h-[320px] space-y-1.5 relative gap-4 flex flex-col min-h-full bg-white p-4 rounded-xl border border-border/80 hover:shadow-sm transition">
      <div className="flex items-center relative justify-between">
        <div className="flex items-center gap-1 bg-primary-green shadow shadow-light-green text-white text-sm w-fit rounded-full px-2.5 py-1">
          <HiOutlineLocationMarker />
          <p>
            {weather.location.name}, {weather.location.country}
          </p>
        </div>
        <div className="flex transition-all duration-500 items-center bg-primary-green/15 w-fit rounded-md">
          {temps.map((temp) => (
            <p
              onClick={() => setActive(temp)}
              className={`text-sm cursor-pointer font-semibold px-3 py-1 rounded-lg ${active === temp ? "bg-primary-green text-white" : " text-dark"}`}
              key={temp}
            >
              {temp}
            </p>
          ))}
        </div>
      </div>
      <div className="flex items-center relative justify-between">
        <div className="space relative">
          <h6 className="text-dark font-semibold text-lg">{day}</h6>
          <p className="text-sm font-normal text-dark">{date}</p>
        </div>
        <Image
          alt="icon"
          width={100}
          className="absolute left-45"
          height={100}
          src={`https:${weather?.current?.condition?.icon}`}
        />
        <div />
      </div>
      <div className="flex items-center gap-3 justify-between ">
        <div className="space">
          <h6 className="text-dark font-semibold text-lg">
            {weather?.current[active === "C" ? "temp_c" : "temp_f"]}&#xb0;{" "}
            {active}
          </h6>
          <p className="text-sm font-normal text-dark">
            Dew Point:{" "}
            {weather?.current[active === "C" ? "dewpoint_c" : "dewpoint_f"]}
            &#xb0; {active}
          </p>
        </div>
        <div className="w-ful">
          <h6 className="text-dark text-end font-semibold text-lg">
            {weather?.current?.condition?.text}
          </h6>
          <p className="text-sm text-end font-normal text-dark">
            Feels like{" "}
            {weather?.current[active === "C" ? "feelslike_c" : "feelslike_f"]}
            &#xb0; {active}
          </p>
        </div>
      </div>
    </div>
  );
}
