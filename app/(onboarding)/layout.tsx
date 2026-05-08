import { Geist, Inter, Outfit } from "next/font/google";
import "../globals.css";
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
      <body className="min-h-sceen flex flex-col">
        <NextTopLoader color="#66bb6a" height={4} showSpinner={false} />
        <div className="flex max-w-480 mx-auto my-0">{children}</div>
      </body>
    </html>
  );
}
