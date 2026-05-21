import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { GrLocation } from "react-icons/gr";
import {
  MdOutlineArrowRightAlt,
  MdOutlineLocalPhone,
  MdOutlineMailOutline,
} from "react-icons/md";
import { Form } from "../ui/form";
import z from "zod";
import { contactFormSchema } from "@/lib/schemas";
import ContactInput, { ContactText } from "./ContactField";
import { Button } from "../ui/button";

export default function ContactSection() {
  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
  });

  async function onSubmit(values: z.infer<typeof contactFormSchema>) {}

  return (
    <section id="contact" className="flex flex-col gap-6">
      <div>
        <p className="text-primary-green text-[13px] pb-2 font-semibold">
          Contact Us
        </p>
        <h2 className="text-2xl md:text-3xl font-semibold text-dark mb-4">
          Get in Touch
        </h2>
        <p className="text-xs text-gray-500">
          Have any questions or need support? We&apos;re here to help!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[0.65fr_1fr] gap-6">
        <div className="flex flex-col gap-4 text-sm">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg text-primary-green bg-green-50 flex items-center justify-center flex-shrink-0 text-base">
              <MdOutlineMailOutline />
            </div>
            <div>
              <p className="font-semibold text-gray-800 text-xs">Email</p>
              <p className="text-gray-500 text-xs">support@smartfarm.com</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg text-primary-green bg-green-50 flex items-center justify-center flex-shrink-0 text-base">
              <MdOutlineLocalPhone />
            </div>
            <div>
              <p className="font-semibold text-gray-800 text-xs">Phone</p>
              <p className="text-gray-500 text-xs">+94 70 123 4567</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg text-primary-green bg-green-50 flex items-center justify-center flex-shrink-0 text-base">
              <GrLocation />
            </div>
            <div>
              <p className="font-semibold text-gray-800 text-xs">Address</p>
              <p className="text-gray-500 text-xs">
                123 Farm Road, Green City,
                <br />
                Sri Lanka
              </p>
            </div>
          </div>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3 w-[100%] "
          >
            <div className="flex gap-3 w-full">
              <ContactInput
                name="name"
                control={form.control}
                placeholder="Your Name"
              />
              <ContactInput
                name="email"
                control={form.control}
                placeholder="Your Email"
              />
            </div>
            <ContactInput
              name="subject"
              control={form.control}
              placeholder="Subject"
            />
            <ContactText
              name="message"
              control={form.control}
              placeholder="Your Message"
            />

            <div className="flex items-center gap-4 relative justify-end">
              <Button
                type="submit"
                className="text-white bg-dark-green rounded-md w-fit px-6 h-9 cursor-pointer border-none"
              >
                <p>Send Message</p>
                <MdOutlineArrowRightAlt />
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
}
