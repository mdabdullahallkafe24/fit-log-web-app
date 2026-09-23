"use client";

import { useEffect, useState } from "react";
import WorkoutCard from "./WorkoutCard";

export default function WorkoutGrid() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.abcz.workers.dev/api/fitlog")
      .then((res) => res.json())
      .then((data) => {
        const result = Array.isArray(data) ? data : data.data || [];
        setWorkouts(result);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching workouts:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <section className="my-12 px-4 max-w-7xl mx-auto">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-white">Workout Library</h2>
          <p className="text-slate-400 mt-1">
            Select exercises to add to your daily fitness plan
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {workouts.map((workout, index) => (
          <WorkoutCard key={workout.id || workout._id || index} workout={workout} />
        ))}
      </div>
    </section>
  );
}