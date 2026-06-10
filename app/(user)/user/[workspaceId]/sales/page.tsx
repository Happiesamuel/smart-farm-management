import BothBoxes from "@/components/salesExpense/BothBoxes";
import BothHeader from "@/components/salesExpense/BothHeader";
import BothOverView from "@/components/salesExpense/BothOverView";
import BothTable from "@/components/salesExpense/BothTable";


export default function page() {


  const crops = [
    "All Crops",
    "Maize",
    "Rice",
    "Yam",
    "Tomato",
    "Pepper",
    "Cassava",
    "Beans",
    "Wheat",
    "Sorghum",
    "Soyabean",
  ];


  return (
    <div className="pt-18 px-2 sm:px-4 pb-8">
      <BothHeader type="sales" />
      <BothBoxes type="sales" />

      <div className="grid xl:h-[600px] mt-4 grid-cols-1 xl:grid-cols-[1fr_15rem] border border-border rounded-md">
        <BothTable type="sale" arrayOne={crops} />
        <BothOverView type="sale" />
      </div>
    </div>
  );
}
