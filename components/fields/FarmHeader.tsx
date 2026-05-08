import { Button } from "@/components/ui/button";
import Link from "next/link";
import { GoPlus } from "react-icons/go";

export default function FarmHeader() {
  return (
    <div className="flex gap-2 sm:flex-row flex-col sm:items-center justify-between">
      <div className="space-y-2">
        <h5 className="text-xl text-dark font-semibold">Farms</h5>
        <p className="text-sm text-zinc-500 font-medium">
          Manage and monitor all your farms in one place
        </p>
      </div>
      <Button className="bg-primary-green cursor-pointer text-white">
        <Link href={"/farms/create"} className="flex items-center gap-1">
          <GoPlus />
          <p>Add Farm</p>
        </Link>
      </Button>
    </div>
  );
}
