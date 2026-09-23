"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { usePlan } from "@/context/PlanContext";
import { FiArrowLeft, FiPlus, FiBookmark, FiClock, FiTarget } from "react-icons/fi";

export default function WorkoutDetails({ params }) {
  const { id } = use(params);
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToPlan, saveForLater } = usePlan();

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/ProgrammingHero1/fitness-api/main/fitness.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((item) => String(item.id) === String(id));
        setWorkout(found);
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
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="text-center py-20 space-y-4">
        <h2 className="text-2xl font-bold text-white">Workout Not Found</h2>
        <Link href="/" className="btn btn-primary btn-sm">
          Back to Workouts
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Link href="/" className="btn btn-ghost btn-sm gap-2 mb-6 text-slate-400">
        <FiArrowLeft /> Back to Library
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-base-200 border border-base-100/10 rounded-2xl p-6 md:p-8">
        <div className="relative rounded-xl overflow-hidden bg-base-300 h-72 md:h-full min-h-[300px]">
          <img
            src={workout.image || "/placeholder.jpg"}
            alt={workout.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="badge badge-primary font-semibold">
              {workout.category}
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold text-white">
              {workout.name}
            </h1>

            <p className="text-slate-300 leading-relaxed">
              {workout.description}
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="bg-base-300 p-3 rounded-lg flex items-center gap-3">
                <FiClock className="text-primary text-xl" />
                <div>
                  <p className="text-xs text-slate-400">Duration</p>
                  <p className="text-sm font-semibold text-white">{workout.duration || "15-20 mins"}</p>
                </div>
              </div>

              <div className="bg-base-300 p-3 rounded-lg flex items-center gap-3">
                <FiTarget className="text-secondary text-xl" />
                <div>
                  <p className="text-xs text-slate-400">Target Muscle</p>
                  <p className="text-sm font-semibold text-white">{workout.target || "Full Body"}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-base-100/10">
            <button
              onClick={() => addToPlan(workout)}
              className="btn btn-primary flex-1 gap-2"
            >
              <FiPlus className="text-lg" /> Add to Today's Plan
            </button>
            <button
              onClick={() => saveForLater(workout)}
              className="btn btn-outline btn-secondary"
              title="Save for Later"
            >
              <FiBookmark className="text-lg" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}