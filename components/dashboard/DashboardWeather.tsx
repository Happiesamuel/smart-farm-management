// "use client";
// import Image from "next/image";
// import { useEffect, useState } from "react";
// import { HiOutlineLocationMarker } from "react-icons/hi";
// type WeatherType = {
//   location: {
//     name: string;
//     country: string;
//   };
//   current: {
//     temp_c: number;
//     temp_f: number;
//     feelslike_c: number;
//     feelslike_f: number;
//     dewpoint_c: number;
//     dewpoint_f: number;
//     humidity: number;
//     condition: {
//       text: string;
//       icon: string;
//     };
//   };
// };

// export default function DashboardWeather() {
//   const [active, setActive] = useState("C");
//   const temps = ["C", "F"];
// const [weather, setWeather] = useState<WeatherType | null>(null);
// const key = "4fd0c9a7195a43ac88e135848261904";
// useEffect(() => {
//   const fetchWeather = async () => {
//     const res = await fetch(
//       `https://api.weatherapi.com/v1/current.json?key=${key}&q=Lagos&aqi=no`,
//     );
//     const data = await res.json();
//     setWeather(data);
//   };

//   fetchWeather();
// }, []);

// if (!weather) return <p>Loading...</p>;
// const today = new Date();

// const day = today.toLocaleDateString("en-US", { weekday: "long" });
// const date = today.toLocaleDateString("en-GB", {
//   day: "numeric",
//   month: "short",
//   year: "numeric",
// });
//   return (
//     <div className=" h-[320px] space-y-1.5 relative gap-4 flex flex-col min-h-full bg-white p-4 rounded-xl border border-border/80 hover:shadow-sm transition">
//       <div className="flex items-center relative justify-between">
//         <div className="flex items-center gap-1 bg-primary-green shadow shadow-light-green text-white text-sm w-fit rounded-full px-2.5 py-1">
//           <HiOutlineLocationMarker />
//           <p>
//             {weather.location.name}, {weather.location.country}
//           </p>
//         </div>
//         <div className="flex transition-all duration-500 items-center bg-primary-green/15 w-fit rounded-md">
//           {temps.map((temp) => (
//             <p
//               onClick={() => setActive(temp)}
//               className={`text-sm cursor-pointer font-semibold px-3 py-1 rounded-lg ${active === temp ? "bg-primary-green text-white" : " text-dark"}`}
//               key={temp}
//             >
//               {temp}
//             </p>
//           ))}
//         </div>
//       </div>
//       <div className="flex items-center relative justify-between">
//         <div className="space relative">
//           <h6 className="text-dark font-semibold text-lg">{day}</h6>
//           <p className="text-sm font-normal text-dark">{date}</p>
//         </div>
//         <Image
//           alt="icon"
//           width={100}
//           className="absolute left-45"
//           height={100}
//           src={`https:${weather?.current?.condition?.icon}`}
//         />
//         <div />
//       </div>
//       <div className="flex items-center gap-3 justify-between ">
//         <div className="space">
//           <h6 className="text-dark font-semibold text-lg">
//             {weather?.current[active === "C" ? "temp_c" : "temp_f"]}&#xb0;{" "}
//             {active}
//           </h6>
//           <p className="text-sm font-normal text-dark">
//             Dew Point:{" "}
//             {weather?.current[active === "C" ? "dewpoint_c" : "dewpoint_f"]}
//             &#xb0; {active}
//           </p>
//         </div>
//         <div className="w-ful">
//           <h6 className="text-dark text-end font-semibold text-lg">
//             {weather?.current?.condition?.text}
//           </h6>
//           <p className="text-sm text-end font-normal text-dark">
//             Feels like{" "}
//             {weather?.current[active === "C" ? "feelslike_c" : "feelslike_f"]}
//             &#xb0; {active}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
type WeatherType = {
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
  };
  forecast: {
    forecastday: {
      date: string;
      day: {
        maxtemp_c: number;
        mintemp_c: number;
        avgtemp_c: number;
        avghumidity: number;
        daily_chance_of_rain: number;
        uv: number;
        maxwind_kph: number;
        condition: {
          text: string;
          icon: string;
        };
      };
    }[];
  };
};
import Image from "next/image";
import { useEffect, useState } from "react";
import { TbDroplet } from "react-icons/tb";
import { LuWind } from "react-icons/lu";
import { IoRainyOutline } from "react-icons/io5";
import { fetchWeather } from "@/lib/functions";
export default function DashboardWeather() {
  const [weather, setWeather] = useState<WeatherType | null>(null);

  useEffect(() => {
    async function wea() {
      const data = await fetchWeather();
      setWeather(data);
    }
    wea()
  }, []);
  if (!weather) return <p>Loading...</p>;

  const today = weather.forecast.forecastday[0];
  const tomorrow = weather.forecast.forecastday[1];
  const nextDay = weather.forecast.forecastday[2];
  const formatDay = (dateStr: string) => {
    const d = new Date(dateStr);

    return {
      day: d.toLocaleDateString("en-US", { weekday: "short" }), // Wed
      date: d.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    };
  };
  const nextTom = formatDay(nextDay.date);
  const tomday = formatDay(tomorrow.date);

  return (
    <div className="w-full gap-0 lg:h-[400px] bg-white flex-1 p-4 relative rounded-xl border border-border/80 hover:shadow-sm transition flex flex-col  shrink-0">
      <div className="space-y-2">
        <h6 className="text-sm text-dark font-normal">Weather Forecast</h6>
        <p className="text-sm text-zinc-500 font-normal">Bwari, Abuja</p>

        <div className="flex md:flex-row flex-col gap-2 lg:gap-4 items-center justify-between">
          <div className="flex items-center flex-1 gap-2">
            <Image
              alt="icon"
              width={100}
              height={100}
              src={`https:${today.day?.condition?.icon}`}
            />
            <div className="flex items-start flex-col ">
              <h2 className="text-dark/90 relative tracking-[3px] text-4xl font-semibold">
                {today?.day.avgtemp_c}
                <span className="absolute text-xl pl-1 top-0 font-medium">
                  &#xb0;c
                </span>
              </h2>
              <p className="text-gray-600">{today.day?.condition?.text} </p>
            </div>
          </div>
          <div className="w-full rounded-xl border border-border/80  bg-white flex flex-1 flex-col">
            <div className="flex text-sm text-zinc-700 border-b  p-2.5 border-border items-center justify-between">
              <div className="flex items-center gap-2">
                <TbDroplet /> <p>Humidity</p>
              </div>
              <p>{today?.day?.avghumidity}%</p>
            </div>
            <div className="flex text-sm text-zinc-700 rounded-xl border-b  p-2.5 border-border/80 items-center justify-between">
              <div className="flex items-center gap-2">
                <LuWind /> <p>Wind</p>
              </div>
              <p>{today?.day?.maxwind_kph} km/h</p>
            </div>
            <div className="flex text-sm text-zinc-700 rounded-xl border-b  p-2.5 border-border/80 items-center justify-between">
              <div className="flex items-center gap-2">
                <IoRainyOutline /> <p>Rain Chance </p>
              </div>
              <p>{today?.day?.daily_chance_of_rain}%</p>
            </div>
            <div className="flex text-sm text-zinc-700 items-center p-2.5 justify-between">
              <div className="flex items-center gap-2">
                <TbDroplet /> <p>Pressure</p>
              </div>
              <p>{today?.day?.uv} pa</p>
            </div>
          </div>
        </div>

        <div className="w-full mt-4 rounded-xl border border-border/80  bg-white grid grid-cols-3">
          <div className="flex flex-col  border-r border-border items-center p-2">
            <p className="text-sm font-normal">Today</p>
            <Image
              alt="icon"
              width={50}
              height={50}
              src={`https:${today.day?.condition?.icon}`}
            />
            <p className="text-dark/90 relative text-sm font-medium">
              {today?.day.avgtemp_c}
              <span className=" text-base ">&#xb0;</span>
              <span className="px-0.5">/</span>
              {today?.day.mintemp_c}
              <span className=" text-base ">&#xb0;</span>
            </p>
          </div>
          <div className="flex flex-col border-r border-border items-center p-2">
            <p className="text-sm font-normal">{tomday.day}</p>
            <Image
              alt="icon"
              width={50}
              height={50}
              src={`https:${tomorrow.day?.condition?.icon}`}
            />
            <p className="text-dark/90 relative text-sm font-medium">
              {tomorrow?.day.avgtemp_c}
              <span className=" text-base ">&#xb0;</span>
              <span className="px-0.5">/</span>
              {tomorrow?.day.mintemp_c}
              <span className=" text-base ">&#xb0;</span>
            </p>
          </div>
          <div className="flex flex-col items-center p-2">
            <p className="text-sm font-normal">{nextTom.day}</p>
            <Image
              alt="icon"
              width={50}
              height={50}
              src={`https:${nextDay.day?.condition?.icon}`}
            />
            <p className="text-dark/90 relative text-sm font-medium">
              {nextDay?.day.avgtemp_c}
              <span className=" text-base ">&#xb0;</span>
              <span className="px-0.5">/</span>
              {nextDay?.day.mintemp_c}
              <span className=" text-base ">&#xb0;</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
