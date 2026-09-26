import WorkoutCard from "./WorkoutCard";

export default function WorkoutGrid({ workouts }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {workouts.map((workout) => (
        <WorkoutCard
          key={workout.id}
          workout={workout}
        />
      ))}
    </div>
  );
}