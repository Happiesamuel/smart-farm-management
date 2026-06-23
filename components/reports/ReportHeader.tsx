"use client";

import { Button } from "@/components/ui/button";
import { FiDownload } from "react-icons/fi";
import { FaChartBar } from "react-icons/fa";
import jsPDF from "jspdf";
import { RefObject } from "react";
import { toPng } from "html-to-image";
export default function ReportHeader({
  reportRef,
}: {
  reportRef: RefObject<HTMLDivElement | null>;
}) {
  const handleExport = async () => {
    if (!reportRef?.current) return;

    const imgData = await toPng(reportRef.current, {
      cacheBust: true,
      pixelRatio: 2,
    });

    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 210;
    const pageHeight = 295;

    const img = new Image();
    img.src = imgData;
    await new Promise((res) => (img.onload = res));

    const imgHeight = (img.height * imgWidth) / img.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save("farm-report.pdf");
  };
  const handleGenerate = () => {
    // 👇 You can extend this later (analytics, API logging, etc.)
    handleExport();
  };

  return (
    <div className="lg:pb-5 pb-2 flex gap-3 sm:flex-row flex-col sm:items-center justify-between">
      <div className="space-y-1">
        <h6 className="text-dark font-semibold text-2xl">Reports</h6>
        <p className="text-dark/80 text-sm">
          Track performance, analyze trends and make data-driven decisions.
        </p>
      </div>

      <div className="flex items-center gap-2">
        {/* EXPORT */}
        <Button
          onClick={async () => await handleExport()}
          className="bg-transparent border border-dark/15 w-[48%] sm:w-fit cursor-pointer text-dark/90 rounded-sm"
        >
          <FiDownload />
          <p>Export</p>
        </Button>

        {/* GENERATE */}
        <Button
          onClick={handleGenerate}
          className="bg-primary-green w-[48%] sm:w-fit cursor-pointer text-white rounded-sm"
        >
          <FaChartBar />
          <p>Generate Report</p>
        </Button>
      </div>
    </div>
  );
}
