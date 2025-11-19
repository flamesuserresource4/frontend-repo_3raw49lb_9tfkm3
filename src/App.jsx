import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Providers from "./components/Providers";
import RequestDialog from "./components/RequestDialog";

function App() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar onOpenRequest={() => setOpen(true)} />
      <Hero onOpenRequest={() => setOpen(true)} />
      <Providers />
      <footer className="border-t mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 text-sm text-slate-600 flex items-center justify-between">
          <p>© {new Date().getFullYear()} MendMarket</p>
          <a href="/test" className="hover:text-slate-900">System status</a>
        </div>
      </footer>
      <RequestDialog open={open} onClose={() => setOpen(false)} />
    </div>
  );
}

export default App
