import BothHeader from "@/components/salesExpense/BothHeader";

import BothBoxes from "@/components/salesExpense/BothBoxes";
import BothTable from "@/components/salesExpense/BothTable";
import BothOverView from "@/components/salesExpense/BothOverView";
export default function page() {

  const categories = [
    "All Categories",
    "Fertilizer",
    "Labour",
    "Seeds",
    "Pesticides",
    "Fuel",
    "Irrigation",
    "Equipment",
    "Transport",
  ];



  return (
    <div className="pt-18 px-2 sm:px-4 pb-8">
      <BothHeader type="expenses" />
      <BothBoxes type="expenses"  />
      <div className="grid h-fit lg:h-[600px] mt-2 grid-cols-1 xl:grid-cols-[1fr_15rem] border border-border rounded-md">
        <BothTable type="expense" arrayOne={categories} />
        <BothOverView type="expense"  />
      </div>
    </div>
  );
}
