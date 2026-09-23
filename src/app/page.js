import HeroSection from "@/components/HeroSection";
import WorkoutGrid from "@/components/WorkoutGrid";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <HeroSection />
      <WorkoutGrid />
    </div>
  );
}
