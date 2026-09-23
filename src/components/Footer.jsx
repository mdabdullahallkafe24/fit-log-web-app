import Link from "next/link";
import { FiActivity } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="footer footer-center p-6 bg-base-300 text-base-content border-t border-base-100/10 mt-auto">
      <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-7xl px-4 gap-4">
        <div className="flex items-center gap-2">
          <FiActivity className="text-primary text-2xl" />
          <Link href="/" className="font-bold text-lg tracking-wide">
            FIT<span className="text-primary">LOG</span>
          </Link>
        </div>
        <p className="text-sm opacity-75">
          © {new Date().getFullYear()} FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}