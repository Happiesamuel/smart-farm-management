import type { Metadata } from "next";
import { Geist, Inter, Outfit } from "next/font/google";
import "../globals.css";
import LayoutApp from "@/LayoutApp";
import NextTopLoader from "nextjs-toploader";

import AuthLayoutImage from "@/components/auth/AuthLayoutImage";
import { Toaster } from "sonner";
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
export const metadata: Metadata = {
  title: {
    default: "Smart Farm Management System",
    template: "%s | S.F.M.S",
  },
  description:
    "A smart farm management system for monitoring crops, managing farm operations, tracking finances, and improving agricultural productivity.",
  keywords: [
    "Smart Farm",
    "Agriculture",
    "Farm Management System",
    "Crop Monitoring",
    "AgriTech",
    "Nigeria Farming",
  ],
};

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
      <body className="min-h-full flex flex-col">
        <NextTopLoader color="#66bb6a" height={4} showSpinner={false} />
        <LayoutApp>
          <div className="grid grid-cols-1 lg:grid-cols-[0.4fr_1fr] bg-white/95">
            <AuthLayoutImage />
            {children}
          </div>
        </LayoutApp>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
