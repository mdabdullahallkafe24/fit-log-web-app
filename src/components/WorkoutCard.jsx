"use client";

import Link from "next/link";
import { usePlan } from "@/context/PlanContext";
import { FiPlus, FiBookmark, FiEye } from "react-icons/fi";

export default function WorkoutCard({ workout }) {
  const { addToPlan, saveForLater } = usePlan();

  return (
    <div className="card bg-base-200 border border-base-100/10 shadow-lg hover:shadow-primary/10 transition-all duration-300 flex flex-col justify-between">
      <figure className="relative h-48 w-full overflow-hidden bg-base-300">
        <img
          src={workout.image || "/placeholder.jpg"}
          alt={workout.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 badge badge-primary font-semibold">
          {workout.category}
        </div>
      </figure>

      <div className="card-body p-5 flex-grow flex flex-col justify-between space-y-4">
        <div>
          <h2 className="card-title text-xl font-bold text-white mb-2">
            {workout.name}
          </h2>
          <p className="text-sm text-slate-400 line-clamp-2">
            {workout.description}
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <div className="flex gap-2">
            <button
              onClick={() => addToPlan(workout)}
              className="btn btn-primary btn-sm flex-1 gap-1"
            >
              <FiPlus className="text-base" /> Add to Plan
            </button>
            <button
              onClick={() => saveForLater(workout)}
              className="btn btn-outline btn-secondary btn-sm"
              title="Save for Later"
            >
              <FiBookmark className="text-base" />
            </button>
          </div>

          <Link
            href={`/workout/${workout.id}`}
            className="btn btn-ghost btn-sm w-full gap-2 text-slate-300 border border-base-100/20"
          >
            <FiEye /> View Details
          </Link>
        </div>
      </div>
    </div>
  );
}