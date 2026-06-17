import { FormLoader } from "@/components/loader/GeneralLoader";
import WorkersTasks from "@/components/worker/task/WorkersTasks";
import { Suspense } from "react";
export const metadata = {
  title: "Task",
};
export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="h-125">
          <FormLoader>Loading...</FormLoader>
        </div>
      }
    >
      <WorkersTasks />
    </Suspense>
  );
}
