import AuthBottom from "@/components/auth/AuthBottom";
import { OwnerLoginFom } from "@/components/auth/OwnerLoginFom";
import Link from "next/link";
import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { PiPottedPlantBold } from "react-icons/pi";

export default function page() {
  return (
    <div className="flex flex-col h-full py-4 gap-2">
      <div className="flex items-center justify-between">
        <Link
          href={"/onboard"}
          className="flex text-dark/90 text-xl lg:text-sm items-center gap-2"
        >
          <BiArrowBack />
          <p className="hidden lg:block">Back to role selection</p>
        </Link>

        <div className="hidden lg:flex items-center font-medium text-dark/90 gap-1 text-sm">
          <p>New here?</p>
          <Link className="text-primary-green" href={"/owner/signup"}>
            Create an account
          </Link>
        </div>
      </div>

      <div className="flex flex-1 relative items-center justify-center  flex-col">
        <div className="flex items-center justify-center flex-col gap-2">
          <div className="bg-primary-green/10 size-16 flex items-center justify-center rounded-full">
            <PiPottedPlantBold className="text-primary-green text-3xl" />
          </div>
          <div className="text-center space-y-1">
            <h3 className="font-semibold text-xl lg:text-3xl text-dark/90">
              Welcome back
            </h3>
            <p className="text-sm lg:text-base text-zinc-500 font-normal">
              Sign in to your Farm Owner account
            </p>
          </div>
        </div>

        <OwnerLoginFom />
        <AuthBottom />
      </div>
    </div>
  );
}
