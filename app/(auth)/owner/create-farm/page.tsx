"use client";
import CreateFarmForm from "@/components/auth/CreateFarmForm";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BiArrowBack } from "react-icons/bi";
import Cookies from "js-cookie";
export default function Page() {
  const guestId = Cookies.get("guestId");
  const id =
    guestId ||
    (typeof window !== "undefined" ? localStorage.getItem("manager-id") : null);
  const workspaceId =
    typeof window !== "undefined"
      ? localStorage.getItem("workspaceId") || ""
      : "";
  const email =
    typeof window !== "undefined"
      ? localStorage.getItem("manager-email") || ""
      : "";
  const password =
    typeof window !== "undefined"
      ? localStorage.getItem("manager-password") || ""
      : "";
  const activeWorkspace =
    typeof window !== "undefined"
      ? sessionStorage.getItem("activeWorkspace") || ""
      : "";
  const router = useRouter();

  if (!guestId) {
    if (!id || !workspaceId || !email || !password)
      router.push("/owner/sign-up");
  }

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

      <div className="flex flex-1 overflow-scroll no-scroll   lg:max-h-[91vh] lg:pt-16 relative items-center justify-start  flex-col">
        <div className="flex items-center justify-center flex-col gap-2">
          <div className="bg-primary-green/10 size-16 text-2xl flex items-center justify-center rounded-full">
            🌿
          </div>
          <div className="text-center space-y-1">
            <h3 className="font-semibold text-xl lg:text-3xl text-dark/90">
              Create your first farm
            </h3>
            <p className="text-sm lg:text-base text-zinc-500 font-normal">
              Create and manage your farm
            </p>
          </div>
        </div>

        <CreateFarmForm
          workspaceId={workspaceId}
          id={id!}
          guestId={guestId || null}
          email={email}
          password={password}
          activeWorkspace={activeWorkspace}
        />
      </div>
    </div>
  );
}
