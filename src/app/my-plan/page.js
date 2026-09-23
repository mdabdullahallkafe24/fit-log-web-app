"use client";

import { useState } from "react";
import Link from "next/link";
import { usePlan } from "@/context/PlanContext";
import WorkoutCard from "@/components/WorkoutCard";

export default function MyPlanPage() {
  const { planList, savedList } = usePlan();
  const [activeTab, setActiveTab] = useState("saved"); // "plan" or "saved"
  const [sortBy, setSortBy] = useState("duration");

  // Display array based on active tab
  const currentList = activeTab === "plan" ? planList : savedList;

  // Calculate totals
  const totalExercises = planList.length;
  const totalMinutes = planList.reduce((acc, item) => {
    const mins = parseInt(item.duration || item.time || "0", 10);
    return acc + (isNaN(mins) ? 0 : mins);
  }, 0);
  const totalCalories = planList.reduce((acc, item) => {
    const cals = parseInt(item.calories || item.kcal || "0", 10);
    return acc + (isNaN(cals) ? 0 : cals);
  }, 0);

  // Sorting logic
  const sortedList = [...currentList].sort((a, b) => {
    if (sortBy === "duration") {
      const durationA = parseInt(a.duration || "0", 10);
      const durationB = parseInt(b.duration || "0", 10);
      return durationB - durationA;
    }
    if (sortBy === "calories") {
      const calA = parseInt(a.calories || "0", 10);
      const calB = parseInt(b.calories || "0", 10);
      return calB - calA;
    }
    if (sortBy === "rating") {
      const rateA = parseFloat(a.rating || "0");
      const rateB = parseFloat(b.rating || "0");
      return rateB - rateA;
    }
    return 0;
  });

  return (
    <main className="min-h-screen bg-[#0b0d0f] text-white py-10 px-4 md:px-12">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Title */}
        <div className="space-y-1">
          <h1 className="text-3xl font-black uppercase tracking-wide">
            MY PLAN
          </h1>
          <p className="text-xs text-slate-400">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        {/* Top Stats Box */}
        <div className="bg-[#121418] border border-white/5 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-white/5">
          <div className="space-y-1">
            <span className="text-xs text-slate-400 font-medium">Exercises</span>
            <div className="text-4xl font-black text-[#ccff00]">
              {totalExercises}
            </div>
          </div>

          <div className="space-y-1 md:pl-6 pt-4 md:pt-0">
            <span className="text-xs text-slate-400 font-medium">Minutes</span>
            <div className="text-4xl font-black text-white">
              {totalMinutes}
            </div>
          </div>

          <div className="space-y-1 md:pl-6 pt-4 md:pt-0">
            <span className="text-xs text-slate-400 font-medium">Calories</span>
            <div className="text-4xl font-black text-white">
              {totalCalories}
            </div>
          </div>
        </div>

        {/* Filter Tabs & Sort Dropdown */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="bg-[#121418] border border-white/5 p-1 rounded-xl flex items-center gap-1 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab("plan")}
              className={`flex-1 sm:flex-none px-5 py-2 rounded-lg text-xs font-bold transition-colors ${
                activeTab === "plan"
                  ? "bg-[#1c2026] text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Today&apos;s Plan
            </button>
            <button
              onClick={() => setActiveTab("saved")}
              className={`flex-1 sm:flex-none px-5 py-2 rounded-lg text-xs font-bold transition-colors ${
                activeTab === "saved"
                  ? "bg-[#1c2026] text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Saved
            </button>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <span className="text-xs text-slate-400 font-medium">Sort By</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#121418] border border-white/10 text-white text-xs font-bold rounded-xl px-3 py-2 outline-none focus:border-[#ccff00] transition-colors cursor-pointer"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        {/* Workout Cards or Empty State */}
        {sortedList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedList.map((workout, index) => (
              <WorkoutCard key={workout.id || workout._id || index} workout={workout} />
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-white/10 rounded-3xl py-24 px-4 text-center space-y-4 bg-[#0d0f12]">
            <h3 className="text-xl font-black text-white uppercase tracking-wider">
              NOTHING HERE YET
            </h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Browse the library and add a lift to get today moving.
            </p>
            <div>
              <Link
                href="/"
                className="inline-block bg-[#ccff00] hover:bg-[#b8e600] text-black font-extrabold px-6 py-3 rounded-full text-xs uppercase tracking-wider transition-colors"
              >
                Go to workouts
              </Link>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}