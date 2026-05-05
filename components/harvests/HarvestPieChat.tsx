"use client";

import { Label, Pie, PieChart } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

export const description = "A donut chart with text";

const data = [
  { food: "Maize", value: 33, fill: "#03732b", area: "2,500kg" },
  { food: "Rice", value: 25, fill: "#4e8afd", area: "2,100kg" },
  { food: "Tomatoes", value: 17, fill: "#fcb304", area: "1,500kg" },
  { food: "Pepper", value: 15, fill: "#e45551", area: "1,200kg" },
  { food: "Others", value: 10, fill: "#bfbfc0", area: "1,150kg" },
];

const chartConfig = {
  value: { label: "Value" },
  Maize: { label: "Maize" },
  Rice: { label: "Rice" },
  Tomatoes: { label: "Tomatoes" },
  Pepper: { label: "Pepper" },
  Others: { label: "Others" },
} satisfies ChartConfig;

export function HarvestPieChart() {
  return (
    <div className="w-full p-4  gap-0 bg-transparent flex-1 relative rounded-xl border border-border/80 hover:shadow-sm transition flex flex-col h-[300px] shrink-0">
      <div className="pb-0 shrink-0">
        <div className="flex justify-between items-center">
          <h3 className="text-dark/90 font-semibold text-sm">
            Harvest by Crop (Quantity)
          </h3>
        </div>
      </div>

      <div className="flex-1   min-h-0 relative overflow-hidden">
        <div className="flex md:flex-row lg:flex-col xl:flex-row  flex-col items-center h-full">
          {/* LEFT → PIE CHART */}
          <div className="w-full sm:w-[65%] lg:w-full xl:w-[62%] h-full">
            <ChartContainer
              config={chartConfig}
              className="w-full h-[220px] lg:h-[220px] xl:h-full md:h-full"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel={false} />}
                />

                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="food"
                  cx="50%"
                  cy="50%"
                  innerRadius="60%"
                  outerRadius="90%"
                  strokeWidth={4}
                >
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              dy="-0.3em"
                              className="text-sm font-semibold"
                            >
                              8,450
                            </tspan>

                            <tspan
                              x={viewBox.cx}
                              dy="1.4em"
                              className="text-[11px]  font-normal"
                              fill="#71717a"
                            >
                              kg
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          </div>

          <div className="w-full h md:w-[35%] lg:w-full  ">
            <CustomLegend data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}
const CustomLegend = ({
  data,
}: {
  data: { food: string; value: number; fill: string; area: string }[];
}) => {
  return (
    <div className="flex flex-row overflow-scroll no-scroll md:flex-col lg:flex-row xl:flex-col gap-2 text-sm">
      {data.map((item, index) => (
        <div key={index} className="flex items-center gap-6 justify-between">
          {/* Left */}
          <div className="flex items-center  text-zinc-700 gap-2">
            <span className="w-2 h-2 " style={{ backgroundColor: item.fill }} />
            {item.food}
          </div>

          <div className="text-zinc-500 flex items-center gap-2">
            <span>{item.area}</span>
            <span>({item.value}%)</span>
          </div>
        </div>
      ))}
    </div>
  );
};
