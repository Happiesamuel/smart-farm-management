import FarmIdHeader from "@/components/farm/FarmIdHeader";
import FarmTab from "@/components/farm/FarmTab";

export default function page() {
  return (
    <div className="pt-18 px-2 sm:px-4">
      <FarmIdHeader />
      <FarmTab />
    </div>
  );
}
