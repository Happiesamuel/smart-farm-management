import React from "react";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { PiFarm } from "react-icons/pi";
import { Button } from "../ui/button";
import Link from "next/link";

export default function CTASection() {
  return (
    <section
      data-aos="fade-up"
      data-aos-delay="100"
      className="w-full px-4 pb-6 bg-white pt-6"
    >
      <div className="max-w-6xl mx-auto">
        <div className="bg-[#135534] rounded-2xl px-8 py-5 flex flex-col md:flex-row items-center justify-evenly gap-6">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="text-4xl text-white flex-shrink-0">
              <PiFarm />
            </div>
            <div>
              <h3 className="text-lg text-center md:text-start font-medium text-white  mb-1">
                Ready to Take Your Farm to the Next Level?
              </h3>
              <p className="text-xs text-white/70 text-center md:text-start">
                Join thousands of farmers who are already growing smarter.
              </p>
            </div>
          </div>

          <Button className="bg-white  px-6 h-9 sm:w-fit cursor-pointer font-medium text-dark rounded-sm">
            <Link href={"/onboard"} className="w-full">
              Get Started Free
            </Link>
            <MdOutlineArrowRightAlt />
          </Button>
        </div>
      </div>
    </section>
  );
}
