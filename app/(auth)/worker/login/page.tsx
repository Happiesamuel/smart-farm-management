import { WorkerLoginFom } from "@/components/auth/WorkerLoginForm";
import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";
import { MdEngineering } from "react-icons/md";

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

        <div className="hidden lg:flex items-center font-medium text-dark/90 gap-1 text-sm"></div>
      </div>

      <div className="flex flex-1 overflow-scroll no-scroll  lg:max-h-[91vh] lg:pt-6 relative items-center justify-center  flex-col">
        <div className="flex items-center justify-center flex-col gap-2">
          <div className="bg-[#f0782d]/10 size-16 flex items-center justify-center rounded-full">
            <MdEngineering className="text-[#f0782d] text-3xl" />
          </div>
          <div className="text-center space-y-1">
            <h3 className="font-semibold text-xl lg:text-3xl text-dark/90">
              Welcome back
            </h3>
            <p className="text-sm lg:text-base text-zinc-500 font-normal">
              Sign in to your Worker account
            </p>
          </div>
        </div>

        <WorkerLoginFom />
      </div>
    </div>
  );
}
