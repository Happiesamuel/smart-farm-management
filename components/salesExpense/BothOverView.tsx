import React from "react";
import { BothPieChart } from "./BothPieChart";
import BothSummary from "./BothSummary";

export default function BothOverView({
  arr,
  data,
  type,
}: {
  arr: { name: string; value: string }[];
  data: { food: string; value: number; fill: string; exp: string }[];
  type: string;
}) {
  return (
    <div className="border-l border-border rounded-tl-md rounded-bl-md">
      <BothPieChart type={type} data={data} />
      <BothSummary type={type} arr={arr} />
    </div>
  );
}
