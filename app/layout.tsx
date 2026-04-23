import type { Metadata } from "next";
import { Geist, Inter, Outfit } from "next/font/google";
import "./globals.css";

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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
