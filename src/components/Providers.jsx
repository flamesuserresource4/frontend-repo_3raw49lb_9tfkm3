import { useEffect, useState } from "react";
import ProviderCard from "./ProviderCard";

export default function Providers() {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ trade: "", city: "" });

  useEffect(() => {
    fetchProviders();
  }, []);

  const fetchProviders = async () => {
    try {
      setLoading(true);
      const baseUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";
      const params = new URLSearchParams();
      if (filters.trade) params.set("trade", filters.trade);
      if (filters.city) params.set("city", filters.city);
      const res = await fetch(`${baseUrl}/providers?${params.toString()}`);
      const data = await res.json();
      setProviders(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const onFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((f) => ({ ...f, [name]: value }));
  };

  const onApply = () => {
    fetchProviders();
  };

  return (
    <section id="providers" className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="flex items-end justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Top providers</h2>
          <p className="text-slate-600">Browse plumbers and electricians near you</p>
        </div>
        <div className="flex gap-2">
          <select name="trade" value={filters.trade} onChange={onFilterChange} className="border rounded-lg px-3 py-2">
            <option value="">All trades</option>
            <option value="plumber">Plumbers</option>
            <option value="electrician">Electricians</option>
          </select>
          <input name="city" value={filters.city} onChange={onFilterChange} placeholder="City" className="border rounded-lg px-3 py-2" />
          <button onClick={onApply} className="rounded-lg bg-slate-900 text-white px-4 py-2 font-medium">Apply</button>
        </div>
      </div>

      {loading ? (
        <p className="text-slate-600">Loading...</p>
      ) : providers?.length ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {providers.map((p) => (
            <ProviderCard key={p._id || p.id} provider={p} />)
          )}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-slate-300 p-10 text-center text-slate-600">
          No providers yet. Be the first to join and get discovered.
        </div>
      )}
    </section>
  );
}
