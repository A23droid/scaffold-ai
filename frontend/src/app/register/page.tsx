"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, UserPlus } from "lucide-react";
import { apiRegister } from "@/lib/api";

const ROLES = [
  { value: "STUDENT", label: "Student", emoji: "🎓" },
  { value: "TEACHER", label: "Teacher", emoji: "🏫" },
  { value: "PARENT",  label: "Parent",  emoji: "👨‍👩‍👧" },
];

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("STUDENT");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await apiRegister({ name, email, password, role });
      // Auto sign-in after register
      const result = await signIn("credentials", { email, password, redirect: false });
      if (result?.error) {
        setError("Registered but failed to sign in automatically. Please log in.");
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-950 via-indigo-950 to-zinc-950 px-4">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="relative w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-white font-bold text-xl tracking-tight">ScaffoldAI</span>
          </div>
          <p className="text-zinc-400 text-sm">Create your account</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-7 space-y-4 shadow-2xl"
        >
          {error && (
            <div className="bg-red-500/15 border border-red-500/30 text-red-300 text-xs px-3 py-2 rounded-lg">
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min. 6 characters"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition"
            />
          </div>

          {/* Role selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">I am a…</label>
            <div className="grid grid-cols-3 gap-2">
              {ROLES.map((r) => (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => setRole(r.value)}
                  className={`flex flex-col items-center justify-center gap-1 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
                    role === r.value
                      ? "bg-purple-500/20 border-purple-400/60 text-purple-200"
                      : "border-white/10 text-zinc-400 hover:border-white/20 hover:text-zinc-200"
                  }`}
                >
                  <span className="text-lg">{r.emoji}</span>
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 disabled:opacity-60 text-white font-semibold text-sm px-4 py-3 rounded-xl transition-all shadow-lg shadow-purple-500/20 mt-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserPlus className="w-4 h-4" />}
            {loading ? "Creating account…" : "Create Account"}
          </button>

          <p className="text-center text-xs text-zinc-500 pt-1">
            Already have an account?{" "}
            <Link href="/login" className="text-purple-400 hover:text-purple-300 font-semibold transition">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
