
"use client";

import React from "react";
import Link from "next/link";
import { Button, Card, Input, TextArea } from "@heroui/react";
import {
  Mail,
  Phone,
  MapPin,
  Clock3,
  Send,
  HeartPulse,
  MessageCircle,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    value: "support@medicareconnect.com",
    description: "Send us an email anytime",
  },
  {
    icon: Phone,
    title: "Call Us",
    value: "+880 1700-000000",
    description: "Available during business hours",
  },
  {
    icon: MapPin,
    title: "Our Location",
    value: "Sylhet, Bangladesh",
    description: "Serving patients digitally",
  },
  {
    icon: Clock3,
    title: "Working Hours",
    value: "9:00 AM – 6:00 PM",
    description: "Saturday – Thursday",
  },
];

const faqs = [
  {
    question: "How can I book an appointment?",
    answer:
      "Browse our doctors, select a doctor that matches your needs, choose an available date and time slot, and complete the booking process.",
  },
  {
    question: "Can I manage my appointments online?",
    answer:
      "Yes. Your patient dashboard allows you to view your appointments and keep track of your appointment information.",
  },
  {
    question: "How can I contact a doctor?",
    answer:
      "You can explore available doctors and their professional information through the Doctors section of MediCare Connect.",
  },
];

export default function ContactPage() {
  const handleSubmit = (e) => {
    e.preventDefault();

    // Connect this form to your backend/email service later.
    alert("Thank you! Your message has been submitted.");
  };

  return (
    <main className="min-h-screen bg-[#080D19] text-white">
      {/* =========================
          HERO SECTION
      ========================== */}
      <section className="relative overflow-hidden border-b border-[#243247]">
        <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-teal-500/10 blur-3xl" />

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-sm font-medium text-cyan-300">
              <MessageCircle className="h-4 w-4" />
              Get In Touch
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              We’re here to
              <span className="block text-cyan-400">help you.</span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
              Have a question, need assistance, or want to learn more about
              MediCare Connect? Send us a message and our team will be happy
              to help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* =========================
          CONTACT SECTION
      ========================== */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-8">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
                Contact Information
              </p>

              <h2 className="text-3xl font-bold sm:text-4xl">
                Let’s start a conversation.
              </h2>

              <p className="mt-4 leading-7 text-slate-400">
                Whether you have a question about appointments, doctors,
                payments, or your account, we’re ready to assist.
              </p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((item) => {
                const Icon = item.icon;

                return (
                  <Card
                    key={item.title}
                    className="rounded-2xl border border-[#243247] bg-[#111827] p-5 shadow-none transition-all duration-300 hover:border-cyan-400/30"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10">
                        <Icon className="h-5 w-5 text-cyan-400" />
                      </div>

                      <div className="min-w-0">
                        <h3 className="font-semibold text-white">
                          {item.title}
                        </h3>

                        <p className="mt-1 break-words text-sm font-medium text-slate-300">
                          {item.value}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="rounded-3xl border border-[#29404F] bg-[#111827] p-6 shadow-2xl shadow-black/20 sm:p-8">
              <div className="mb-7">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10">
                  <Send className="h-6 w-6 text-cyan-400" />
                </div>

                <h2 className="text-2xl font-bold">
                  Send us a message
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Fill out the form below and we’ll get back to you as soon
                  as possible.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Input
                    isRequired
                    label="Full Name"
                    placeholder="Enter your name"
                    labelPlacement="outside"
                    classNames={{
                      label: "text-slate-300",
                      inputWrapper:
                        "bg-[#0B1220] border border-[#243247] shadow-none",
                      input: "text-white placeholder:text-slate-600",
                    }}
                  />

                  <Input
                    isRequired
                    type="email"
                    label="Email Address"
                    placeholder="you@example.com"
                    labelPlacement="outside"
                    classNames={{
                      label: "text-slate-300",
                      inputWrapper:
                        "bg-[#0B1220] border border-[#243247] shadow-none",
                      input: "text-white placeholder:text-slate-600",
                    }}
                  />
                </div>

                <Input
                  isRequired
                  label="Subject"
                  placeholder="How can we help?"
                  labelPlacement="outside"
                  classNames={{
                    label: "text-slate-300",
                    inputWrapper:
                      "bg-[#0B1220] border border-[#243247] shadow-none",
                    input: "text-white placeholder:text-slate-600",
                  }}
                />

                <TextArea
                  isRequired
                  label="Message"
                  placeholder="Write your message here..."
                  labelPlacement="outside"
                  minRows={6}
                  classNames={{
                    label: "text-slate-300",
                    inputWrapper:
                      "bg-[#0B1220] border border-[#243247] shadow-none",
                    input: "text-white placeholder:text-slate-600",
                  }}
                />

                {/* Send Message Button */}
                <Button
                  type="submit"
                  size="lg"
                  className="group h-12 w-full rounded-xl bg-cyan-500 font-semibold text-[#061018] shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-cyan-400 hover:shadow-cyan-500/30"
                  endContent={
                    <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  }
                >
                  Send Message
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* =========================
          SUPPORT BANNER
      ========================== */}
      <section className="border-y border-[#243247] bg-[#0B1220]/60">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10">
                <HeartPulse className="h-6 w-6 text-emerald-400" />
              </div>

              <div>
                <h2 className="text-xl font-bold">
                  Need healthcare assistance?
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                  Explore our doctors and find a healthcare professional that
                  matches your needs.
                </p>
              </div>
            </div>

            {/* Find a Doctor Button */}
            <Link href="/doctors" className="w-full sm:w-auto">
              <Button
                className="group h-11 w-full rounded-xl bg-cyan-500 px-6 font-semibold text-[#061018] shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-cyan-400 hover:shadow-cyan-500/30 sm:w-auto"
                endContent={
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                }
              >
                Find a Doctor
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================
          FAQ SECTION
      ========================== */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
            Frequently Asked Questions
          </p>

          <h2 className="text-3xl font-bold sm:text-4xl">
            Common questions
          </h2>

          <p className="mt-4 leading-7 text-slate-400">
            Here are some quick answers to common questions about
            MediCare Connect.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-4xl space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.question}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: index * 0.08,
              }}
              className="rounded-2xl border border-[#243247] bg-[#111827] p-5 sm:p-6"
            >
              <div className="flex items-start gap-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400" />

                <div>
                  <h3 className="font-semibold text-white">
                    {faq.question}
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-slate-400">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* =========================
          BOTTOM CTA
      ========================== */}
      <section className="border-t border-[#243247]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-[#10202A] via-[#111827] to-[#0B1220] p-8 text-center sm:p-12">
            <div className="pointer-events-none absolute left-1/2 top-0 h-48 w-96 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />

            <div className="relative">
              <HeartPulse className="mx-auto h-9 w-9 text-cyan-400" />

              <h2 className="mt-5 text-3xl font-bold">
                Your health matters.
              </h2>

              <p className="mx-auto mt-3 max-w-xl text-slate-400">
                Start your healthcare journey with MediCare Connect today.
              </p>

              {/* Explore Doctors Button */}
              <div className="mt-7">
                <Link href="/doctors" className="inline-block">
                  <Button
                    size="lg"
                    className="group h-12 rounded-xl bg-cyan-500 px-7 font-semibold text-[#061018] shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-cyan-400 hover:shadow-cyan-500/30"
                    endContent={
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    }
                  >
                    Explore Doctors
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

