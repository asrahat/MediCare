"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
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
    <footer className="w-full border-t border-slate-200 bg-slate-50 transition-colors duration-300 dark:border-slate-900 dark:bg-slate-950">
      <div className="w-11/12 mx-auto px-5 pb-8 pt-16 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        {/* Main Footer Content */}
        <div className="grid w-full grid-cols-1 gap-10 border-b border-slate-200 pb-12 dark:border-slate-900 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="space-y-5 lg:col-span-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-md shadow-emerald-600/20">
                <FaHeartPulse className="text-xl" />
              </div>

              <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                MediCare<span className="text-emerald-600">Connect</span>
              </span>
            </Link>

            <p className="max-w-sm text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Connecting global patients with premium, vetted medical
              practitioners through low-latency secure telehealth
              infrastructure.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <Button
                isIconOnly
                size="sm"
                variant="flat"
                className="rounded-xl hover:text-blue-600 dark:hover:text-blue-400"
              >
                <FaFacebookF className="text-sm" />
              </Button>

              <Button
                isIconOnly
                size="sm"
                variant="flat"
                className="rounded-xl hover:text-slate-900 dark:hover:text-white"
              >
                <FaXTwitter className="text-sm" />
              </Button>

              <Button
                isIconOnly
                size="sm"
                variant="flat"
                className="rounded-xl hover:text-blue-700 dark:hover:text-blue-400"
              >
                <FaLinkedinIn className="text-sm" />
              </Button>

              <Button
                isIconOnly
                size="sm"
                variant="flat"
                className="rounded-xl hover:text-pink-600 dark:hover:text-pink-400"
              >
                <FaInstagram className="text-sm" />
              </Button>
            </div>
          </div>

          {/* Explore */}
          <div className="space-y-4 lg:col-span-2">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Explore
            </h4>

            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 transition-colors hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4 lg:col-span-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Contact Us
            </h4>

            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400">
                <FaLocationDot className="mt-0.5 shrink-0 text-emerald-600" />
                <span>
                  100 Medical Plaza, Suite 500, San Francisco, CA 94102
                </span>
              </li>

              <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                <FaEnvelope className="shrink-0 text-emerald-600" />
                <a
                  href="mailto:support@medicareconnect.com"
                  className="break-all hover:underline"
                >
                  support@medicareconnect.com
                </a>
              </li>

              <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                <FaPhone className="shrink-0 text-emerald-600" />
                <a
                  href="tel:+18005550199"
                  className="hover:underline"
                >
                  +1 (800) 555-0199
                </a>
              </li>
            </ul>
          </div>

          {/* Emergency Hotline */}
          <div className="space-y-4 lg:col-span-3">
            <div className="space-y-3 rounded-2xl border border-rose-200/40 bg-rose-500/10 p-5 dark:border-rose-900/30 dark:bg-rose-950/30">
              <div className="flex items-center gap-2 text-sm font-bold tracking-tight text-rose-600 dark:text-rose-400">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500" />
                </span>

                24/7 Emergency Hotline
              </div>

              <p className="text-xs leading-normal text-slate-600 dark:text-slate-400">
                If you are experiencing a life-threatening medical scenario,
                call local emergency services immediately.
              </p>

              <a
                href="tel:911"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-rose-600 px-4 py-2 text-sm font-bold text-white shadow-md shadow-rose-600/10 transition-colors hover:bg-rose-700"
              >
                <FaPhone className="text-xs" />
                Call Emergency (911)
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col items-center justify-between gap-4 pt-8 sm:flex-row">
          <p className="text-xs font-normal text-slate-500 dark:text-slate-400">
            &copy; {currentYear} MediCare Connect Inc. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {legalLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-xs text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
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