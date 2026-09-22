import type { Metadata } from "next";
import { Geist, Inter, Outfit } from "next/font/google";
import "./globals.css";
import NavbarProvider from "@/context/NavbarContext";
import "aos/dist/aos.css";
import AOSProvider from "@/context/AOSProvider";
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
  verification: {
    google: "OxObSxOdniZ-e23Pd2rwUc9HhgO-Zh-GCerThDg6SyI",
  },
  metadataBase: new URL("https://smart-farm-managementt.vercel.app"),
  openGraph: {
    title: "Smart Farm Management System",
    description:
      "Monitor crops, manage farm operations, track finances, and improve agricultural productivity — all in one platform.",
    url: "https://smart-farm-managementt.vercel.app",
    siteName: "Smart Farm Management System",
    images: [
      {
        url: "/farm-2.jpg",
        width: 1200,
        height: 630,
        alt: "Smart Farm Management System - Farm Overview",
      },
      {
        url: "/farm-3.jpg",
        width: 1200,
        height: 630,
        alt: "Smart Farm Management System - Dashboard",
      },
      {
        url: "/farm-4.jpg",
        width: 1200,
        height: 630,
        alt: "Smart Farm Management System - Crop Monitoring",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Smart Farm Management System",
    description:
      "Monitor crops, manage farm operations, track finances, and improve agricultural productivity.",
    images: ["/farm-1.jpg"],
  },
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
        <NavbarProvider>
          <AOSProvider>{children}</AOSProvider>
        </NavbarProvider>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
