import { FiChevronRight, FiBarChart3 } from "react-icons/fi";

export default function HeroSection() {
  return (
    <div className="hero bg-[#161a22] rounded-2xl py-12 md:py-20 px-6 md:px-12 my-8 md:my-12">
      <div className="hero-content flex-col lg:flex-row gap-12 max-w-7xl mx-auto items-center">
        
        <div className="flex-1 text-center lg:text-left space-y-6">
          <div className="flex items-center gap-2 justify-center lg:justify-start">
            <div className="w-10 h-1 rounded-full bg-primary"></div>
            <span className="text-primary uppercase font-bold tracking-widest text-sm">
              Workout Library
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white tracking-tighter">
            Train with Intent.<br /> 
            Log <span className="text-primary">Every</span> Set.
          </h1>
          
          <p className="text-lg text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            FitLog is your ultimate gym companion. Explore 100+ precision lifts, lock them into your daily plan, and watch your progress soar. Build strength, build habits.
          </p>
          
          <div className="pt-4">
            <button className="btn btn-primary btn-lg rounded-full font-bold gap-3 group text-base px-10">
              Browse Workouts
              <FiChevronRight className="text-2xl group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        <div className="flex-none w-full max-w-sm lg:max-w-md bg-base-200/50 p-6 md:p-8 rounded-3xl border border-base-100/20 shadow-2xl shadow-primary/5">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <FiBarChart3 className="text-3xl text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Focus on Precision</h3>
                <p className="text-sm text-slate-400">Detailed form guides for max efficiency.</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-secondary/10 rounded-xl">
                <FiChevronRight className="text-3xl text-secondary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Daily Planning</h3>
                <p className="text-sm text-slate-400">Add lifts to today's schedule easily.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}