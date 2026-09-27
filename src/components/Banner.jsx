"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@heroui/react";
import {
  ShieldCheck,
  HeartPulse,
  Clock,
  Calendar,
  Stethoscope,
  CircleCheck,
} from "@gravity-ui/icons";
import Image from "next/image";

export default function Banner() {
  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: {
      y: 24,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 90,
        damping: 16,
      },
    },
  };

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-teal-50 via-white to-emerald-50/40 py-16 transition-colors duration-300 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 lg:py-24 xl:py-28">
      {/* Background Glow */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-teal-400/10 blur-[120px] dark:bg-teal-500/5" />

      <div className="pointer-events-none absolute -bottom-40 -left-40 h-[450px] w-[450px] rounded-full bg-emerald-400/10 blur-[120px] dark:bg-emerald-500/5" />

      {/* Subtle Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025] dark:opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Decorative Pulse */}
      <motion.div
        className="pointer-events-none absolute right-[12%] top-[18%] hidden h-3 w-3 rounded-full bg-teal-400/60 lg:block"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.4, 1, 0.4],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Full Width Container */}
      <div className="relative w-full px-5 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <div className="grid w-full grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-16 xl:gap-24">
          {/* =====================================================
              LEFT CONTENT
          ====================================================== */}

          <motion.div
            className="w-full"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div
              variants={itemVariants}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-200/70 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm dark:border-teal-800/40 dark:bg-slate-900/70"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-teal-500" />
              </span>

              <span className="text-xs font-bold uppercase tracking-[0.12em] text-teal-700 dark:text-teal-400">
                Trusted Digital Healthcare
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={itemVariants}
              className="max-w-4xl text-4xl font-black leading-[1.08] tracking-tight text-slate-950 dark:text-white sm:text-5xl lg:text-6xl xl:text-[4.5rem]"
            >
              Healthcare That
              <br />

              <span className="bg-gradient-to-r from-teal-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent dark:from-teal-400 dark:via-emerald-400 dark:to-cyan-400">
                Comes to You.
              </span>
            </motion.h1>

            {/* Supporting Heading */}
            <motion.p
              variants={itemVariants}
              className="mt-5 max-w-2xl text-lg font-medium leading-relaxed text-slate-700 dark:text-slate-300 sm:text-xl"
            >
              Connect with trusted doctors, book appointments, and manage your
              healthcare journey — all from one secure platform.
            </motion.p>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="mt-4 max-w-2xl text-sm leading-7 text-slate-500 dark:text-slate-400 sm:text-base"
            >
              Find the right medical specialist, choose a convenient time,
              securely complete your consultation payment, and keep track of
              your appointments and prescriptions with MediCare Connect.
            </motion.p>

            {/* =====================================================
                FUNCTIONAL CTA BUTTONS
            ====================================================== */}

            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              {/* Find a Doctor */}
              <Link href="/doctors" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="h-13 w-full rounded-xl bg-gradient-to-r from-teal-600 to-emerald-500 px-7 text-sm font-bold text-white shadow-lg shadow-teal-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-teal-500/25 dark:from-teal-500 dark:to-emerald-500 sm:w-auto"
                  startContent={
                    <Calendar className="h-5 w-5 shrink-0" />
                  }
                >
                  Find a Doctor
                </Button>
              </Link>

              {/* Learn More */}
              <Link href="/about" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="bordered"
                  className="h-13 w-full rounded-xl border-slate-200 bg-white/70 px-7 text-sm font-semibold text-slate-700 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-300 dark:hover:bg-slate-900 sm:w-auto"
                >
                  Learn More
                </Button>
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              variants={itemVariants}
              className="mt-9 grid max-w-2xl grid-cols-1 gap-4 border-t border-slate-200/80 pt-7 dark:border-slate-800 sm:grid-cols-3"
            >
              {/* Verified Doctors */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-500/10">
                  <ShieldCheck className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                </div>

                <div>
                  <p className="text-sm font-bold text-slate-800 dark:text-white">
                    Verified Doctors
                  </p>

                  <p className="text-xs text-slate-500 dark:text-slate-500">
                    Trusted professionals
                  </p>
                </div>
              </div>

              {/* Easy Scheduling */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10">
                  <Clock className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>

                <div>
                  <p className="text-sm font-bold text-slate-800 dark:text-white">
                    Easy Scheduling
                  </p>

                  <p className="text-xs text-slate-500 dark:text-slate-500">
                    Choose your time
                  </p>
                </div>
              </div>

              {/* Secure Care */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10">
                  <HeartPulse className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
                </div>

                <div>
                  <p className="text-sm font-bold text-slate-800 dark:text-white">
                    Secure Care
                  </p>

                  <p className="text-xs text-slate-500 dark:text-slate-500">
                    Your health matters
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* =====================================================
              RIGHT VISUAL
          ====================================================== */}

          <motion.div
            className="relative flex min-h-[520px] w-full items-center justify-center lg:min-h-[600px] lg:justify-end"
            initial={{
              opacity: 0,
              x: 30,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: "easeOut",
            }}
          >
            {/* Image Glow */}
            <div className="absolute right-[5%] top-[8%] h-[85%] w-[80%] rounded-[3rem] bg-teal-400/10 blur-3xl dark:bg-teal-500/5" />

            {/* Main Image */}
            <div className="relative z-10 aspect-[4/5] w-full max-w-[500px] overflow-hidden rounded-[2.5rem] border border-white/80 bg-slate-100 shadow-[0_30px_80px_rgba(15,118,110,0.18)] dark:border-slate-800 dark:bg-slate-900">
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-950/35 via-transparent to-teal-500/10" />

              <Image
                width={1000}
                height={1250}
                src="https://plus.unsplash.com/premium_photo-1681843126728-04eab730febe?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaGdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Professional healthcare medical practitioner team"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                priority
              />

              <div className="absolute inset-x-0 bottom-0 z-20 h-32 bg-gradient-to-t from-slate-950/50 to-transparent" />
            </div>

            {/* Verified Doctors Card */}
            <motion.div
              className="absolute left-0 top-[12%] z-30 hidden items-center gap-3 rounded-2xl border border-white/70 bg-white/95 p-4 shadow-xl backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/95 sm:flex lg:-left-8"
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 4.5,
                ease: "easeInOut",
              }}
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-500/10">
                <Stethoscope className="h-5 w-5 text-teal-600 dark:text-teal-400" />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <p className="text-xs font-bold text-slate-400 dark:text-slate-500">
                    DOCTORS
                  </p>

                  <CircleCheck className="h-3.5 w-3.5 text-teal-500" />
                </div>

                <p className="mt-0.5 text-sm font-bold text-slate-800 dark:text-white">
                  Verified Professionals
                </p>
              </div>
            </motion.div>

            {/* Healthcare Support Card */}
            <motion.div
              className="absolute -bottom-5 right-0 z-30 flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-2xl dark:border-slate-800 dark:bg-slate-900 sm:right-4 lg:-right-6"
              animate={{
                y: [0, 8, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
              }}
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10">
                <HeartPulse className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500">
                  Healthcare Support
                </p>

                <p className="mt-0.5 text-sm font-bold text-slate-800 dark:text-white">
                  Care When You Need It
                </p>
              </div>
            </motion.div>

            {/* Decorative Medical Orb */}
            <motion.div
              className="absolute bottom-[12%] left-[4%] z-20 hidden h-16 w-16 items-center justify-center rounded-full border border-teal-200/50 bg-white/80 shadow-lg backdrop-blur-md dark:border-teal-800/40 dark:bg-slate-900/80 lg:flex"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <HeartPulse className="h-7 w-7 text-teal-500" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}