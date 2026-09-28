'use client';
import React from 'react';
import Link from "next/link";
import { Button, Card } from "@heroui/react";
import {
  HeartPulse,
  ShieldCheck,
  UserRoundCheck,
  CalendarCheck,
  Stethoscope,
  Clock3,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Stethoscope,
    title: "Find the Right Doctor",
    description:
      "Explore doctors by specialization and find healthcare professionals that match your needs.",
  },
  {
    icon: CalendarCheck,
    title: "Easy Appointment Booking",
    description:
      "Choose an available date and time slot and book your consultation through a simple process.",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Reliable",
    description:
      "Your account and appointment information are handled through secure authentication and trusted technology.",
  },
  {
    icon: Clock3,
    title: "Convenient Healthcare",
    description:
      "Spend less time searching and more time focusing on your health with a convenient digital experience.",
  },
];

const values = [
  "Patient-focused healthcare experience",
  "Simple and accessible appointment booking",
  "Verified healthcare professionals",
  "Secure authentication and payments",
  "Clear appointment and payment management",
  "Modern and user-friendly technology",
];

const AboutContent = () => {
    return (
        <main className="min-h-screen bg-[#080D19] text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-[#243247]">
        {/* Background glow */}
        <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-teal-500/10 blur-3xl" />

        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-sm font-medium text-cyan-300">
                <HeartPulse className="h-4 w-4" />
                About MediCare Connect
              </div>

              <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Healthcare made
                <span className="block text-cyan-400">
                  simpler for everyone.
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
                MediCare Connect is a modern healthcare platform designed to
                make it easier for patients to discover doctors, book
                appointments, manage consultations, and keep track of their
                healthcare journey in one convenient place.
              </p>

              {/* Hero Buttons */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/doctors" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="group h-12 w-full rounded-xl bg-cyan-500 px-6 font-semibold text-[#061018] shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-cyan-400 hover:shadow-cyan-500/30 sm:w-auto"
                    endContent={
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    }
                  >
                    Find a Doctor
                  </Button>
                </Link>

                <Link href="/contact" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="bordered"
                    className="h-12 w-full rounded-xl border-[#29404F] bg-[#111827] px-6 font-semibold text-slate-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/50 hover:bg-[#162033] hover:text-cyan-300 sm:w-auto"
                  >
                    Contact Us
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Hero Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="relative"
            >
              <div className="rounded-3xl border border-[#29404F] bg-[#111827]/90 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-8">
                <div className="flex items-center gap-4 border-b border-[#243247] pb-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-teal-500 shadow-lg shadow-cyan-500/20">
                    <HeartPulse className="h-7 w-7 text-white" />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold">
                      MediCare
                      <span className="text-cyan-400">Connect</span>
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Your healthcare, connected.
                    </p>
                  </div>
                </div>

                <div className="space-y-4 pt-6">
                  {[
                    "Discover healthcare professionals",
                    "Book appointments easily",
                    "Manage your appointments",
                    "Track your payment history",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-xl border border-[#243247] bg-[#0B1220] p-4"
                    >
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-cyan-400" />
                      <span className="text-sm text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating card */}
              <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-[#29404F] bg-[#111827] p-4 shadow-xl sm:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10">
                    <UserRoundCheck className="h-5 w-5 text-emerald-400" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-white">
                      Patient First
                    </p>
                    <p className="text-xs text-slate-500">
                      Designed around your needs
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
              Our Mission
            </p>

            <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
              Connecting people with better healthcare experiences.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-base leading-8 text-slate-400 sm:text-lg">
              We believe accessing healthcare should be straightforward.
              MediCare Connect brings essential healthcare services together
              in one digital platform so patients can discover doctors,
              explore their information, select available time slots, and
              manage appointments without unnecessary complexity.
            </p>

            <p className="mt-5 text-base leading-8 text-slate-400 sm:text-lg">
              Our goal is to create a reliable bridge between patients and
              healthcare professionals while providing a clean, accessible,
              and secure digital experience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="border-y border-[#243247] bg-[#0B1220]/60">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
              What We Offer
            </p>

            <h2 className="text-3xl font-bold sm:text-4xl">
              Everything you need in one place
            </h2>

            <p className="mt-4 leading-7 text-slate-400">
              MediCare Connect is built around making common healthcare tasks
              easier, clearer, and more convenient.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                  }}
                >
                  <Card className="h-full rounded-2xl border border-[#243247] bg-[#111827] p-6 shadow-none transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/30">
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10">
                      <Icon className="h-6 w-6 text-cyan-400" />
                    </div>

                    <h3 className="text-lg font-bold text-white">
                      {feature.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-slate-400">
                      {feature.description}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
              Why MediCare Connect
            </p>

            <h2 className="text-3xl font-bold sm:text-4xl">
              Built with people and simplicity in mind.
            </h2>

            <p className="mt-5 max-w-xl leading-8 text-slate-400">
              From discovering a specialist to keeping track of appointments,
              every part of MediCare Connect is designed to keep the
              experience straightforward and easy to understand.
            </p>

            {/* Explore Doctors Button */}
            <div className="mt-8">
              <Link href="/doctors" className="inline-block">
                <Button
                  className="group h-11 rounded-xl bg-cyan-500 px-6 font-semibold text-[#061018] shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-cyan-400 hover:shadow-cyan-500/30"
                  endContent={
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  }
                >
                  Explore Doctors
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid gap-3">
            {values.map((value) => (
              <div
                key={value}
                className="flex items-center gap-4 rounded-xl border border-[#243247] bg-[#111827] p-4"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                </div>

                <span className="text-sm text-slate-300 sm:text-base">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[#243247]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-[#10202A] via-[#111827] to-[#0B1220] p-8 text-center sm:p-12 lg:p-16">
            <div className="pointer-events-none absolute left-1/2 top-0 h-48 w-96 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />

            <div className="relative">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10">
                <HeartPulse className="h-7 w-7 text-cyan-400" />
              </div>

              <h2 className="mt-6 text-3xl font-bold sm:text-4xl">
                Ready to take the next step?
              </h2>

              <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-400">
                Find a healthcare professional and take control of your
                appointment journey with MediCare Connect.
              </p>

              {/* CTA Button */}
              <div className="mt-8">
                <Link href="/doctors" className="inline-block">
                  <Button
                    size="lg"
                    className="group h-12 rounded-xl bg-cyan-500 px-7 font-semibold text-[#061018] shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-cyan-400 hover:shadow-cyan-500/30"
                    endContent={
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    }
                  >
                    Find a Doctor
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    );
};

export default AboutContent;