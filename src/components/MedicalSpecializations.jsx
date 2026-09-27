"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card } from "@heroui/react";
import {
  FaHeart,
  FaBrain,
  FaBone,
  FaBaby,
  FaHandSparkles,
} from "react-icons/fa6";

const specializations = [
  {
    title: "Cardiology",
    description:
      "Expert care for heart health, cardiovascular systems, and blood pressure regulation management.",
    icon: FaHeart,
    color:
      "from-rose-500/10 to-pink-500/10 text-rose-600 dark:text-rose-400 border-rose-200/50 dark:border-rose-900/30",
  },
  {
    title: "Neurology",
    description:
      "Advanced diagnostics for the central nervous system, brain function, and complex spinal health.",
    icon: FaBrain,
    color:
      "from-indigo-500/10 to-blue-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-200/50 dark:border-indigo-900/30",
  },
  {
    title: "Orthopedics",
    description:
      "Comprehensive treatment for bone injuries, skeletal structures, joints, and muscular systems.",
    icon: FaBone,
    color:
      "from-amber-500/10 to-orange-500/10 text-amber-600 dark:text-amber-400 border-amber-200/50 dark:border-amber-900/30",
  },
  {
    title: "Pediatrics",
    description:
      "Dedicated primary healthcare, illness management, and developmental support for infants and teenagers.",
    icon: FaBaby,
    color:
      "from-sky-500/10 to-teal-500/10 text-sky-600 dark:text-sky-400 border-sky-200/50 dark:border-teal-900/30",
  },
  {
    title: "Dermatology",
    description:
      "Specialized diagnostics for systemic skin conditions, allergen barriers, and cosmetic renewal care.",
    icon: FaHandSparkles,
    color:
      "from-emerald-500/10 to-teal-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200/50 dark:border-teal-900/30",
  },
];

export default function MedicalSpecializations() {
  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section className="w-full bg-white py-16 transition-colors duration-300 dark:bg-slate-950 lg:py-20">
      <div className="w-11/12 mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        {/* Section Header */}
        <div className="mx-auto mb-12 w-full max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
            Explore Medical Specializations
          </h2>

          <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400 sm:text-lg">
            Find the exact medical expertise you need. Access world-class
            clinical practitioners across vetted healthcare channels.
          </p>
        </div>

        {/* Specialization Cards */}
        <motion.div
          className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            margin: "-100px",
          }}
        >
          {specializations.map((specialty) => {
            const IconComponent = specialty.icon;

            return (
              <motion.div
                key={specialty.title}
                variants={itemVariants}
                className="h-full"
              >
                <Link
                  href={`/doctors?specialization=${encodeURIComponent(
                    specialty.title
                  )}`}
                  className="block h-full"
                  aria-label={`Find ${specialty.title} doctors`}
                >
                  <Card
                    isPressable
                    className="group h-full w-full rounded-2xl border border-slate-100 bg-slate-50/50 transition-all duration-300 hover:-translate-y-1 hover:border-teal-500/30 hover:bg-white hover:shadow-xl dark:border-slate-800 dark:bg-slate-900/50 dark:hover:border-teal-500/20 dark:hover:bg-slate-900"
                  >
                    <div className="flex h-full flex-col items-center p-6 text-center">
                      {/* Icon */}
                      <div
                        className={`mb-5 rounded-2xl border bg-gradient-to-br p-4 transition-transform duration-300 group-hover:scale-110 ${specialty.color}`}
                      >
                        <IconComponent className="shrink-0 text-2xl" />
                      </div>

                      {/* Title */}
                      <h3 className="mb-2 text-lg font-bold text-slate-900 transition-colors duration-200 group-hover:text-teal-600 dark:text-white dark:group-hover:text-teal-400">
                        {specialty.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs font-normal leading-relaxed text-slate-500 dark:text-slate-400 sm:text-sm">
                        {specialty.description}
                      </p>

                      {/* View Doctors */}
                      <span className="mt-5 text-sm font-semibold text-teal-600 opacity-0 transition-all duration-300 group-hover:opacity-100 dark:text-teal-400">
                        View Doctors →
                      </span>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}