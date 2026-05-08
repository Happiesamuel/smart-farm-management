import AuthImage from "@/components/auth/AuthImage";
import React from "react";
import "../globals.css";

import { Geist, Inter, Outfit } from "next/font/google";
import NextTopLoader from "nextjs-toploader";

const geistSans = Geist({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  variable: "--font-geist",
});

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  variable: "--font-outfit",
});
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  variable: "--font-inter",
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.className} ${inter.variable} ${outfit.className} h-full antialiased`}
    >
      <body
        className={`  bg-background max-w-480 mx-auto my-0 antialiased  flex flex-col `}
      >
        <NextTopLoader color="#66bb6a" height={4} showSpinner={false} />
        <div className="grid grid-cols-1 lg:grid-cols-[0.7fr_1fr]">
          <AuthImage />
          <div className="mx-auto max-w-[90%] w-full">
            {/* <AuthHeader /> */}
            {children}
          </div>
          {/* <Toaster position="top-center" /> */}
        </div>
      </body>
    </html>
  );
}
