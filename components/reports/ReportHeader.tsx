"use client";
import { Button } from "@/components/ui/button";
import { FiDownload } from "react-icons/fi";
import { FaChartBar } from "react-icons/fa";

export default function ReportHeader() {
  return (
    <div className="lg:pb-5 pb-2 flex gap-3 sm:flex-row flex-col sm:items-center justify-between">
      <div className=" space-y-1">
        <h6 className="text-dark font-semibold  text-2xl">Reports</h6>
        <p className="text-dark/80 text-sm">
          Track performance, analyze trends and make data-driven decisions.
        </p>
      </div>
      <div className=" flex items-center gap-2">
        <Button className="bg-transparent border border-dark/15 w-[48%] sm:w-fit cursor-pointer text-dark/90 rounded-sm">
          <FiDownload />

          <p>Export</p>
        </Button>
        <Button className="bg-primary-green w-[48%] sm:w-fit cursor-pointer text-white rounded-sm">
          <FaChartBar />
          <p>Generate Report </p>
        </Button>
      </div>
    </div>
  );
}
