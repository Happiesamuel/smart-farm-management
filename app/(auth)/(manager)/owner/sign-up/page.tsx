import AuthBottom from "@/components/auth/AuthBottom";
import { OwnerSignupForm } from "@/components/auth/OwnerSignupForm";
import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";
import { PiPottedPlantBold } from "react-icons/pi";

export default function page() {
  return (
    <div className="flex flex-col h-full py-4 gap-2">
      <div className="flex items-center justify-between">
        <Link
          href={"/owner/login"}
          className="flex text-dark/90 text-xl lg:text-sm items-center gap-2"
        >
          <BiArrowBack />
          <p className="hidden lg:block">Back to login</p>
        </Link>

        <div className="hidden lg:flex items-center font-medium text-dark/90 gap-1 text-sm">
          <p>Already have an account?</p>
          <Link className="text-primary-green" href={"/owner/login"}>
            Sign in
          </Link>
        </div>
      </div>

      <div className="flex flex-1 overflow-scroll no-scroll  lg:max-h-[91vh] lg:pt-12 relative items-center justify-center  flex-col">
        <div className="flex items-center justify-center flex-col gap-2">
          <div className="bg-primary-green/10 size-16 flex items-center justify-center rounded-full">
            <PiPottedPlantBold className="text-primary-green text-3xl" />
          </div>
          <div className="text-center space-y-1">
            <h3 className="font-semibold text-xl lg:text-3xl text-dark/90">
              Create your account
            </h3>
            <p className="text-sm lg:text-base text-zinc-500 font-normal">
              Join S.M.F.S as a Farm Owner
            </p>
          </div>
        </div>

        <OwnerSignupForm />
        <div className="flex lg:hidden items-center pt-2 font-medium text-dark/90 gap-1 text-sm">
          <p>Already have an account?</p>
          <Link className="text-primary-green" href={"/owner/signup"}>
            Sign in
          </Link>
        </div>
        <AuthBottom />
      </div>
    </div>
  );
}
