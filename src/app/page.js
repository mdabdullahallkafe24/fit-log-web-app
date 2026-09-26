"use client";

import { useEffect, useState } from "react";
import HeroSection from "@/components/HeroSection";
import WorkoutGrid from "@/components/WorkoutGrid";

export default function Home() {
  const [workouts, setWorkouts] = useState([]);
  const [sortBy, setSortBy] = useState("duration");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getWorkouts = async () => {
      try {
        const response = await fetch(
          "https://api.abcz.workers.dev/api/fitlog"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch workouts");
        }

        const data = await response.json();

        setWorkouts(data);
      } catch (error) {
        setError("Failed to load workouts. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    getWorkouts();
  }, []);

  const sortedWorkouts = [...workouts].sort((a, b) => {
    if (sortBy === "duration") {
      return a.duration - b.duration;
    }

    if (sortBy === "calories") {
      return a.caloriesBurned - b.caloriesBurned;
    }

    if (sortBy === "rating") {
      return b.rating - a.rating;
    }

    return 0;
  });

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <HeroSection />

      <section id="library" className="py-10 sm:py-14">
        <div className="mb-8">
          <p className="text-[#ccff00] text-sm font-bold tracking-widest uppercase mb-2">
            WORKOUT LIBRARY
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-wide">
                THE LIBRARY
              </h2>

              <p className="text-slate-400 mt-2">
                Twelve lifts covering every major muscle group.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <label
                htmlFor="sort"
                className="text-sm text-slate-400 font-medium"
              >
                Sort By
              </label>

              <select
                id="sort"
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="bg-[#0b0d0f] border border-white/10 rounded-lg px-4 py-2 text-sm text-white outline-none"
              >
                <option value="duration">Duration</option>
                <option value="calories">Calories</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>
        </div>

        {loading && (
          <div className="min-h-[300px] flex items-center justify-center">
            <div className="text-center">
              <div className="w-10 h-10 border-4 border-white/20 border-t-[#ccff00] rounded-full animate-spin mx-auto mb-4"></div>

              <p className="text-slate-400">
                Loading workouts...
              </p>
            </div>
          </div>
        )}

        {!loading && error && (
          <div className="min-h-[300px] flex items-center justify-center">
            <p className="text-red-400 text-center">
              {error}
            </p>
          </div>
        )}

        {!loading && !error && (
          <WorkoutGrid workouts={sortedWorkouts} />
        )}
      </section>
    </main>
  );
}