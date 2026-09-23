"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";
import { FiActivity, FiBookmark, FiList } from "react-icons/fi";

export default function Navbar() {
  const pathname = usePathname();
  const { planList, savedList } = usePlan();

  const isActive = (path) => pathname === path;

  return (
    <div className="navbar bg-base-300 border-b border-base-100/10 px-4 md:px-8 sticky top-0 z-50 backdrop-blur-md bg-opacity-80">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost normal-case text-xl font-bold flex items-center gap-2">
          <FiActivity className="text-primary text-2xl" />
          <span className="tracking-wide">FIT<span className="text-primary">LOG</span></span>
        </Link>
      </div>

      <div className="flex-none flex items-center gap-2 md:gap-4">
        <Link
          href="/"
          className={`btn btn-sm btn-ghost ${isActive("/") ? "btn-active text-primary" : ""}`}
        >
          Workouts
        </Link>

        <Link
          href="/my-plan"
          className={`btn btn-sm btn-ghost relative ${isActive("/my-plan") ? "btn-active text-primary" : ""}`}
        >
          <FiList className="text-lg" />
          <span className="hidden sm:inline">My Plan</span>
          {planList.length > 0 && (
            <div className="badge badge-primary badge-sm font-semibold">
              {planList.length}
            </div>
          )}
        </Link>

        <Link
          href="/my-plan"
          className="btn btn-sm btn-outline btn-primary relative gap-1"
        >
          <FiBookmark className="text-lg" />
          <span className="hidden sm:inline">Saved</span>
          {savedList.length > 0 && (
            <div className="badge badge-secondary badge-sm font-semibold">
              {savedList.length}
            </div>
          )}
        </Link>
      </div>
    </div>
  );
}