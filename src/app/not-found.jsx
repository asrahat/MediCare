import Link from "next/link";
import { Home, ArrowLeft, Stethoscope } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#080D19] text-white flex items-center justify-center px-6">
      <div className="w-full max-w-2xl text-center">
        {/* Icon */}
        <div className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-2xl border border-[#00A99D]/20 bg-[#00A99D]/10">
          <Stethoscope className="h-10 w-10 text-[#00C2B5]" />
        </div>

        {/* 404 */}
        <p className="text-8xl font-black tracking-tight text-[#00C2B5] sm:text-9xl">
          404
        </p>

        {/* Heading */}
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Page Not Found
        </h1>

        {/* Description */}
        <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-[#94A3B8]">
          Sorry, the page you are looking for doesn&apos;t exist or may have
          been moved. Let&apos;s get you back to MediCare.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#00A99D] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#00B8AA] sm:w-auto"
          >
            <Home size={18} />
            Back to Home
          </Link>

          <Link
            href="/"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#243247] bg-[#111827] px-6 py-3 text-sm font-semibold text-[#E2E8F0] transition hover:border-[#00A99D]/50 hover:bg-[#0B1220] sm:w-auto"
          >
            <ArrowLeft size={18} />
            Return Safely
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-10 flex items-center justify-center gap-2 text-xs text-[#64748B]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#00A99D]" />
          MediCare · Secure Healthcare Platform
        </div>
      </div>
    </main>
  );
}