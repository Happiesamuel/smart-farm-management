"use client";

import AboutSecction from "@/components/landing-page/AboutSecction";
import ContactSection from "@/components/landing-page/ContactSection";
import CTASection from "@/components/landing-page/CTASection";
import FaqSection from "@/components/landing-page/FaqSection";
import Features from "@/components/landing-page/Features";
import Footer from "@/components/landing-page/Footer";
import HeroSection from "@/components/landing-page/HeroSection";
import HowItWorks from "@/components/landing-page/HowItWorks";
import TestimonialsSection from "@/components/landing-page/TestimonialsSection";
import WhyChooseSection from "@/components/landing-page/WhyChooseSection";
import Navbar from "@/components/layout/Navbar";
import LayoutApp from "@/LayoutApp";

export default function Page() {
  return (
    <LayoutApp>
      <div className=" max-w-480 mx-auto my-0 bg-white/95">
        <Navbar />
        <HeroSection />
        <AboutSecction />
        <Features />
        <HowItWorks />
        <section id="testimonials" className="w-full pt-20 px-4 bg-white ">
          <div className="max-w-6xl  mx-auto grid grid-cols-1 lg:grid-cols-[0.8fr_1fr] lg:divide-x  gap-12 items-start">
            <WhyChooseSection />
            <TestimonialsSection />
          </div>
        </section>
        <section
          data-aos="fade-up"
          data-aos-delay="500"
          id="faq"
          className="w-full pt-16 px-4 bg-white"
        >
          <div className="max-w-6xl mx-auto">
            <div className="bg-[#fbfbfb] rounded-lg border border-border shadow-sm p-5 md:p-8 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 items-start">
              <FaqSection />
              <ContactSection />
            </div>
          </div>
        </section>
        <CTASection />
        <Footer />
      </div>
    </LayoutApp>
  );
}
