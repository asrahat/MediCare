"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@heroui/react";
import {
  FaUserCheck,
  FaHouseMedicalCircleCheck ,
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
    icon: FaHouseMedicalCircleCheck ,
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
      transition: { type: "spring", stiffness: 90, damping: 14 },
    },
  };

  return (
    <section className="py-20 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-900/40 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* LEFT SIDE: VALUE PROPOSITION ARCHITECTURE */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-900/40">
              <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                The Platform Advantage
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              Why Global Patients Choose MediCare Connect
            </h2>

            <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              We bridge the physical limitations of legacy clinical
              infrastructure. By implementing rigorous verification matrices and
              low-latency network technology, we deliver premium, immediate
              clinical consultations without compromise.
            </p>

            <blockquote className="border-l-4 border-teal-500 bg-slate-50 dark:bg-slate-900 p-4 rounded-r-xl">
              <p className="text-xs italic text-slate-500 dark:text-slate-400 font-medium">
                Our mission is to replace clinical friction with immediate,
                reliable care. We build tools that treat time with the same
                urgency as health.
              </p>
            </blockquote>
          </div>

          {/* RIGHT SIDE: ADVANTAGES CARD MATRIX */}
          <motion.div
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {advantages.map((adv, index) => {
              const IconComponent = adv.icon;
              return (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="h-full border border-slate-100 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-900/30 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="p-6 space-y-4">
                      {/* Custom Dynamic Icon Frame */}
                      <div
                        className={`w-12 h-12 rounded-xl border flex items-center justify-center shrink-0 ${adv.color}`}
                      >
                        <IconComponent className="text-lg" />
                      </div>

                      {/* Header and Context Copy */}
                      <div className="space-y-1.5">
                        <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                          {adv.title}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-normal leading-relaxed">
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
