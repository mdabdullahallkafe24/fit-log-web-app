import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-[#ccff00] text-sm font-bold tracking-widest mb-3">
          404 ERROR
        </p>

        <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
          PAGE NOT FOUND
        </h1>

        <p className="text-slate-400 mb-8">
          Sorry, the workout page you are looking for does not exist.
        </p>

        <Link
          href="/"
          className="inline-block bg-[#ccff00] text-black font-bold px-6 py-3 rounded-lg"
        >
          BACK TO WORKOUTS
        </Link>
      </div>
    </main>
  );
}