"use client";

import Link from "next/link";
import Image from "next/image";
import { usePlan } from "@/context/PlanContext";
import { FiPlus, FiBookmark, FiClock, FiActivity, FiStar } from "react-icons/fi";

export default function WorkoutCard({ workout }) {
  const { addToPlan, saveForLater } = usePlan();

  return (
    <div className="bg-[#15191f] border border-white/10 rounded-xl overflow-hidden shadow-lg hover:border-[#ccff00]/40 transition-all duration-300">
      <Link href={`/workout/${workout.id}`}>
        <div className="relative h-52 w-full overflow-hidden bg-[#0e1117]">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            className="object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
      </Link>

      <div className="p-5">
        <div className="flex flex-wrap gap-2 mb-3">
          {workout.muscleGroups?.map((group) => (
            <span
              key={group}
              className="text-xs font-bold uppercase px-2.5 py-1 rounded-full bg-[#ccff00]/10 text-[#ccff00]"
            >
              {group}
            </span>
          ))}
        </div>

        <Link href={`/workout/${workout.id}`}>
          <h2 className="text-xl font-bold text-white uppercase hover:text-[#ccff00] transition-colors">
            {workout.name}
          </h2>
        </Link>

        <p className="text-sm text-slate-400 mt-2">
          {workout.equipment}
        </p>

        <div className="flex flex-wrap items-center gap-4 mt-5 text-sm text-slate-300">
          <div className="flex items-center gap-1.5">
            <FiClock className="text-[#ccff00]" />
            <span>{workout.duration} min</span>
          </div>

          <div className="flex items-center gap-1.5">
            <FiActivity className="text-[#ccff00]" />
            <span>{workout.caloriesBurned} kcal</span>
          </div>

          <div className="flex items-center gap-1.5">
            <FiStar className="text-[#ccff00]" />
            <span>{workout.rating}</span>
          </div>
        </div>

        <div className="flex gap-2 mt-5">
          <button
            onClick={() => addToPlan(workout)}
            className="flex-1 flex items-center justify-center gap-2 bg-[#ccff00] text-black font-bold text-sm rounded-lg px-3 py-2.5 hover:bg-[#d9ff4d] transition-colors"
          >
            <FiPlus />
            Add to Plan
          </button>

          <button
            onClick={() => saveForLater(workout)}
            className="border border-white/20 text-white rounded-lg px-3 py-2.5 hover:border-[#ccff00] hover:text-[#ccff00] transition-colors"
            title="Save for Later"
          >
            <FiBookmark />
          </button>
        </div>

        <Link
          href={`/workout/${workout.id}`}
          className="flex items-center justify-center w-full mt-3 border border-white/10 text-slate-300 rounded-lg py-2.5 text-sm hover:bg-white/5 hover:text-white transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}