export default function ProviderCard({ provider }) {
  return (
    <div className="rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow bg-white">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-white font-semibold">
              {provider.name?.[0] || "P"}
            </span>
            <div>
              <h3 className="font-semibold text-slate-900">{provider.name}</h3>
              <p className="text-sm text-slate-600 capitalize">{provider.trade}</p>
            </div>
          </div>
          {provider.city && (
            <p className="mt-3 text-sm text-slate-600">{provider.city}</p>
          )}
          {provider.description && (
            <p className="mt-2 text-sm text-slate-700 line-clamp-3">{provider.description}</p>
          )}
        </div>
        <div className="text-right">
          {provider.hourly_rate != null && (
            <p className="text-slate-900 font-semibold">${provider.hourly_rate}/hr</p>
          )}
          <p className="text-sm text-slate-600">⭐ {provider.rating ?? 4.8} ({provider.review_count ?? 0})</p>
        </div>
      </div>
      {provider.badges?.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {provider.badges.map((b) => (
            <span key={b} className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
              {b}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
