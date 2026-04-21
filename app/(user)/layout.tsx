import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import NextTopLoader from "nextjs-toploader";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div lang="en">
      <NextTopLoader color="#66bb6a" height={4} showSpinner={false} />
      <div className="flex max-w-480 mx-auto my-0">
        <div className="grid grid-cols-1 lg:grid-cols-[12.5rem_1fr] xl:grid-cols-[14rem_1fr] w-full">
          <div className="hidden w-full  lg:block">
            <Sidebar />
          </div>

          <div className="flex bg-zinc-50  min-h-screen h-full pb-10 flex-col relative min-w-0">
            <Header />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
