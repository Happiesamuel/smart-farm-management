"use client";
import Logo from "../../public/logo.png";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Typewriter } from "react-simple-typewriter";
export default function AuthHeader() {
  const pathname = usePathname();
  const name = pathname.slice(1);
  return (
    <div className="flex items-center flex-col gap-2">
      <div className="aspect-video md:hidden rounded-full border-2 border-light-green   relative size-14">
        <Image
          src={Logo}
          className="rounded-full  p-1 object-center object-cover "
          fill
          placeholder="blur"
          alt=";"
        />
      </div>
      <div className="md:space-y-2 text-center space-y-1">
        <h1 className="text-sm md:text-base font-semibold font-inter text-dark  text-center">
          <Typewriter
            words={[
              "Smart Farm Management System",
              "Track crops, sales, and inventory",
              "Monitor profit and farm performance",
              "Assign tasks and manage workers",
              "Data-driven farming for better productivity",
              "Transforming agriculture with technology",
            ]}
            loop={true}
            cursor
            cursorStyle="|"
            cursorColor="#2e7d32"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={2000}
          />
        </h1>
        <h6 className="font-semibold text-lg md:text-3xl text-dark">
          {name === "login" ? "Log in to your account" : "Create an account"}
        </h6>
      </div>
    </div>
  );
}
