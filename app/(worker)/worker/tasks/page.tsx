"use client";
import TaskGroup from "@/components/worker/task/TaskGroup";
import TaskHeader from "@/components/worker/task/TaskHeader";
import TaskList from "@/components/worker/task/TaskList";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

export default function Page() {
  const searchParams = useSearchParams();
  const [fil, setFil] = useState(searchParams.get("filter") || "all");
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div className="pt-18 px-2 sm:px-4 pb-8">
        <TaskHeader />
        <TaskGroup active={fil} setActive={setFil} />
        <TaskList filter={fil} />
      </div>
    </Suspense>
  );
}
