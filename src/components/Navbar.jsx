"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";

export default function Navbar() {
  const pathname = usePathname();
  const { planList, savedList } = usePlan();

  const isActive = (path) => pathname === path;

  return (
    <nav className="bg-[#0b0d0f] border-b border-white/10 px-4 sm:px-6 md:px-12 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src="/logo.png"
            alt="FitLog Logo"
            width={28}
            height={28}
            className="object-contain"
          />

          <span className="text-lg font-black tracking-wider text-white uppercase">
            FITLOG
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-6">
          <Link
            href="/"
            className={`text-xs sm:text-sm font-semibold transition-colors ${
              isActive("/")
                ? "bg-white/10 text-white px-3 py-1.5 rounded-full"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Workout
          </Link>

          <Link
            href="/my-plan"
            className={`text-xs sm:text-sm font-semibold transition-colors ${
              isActive("/my-plan")
                ? "bg-white/10 text-white px-3 py-1.5 rounded-full"
                : "text-slate-400 hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 text-xs font-bold text-slate-300 bg-white/5 hover:bg-white/10 px-2 sm:px-3 py-1.5 rounded-full border border-white/10 transition-colors"
          >
            <span className="hidden sm:inline">Plan</span>

            <span className="bg-[#ccff00] text-black w-5 h-5 rounded-full flex items-center justify-center font-black text-[11px]">
              {planList.length}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 text-xs font-bold text-slate-300 bg-white/5 hover:bg-white/10 px-2 sm:px-3 py-1.5 rounded-full border border-white/10 transition-colors"
          >
            <span className="hidden sm:inline">Saved</span>

            <span className="bg-white/20 text-white w-5 h-5 rounded-full flex items-center justify-center font-black text-[11px]">
              {savedList.length}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}