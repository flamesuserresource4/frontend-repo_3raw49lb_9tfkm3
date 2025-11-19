import Auth from "./components/Auth";

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="mb-8 text-center">
          <a href="/" className="inline-flex items-center gap-2 text-slate-700 hover:text-slate-900">
            <div className="h-9 w-9 rounded-lg bg-slate-900 text-white grid place-items-center font-bold">M</div>
            <span className="font-semibold">MendMarket</span>
          </a>
          <p className="mt-2 text-slate-600">Sign in or create an account as a requester or provider.</p>
        </div>
        <Auth onSuccess={() => (window.location.href = "/")} />
      </div>
    </div>
  );
}
