
"use client";

import { useState } from "react";
import { useSession, signOut } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";

import {
  FaHome,
  FaSignOutAlt,
  FaUsers,
  FaChartPie,
  FaCalendarCheck,
  FaClock,
  FaFilePrescription,
  FaUserMd,
  FaCreditCard,
  FaStar,
  FaMoneyBillWave,
  FaChartLine,
} from "react-icons/fa";

import { Menu, X } from "lucide-react";

const DashboardSideBar = () => {
  const { data: session } = useSession();

  const [isOpen, setIsOpen] = useState(false);

  const role = session?.user?.role;

  const doctorMenu = [
    {
      key: "overview",
      label: "Overview",
      icon: FaChartPie,
      href: "/dashboard/doctor",
    },
    {
      key: "schedule",
      label: "Manage Schedule",
      icon: FaClock,
      href: "/dashboard/doctor/schedule",
    },
    {
      key: "appointments",
      label: "Appointment Requests",
      icon: FaCalendarCheck,
      href: "/dashboard/doctor/appointments",
    },
    {
      key: "prescriptions",
      label: "Prescription Management",
      icon: FaFilePrescription,
      href: "/dashboard/doctor/prescriptions",
    },
    {
      key: "profile",
      label: "Profile Management",
      icon: FaUserMd,
      href: "/dashboard/doctor/profile",
    },
  ];

  const patientMenu = [
    {
      key: "overview",
      label: "Overview",
      icon: FaChartPie,
      href: "/dashboard/patient",
    },
    {
      key: "appointments",
      label: "My Appointments",
      icon: FaCalendarCheck,
      href: "/dashboard/patient/appointments",
    },
    {
      key: "payments",
      label: "Payment History",
      icon: FaCreditCard,
      href: "/dashboard/patient/payments",
    },
    {
      key: "reviews",
      label: "My Reviews",
      icon: FaStar,
      href: "/dashboard/patient/reviews",
    },
    {
      key: "profile",
      label: "Profile",
      icon: FaUserMd,
      href: "/dashboard/patient/profile",
    },
  ];

  const adminMenu = [
    {
      key: "users",
      label: "Manage Users",
      icon: FaUsers,
      href: "/dashboard/admin/users",
    },
    {
      key: "doctors",
      label: "Manage Doctors",
      icon: FaUserMd,
      href: "/dashboard/admin/doctors",
    },
    {
      key: "appointments",
      label: "Manage Appointments",
      icon: FaCalendarCheck,
      href: "/dashboard/admin/appointments",
    },
    {
      key: "payments",
      label: "Payment Management",
      icon: FaMoneyBillWave,
      href: "/dashboard/admin/payments",
    },
    {
      key: "analytics",
      label: "Analytics",
      icon: FaChartLine,
      href: "/dashboard/admin/analytics",
    },
  ];

  const menuItems =
    role === "doctor"
      ? doctorMenu
      : role === "patient"
      ? patientMenu
      : role === "admin"
      ? adminMenu
      : [];

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const avatarUrl =
    session?.user?.image ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      session?.user?.name || "User"
    )}&background=0f766e&color=fff&bold=true`;

  return (
    <>
      {/* =====================================================
          MOBILE HEADER
      ====================================================== */}
      <header className="fixed left-0 right-0 top-0 z-40 flex h-16 items-center justify-between border-b border-white/5 bg-[#080c16]/95 px-4 backdrop-blur-xl lg:hidden">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-white"
        >
          Medi<span className="text-[#00C2B5]">Care</span>
        </Link>

        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open dashboard menu"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-white"
        >
          <Menu size={21} />
        </button>
      </header>

      {/* =====================================================
          MOBILE OVERLAY
      ====================================================== */}
      {isOpen && (
        <button
          type="button"
          aria-label="Close dashboard menu"
          onClick={closeSidebar}
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
        />
      )}

      {/* =====================================================
          SIDEBAR
      ====================================================== */}
      <aside
        className={`
          fixed left-0 top-0 z-50 h-screen w-72
          border-r border-white/5
          transition-transform duration-300 ease-in-out

          lg:w-64
          lg:translate-x-0

          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex h-full flex-col bg-slate-950/95 backdrop-blur-xl">
          {/* =================================================
              LOGO
          ================================================== */}
          <div className="flex shrink-0 items-center justify-between border-b border-white/5 px-6 py-5">
            <Link
              href="/"
              onClick={closeSidebar}
              className="text-2xl font-bold tracking-tight text-white"
            >
              Medi<span className="text-[#00C2B5]">Care</span>
            </Link>

            {/* Mobile close */}
            <button
              type="button"
              onClick={closeSidebar}
              aria-label="Close dashboard menu"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/5 hover:text-white lg:hidden"
            >
              <X size={20} />
            </button>
          </div>

          {/* =================================================
              USER PROFILE
          ================================================== */}
          <div className="shrink-0 border-b border-white/5 px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border-2 border-[#00A99D]/50">
                <Image
                  width={40}
                  height={40}
                  src={avatarUrl}
                  alt="User avatar"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-bold leading-tight text-white">
                  {session?.user?.name || "User"}
                </p>

                <span
                  className={`text-[10px] font-bold uppercase tracking-wider ${
                    role === "admin"
                      ? "text-yellow-400"
                      : role === "doctor"
                      ? "text-[#00C2B5]"
                      : "text-blue-400"
                  }`}
                >
                  {role || "user"}
                </span>
              </div>
            </div>
          </div>

          {/* =================================================
              NAVIGATION
          ================================================== */}
          <nav className="flex-1 overflow-y-auto px-3 py-4">
            <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-widest text-slate-600">
              Navigation
            </p>

            <div className="space-y-1">
              {menuItems.map(({ key, label, icon: Icon, href }) => (
                <Link
                  key={key}
                  href={href}
                  onClick={closeSidebar}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-400 transition-all duration-150 hover:bg-white/5 hover:text-white"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 text-slate-400">
                    <Icon size={18} />
                  </span>

                  <span className="truncate">{label}</span>
                </Link>
              ))}
            </div>
          </nav>

          {/* =================================================
              BOTTOM ACTIONS
          ================================================== */}
          <div className="shrink-0 space-y-1 border-t border-white/5 px-3 py-4">
            <Link
              href="/"
              onClick={closeSidebar}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-400 transition-all duration-150 hover:bg-white/5 hover:text-white"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5">
                <FaHome size={13} />
              </span>

              <span>Back to Site</span>
            </Link>

            <Link
            href={'/login'}
              type="button"
              onClick={handleLogout}
              className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-400 transition-all duration-150 hover:bg-red-500/5 hover:text-red-400"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5">
                <FaSignOutAlt size={13} />
              </span>

              <span>Sign Out</span>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};

export default DashboardSideBar;

