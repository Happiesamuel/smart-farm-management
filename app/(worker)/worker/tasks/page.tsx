"use client";

import WorkersTasks from "@/components/worker/task/WorkersTasks";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <WorkersTasks />
    </Suspense>
  );
}
