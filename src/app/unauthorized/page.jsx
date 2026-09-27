"use client";

import { ShieldX, LogIn, Home } from "lucide-react";
import Link from "next/link";

const UnauthorizedPage = () => {
  return (
    <main className="min-h-screen bg-[#080D19] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10">
          <ShieldX className="h-10 w-10 text-red-400" />
        </div>

        {/* Status */}
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#00C2B5]">
          Access Denied
        </p>

        {/* Heading */}
        <h1 className="text-4xl font-bold tracking-tight text-white">
          Unauthorized
        </h1>

        {/* Description */}
        <p className="mt-4 leading-7 text-[#94A3B8]">
          You do not have permission to access this page. Please make sure
          you are logged in with an account that has the required role.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#243247] bg-[#111827] px-5 py-3 text-sm font-semibold text-[#E2E8F0] transition hover:border-[#00A99D]/50 hover:bg-[#0B1220]"
          >
            <LogIn size={17} />
            Login
          </Link>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#00A99D] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#00B8AA]"
          >
            <Home size={17} />
            Back to Home
          </Link>
        </div>

        {/* Footer */}
        <p className="mt-8 text-xs text-[#64748B]">
          MediCare · Secure Healthcare Platform
        </p>
      </div>
    </main>
  );
};

export default UnauthorizedPage;