"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePlan } from "@/context/PlanContext";
import { FiClock, FiStar, FiCheck, FiX } from "react-icons/fi";
import { FaFire } from "react-icons/fa";

export default function MyPlanPage() {
  const {
    planList,
    savedList,
    removeFromPlan,
    removeFromSaved,
    markAsDone,
  } = usePlan();

  const [activeTab, setActiveTab] = useState("plan");
  const [sortBy, setSortBy] = useState("duration");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const currentList = activeTab === "plan" ? planList : savedList;

  const totalExercises = planList.length;

  const totalMinutes = planList.reduce((total, workout) => {
    return total + Number(workout.duration || 0);
  }, 0);

  const totalCalories = planList.reduce((total, workout) => {
    return total + Number(workout.caloriesBurned || 0);
  }, 0);

  const sortedList = [...currentList].sort((a, b) => {
    if (sortBy === "duration") {
      return b.duration - a.duration;
    }

    if (sortBy === "calories") {
      return b.caloriesBurned - a.caloriesBurned;
    }

    if (sortBy === "rating") {
      return b.rating - a.rating;
    }

    return 0;
  });

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#0b0d0f] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-white/20 border-t-[#ccff00] rounded-full animate-spin mx-auto mb-4"></div>

          <p className="text-slate-400">
            Loading workouts...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0b0d0f] text-white py-10 px-4 sm:px-6 lg:px-12">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-wide">
            MY PLAN
          </h1>

          <p className="text-sm text-slate-400 mt-2">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        <div className="bg-[#121418] border border-white/5 rounded-2xl p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <p className="text-xs text-slate-400">
              Exercises
            </p>

            <p className="text-3xl sm:text-4xl font-black text-[#ccff00] mt-1">
              {totalExercises}
            </p>
          </div>

          <div className="sm:border-l sm:border-white/5 sm:pl-6">
            <p className="text-xs text-slate-400">
              Minutes
            </p>

            <p className="text-3xl sm:text-4xl font-black text-white mt-1">
              {totalMinutes}
            </p>
          </div>

          <div className="sm:border-l sm:border-white/5 sm:pl-6">
            <p className="text-xs text-slate-400">
              Calories
            </p>

            <p className="text-3xl sm:text-4xl font-black text-white mt-1">
              {totalCalories}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="bg-[#121418] border border-white/5 p-1 rounded-xl flex w-full sm:w-auto">
            <button
              onClick={() => setActiveTab("plan")}
              className={`flex-1 sm:flex-none px-5 py-2.5 rounded-lg text-xs font-bold transition-colors ${
                activeTab === "plan"
                  ? "bg-[#1c2026] text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Today&apos;s Plan
            </button>

            <button
              onClick={() => setActiveTab("saved")}
              className={`flex-1 sm:flex-none px-5 py-2.5 rounded-lg text-xs font-bold transition-colors ${
                activeTab === "saved"
                  ? "bg-[#1c2026] text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Saved
            </button>
          </div>

          <div className="flex items-center gap-2 self-end">
            <span className="text-xs text-slate-400 font-medium">
              Sort By
            </span>

            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="bg-[#121418] border border-white/10 text-white text-xs font-bold rounded-xl px-3 py-2.5 outline-none focus:border-[#ccff00]"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        {sortedList.length === 0 ? (
          <div className="border border-dashed border-white/10 rounded-3xl py-20 px-4 text-center bg-[#0d0f12]">
            <h2 className="text-xl font-black text-white uppercase tracking-wider">
              NOTHING HERE YET
            </h2>

            <p className="text-sm text-slate-400 max-w-sm mx-auto mt-3">
              Browse the library and add a lift to get today moving.
            </p>

            <Link
              href="/"
              className="inline-block mt-5 bg-[#ccff00] hover:bg-[#b8e600] text-black font-extrabold px-6 py-3 rounded-full text-xs uppercase tracking-wider transition-colors"
            >
              Go to workouts
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedList.map((workout) => (
              <div
                key={workout.id}
                className={`bg-[#121418] border rounded-2xl p-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 transition-all ${
                  workout.done
                    ? "border-[#ccff00]/30"
                    : "border-white/5 hover:border-white/10"
                }`}
              >
                <div className="flex items-center gap-4 w-full">
                  <div className="relative w-24 h-20 rounded-xl overflow-hidden bg-[#1a1d24] shrink-0">
                    <Image
                      src={workout.image}
                      alt={workout.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-base sm:text-lg font-black text-white uppercase tracking-wide">
                      {workout.name}
                    </h3>

                    <p className="text-xs text-slate-400 mt-1">
                      {workout.equipment}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-slate-400 font-semibold mt-3">
                      <span className="flex items-center gap-1.5">
                        <FiClock className="text-[#ccff00]" />
                        {workout.duration} min
                      </span>

                      <span className="flex items-center gap-1.5">
                        <FaFire className="text-[#ccff00]" />
                        {workout.caloriesBurned} kcal
                      </span>

                      <span className="flex items-center gap-1.5">
                        <FiStar className="text-[#ccff00]" />
                        {workout.rating}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
                  <Link
                    href={`/workout/${workout.id}`}
                    className="flex-1 lg:flex-none text-center px-4 py-2.5 bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 rounded-xl text-xs font-bold transition-colors"
                  >
                    View Details
                  </Link>

                  {activeTab === "plan" && (
                    <button
                      onClick={() => markAsDone(workout.id)}
                      disabled={workout.done}
                      className={`flex-1 lg:flex-none px-4 py-2.5 rounded-xl text-xs font-black uppercase flex items-center justify-center gap-1.5 transition-colors ${
                        workout.done
                          ? "bg-emerald-500 text-black cursor-default"
                          : "bg-[#ccff00] hover:bg-[#b8e600] text-black"
                      }`}
                    >
                      <FiCheck />

                      {workout.done ? "Done" : "Mark as Done"}
                    </button>
                  )}

                  <button
                    onClick={() =>
                      activeTab === "plan"
                        ? removeFromPlan(workout.id)
                        : removeFromSaved(workout.id)
                    }
                    className="p-2.5 text-slate-500 hover:text-white border border-white/10 rounded-xl transition-colors"
                    title="Remove"
                  >
                    <FiX />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}