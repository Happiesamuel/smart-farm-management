import { LiaUserFriendsSolid } from "react-icons/lia";
import { LuCurrency, LuTimer } from "react-icons/lu";
import { MdOutlineSupportAgent } from "react-icons/md";

const benefits = [
  {
    id: "user-friendly",
    title: "User Friendly",
    description: "Easy to use interface",
    icon: <LiaUserFriendsSolid />,
  },
  {
    id: "affordable",
    title: "Affordable",
    description: "Best solution for every farmer",
    icon: <LuCurrency />,
  },
  {
    id: "always-updated",
    title: "Always Updated",
    description: "Regular updates and new features",
    icon: <LuTimer />,
  },
  {
    id: "great-support",
    title: "Great Support",
    description: "We're here to help you",
    icon: <MdOutlineSupportAgent />,
  },
];

export default function WhyChooseSection() {
  return (
    <div
      data-aos="fade-up"
      data-aos-delay="500"
      className="flex flex-col gap-8"
    >
      {/* Label */}
      <div>
        <p className="text-primary-green text-[13px] pb-2 font-semibold">
          WHY CHOOSE US
        </p>
        <h2 className="text-2xl md:text-3xl font-semibold text-dark mb-4">
          Built for Farmers, Focused on Your Success
        </h2>
        <p className="text-sm text-gray-500 leading-relaxed max-w-sm">
          We provide a complete solution to help you save time, reduce costs and
          increase productivity.
        </p>
      </div>

      {/* Benefits row */}
      {/* <div className="flex flex-wrap gap-6"> */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:flex flex-wrap ">
        {benefits.map((benefit) => (
          <div
            data-aos="fade-up"
            data-aos-delay="500"
            className="flex flex-col items-center text-center gap-2 w-24"
            key={benefit.id}
          >
            <div className="w-12 h-12 rounded-xl bg-[#f2f8f3] text-primary-green flex items-center justify-center text-2xl">
              {benefit.icon}
            </div>
            <p className="text-xs font-bold text-gray-900">{benefit.title}</p>
            <p className="text-[11px] text-gray-500 leading-snug">
              {benefit.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
