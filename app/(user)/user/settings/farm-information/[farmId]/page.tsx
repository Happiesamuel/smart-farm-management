import FarmInformationForm from "@/components/manager-settings/farm-information/FarmInformationForm";

export default function page() {
  return (
    <div className="pt-18 px-2 sm:px-4 pb-8">
      <div className="pb-5 flex gap-3 sm:flex-row flex-col md:items-center justify-between">
        <div className=" space-y-1">
          <div className="flex items-center gap-3">
            <h6 className="text-dark font-semibold  text-2xl">
              Green Valley Farm
            </h6>
            <p
              className={`rounded-full bg-green-50 text-green-600 p-0.5 px-2 text-xs border-green-200 border`}
            >
              Active
            </p>
          </div>
          <p className="text-dark/80 text-sm">
            Update your farm details and preferences
          </p>
        </div>
      </div>
      <FarmInformationForm />
    </div>
  );
}
