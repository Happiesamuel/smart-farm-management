"use client";
import AuthBottom from "@/components/auth/AuthBottom";
import { PasswordForm } from "@/components/auth/PasswordsForm";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BiArrowBack } from "react-icons/bi";
export default function Page() {
  const user =
    typeof window !== "undefined"
      ? (localStorage.getItem("user")
          ? JSON.parse(localStorage.getItem("user")!)
          : "") || ""
      : null;

  const router = useRouter();
  if (!user) router.push("/owner/login");
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
          <p>New here?</p>
          <Link className="text-primary-green" href={"/owner/sign-up"}>
            Create an account
          </Link>
        </div>
      </div>

      <div className="flex flex-1 overflow-scroll no-scroll  lg:max-h-[91vh] lg:pt-12 relative items-center justify-center  flex-col">
        <div className="flex items-center justify-center flex-col gap-2">
          <div className="bg-primary-green/10 size-16 text-2xl flex items-center justify-center rounded-full">
            🌿
          </div>
          <div className="text-center space-y-1">
            <h3 className="font-semibold text-xl lg:text-3xl text-dark/90">
              Change your password
            </h3>
            <p className="text-sm lg:text-base text-zinc-500 font-normal">
              Set your new password.
            </p>
          </div>
        </div>

        <PasswordForm user={user} />
        <div className="flex lg:hidden items-center pt-2 font-medium text-dark/90 gap-1 text-sm">
          <p>New here?</p>
          <Link className="text-primary-green" href={"/owner/sign-up"}>
            Create an account
          </Link>
        </div>
        <AuthBottom />
      </div>
    </div>
  );
}
