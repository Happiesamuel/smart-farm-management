"use client";
import { FormLoader, NoResult } from "@/components/loader/GeneralLoader";
import { useApp } from "@/stores/useAppStore";
import { useParams } from "next/navigation";

import { Pie, PieChart } from "recharts";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useGetFarmExpenses } from "@/hooks/expense/useExpense";
import { generateColors } from "@/lib/functions";

export function FinanceCategoryPieChart() {
  const { farmId } = useParams();
  const { workspace, user, ready } = useApp();
  const { expenses, status, error } = useGetFarmExpenses(
    workspace?.id ?? null,
    user?.id ?? null,
    farmId as string,
  );
  if (!ready)
    return (
      <div className="h-35">
        <FormLoader>Loading app...</FormLoader>
      </div>
    );

  if (!user || !workspace)
    return (
      <div className="h-35">
        <NoResult>Unauthorised</NoResult>
      </div>
    );

  const isLoading = status === "pending";

  if (isLoading)
    return (
      <div className="h-35">
        <FormLoader>Loading Expense chart...</FormLoader>
      </div>
    );

  const errorMessage = error?.message;

  if (errorMessage)
    return (
      <div className="h-35">
        <NoResult>{errorMessage}</NoResult>
      </div>
    );

  if (!expenses?.length)
    return (
      <div className="h-35">
        <NoResult>No sales found!</NoResult>
      </div>
    );

  const categoryTotals =
    expenses?.reduce(
      (acc, exp) => {
        const key = exp.category || "Others";

        if (!acc[key]) acc[key] = 0;

        acc[key] += Number(exp.amount || 0);

        return acc;
      },
      {} as Record<string, number>,
    ) ?? {};

  const total = Object.values(categoryTotals).reduce(
    (sum, val) => sum + val,
    0,
  );

  const COLORS = generateColors(total);

  const chartData = Object.entries(categoryTotals).map(
    ([key, value], index) => ({
      food: key.charAt(0).toUpperCase() + key.slice(1),
      value: total > 0 ? Number(((value / total) * 100).toFixed(1)) : 0,
      fill: COLORS[index % COLORS.length],
    }),
  );
  const chartConfig = {
    value: { label: "Value" },
    ...Object.fromEntries(
      Object.keys(categoryTotals).map((key) => [
        key,
        { label: key.charAt(0).toUpperCase() + key.slice(1) },
      ]),
    ),
  } satisfies ChartConfig;

  return (
    <Card className="w-full gap-0  h-[300px] xl:h-[220px] shrink-0">
      <CardHeader className="pb-0 shrink-0">
        <div className="flex justify-between items-center">
          <h3 className="text-dark font-semibold text-base">
            Cateory Breakdown
          </h3>
        </div>
      </CardHeader>

      <CardContent className="flex-1   min-h-0 relative overflow-hidden">
        <div className="flex sm:flex-row lg:flex-row  flex-col items-center h-full">
          {/* LEFT → PIE CHART */}
          <div className="w-full sm:w-[65%] lg:w-full xl:w-[55%] h-full">
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
                  data={chartData}
                  dataKey="value"
                  nameKey="food"
                  cx="40%"
                  cy="50%"
                  innerRadius="50%"
                  outerRadius="80%"
                  strokeWidth={4}
                ></Pie>
              </PieChart>
            </ChartContainer>
          </div>

          <div className="w-full sm:w-[35%] lg:w-full  ">
            <CustomLegend chartData={chartData} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
const CustomLegend = ({
  chartData,
}: {
  chartData: { food: string; value: number; fill: string }[];
}) => {
  return (
    <div className="flex overflow-scroll no-scroll lg:gap-2 sm:justify-start justify-center flex-row lg:flex-col sm:flex-col gap-2 text-xs">
      {chartData.map((item, index) => (
        <div
          key={index}
          className="flex items-center lg:gap-5 gap-5 lg:justify-between sm:justify-between"
        >
          {/* Left */}
          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: item.fill }}
            />
            {item.food}
          </div>

          {/* Right */}
          <div className="text-zinc-500 hidden sm:flex items-center lg:gap-3 xl:gap-7 gap-7">
            <span>{item.value}%</span>
          </div>
        </div>
      ))}
    </div>
  );
};
