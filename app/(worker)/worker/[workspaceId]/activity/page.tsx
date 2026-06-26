"use client";
import ActivityTable from "@/components/worker/activity/ActivityTable";

export default function Page() {
  return (
    <div className="pt-18 px-2 sm:px-4 pb-8">
      <div className="pb-5 flex gap-3 md:flex-row flex-col md:items-center justify-between">
        <div className=" space-y-1">
          <h6 className="text-dark font-semibold  text-2xl">Activity Log</h6>
          <p className="text-dark/80 text-sm">
            Track all activities and actions.
          </p>
        </div>
      </div>
      <ActivityTable />
    </div>
  );
}
