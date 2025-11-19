import { Menu } from "lucide-react";

export default function Navbar({ onOpenRequest }) {
  return (
    <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/70 border-b border-slate-200/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-slate-900 text-white grid place-items-center font-bold">M</div>
          <span className="font-semibold text-slate-900">MendMarket</span>
        </a>
        <div className="flex items-center gap-3">
          <a href="#providers" className="text-slate-700 hover:text-slate-900 hidden sm:inline">Browse</a>
          <button onClick={onOpenRequest} className="inline-flex items-center rounded-lg bg-slate-900 text-white px-4 py-2 text-sm font-medium hover:bg-slate-800 transition-colors">
            Post a job
          </button>
          <button className="sm:hidden p-2 rounded-lg hover:bg-slate-100">
            <Menu className="h-5 w-5 text-slate-700" />
          </button>
        </div>
      </div>
    </header>
  );
}
