"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

import {
  LayoutCellsLarge,
  Person,
  ArrowRightFromSquare,
} from "@gravity-ui/icons";

import { Menu, X } from "lucide-react";

import { authClient, useSession } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const dropdownRef = useRef(null);

  /* =========================================================
     CLOSE DROPDOWN WHEN CLICKING OUTSIDE
  ========================================================= */
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /* =========================================================
     CLOSE MOBILE MENU WHEN ROUTE CHANGES
  ========================================================= */
  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  /* =========================================================
     LOGOUT
  ========================================================= */
  const handleLogout = async () => {
    try {
      await authClient.signOut();

      setDropdownOpen(false);
      setMobileMenuOpen(false);

      toast.success("Logged out successfully!");

      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout");
    }
  };

  /* =========================================================
     ACTIVE LINK
  ========================================================= */
  const isActive = (path) => {
    if (path === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(path);
  };

  const linkClass = (path) => `
    relative text-sm font-medium transition
    ${isActive(path) ? "text-white" : "text-white/60 hover:text-white"}
  `;

  const mobileLinkClass = (path) => `
    block w-full rounded-xl px-4 py-3 text-sm font-medium transition
    ${
      isActive(path)
        ? "bg-cyan-500/10 text-cyan-300"
        : "text-white/70 hover:bg-white/5 hover:text-white"
    }
  `;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      {/* =====================================================
          FULL WIDTH NAVBAR CONTAINER
      ====================================================== */}
      <div className="flex h-16 w-11/12 mx-auto items-center justify-between px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-20">
        {/* ===================================================
            LOGO
        ==================================================== */}
        <Link href="/" className="group flex shrink-0 items-center gap-2.5">
          <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-sky-500 via-cyan-500 to-teal-500 shadow-lg shadow-cyan-500/20 transition-all duration-300 group-hover:scale-105 group-hover:shadow-cyan-500/30">
            <div className="absolute inset-0 bg-white/10" />

            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="relative h-6 w-6 text-white"
            >
              <path
                d="M3 12h4l2-5 3.5 10 2.5-7 1.5 2H21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <span className="text-lg font-extrabold tracking-tight text-white">
            MediCare<span className="text-cyan-400">Connect</span>
          </span>
        </Link>

        {/* ===================================================
            DESKTOP NAVIGATION
        ==================================================== */}
        <div className="hidden items-center gap-7 md:flex">
          <Link href="/" className={linkClass("/")}>
            Home
            {isActive("/") && (
              <span className="absolute -bottom-2 left-0 h-[2px] w-full rounded-full bg-cyan-400" />
            )}
          </Link>

          <Link href="/doctors" className={linkClass("/doctors")}>
            Find Doctors
            {isActive("/doctors") && (
              <span className="absolute -bottom-2 left-0 h-[2px] w-full rounded-full bg-cyan-400" />
            )}
          </Link>

          <Link href="/about" className={linkClass("/about")}>
            About Us
            {isActive("/about") && (
              <span className="absolute -bottom-2 left-0 h-[2px] w-full rounded-full bg-cyan-400" />
            )}
          </Link>

          <Link href="/contact" className={linkClass("/contact")}>
            Contact Us
            {isActive("/contact") && (
              <span className="absolute -bottom-2 left-0 h-[2px] w-full rounded-full bg-cyan-400" />
            )}
          </Link>

          {session?.user && (
            <Link
              href={`/dashboard/${session.user.role}`}
              className={linkClass("/dashboard")}
            >
              Dashboard
              {isActive("/dashboard") && (
                <span className="absolute -bottom-2 left-0 h-[2px] w-full rounded-full bg-cyan-400" />
              )}
            </Link>
          )}
        </div>

        {/* ===================================================
            RIGHT SIDE
        ==================================================== */}
        <div className="flex items-center gap-3">
          {/* =========================
              DESKTOP AUTH
          ========================== */}
          {!session && (
            <div className="hidden items-center gap-3 sm:flex">
              <Link
                href="/login"
                className="text-sm text-white/60 transition hover:text-white"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 px-4 py-2 text-sm font-semibold text-white transition hover:scale-[1.02]"
              >
                Register
              </Link>
            </div>
          )}

          {/* =========================
              USER DROPDOWN
          ========================== */}
          {session?.user && (
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setDropdownOpen((prev) => !prev)}
                aria-label="Open user menu"
                aria-expanded={dropdownOpen}
                className="flex items-center"
              >
                <div className="rounded-full bg-gradient-to-r from-sky-500 to-cyan-500 p-[2px]">
                  <Image
                    src={session.user.image || "/fallback-avatar.png"}
                    alt="User avatar"
                    width={36}
                    height={36}
                    className="h-9 w-9 rounded-full border border-slate-900 object-cover"
                  />
                </div>
              </button>

              {/* =========================
                  DROPDOWN
              ========================== */}
              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-3 w-56 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/95 py-2 shadow-2xl backdrop-blur-xl">
                  {/* User Info */}
                  <div className="border-b border-white/10 px-4 py-3">
                    <p className="truncate text-sm font-semibold text-white">
                      {session.user.name}
                    </p>

                    <p className="truncate text-xs text-white/50">
                      {session.user.email}
                    </p>

                    <span className="mt-2 inline-block rounded-full border border-cyan-500/20 bg-cyan-500/10 px-2 py-1 text-[10px] uppercase text-cyan-300">
                      {session.user.role}
                    </span>
                  </div>

                  <Link
                    href={`/dashboard/${session.user.role}`}
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
                  >
                    <LayoutCellsLarge />
                    Dashboard
                  </Link>

                  <Link
                    href={`/dashboard/${session.user.role}/settings`}
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
                  >
                    <Person />
                    Profile
                  </Link>

                  <div className="my-1 border-t border-white/10" />

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-red-400 transition hover:bg-red-500/10"
                  >
                    <ArrowRightFromSquare />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* =========================
              MOBILE MENU BUTTON
          ========================== */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={
              mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={mobileMenuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10 md:hidden"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* =====================================================
          MOBILE NAVIGATION
      ====================================================== */}
      {mobileMenuOpen && (
        <div className="border-t border-white/10 bg-slate-950/95 px-4 py-4 backdrop-blur-xl md:hidden">
          <div className="space-y-1">
            <Link href="/" className={mobileLinkClass("/")}>
              Home
            </Link>

            <Link href="/doctors" className={mobileLinkClass("/doctors")}>
              Find Doctors
            </Link>

            <Link href="/about" className={mobileLinkClass("/about")}>
              About Us
            </Link>

            <Link href="/contact" className={mobileLinkClass("/contact")}>
              Contact Us
            </Link>

            {session?.user && (
              <Link
                href={`/dashboard/${session.user.role}`}
                className={mobileLinkClass("/dashboard")}
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* Mobile Auth */}
          {!session?.user && (
            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-white/10 pt-4">
              <Link
                href="/login"
                className="flex items-center justify-center rounded-xl border border-white/10 px-4 py-2.5 text-sm font-medium text-white/70 transition hover:bg-white/5 hover:text-white"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="flex items-center justify-center rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:scale-[1.01]"
              >
                Register
              </Link>
            </div>
          )}

          {/* Mobile User Info */}
          {session?.user && (
            <div className="mt-4 flex items-center gap-3 border-t border-white/10 pt-4">
              <Image
                src={session.user.image || "/fallback-avatar.png"}
                alt="User avatar"
                width={40}
                height={40}
                className="h-10 w-10 rounded-full border border-cyan-500/40 object-cover"
              />

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">
                  {session.user.name}
                </p>

                <p className="truncate text-xs text-white/50">
                  {session.user.email}
                </p>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="ml-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-red-400 transition hover:bg-red-500/10"
                aria-label="Logout"
              >
                <ArrowRightFromSquare size={18} />
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
