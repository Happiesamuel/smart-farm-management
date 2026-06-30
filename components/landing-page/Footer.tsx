import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
export interface NavLink {
  name: string;
  route: string;
}

const quickLinks: NavLink[] = [
  { name: "Home", route: "/" },
  { name: "About Us", route: "/about" },
  { name: "Features", route: "/features" },
  { name: "How It Works", route: "/how-it-works" },
  { name: "Pricing", route: "/pricing" },
];

const moduleLinks: NavLink[] = [
  { name: "Farms", route: "/onboard" },
  { name: "Fields", route: "/onboard" },
  { name: "Crops", route: "/onboard" },
  { name: "Tasks", route: "/onboard" },
  { name: "Finance", route: "/onboard" },
];

const supportLinks: NavLink[] = [
  { name: "Help Center", route: "/help" },
  { name: "Contact Us", route: "/contact" },
  { name: "Privacy Policy", route: "/privacy" },
  { name: "Terms of Service", route: "/terms" },
];
function FooterLink({ item }: { item: NavLink }) {
  return (
    <li>
      <a
        href={item.route}
        className="text-xs text-gray-500 hover:text-green-500 transition-colors"
      >
        {item.name}
      </a>
    </li>
  );
}

interface FooterColumnProps {
  title: string;
  links: NavLink[];
}

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs font-bold text-gray-900 uppercase tracking-wide">
        {title}
      </p>
      <ul className="flex flex-col gap-2">
        {links.map((link) => (
          <FooterLink key={link.route} item={link} />
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer
      data-aos="fade-up"
      data-aos-delay="100"
      className="w-full bg-white "
    >
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-[1fr_0.5fr_0.5fr_0.5fr_0.5fr] gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-lg">
                🌿
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900 leading-none">
                  SmartFarm
                </p>
                <p className="text-[10px] text-gray-400 leading-none mt-0.5">
                  Management System
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              Smart Farm Management System helps you manage your farms, increase
              productivity and grow your business with confidence.
            </p>
          </div>

          <FooterColumn title="Quick Links" links={quickLinks} />
          <FooterColumn title="Modules" links={moduleLinks} />
          <FooterColumn title="Support" links={supportLinks} />

          {/* Follow Us */}
          <div className="flex flex-col gap-4">
            <p className="text-xs font-bold text-gray-900 uppercase tracking-wide">
              Follow Us
            </p>
            <div className="flex items-center gap-1 sm:gap-3">
              <a
                href="https://facebook.com"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full text-white bg-blue-600 flex items-center justify-center hover:opacity-80 transition-opacity"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://twitter.com"
                aria-label="Twitter"
                className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center hover:opacity-80 transition-opacity"
              >
                <FaXTwitter />
              </a>
              <a
                href="https://linkedin.com"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full bg-blue-700 text-white flex items-center justify-center hover:opacity-80 transition-opacity"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="https://instagram.com"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full text-white bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center hover:opacity-80 transition-opacity"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-100 py-4 pb-6">
        <p className="text-center text-xs text-gray-400">
          © {new Date().getFullYear()} Smart Farm Management System. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
