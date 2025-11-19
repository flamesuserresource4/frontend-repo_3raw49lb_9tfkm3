import { Menu } from "lucide-react";
import { useEffect, useState } from "react";

export default function Navbar({ onOpenRequest }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const u = localStorage.getItem("auth_user");
      if (u) setUser(JSON.parse(u));
    } catch {}
  }, []);

  const logout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
    setUser(null);
  };

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
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-700">Hi, {user.name.split(" ")[0]}</span>
              <button onClick={logout} className="text-sm text-slate-600 hover:text-slate-900">Logout</button>
            </div>
          ) : (
            <a href="/auth" className="text-sm text-slate-700 hover:text-slate-900">Sign in</a>
          )}
          <button className="sm:hidden p-2 rounded-lg hover:bg-slate-100">
            <Menu className="h-5 w-5 text-slate-700" />
          </button>
        </div>
      </div>
    </header>
  );
}
