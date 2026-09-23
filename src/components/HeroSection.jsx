import Image from "next/image";

export default function HeroSection() {
  return (
    <div className="bg-[#121418] rounded-3xl p-8 md:p-12 my-8 border border-white/5 relative overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="space-y-6 max-w-xl">
          <span className="text-[#ccff00] text-xs font-extrabold tracking-widest uppercase">
            WORKOUT LIBRARY
          </span>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-none uppercase tracking-tight">
            TRAIN WITH INTENT. LOG EVERY SET.
          </h1>
          
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          
          <div>
            <button className="bg-[#ccff00] hover:bg-[#b8e600] text-black font-black px-6 py-3 rounded-lg transition-colors uppercase text-xs tracking-wider">
              BROWSE WORKOUTS
            </button>
          </div>
        </div>

        <div className="relative w-full max-w-sm h-64 md:h-80 flex justify-center items-center">
          <Image
            src="/banner.png" 
            alt="Workout Banner"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}