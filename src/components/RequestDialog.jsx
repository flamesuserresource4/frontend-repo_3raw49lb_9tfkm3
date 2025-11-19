import { useState } from "react";

export default function RequestDialog({ open, onClose }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    trade: "plumber",
    city: "",
    title: "",
    details: "",
    budget: "",
  });
  const [status, setStatus] = useState(null);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setStatus("Submitting...");
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";
      const res = await fetch(`${baseUrl}/requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          budget: form.budget ? Number(form.budget) : undefined,
        }),
      });
      if (!res.ok) throw new Error("Failed to submit");
      setStatus("Request submitted! We'll email you matches.");
      setForm({ name: "", email: "", phone: "", trade: "plumber", city: "", title: "", details: "", budget: "" });
    } catch (e) {
      setStatus("There was an error. Please try again.");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 grid place-items-center bg-black/40 p-4" onClick={onClose}>
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-slate-900">Post a job request</h3>
          <p className="text-sm text-slate-600">Tell us what you need and we'll connect you with pros.</p>
        </div>
        <form onSubmit={submit} className="p-6 space-y-4">
          <div className="grid sm:grid-cols-2 gap-3">
            <input name="name" value={form.name} onChange={onChange} required placeholder="Your name" className="border rounded-lg px-3 py-2" />
            <input name="email" type="email" value={form.email} onChange={onChange} required placeholder="Email" className="border rounded-lg px-3 py-2" />
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <input name="phone" value={form.phone} onChange={onChange} placeholder="Phone (optional)" className="border rounded-lg px-3 py-2" />
            <input name="city" value={form.city} onChange={onChange} placeholder="City" className="border rounded-lg px-3 py-2" />
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <select name="trade" value={form.trade} onChange={onChange} className="border rounded-lg px-3 py-2">
              <option value="plumber">Plumber</option>
              <option value="electrician">Electrician</option>
            </select>
            <input name="title" value={form.title} onChange={onChange} required placeholder="Short title (e.g., Fix leaking sink)" className="border rounded-lg px-3 py-2" />
          </div>
          <textarea name="details" value={form.details} onChange={onChange} rows={4} placeholder="Additional details" className="border rounded-lg px-3 py-2 w-full" />
          <input name="budget" value={form.budget} onChange={onChange} placeholder="Budget (optional)" className="border rounded-lg px-3 py-2 w-full" />
          <div className="flex items-center justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg border">Cancel</button>
            <button type="submit" className="px-4 py-2 rounded-lg bg-slate-900 text-white">Submit</button>
          </div>
          {status && <p className="text-sm text-slate-600">{status}</p>}
        </form>
      </div>
    </div>
  );
}
