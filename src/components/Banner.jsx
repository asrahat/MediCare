"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@heroui/react";
import { ShieldCheck, HeartPulse, Clock, Calendar } from "@gravity-ui/icons";
import Image from "next/image";

export default function Banner() {
  // Container animation variants for clean orchestration
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  // Child animation elements
  const itemVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 16 },
    },
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-teal-50/40 via-white to-white dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 py-16 lg:py-24 transition-colors duration-300">
      {/* Background Decorative Blurs */}
      <div className="absolute top-0 right-0 -z-10 h-[380px] w-[380px] rounded-full bg-teal-400/10 blur-3xl dark:bg-teal-500/5" />
      <div className="absolute bottom-0 left-0 -z-10 h-[280px] w-[280px] rounded-full bg-emerald-400/10 blur-3xl dark:bg-emerald-500/5" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT COLUMN: TEXT CONTENT & CTAs */}
          <motion.div 
            className="lg:col-span-7 space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Tagline Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 dark:bg-teal-950/40 border border-teal-200/60 dark:border-teal-800/40">
              <span className="flex h-2 w-2 rounded-full bg-teal-500 animate-pulse" />
              <span className="text-xs font-semibold text-teal-700 dark:text-teal-400 tracking-wide uppercase">
                Your Health, Connected Securely
              </span>
            </motion.div>

            {/* Core Value Proposition */}
            <motion.h1 
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight sm:leading-none"
            >
              Skip the Waiting Room. <br />
              <span className="bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent dark:from-teal-400 dark:to-emerald-400">
                Consult Top Doctors
              </span> Instantly.
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl font-normal leading-relaxed"
            >
              MediCare Connect digitizes your healthcare path. Book certified practitioner appointments, securely process consultation dues, and monitor continuous electronic medical records right from home.
            </motion.p>

            {/* Structured Hero Actions (CTAs) */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 pt-2">
              <Button
                as={Link}
                href="/find-doctors"
                size="lg"
                className="bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 text-white font-bold text-sm shadow-xl shadow-teal-500/10 hover:shadow-teal-500/20 px-8 h-12 rounded-xl transition-all duration-200"
                startContent={<Calendar className="h-4 w-4 shrink-0" />}
              >
                Book Appointment
              </Button>
              
              <Button
                as={Link}
                href="/about-us"
                size="lg"
                variant="bordered"
                className="border-slate-200 dark:border-slate-800 bg-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900/60 font-semibold text-sm px-6 h-12 rounded-xl transition-all duration-200"
              >
                Learn More
              </Button>
            </motion.div>

            {/* Mini Trust Badges */}
            <motion.div 
              variants={itemVariants}
              className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-100 dark:border-slate-800/60 max-w-md"
            >
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <ShieldCheck className="text-teal-500 text-lg shrink-0" />
                <span className="text-xs font-medium">Verified MDs</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <Clock className="text-teal-500 text-lg shrink-0" />
                <span className="text-xs font-medium">Zero Wait Time</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                <HeartPulse className="text-teal-500 text-lg shrink-0" />
                <span className="text-xs font-medium">Secure Care</span>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN: HEALTHCARE THEMED GRAPHIC MATRIX */}
          <motion.div 
            className="lg:col-span-5 relative flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            {/* Main Image Mask Container */}
            <div className="relative w-full max-w-[400px] aspect-[4/5] rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-800 border-4 border-white dark:border-slate-900 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-teal-600/10 to-emerald-600/5 mix-blend-multiply z-10" />
              <Image 
                width={800} 
                height={1000}
                src="https://plus.unsplash.com/premium_photo-1681843126728-04eab730febe?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Professional healthcare medical practitioner team"
                className="w-full h-full object-cover grayscale-[5%] dark:grayscale-[15%] transition-transform duration-500 hover:scale-105"
                priority
              />
            </div>

            {/* Interactive Animated Float Card */}
            <motion.div 
              className="absolute -bottom-6 -left-4 sm:left-0 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-xl max-w-[210px] z-20 flex gap-3 items-center"
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <HeartPulse className="text-xl" />
              </div>
              <div>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wide">Live Support</p>
                <p className="text-sm font-bold text-slate-800 dark:text-white">24/7 Availability</p>
              </div>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}