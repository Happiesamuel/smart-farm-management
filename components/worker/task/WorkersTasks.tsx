import React from "react";
import TaskHeader from "./TaskHeader";
import TaskGroup from "./TaskGroup";
import TaskList from "./TaskList";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
export default function WorkersTasks() {
  const searchParams = useSearchParams();
  const [fil, setFil] = useState(searchParams.get("filter") || "all");
  return (
    <div className="pt-18 px-2 sm:px-4 pb-8">
      <TaskHeader />
      <TaskGroup active={fil} setActive={setFil} />
      <TaskList filter={fil} />
    </div>
  );
}
