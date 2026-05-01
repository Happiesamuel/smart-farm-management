// "use client";

// import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import {
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
//   type ChartConfig,
// } from "@/components/ui/chart";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../../ui/select";
// import { useState } from "react";

// export const description = "A simple area chart";

// const chartData = [
//   { month: "January", desktop: 186 },
//   { month: "February", desktop: 305 },
//   { month: "March", desktop: 237 },
//   { month: "April", desktop: 73 },
//   { month: "May", desktop: 209 },
//   { month: "June", desktop: 214 },
// ];

// const chartConfig = {
//   desktop: {
//     label: "Desktop",
//     color: "oklch(62.7% 0.194 149.214)",
//   },
// } satisfies ChartConfig;

// export default function FarmLineChart() {
//   const [crop, setCrop] = useState("month");

//   const crops = [
//     { id: 1, name: "This Week", value: "week" },
//     { id: 2, name: "This Month", value: "month" },
//     { id: 3, name: "This Year", value: "year" },
//   ];

//   return (
//     <Card className="lg:flex-1 w-full bg-white  rounded-xl border border-border/80 shadow shadow-dark/10 flex flex-col h-[300px] shrink-0">
//       <CardHeader className="pb-0 shrink-0">
//         <div className="flex justify-between items-center">
//           <h3 className="text-dark font-semibold text-base">
//             Revenue Overview
//           </h3>
//           <div className="flex items-center gap-3">
//             <Select onValueChange={(e) => setCrop(e)} defaultValue={crop}>
//               <SelectTrigger className="text-dark border border-border bg-white rounded-lg">
//                 <SelectValue placeholder="Corn" />
//               </SelectTrigger>
//               <SelectContent className="bg-white border-border text-zinc-400">
//                 {crops.map((x) => (
//                   <SelectItem
//                     key={x.id}
//                     value={x.value}
//                     className="hover:bg-zinc-900 transition-all duration-500 cursor-pointer"
//                   >
//                     {x.name}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>
//         </div>
//       </CardHeader>
//       <CardContent className="flex-1 min-h-0  overflow-hidden">
//         <ChartContainer
//           config={chartConfig}
//           className="w-full h-full"
//           style={{ minHeight: 0, height: "100%" }}
//         >
//           <AreaChart
//             accessibilityLayer
//             data={chartData}
//             margin={{
//               left: 12,
//               right: 12,
//             }}
//           >
//             <CartesianGrid vertical={false} />
//             <XAxis
//               dataKey="month"
//               tickLine={false}
//               axisLine={false}
//               tickMargin={8}
//               tickFormatter={(value) => value.slice(0, 3)}
//             />
//             <ChartTooltip
//               cursor={false}
//               content={<ChartTooltipContent indicator="line" />}
//             />
//             <Area
//               dataKey="desktop"
//               type="natural"
//               fill="#d6f5e5"
//               fillOpacity={0.4}
//               stroke="#1d6d2e"
//             />
//           </AreaChart>
//         </ChartContainer>
//       </CardContent>
//     </Card>
//   );
// }

"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useState } from "react";

export const description = "An area chart with gradient fill";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#e9575a",
  },
  mobile: {
    label: "Mobile",
    color: "#53bf62",
  },
} satisfies ChartConfig;

export function FarmAreachart() {
  const [val, setVal] = useState("year");

  const year = [
    { id: 1, value: "year", name: "This Year" },
    { id: 2, value: "month", name: "This Month" },
  ];

  return (
    <Card className="w-full gap-0 bg-white flex-1 relative rounded-xl border border-border/80 hover:shadow-sm transition flex flex-col h-[340px] md:h-[300px] shrink-0">
      <CardHeader className="pb-0 shrink-0">
        <div className="flex justify-between items-center">
          <h3 className="text-dark  text-base">Revenue vs Expenses</h3>
          <div className="flex items-center gap-3">
            <Select onValueChange={(e) => setVal(e)} defaultValue={val}>
              <SelectTrigger className="text-dark border border-border bg-white rounded-lg">
                <SelectValue placeholder="2024" />
              </SelectTrigger>
              <SelectContent className="bg-white border-border text-zinc-400">
                {year.map((x) => (
                  <SelectItem
                    key={x.id}
                    value={x.value.toString()}
                    className="hover:bg-zinc-900 transition-all duration-500 cursor-pointer"
                  >
                    {x.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent className="">
        <div className="flex items-center gap-6 mt-2">
          <div className="space-y-1">
            <p className="text-xs text-zinc-600 font-normal">Revenue</p>
            <p className="text-sm text-primary-green font-normal">₦120,000</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-zinc-600 font-normal">Expenses</p>
            <p className="text-sm text-red-500 font-normal">₦50,000</p>
          </div>
        </div>
        <ChartContainer
          config={chartConfig}
          className="w-full h-[200px] md:h-[170px] pb-2"
          style={{ minHeight: 0 }}
        >
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="mobile"
              type="natural"
              fill="url(#fillMobile)"
              fillOpacity={0.4}
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="url(#fillDesktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
        <div className="flex  items-center justify-center gap-2 pb-2">
          <div className="flex items-center gap-1">
            <div className="size-2 bg-[#53bf62]" />
            <p>Revenue</p>
          </div>
          <p>vs</p>
          <div className="flex items-center gap-1">
            <div className="size-2 bg-[#e9575a]" />
            <p>Expenses</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
