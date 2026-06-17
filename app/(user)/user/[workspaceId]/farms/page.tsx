import FarmAverage from "@/components/farm/FarmAverage";
import FarmHeader from "@/components/farm/FarmHeader";
import FarmList from "@/components/farm/FarmList";
export const metadata = {
  title: "Farms",
};
export default function page() {
  return (
    <div className="pt-18 px-2 sm:px-4">
      <FarmHeader />
      <FarmAverage />

      <FarmList />
    </div>
  );
}
