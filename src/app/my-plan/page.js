"use client";

import Link from "next/link";
import Image from "next/image";
import { usePlan } from "@/context/PlanContext";
import { FiTrash2, FiArrowLeft, FiCheckCircle, FiBookmark } from "react-icons/fi";

export default function MyPlan() {
  const { planList, savedList, removeFromPlan, removeFromSaved } = usePlan();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="flex items-center justify-between border-b border-base-100/10 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white">My Dashboard</h1>
          <p className="text-slate-400 mt-1">Manage your planned lifts and saved exercises</p>
        </div>
        <Link href="/" className="btn btn-ghost btn-sm gap-2 text-slate-400">
          <FiArrowLeft /> Back to Library
        </Link>
      </div>

      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <FiCheckCircle className="text-primary text-2xl" />
          <h2 className="text-2xl font-bold text-white">Today&apos;s Plan ({planList.length})</h2>
        </div>

        {planList.length === 0 ? (
          <div className="bg-base-200/50 border border-dashed border-base-100/20 rounded-2xl p-8 text-center space-y-3">
            <p className="text-slate-400">No workouts added to today&apos;s plan yet.</p>
            <Link href="/" className="btn btn-primary btn-sm">Explore Workouts</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {planList.map((item) => (
              <div key={item.id} className="bg-base-200 border border-base-100/10 rounded-xl p-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-base-300">
                    <Image
                      src={item.image || "/placeholder.jpg"}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{item.name}</h3>
                    <span className="text-xs text-primary font-medium">{item.category}</span>
                  </div>
                </div>
                <button onClick={() => removeFromPlan(item.id)} className="btn btn-ghost btn-circle text-error" title="Remove">
                  <FiTrash2 className="text-lg" />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="space-y-6 pt-6">
        <div className="flex items-center gap-2">
          <FiBookmark className="text-secondary text-2xl" />
          <h2 className="text-2xl font-bold text-white">Saved for Later ({savedList.length})</h2>
        </div>

        {savedList.length === 0 ? (
          <div className="bg-base-200/50 border border-dashed border-base-100/20 rounded-2xl p-8 text-center space-y-3">
            <p className="text-slate-400">No workouts saved for later.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedList.map((item) => (
              <div key={item.id} className="bg-base-200 border border-base-100/10 rounded-xl p-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-base-300">
                    <Image
                      src={item.image || "/placeholder.jpg"}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{item.name}</h3>
                    <span className="text-xs text-secondary font-medium">{item.category}</span>
                  </div>
                </div>
                <button onClick={() => removeFromSaved(item.id)} className="btn btn-ghost btn-circle text-error" title="Remove">
                  <FiTrash2 className="text-lg" />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}