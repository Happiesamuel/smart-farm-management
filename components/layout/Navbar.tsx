import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { RiMenu3Fill } from "react-icons/ri";
import { useNav } from "@/context/NavbarContext";
const NAV_LINKS = [
  { name: "Home", route: "#home" },
  { name: "About", route: "#about" },
  { name: "Features", route: "#features" },
  { name: "How It Works", route: "#howitworks" },
  { name: "Testimonials", route: "#testimonials" },
  { name: "FAQ", route: "#faq" },
  { name: "Contact", route: "#contact" },
];
export default function Navbar() {
  const { activeSection } = useNav();
  return (
    <nav
      data-aos="fade-down"
      data-aos-delay="100"
      className="fixed max-w-480 mx-auto top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm  "
    >
      <div className=" mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl btn-primary flex items-center justify-center text-white text-lg">
              🌿
            </div>
            <div>
              <div className="font-bold text-gray-900 leading-tight text-sm">
                SmartFarm
              </div>
              <div className="text-xs text-gray-500 leading-tight">
                Management System
              </div>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.route}
                className={`${activeSection === link.route.slice(1) && "text-primary-green scale-[1.25]"} transition-all duration-500 text-sm font-medium text-gray-600 hover:text-green-700 `}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="hidden lg:flex items-center gap-2">
            <Button className="bg-transparent w-[48%] text-xs px-6 h-9 sm:w-fit cursor-pointer text-dark border border-zinc-300 rounded-sm">
              Login
            </Button>
            <Button className="bg-primary-green w-[48%] text-xs px-6 h-9 sm:w-fit cursor-pointer text-white rounded-sm">
              Get Started
            </Button>
          </div>

          <div className="lg:hidden">
            <MobileNav />
          </div>
        </div>
      </div>
    </nav>
  );
}

function MobileNav() {
  const { activeSection } = useNav();
  return (
    <Sheet>
      <SheetTrigger className="flex lg:hidden items-center  justify-center size-8 rounded-full bg-primary-green text-white text-base">
        <RiMenu3Fill />
      </SheetTrigger>
      <SheetTitle />
      <SheetContent className="bg-[#f3f3f3] lg:hidden z-100 data-[side=right]:w-[250px]">
        <div className="mt-16 px-2">
          <div className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <SheetClose
                asChild
                key={link.name}
                className={`${activeSection === link.route.slice(1) && "bg-white text-primary-green rounded-lg "} px-2  py-2 text-sm font-medium text-gray-600 hover:text-green-700 transition-colors`}
              >
                <Link href={link.route}>{link.name}</Link>
              </SheetClose>
            ))}
          </div>
          <div className="flex items-center flex-col  gap-2 mt-4">
            <Button className="bg-transparent w-full text-xs px-6 h-9  cursor-pointer text-dark border border-zinc-300 rounded-sm">
              Login
            </Button>
            <Button className="bg-primary-green w-full text-xs px-6 h-9  cursor-pointer text-white rounded-sm">
              Get Started
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
