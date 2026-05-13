"use client";
import ActivityTable from "@/components/worker/activity/ActivityTable";
import ActivityCalendar from "@/components/worker/activity/ActivityCalendar";
import { Button } from "@/components/ui/button";
import { GoPlus } from "react-icons/go";
import { FinanceModal } from "@/components/modals/FinanceModal";
import { RiFileList3Line } from "react-icons/ri";
import { useState } from "react";
import ActivityForm from "@/components/worker/activity/ActivityForm";

export default function Page() {
  const [open, setOpen] = useState(false);
  return (
    <div className="pt-18 px-2 sm:px-4 pb-8">
      <div className="pb-5 flex gap-3 md:flex-row flex-col md:items-center justify-between">
        <div className=" space-y-1">
          <h6 className="text-dark font-semibold  text-2xl">Activity Log</h6>
          <p className="text-dark/80 text-sm">
            Track all activities and actions on your farm.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <ActivityCalendar />
          <FinanceModal
            text={"Add a new activity on your farm"}
            type={"Activity"}
            iconColor={"bg-green-100 text-green-500"}
            Icon={RiFileList3Line}
            open={open}
            onClose={() => setOpen(false)}
          >
            <ActivityForm />
          </FinanceModal>
          <Button
            onClick={() => setOpen(true)}
            className="bg-primary-green w-[48%] md:w-fit cursor-pointer text-white rounded-sm"
          >
            <GoPlus />
            <p>Add Activity</p>
          </Button>
        </div>
      </div>
      <ActivityTable />
    </div>
  );
}
