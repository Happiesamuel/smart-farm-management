import Sidebar from "@/components/layout/Sidebar";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div lang="en">
      <div className="flex max-w-480 mx-auto my-0">
        <div className=" flex flex-[0.2] h-screen"></div>
        <Sidebar />

        <main className="min-h-full flex-1 bg-red-500 h-[200vh] flex flex-col">
          {children}
        </main>
      </div>
    </div>
  );
}
