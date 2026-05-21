import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    id: "faq1",
    question: "What is Smart Farm Management System?",
    answer:
      "Smart Farm is an all-in-one platform that helps farmers manage their fields, crops, tasks, finances, and teams from one place.",
  },
  {
    id: "faq2",
    question: "Can I manage multiple farms?",
    answer:
      "Yes! Our Multi-Workspace feature lets you manage multiple farms and teams with completely isolated workspaces.",
  },
  {
    id: "faq3",
    question: "Is my data safe and secure?",
    answer:
      "Absolutely. All your data is encrypted and stored securely in our database. We take data privacy very seriously.",
  },
  {
    id: "faq4",
    question: "Can I use it on mobile devices?",
    answer:
      "Yes, Smart Farm is fully responsive and works seamlessly on all devices including smartphones and tablets.",
  },
  {
    id: "faq5",
    question: "Is there a free trial?",
    answer:
      "Yes, we offer a free trial so you can explore all features before committing to a plan.",
  },
];

export default function FaqSection() {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <p className="text-primary-green text-[13px] pb-2 font-semibold">
          Frequently Asked Questions
        </p>
        <h2 className="text-2xl md:text-3xl font-semibold text-dark mb-4">
          Have Questions? We Have Answers!
        </h2>
      </div>

      <Accordion
        type="single"
        collapsible
        defaultValue="faq1"
        className=" gap-2"
      >
        {faqs.map((item) => (
          <AccordionItem
            key={item.id}
            value={item.id}
            className="bg-white border-border border rounded-lg px-2"
          >
            <AccordionTrigger className="font-medium text-dark/90">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-zinc-500 font-normal h-fit">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
