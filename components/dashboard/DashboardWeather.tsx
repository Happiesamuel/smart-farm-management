"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
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

  return (
    <div className="flex-1 space-y-1.5 min-h-full bg-white p-4 rounded-xl border border-border/80 shadow shadow-dark/10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 bg-primary-green shadow shadow-light-green text-white text-sm w-fit rounded-full px-2.5 py-1">
          <HiOutlineLocationMarker />
          <p>Chicago</p>
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
        <div className="space">
          <h6 className="text-dark font-semibold text-lg">Monday</h6>
          <p className="text-sm font-normal text-dark">27 Aug, 2024</p>
        </div>
        <Image
          alt="icon"
          width={100}
          className="relative left-0"
          height={100}
          src={`https:${weather?.current?.condition?.icon}`}
        />
        <div />
      </div>
      <div className="flex items-center justify-between ">
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
        <div>
          <h6 className="text-dark font-semibold text-lg">
            {weather?.current?.condition?.text}
          </h6>
          <p className="text-sm font-normal text-dark">
            Feels like{" "}
            {weather?.current[active === "C" ? "feelslike_c" : "feelslike_f"]}
            &#xb0; {active}
          </p>
        </div>
      </div>
    </div>
  );
}
