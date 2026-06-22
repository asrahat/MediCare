"use client";

import React from "react";
import Link from "next/link";
import { Button, Input } from "@heroui/react";
import {
  FaHeartPulse,
  FaPhone,
  FaEnvelope,
  FaLocationDot,
  FaFacebookF,
  FaXTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa6";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Find a Doctor", href: "/doctors" },
    { name: "Telehealth Services", href: "/services" },
    { name: "Pricing & Plans", href: "/pricing" },
    { name: "FAQs", href: "/faqs" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "HIPAA Compliance", href: "/hipaa" },
  ];

  return (
    <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-200 dark:border-slate-900">

          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-600/20">
                <FaHeartPulse className="text-xl" />
              </div>
              <span className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                MediCare<span className="text-emerald-600">Connect</span>
              </span>
            </Link>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
              Connecting global patients with premium, vetted medical practitioners through low-latency secure telehealth infrastructure. 
            </p>
     
            <div className="flex items-center gap-3 pt-2">
              <Button isIconOnly size="sm" variant="flat" className="rounded-xl hover:text-blue-600 dark:hover:text-blue-400">
                <FaFacebookF className="text-sm" />
              </Button>
              <Button isIconOnly size="sm" variant="flat" className="rounded-xl hover:text-slate-900 dark:hover:text-white">
                <FaXTwitter className="text-sm" />
              </Button>
              <Button isIconOnly size="sm" variant="flat" className="rounded-xl hover:text-blue-700 dark:hover:text-blue-400">
                <FaLinkedinIn className="text-sm" />
              </Button>
              <Button isIconOnly size="sm" variant="flat" className="rounded-xl hover:text-pink-600 dark:hover:text-pink-400">
                <FaInstagram className="text-sm" />
              </Button>
            </div>
          </div>

       
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Explore
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                <FaLocationDot className="text-emerald-600 shrink-0 mt-0.5" />
                <span>100 Medical Plaza, Suite 500, San Francisco, CA 94102</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                <FaEnvelope className="text-emerald-600 shrink-0" />
                <a href="mailto:support@medicareconnect.com" className="hover:underline">support@medicareconnect.com</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                <FaPhone className="text-emerald-600 shrink-0" />
                <a href="tel:+18005550199" className="hover:underline">+1 (800) 555-0199</a>
              </li>
            </ul>
          </div>


          <div className="lg:col-span-3 space-y-4">
            <div className="p-5 rounded-2xl bg-rose-500/10 dark:bg-rose-950/30 border border-rose-200/40 dark:border-rose-900/30 space-y-3">
              <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-sm tracking-tight">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                </span>
                24/7 Emergency Hotline
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-normal">
                If you are experiencing a life-threatening medical scenario, call local emergency services immediately.
              </p>
              <a 
                href="tel:911" 
                className="inline-flex w-full items-center justify-center gap-2 py-2 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-md shadow-rose-600/10 transition-colors"
              >
                <FaPhone className="text-xs" />
                Call Emergency (911)
              </a>
            </div>
          </div>

        </div>


        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 dark:text-slate-400 font-normal">
            &copy; {currentYear} MediCare Connect Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {legalLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}