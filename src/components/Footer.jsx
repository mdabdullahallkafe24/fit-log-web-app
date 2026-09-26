import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#0b0d0f] border-t border-white/10 py-8 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="FitLog Logo"
            width={24}
            height={24}
          />

          <span className="text-sm font-black tracking-wider text-white">
            FITLOG
          </span>
        </div>

        <p className="text-xs text-slate-500 text-center">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}