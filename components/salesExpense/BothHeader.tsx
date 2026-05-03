import { Button } from "@/components/ui/button";
import { FiDownload } from "react-icons/fi";
import { GoPlus } from "react-icons/go";

export default function BothHeader({ type }: { type: string }) {
  return (
    <div className="pb-5 flex gap-3 md:flex-row flex-col md:items-center justify-between">
      <div className=" space-y-1">
        <h6 className="text-dark font-semibold  text-2xl">
          {type === "sales" ? "Sales" : "Expenses"}
        </h6>
        <p className="text-dark/80 text-sm">
          Track and manage all your {type === "sales" ? "sales" : "expenses"}
        </p>
      </div>
      <div className=" flex items-center gap-2">
        <Button className="bg-primary-green w-[48%] sm:w-fit cursor-pointer text-white rounded-sm">
          <GoPlus />
          <p>Add {type === "sales" ? "Sale" : "Expense"}</p>
        </Button>
        <Button className="bg-transparent border border-dark/15 w-[48%] sm:w-fit cursor-pointer text-dark/90 rounded-sm">
          <FiDownload />

          <p>Export</p>
        </Button>
      </div>
    </div>
  );
}
