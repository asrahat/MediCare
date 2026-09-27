"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@heroui/react";
import {
  FaUserCheck,
  FaHouseMedicalCircleCheck,
  FaFilePrescription,
  FaTv,
} from "react-icons/fa6";

const advantages = [
  {
    title: "100% Vetted Medical Practitioners",
    description:
      "Every doctor undergoes multi-layer identity, licensing, and board-certification validation checks before seeing patients.",
    icon: FaUserCheck,
    color:
      "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-200/40 dark:border-teal-900/30",
  },
  {
    title: "Bank-Grade Health Data Security",
    description:
      "Your Electronic Medical Records (EMR) and consultation logs are safeguarded by strict end-to-end encryption protocols.",
    icon: FaHouseMedicalCircleCheck,
    color:
      "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200/40 dark:border-blue-900/30",
  },
  {
    title: "Instant Digital Prescriptions",
    description:
      "Receive officially signed digital prescriptions immediately post-consultation, forwarded straight to your local pharmacy.",
    icon: FaFilePrescription,
    color:
      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200/40 dark:border-emerald-900/30",
  },
  {
    title: "Seamless HD Telehealth Systems",
    description:
      "Launch crystal-clear audio and video clinical consults directly from your mobile or desktop web browser without external app downloads.",
    icon: FaTv,
    color:
      "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-200/40 dark:border-violet-900/30",
  },
];

export default function WhyChooseUs() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 90,
        damping: 14,
      },
    },
  };

  return (
    <section className="w-full border-t border-slate-100 bg-white py-16 transition-colors duration-300 dark:border-slate-900/40 dark:bg-slate-950 lg:py-20">
      <div className="w-11/12 mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <div className="grid w-full grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          {/* LEFT SIDE */}
          <div className="space-y-5 lg:sticky lg:top-24 lg:col-span-5">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/60 bg-emerald-50 px-3 py-1 dark:border-emerald-900/40 dark:bg-emerald-950/40">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                The Platform Advantage
              </span>
            </div>

            <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
              Why Global Patients Choose MediCare Connect
            </h2>

            <p className="max-w-2xl text-base font-normal leading-relaxed text-slate-600 dark:text-slate-400">
              We bridge the physical limitations of legacy clinical
              infrastructure. By implementing rigorous verification matrices and
              low-latency network technology, we deliver premium, immediate
              clinical consultations without compromise.
            </p>

            <blockquote className="rounded-r-xl border-l-4 border-teal-500 bg-slate-50 p-4 dark:bg-slate-900">
              <p className="text-xs font-medium italic leading-relaxed text-slate-500 dark:text-slate-400">
                Our mission is to replace clinical friction with immediate,
                reliable care. We build tools that treat time with the same
                urgency as health.
              </p>
            </blockquote>
          </div>

          {/* RIGHT SIDE */}
          <motion.div
            className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-7 lg:gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {advantages.map((adv) => {
              const IconComponent = adv.icon;

              return (
                <motion.div
                  key={adv.title}
                  variants={itemVariants}
                  className="h-full"
                >
                  <Card className="h-full rounded-2xl border border-slate-100 bg-slate-50/40 shadow-sm transition-all duration-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/30">
                    <div className="flex h-full flex-col p-6">
                      {/* Icon */}
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${adv.color}`}
                      >
                        <IconComponent className="text-lg" />
                      </div>

                      {/* Content */}
                      <div className="mt-4 space-y-1.5">
                        <h3 className="text-base font-bold tracking-tight text-slate-900 dark:text-white">
                          {adv.title}
                        </h3>

                        <p className="text-xs font-normal leading-relaxed text-slate-500 dark:text-slate-400 sm:text-sm">
                          {adv.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}