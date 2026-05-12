import PersonalInformation from "@/components/manager-settings/profile/PersonalInformation";
import ProfileForm from "@/components/manager-settings/profile/ProfileForm";
import ProfilePhoto from "@/components/manager-settings/profile/ProfilePhoto";
import React from "react";

export default function page() {
  return (
    <div className="pt-18 px-2 sm:px-4 pb-8">
      <div className="pb-5 flex gap-3 sm:flex-row flex-col md:items-center justify-between">
        <div className=" space-y-1">
          <h6 className="text-dark font-semibold  text-2xl">Profile</h6>
          <p className="text-dark/80 text-sm">
            Manage your personal information and password.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[1fr_0.65fr] md:grid-cols-[1fr_0.5fr] gap-2">
        <PersonalInformation />
        <ProfilePhoto />
      </div>

      <ProfileForm />
    </div>
  );
}
