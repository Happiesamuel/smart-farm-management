import ProfileForm from "@/components/manager-settings/profile/ProfileForm";
import ProfileInformation from "@/components/worker/settings/ProfileInformation";
import WorkersProfilePhoto from "@/components/worker/settings/WorkersPhoto";
import React from "react";

export default function page() {
  return (
    <div className="pt-18 px-2 sm:px-4 pb-8">
      <div className="pb-5 flex gap-3 sm:flex-row flex-col md:items-center justify-between">
        <div className=" space-y-1">
          <h6 className="text-dark font-semibold  text-2xl">Settings</h6>
          <p className="text-dark/80 text-sm">
            Manage your account and preferences.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_0.5fr] gap-4">
        <ProfileInformation />
        <WorkersProfilePhoto />
      </div>
      <ProfileForm />
    </div>
  );
}
