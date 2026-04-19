"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import AuthImg from "../../public/auth.png";

export default function AuthImage() {
  const pathname = usePathname();
  const slug = pathname.slice(1);
  return (
    <div className="h-full flex-1 fixed items-center  justify-center hidden lg:flex">
      <div className="relative aspect-square size-[98%] flex items-center justify-center ">
        <Image
          src={AuthImg}
          alt="img"
          placeholder="blur"
          fill
          className="object-center   object-cover rounded-2xl"
          quality={100}
        />
        <div className="absolute bottom-[5%] rounded-lg bg-black/10 backdrop-blur-sm p-4 w-[92%]">
          <h3 className="text-white text-2xl font-semibold">
            Welcome to Smart Farm Management System
          </h3>
          <p className="text-base text-zinc-300">
            Manage your farm operations efficiently.{" "}
            {slug === "login" ? "Log in" : "Sign up"} to continue.
          </p>
        </div>
      </div>
    </div>
  );
}
