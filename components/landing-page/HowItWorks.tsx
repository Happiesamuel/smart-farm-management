import { ReactNode } from "react";
import { BiTask } from "react-icons/bi";
import { FaChartLine, FaUserPlus } from "react-icons/fa6";
import { FiArrowRight } from "react-icons/fi";
import { PiFarm } from "react-icons/pi";

export interface Step {
  number: number;
  label: string;
  title: string;
  description: string;
  icon: ReactNode;
  iconBg: string;
}
const steps = [
  {
    number: 1,
    label: "Step 1",
    title: "Create Account",
    description: "Sign up and set up your farm workspace.",
    icon: <FaUserPlus />,
    iconBg: "bg-green-50",
  },
  {
    number: 2,
    label: "Step 2",
    title: "Add Farms & Fields",
    description: "Add your farms, fields and crop details.",
    icon: <PiFarm />,
    iconBg: "bg-green-50",
  },
  {
    number: 3,
    label: "Step 3",
    title: "Manage & Track",
    description: "Manage tasks, track crops and monitor activities.",
    icon: <BiTask />,
    iconBg: "bg-green-50",
  },
  {
    number: 4,
    label: "Step 4",
    title: "Analyze & Grow",
    description: "Analyze reports and grow your productivity.",
    icon: <FaChartLine />,
    iconBg: "bg-green-50",
  },
];

export default function HowItWorks() {
  return (
    <section id="howitworks" className="w-full py-2 px-4 bg-white pt-16">
      <div className="max-w-6xl mx-auto bg-[#fbfbfb] py-4 border border-border/80 rounded-xl">
        <div className="text-center mb-4">
          <p className="text-primary-green text-[13px] pb-2 font-semibold">
            HOW IT WORKS
          </p>
          <h2 className="text-xl md:text-2xl lg:text-3xl  font-semibold text-dark">
            Simple Steps to Smarter Farming
          </h2>
        </div>
        <div className="lg:flex flex-row items-center justify-center grid grid-cols-1  sm:grid-cols-2  gap-5 lg:gap-2 px-3  ">
          {steps.map((step, index) => (
            <StepCard
              key={step.number}
              step={step}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function StepCard({ step, isLast }: { step: Step; isLast: boolean }) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex flex-col gap-3 bg-white w-[200px] rounded-2xl border border-gray-100 shadow-sm p-5 flex-1 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
        <div
          className={`text-2xl px-3 text-primary-green bg-[#f2f8f3] justify-center rounded-xl flex items-center p-2 `}
        >
          {step.icon}
        </div>
        <div className="text-start">
          <p className="text-[10px] font-semibold text-primary-green tracking-wide uppercase mb-1">
            {step.label}
          </p>
          <h3 className="text-[13px] font-bold text-gray-900 mb-1">
            {step.title}
          </h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            {step.description}
          </p>
        </div>
      </div>
      {!isLast && (
        <div className="hidden lg:flex items-center self-center flex-shrink-0">
          <FiArrowRight className="text-lg mr-2 xl:mr-5 font-bold text-primary-green" />
        </div>
      )}
    </div>
  );
}
