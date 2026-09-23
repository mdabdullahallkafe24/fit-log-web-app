"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { usePlan } from "@/context/PlanContext";
import { FiCalendar, FiBookmark } from "react-icons/fi";

export default function WorkoutDetails({ params }) {
  const { id } = use(params);
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToPlan, saveForLater } = usePlan();

  useEffect(() => {
    fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`)
      .then((res) => res.json())
      .then((data) => {
        const result = data.data || data;
        setWorkout(result);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading workout details:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-[#ccff00]"></span>
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="text-center py-20 space-y-4">
        <h2 className="text-2xl font-bold text-white">Workout Not Found</h2>
        <Link href="/" className="bg-[#ccff00] text-black font-bold px-4 py-2 rounded-lg text-xs uppercase">
          Back to Workouts
        </Link>
      </div>
    );
  }

  // Category list format setup
  const categories = Array.isArray(workout.category)
    ? workout.category
    : typeof workout.category === "string"
    ? workout.category.split(",").map((c) => c.trim())
    : ["Chest", "Arms"];

  // Instructions format setup
  const instructions = Array.isArray(workout.instructions) && workout.instructions.length > 0
    ? workout.instructions
    : [
        "Lie on the bench with eyes under the bar and feet planted.",
        "Unrack with locked elbows and lower the bar to mid-chest.",
        "Press up in a slight arc until elbows lock without bouncing.",
        "Keep shoulder blades pinched and a natural arch in the back."
      ];

  return (
    <main className="min-h-screen bg-[#0b0d0f] text-slate-200 py-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Side: Image Container */}
        <div className="lg:col-span-6 rounded-3xl overflow-hidden bg-[#121418] border border-white/5 relative aspect-square w-full">
          <img
            src={workout.image || workout.img || "/placeholder.jpg"}
            alt={workout.name || workout.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side: Content Details */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Header & Badges */}
          <div className="space-y-3">
            <h1 className="text-3xl lg:text-4xl font-extrabold text-white uppercase tracking-tight">
              {workout.name || workout.title || "BARBELL BENCH PRESS"}
            </h1>

            <p className="text-xs lg:text-sm text-slate-400 leading-relaxed max-w-lg">
              {workout.description || workout.desc || "A compound press that builds chest thickness, triceps, and pressing power from a stable bench."}
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              {categories.map((cat, idx) => (
                <Link
                  key={idx}
                  href={`/?category=${encodeURIComponent(cat)}`}
                  className="bg-[#ccff00] hover:bg-[#b8e600] text-black text-[11px] font-black px-3.5 py-1 rounded-full uppercase tracking-wider transition-colors inline-block"
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>

          {/* Stats Grid Box */}
          <div className="bg-[#121418] border border-white/5 rounded-2xl p-6 space-y-3.5 text-xs">
            <div className="flex justify-between items-center text-slate-400">
              <span className="uppercase font-bold tracking-wider text-[10px] text-slate-400">EQUIPMENT</span>
              <span className="text-slate-200 font-medium">{workout.equipment || "Barbell, Bench"}</span>
            </div>

            <div className="flex justify-between items-center text-slate-400">
              <span className="uppercase font-bold tracking-wider text-[10px] text-slate-400">DIFFICULTY</span>
              <span className="text-slate-200 font-medium">{workout.difficulty || "Intermediate"}</span>
            </div>

            <div className="flex justify-between items-center text-slate-400">
              <span className="uppercase font-bold tracking-wider text-[10px] text-slate-400">SETS</span>
              <span className="text-slate-200 font-medium">{workout.sets || "4"}</span>
            </div>

            <div className="flex justify-between items-center text-slate-400">
              <span className="uppercase font-bold tracking-wider text-[10px] text-slate-400">REPS</span>
              <span className="text-slate-200 font-medium">{workout.reps || "6-8"}</span>
            </div>

            <div className="flex justify-between items-center text-slate-400">
              <span className="uppercase font-bold tracking-wider text-[10px] text-slate-400">DURATION</span>
              <span className="text-slate-200 font-medium">{workout.duration || "25 min"}</span>
            </div>

            <div className="flex justify-between items-center text-slate-400">
              <span className="uppercase font-bold tracking-wider text-[10px] text-slate-400">CALORIES</span>
              <span className="text-slate-200 font-medium">{workout.calories || "180 kcal"}</span>
            </div>

            <div className="flex justify-between items-center text-slate-400">
              <span className="uppercase font-bold tracking-wider text-[10px] text-slate-400">RATING</span>
              <span className="text-slate-200 font-medium">{workout.rating || "4.8"}</span>
            </div>
          </div>

          {/* Instructions List */}
          <div className="space-y-3 pt-2">
            <h2 className="text-xs font-black text-white uppercase tracking-wider">
              INSTRUCTIONS
            </h2>

            <ol className="space-y-2.5 text-xs text-slate-400 list-decimal list-inside leading-relaxed">
              {instructions.map((step, idx) => (
                <li key={idx} className="pl-1">
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Bottom Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => addToPlan(workout)}
              className="bg-[#ccff00] hover:bg-[#b8e600] text-black font-extrabold px-5 py-3 rounded-xl text-xs uppercase flex items-center justify-center gap-2 transition-colors"
            >
              <FiCalendar className="text-sm" /> Add to today&apos;s plan
            </button>

            <button
              onClick={() => saveForLater(workout)}
              className="px-5 py-3 bg-transparent hover:bg-white/5 border border-white/10 text-slate-300 rounded-xl text-xs font-bold uppercase flex items-center justify-center gap-2 transition-colors"
            >
              <FiBookmark className="text-sm" /> Save for later
            </button>
          </div>

        </div>

      </div>
    </main>
  );
}