import FarmList from "@/components/manager-settings/farm-information/FarmList";

export default function page() {
  return (
    <div className="pt-18 px-2 sm:px-4 pb-8">
      <div className="pb-5 flex gap-3 sm:flex-row flex-col md:items-center justify-between">
        <div className=" space-y-1">
          <h6 className="text-dark font-semibold  text-2xl">
            Farm Information
          </h6>
          <p className="text-dark/80 text-sm">
            Update your farm details and preferences
          </p>
        </div>
      </div>
      <FarmList />
    </div>
  );
}
