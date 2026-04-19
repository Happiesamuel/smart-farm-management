import AuthHeader from "@/components/auth/AuthHeader";
import AuthImage from "@/components/auth/AuthImage";
import Image from "next/image";
import React from "react";
import Logo from "../../public/logo.png";
import "../globals.css";
import NextTopLoader from "nextjs-toploader";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`  bg-background  antialiased  flex flex-col mx-auto my-0 max-w-[144rem]`}
      >
        <NextTopLoader color="#66bb6a" height={4} showSpinner={false} />
        <div className="flex min-h-screen py- ">
          <AuthImage />
          <div className="hidden lg:block w-[50%]" />
          <main className="w-full lg:w-[50%] flex flex-col relative items-center py-4 justify-center ">
            <div className="aspect-video hidden md:block rounded-full top-2 border-2 border-light-green md:right-3  absolute size-16">
              <Image
                src={Logo}
                className="rounded-full  p-1 object-center object-cover "
                fill
                alt=";"
              />
            </div>
            <div className="aspect-video hidden md:block rounded-full bottom-2 border-2 border-light-green right-3  absolute size-16">
              <Image
                src={Logo}
                className="rounded-full  p-1 object-center object-cover "
                fill
                alt=";"
              />
            </div>
            <AuthHeader />
            {children}
          </main>
          {/* <Toaster position="top-center" /> */}
        </div>
      </body>
    </html>
  );
}
