"use client";
import { FormLoader, NoResult } from "@/components/loader/GeneralLoader";
import ProfileInformation from "@/components/worker/settings/ProfileInformation";
import WorkersProfilePhoto from "@/components/worker/settings/WorkersPhoto";
import { useApp } from "@/stores/useAppStore";
import ProfileForm from "./ProfileForm";
import SetPasswordForm from "./SetPasswordForm";
import { Button } from "@/components/ui/button";
import { useLogout } from "@/hooks/auth/useLogout";
import ButtonLoader from "@/components/layout/ButtonLoader";
import { MdLogout } from "react-icons/md";

export default function Profile() {
  const { user, ready } = useApp();
  const { logoutUser, status } = useLogout();
  if (!ready)
    return (
      <div className="h-[92vh]">
        <FormLoader>Loading app...</FormLoader>
      </div>
    );

  if (!user)
    return (
      <div className="h-[92vh]">
        <NoResult>Unauthorised</NoResult>
      </div>
    );
  return (
    <div className="pt-18 px-2 sm:px-4 pb-8">
      <div className="pb-5 flex gap-3 sm:flex-row flex-col md:items-center justify-between">
        <div className=" space-y-1">
          <h6 className="text-dark font-semibold  text-2xl">Settings</h6>
          <p className="text-dark/80 text-sm">
            Manage your account and preferences.
          </p>
        </div>
        <Button
          onClick={() => logoutUser()}
          disabled={status === "pending"}
          className="bg-red-600 w-[48%] sm:w-fit font-medium cursor-pointer text-white rounded-sm"
        >
          {status === "pending" ? (
            <>
              <ButtonLoader />
              Logging out...
            </>
          ) : (
            <div className="flex items-center gap-2">
              <MdLogout /> Log out
            </div>
          )}
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_0.5fr] gap-4">
        <ProfileInformation user={user} />
        <WorkersProfilePhoto user={user} />
      </div>
      {user.password === "hs_password" ? (
        <SetPasswordForm user={user} />
      ) : (
        <ProfileForm user={user} />
      )}
    </div>
  );
}
