import Image from "next/image";
import { Button } from "../ui/button";

function AuthBottom() {
  return (
    <div className="w-full relative flex items-center flex-col gap-4 mt-3">
      <div className="relative w-full flex items-center justify-center">
        <p
          className="after before:bg-border after:bg-border before:w-[35%] 
        after:w-[35%] md:before:w-[35%] md:after:w-[35%] after:top-[50%]
         before:top-[50%] before:h-[1px] after:h-[1px] before:absolute after:absolute after:ml-[4px]
         before:left-[10.5%] md:before:left-[13.5%] text-zinc-500 text-sm"
        >
          or
        </p>
      </div>
      <Button
        className={`flex gap-2 items-center py-5! bg-transparent  text-dark/90 border border-border w-[98%] lg:w-[80%] font-medium`}
      >
        <Image
          width={20}
          height={20}
          src={`https://authjs.dev/img/providers/google.svg`}
          alt="google image"
        />
        <p className="">Sign in with Google</p>
      </Button>
      <p className="text-zinc-500 text-center pb-5 text-sm">
        By continuing you agree to our{" "}
        <span className="text-primary-green font-medium">Terms of Use</span> and{" "}
        <span className="text-primary-green font-medium">Privacy Policy</span>
      </p>
    </div>
  );
}

export default AuthBottom;
