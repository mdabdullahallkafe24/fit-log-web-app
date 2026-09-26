"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePlan } from "@/context/PlanContext";
import { FiCalendar, FiBookmark, FiStar } from "react-icons/fi";

export default function WorkoutDetails({ params }) {
  const { id } = use(params);

  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);

  const { addToPlan, saveForLater } = usePlan();

  useEffect(() => {
    const getWorkout = async () => {
      try {
        const response = await fetch(
          `https://api.abcz.workers.dev/api/fitlog/${id}`
        );

        if (!response.ok) {
          throw new Error("Workout not found");
        }

        const data = await response.json();

        setWorkout(data);
      } catch (error) {
        console.error("Error loading workout:", error);
        setWorkout(null);
      } finally {
        setLoading(false);
      }
    };

    getWorkout();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-white/20 border-t-[#ccff00] rounded-full animate-spin mx-auto mb-4"></div>

          <p className="text-slate-400">
            Loading workout...
          </p>
        </div>
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-5 px-4">
        <h2 className="text-2xl font-bold text-white">
          Workout Not Found
        </h2>

        <p className="text-slate-400 text-center">
          The workout you are looking for does not exist.
        </p>

        <Link
          href="/"
          className="bg-[#ccff00] text-black font-bold px-5 py-3 rounded-lg text-sm uppercase"
        >
          Back to Workouts
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0b0d0f] text-slate-200 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        <div className="relative w-full aspect-square rounded-3xl overflow-hidden bg-[#121418] border border-white/10">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="space-y-7">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
              {workout.name}
            </h1>

            <p className="text-slate-400 mt-4 leading-relaxed">
              {workout.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-5">
              {workout.muscleGroups.map((group) => (
                <span
                  key={group}
                  className="bg-[#ccff00] text-black text-xs font-black px-3 py-1.5 rounded-full uppercase"
                >
                  {group}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-[#121418] border border-white/10 rounded-2xl p-5 sm:p-6">
            <h2 className="text-sm font-black text-white uppercase tracking-wider mb-5">
              KEY SPECS
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between gap-4 border-b border-white/5 pb-3">
                <span className="text-xs text-slate-500 font-bold uppercase">
                  Equipment
                </span>

                <span className="text-sm text-slate-200 text-right">
                  {workout.equipment}
                </span>
              </div>

              <div className="flex justify-between gap-4 border-b border-white/5 pb-3">
                <span className="text-xs text-slate-500 font-bold uppercase">
                  Difficulty
                </span>

                <span className="text-sm text-slate-200">
                  {workout.difficulty}
                </span>
              </div>

              <div className="flex justify-between gap-4 border-b border-white/5 pb-3">
                <span className="text-xs text-slate-500 font-bold uppercase">
                  Sets
                </span>

                <span className="text-sm text-slate-200">
                  {workout.sets}
                </span>
              </div>

              <div className="flex justify-between gap-4 border-b border-white/5 pb-3">
                <span className="text-xs text-slate-500 font-bold uppercase">
                  Reps
                </span>

                <span className="text-sm text-slate-200">
                  {workout.reps}
                </span>
              </div>

              <div className="flex justify-between gap-4 border-b border-white/5 pb-3">
                <span className="text-xs text-slate-500 font-bold uppercase">
                  Duration
                </span>

                <span className="text-sm text-slate-200">
                  {workout.duration} min
                </span>
              </div>

              <div className="flex justify-between gap-4 border-b border-white/5 pb-3">
                <span className="text-xs text-slate-500 font-bold uppercase">
                  Calories
                </span>

                <span className="text-sm text-slate-200">
                  {workout.caloriesBurned} kcal
                </span>
              </div>

              <div className="flex justify-between items-center gap-4">
                <span className="text-xs text-slate-500 font-bold uppercase">
                  Rating
                </span>

                <span className="flex items-center gap-1.5 text-sm text-slate-200">
                  <FiStar className="text-[#ccff00]" />
                  {workout.rating}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-black text-white uppercase tracking-wider mb-4">
              INSTRUCTIONS
            </h2>

            <ol className="space-y-4">
              {workout.instructions.map((step, index) => (
                <li
                  key={index}
                  className="flex gap-3 text-sm text-slate-400 leading-relaxed"
                >
                  <span className="shrink-0 w-7 h-7 rounded-full bg-[#ccff00] text-black flex items-center justify-center font-black text-xs">
                    {index + 1}
                  </span>

                  <span className="pt-1">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => addToPlan(workout)}
              className="flex-1 bg-[#ccff00] hover:bg-[#b8e600] text-black font-black px-5 py-3.5 rounded-xl text-sm uppercase flex items-center justify-center gap-2 transition-colors"
            >
              <FiCalendar />
              Add to today&apos;s plan
            </button>

            <button
              onClick={() => saveForLater(workout)}
              className="flex-1 px-5 py-3.5 bg-transparent hover:bg-white/5 border border-white/15 text-slate-300 rounded-xl text-sm font-bold uppercase flex items-center justify-center gap-2 transition-colors"
            >
              <FiBookmark />
              Save for later
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}