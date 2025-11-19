export default function Hero({ onOpenRequest }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60rem_30rem_at_20%_-20%,rgba(59,130,246,0.25),transparent),radial-gradient(40rem_20rem_at_80%_0%,rgba(16,185,129,0.2),transparent)]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-24">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight text-white">
            Hire trusted plumbers and electricians fast
          </h1>
          <p className="mt-6 text-lg text-slate-200/90">
            A minimalist marketplace to discover vetted local pros, compare prices, and get your job done right.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={onOpenRequest} className="inline-flex items-center rounded-lg bg-white text-slate-900 px-5 py-3 font-medium hover:bg-slate-100 transition-colors">
              Post a job request
            </button>
            <a href="#providers" className="inline-flex items-center rounded-lg border border-white/30 text-white px-5 py-3 font-medium hover:bg-white/10">
              Browse providers
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
