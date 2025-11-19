import { useState } from "react";

export default function Auth({ onSuccess }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "requester",
  });
  const [status, setStatus] = useState(null);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setStatus(mode === "login" ? "Signing in..." : "Creating account...");
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";
      const endpoint = mode === "login" ? "/auth/login" : "/auth/register";
      const payload = mode === "login" ? {
        email: form.email,
        password: form.password,
      } : {
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
      };
      const res = await fetch(`${baseUrl}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.detail || "Request failed");
      }
      const data = await res.json();
      localStorage.setItem("auth_token", data.token);
      localStorage.setItem("auth_user", JSON.stringify(data.user));
      setStatus("Success");
      onSuccess?.(data);
    } catch (e) {
      setStatus(e.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl border">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-slate-900">
          {mode === "login" ? "Welcome back" : "Create your account"}
        </h2>
        <button
          className="text-sm text-slate-600 hover:text-slate-900"
          onClick={() => setMode((m) => (m === "login" ? "register" : "login"))}
        >
          {mode === "login" ? "Need an account? Sign up" : "Have an account? Sign in"}
        </button>
      </div>

      <form onSubmit={submit} className="space-y-3">
        {mode === "register" && (
          <>
            <input name="name" value={form.name} onChange={onChange} required placeholder="Full name" className="w-full border rounded-lg px-3 py-2" />
            <div className="grid grid-cols-2 gap-2">
              <label className="flex items-center gap-2 text-sm border rounded-lg px-3 py-2">
                <input type="radio" name="role" value="requester" checked={form.role === "requester"} onChange={onChange} />
                Requester
              </label>
              <label className="flex items-center gap-2 text-sm border rounded-lg px-3 py-2">
                <input type="radio" name="role" value="provider" checked={form.role === "provider"} onChange={onChange} />
                Provider
              </label>
            </div>
          </>
        )}
        <input name="email" type="email" value={form.email} onChange={onChange} required placeholder="Email" className="w-full border rounded-lg px-3 py-2" />
        <input name="password" type="password" value={form.password} onChange={onChange} required placeholder="Password" className="w-full border rounded-lg px-3 py-2" />
        <button type="submit" className="w-full rounded-lg bg-slate-900 text-white px-4 py-2 font-medium">
          {mode === "login" ? "Sign in" : "Create account"}
        </button>
        {status && <p className="text-sm text-slate-600">{status}</p>}
      </form>
    </div>
  );
}
