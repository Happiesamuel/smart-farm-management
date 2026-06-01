import { EmailForm } from "@/components/auth/EmailForm";
import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";
import { MdEngineering } from "react-icons/md";
export const metadata = {
  title: "Enter your Email",
};
export default function Page() {
  return (
    <div className="flex flex-col h-full py-4 gap-2">
      <div className="flex items-center justify-between">
        <Link
          href={"/worker/login"}
          className="flex text-dark/90 text-xl lg:text-sm items-center gap-2"
        >
          <BiArrowBack />
          <p className="hidden lg:block">Back to login</p>
        </Link>
      </div>

      <div className="flex flex-1 overflow-scroll no-scroll  lg:max-h-[91vh] pt-20 lg:pt-2 relative items-center justify-center  flex-col">
        <div className="flex items-center justify-center flex-col gap-2">
          <div className="bg-[#f0782d]/10 size-16 flex items-center justify-center rounded-full">
            <MdEngineering className="text-[#f0782d] text-3xl" />
          </div>
          <div className="text-center space-y-1">
            <h3 className="font-semibold text-xl lg:text-3xl text-dark/90">
              Enter your email
            </h3>
            <p className="text-sm lg:text-base text-zinc-500 font-normal">
              Enter your email for OTP confirmation
            </p>
          </div>
        </div>

        <EmailForm type="worker" />
      </div>
    </div>
  );
}
