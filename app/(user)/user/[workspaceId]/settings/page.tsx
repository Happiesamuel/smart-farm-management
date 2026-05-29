import SettingBoxes from "@/components/manager-settings/SettingBoxes";
export const metadata = {
  title: "Settings",
};
export default function Page() {
  return (
    <div className="pt-18 px-2 sm:px-4 pb-8">
      <div className="pb-5 flex gap-3 sm:flex-row flex-col md:items-center justify-between">
        <div className=" space-y-1">
          <h6 className="text-dark font-semibold  text-2xl">Settings</h6>
          <p className="text-dark/80 text-sm">
            Manage your account preference and organisation settings
          </p>
        </div>
      </div>
      <SettingBoxes />
    </div>
  );
}
