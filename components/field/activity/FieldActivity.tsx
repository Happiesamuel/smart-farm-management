import React, { useState } from "react";
import FieldActivityCalendar from "./FieldActivityCalendar";
import { FinanceModal } from "@/components/modals/FinanceModal";
import { RiFileList3Line } from "react-icons/ri";
import FieldActivityForm from "./FieldActivityForm";
import FieldActivityTable from "./FieldActivityTable";

export default function FieldActivity() {
  const [open, setOpen] = useState(false);
  return (
    <div className="">
      <div className="pb-5 ">
        <div className="flex w-full justify-end">
          <FieldActivityCalendar />
        </div>
        <div className="flex items-center gap-2">
          <FinanceModal
            text={"Add a new activity on your farm"}
            type={"Activity"}
            iconColor={"bg-green-100 text-green-500"}
            Icon={RiFileList3Line}
            open={open}
            onClose={() => setOpen(false)}
          >
            <FieldActivityForm />
          </FinanceModal>
        </div>
      </div>
      <FieldActivityTable />
    </div>
  );
}
