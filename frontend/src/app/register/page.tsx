"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, UserPlus, User, Mail, Lock, GraduationCap, BookOpen, Users } from "lucide-react";
import { apiRegister } from "@/lib/api";

const ROLES = [
  { value: "STUDENT", label: "Student", Icon: GraduationCap },
  { value: "TEACHER", label: "Teacher", Icon: BookOpen },
  { value: "PARENT",  label: "Parent",  Icon: Users },
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
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background:
          "linear-gradient(135deg, #e8d5f5 0%, #d5dcf7 35%, #c8e8f0 70%, #d8efd5 100%)",
      }}
    >
      <div className="w-full max-w-sm">
        {/* Brand */}
        <div className="text-center mb-7">
          <h1
            className="text-[22px] tracking-tight"
            style={{ color: "#2d1f5e", fontFamily: "Georgia, 'Times New Roman', serif", fontWeight: 400 }}
          >
            <em>Scaffold</em>AI
          </h1>
          <p className="text-xs mt-1" style={{ color: "#7a6fa0" }}>
            Create your account
          </p>
        </div>

        {/* Card */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl p-8 space-y-4"
          style={{
            background: "rgba(255,255,255,0.65)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "0.5px solid rgba(255,255,255,0.85)",
            boxShadow: "0 8px 40px rgba(100,80,160,0.1)",
          }}
        >
          {/* Error */}
          {error && (
            <div
              className="text-xs px-3 py-2 rounded-lg"
              style={{
                background: "rgba(220,50,50,0.08)",
                border: "0.5px solid rgba(200,50,50,0.25)",
                color: "#a03030",
              }}
            >
              {error}
            </div>
          )}

          {/* Name */}
          <div className="space-y-1.5">
            <label
              className="block text-[11px] font-semibold uppercase tracking-widest"
              style={{ color: "#6b5fa0" }}
            >
              Name
            </label>
            <div className="relative">
              <User
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                style={{ color: "#9b8fc8" }}
              />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl outline-none transition-all"
                style={{
                  background: "rgba(255,255,255,0.7)",
                  border: "0.5px solid rgba(150,130,200,0.3)",
                  color: "#2d1f5e",
                }}
                onFocus={(e) => {
                  e.target.style.border = "0.5px solid rgba(130,100,200,0.6)";
                  e.target.style.boxShadow = "0 0 0 3px rgba(130,100,200,0.12)";
                }}
                onBlur={(e) => {
                  e.target.style.border = "0.5px solid rgba(150,130,200,0.3)";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label
              className="block text-[11px] font-semibold uppercase tracking-widest"
              style={{ color: "#6b5fa0" }}
            >
              Email
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                style={{ color: "#9b8fc8" }}
              />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl outline-none transition-all"
                style={{
                  background: "rgba(255,255,255,0.7)",
                  border: "0.5px solid rgba(150,130,200,0.3)",
                  color: "#2d1f5e",
                }}
                onFocus={(e) => {
                  e.target.style.border = "0.5px solid rgba(130,100,200,0.6)";
                  e.target.style.boxShadow = "0 0 0 3px rgba(130,100,200,0.12)";
                }}
                onBlur={(e) => {
                  e.target.style.border = "0.5px solid rgba(150,130,200,0.3)";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label
              className="block text-[11px] font-semibold uppercase tracking-widest"
              style={{ color: "#6b5fa0" }}
            >
              Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                style={{ color: "#9b8fc8" }}
              />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min. 6 characters"
                className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl outline-none transition-all"
                style={{
                  background: "rgba(255,255,255,0.7)",
                  border: "0.5px solid rgba(150,130,200,0.3)",
                  color: "#2d1f5e",
                }}
                onFocus={(e) => {
                  e.target.style.border = "0.5px solid rgba(130,100,200,0.6)";
                  e.target.style.boxShadow = "0 0 0 3px rgba(130,100,200,0.12)";
                }}
                onBlur={(e) => {
                  e.target.style.border = "0.5px solid rgba(150,130,200,0.3)";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>
          </div>

          {/* Divider */}
          <hr style={{ border: "none", borderTop: "0.5px solid rgba(150,130,200,0.2)" }} />

          {/* Role selector */}
          <div className="space-y-2">
            <label
              className="block text-[11px] font-semibold uppercase tracking-widest"
              style={{ color: "#6b5fa0" }}
            >
              I am a…
            </label>
            <div className="grid grid-cols-3 gap-2">
              {ROLES.map(({ value, label, Icon }) => {
                const active = role === value;
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setRole(value)}
                    className="flex flex-col items-center justify-center gap-1.5 py-3 rounded-xl transition-all text-xs font-semibold"
                    style={{
                      background: active
                        ? "rgba(190,170,240,0.25)"
                        : "rgba(255,255,255,0.5)",
                      border: active
                        ? "0.5px solid rgba(110,80,190,0.55)"
                        : "0.5px solid rgba(150,130,200,0.3)",
                      color: active ? "#4a2fa0" : "#7a6fa0",
                    }}
                  >
                    <Icon
                      className="w-4 h-4"
                      style={{ color: active ? "#6040c0" : "#9b8fc8" }}
                    />
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-60"
            style={{
              background: "linear-gradient(135deg, #7b5ccc 0%, #a06abf 100%)",
            }}
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <UserPlus className="w-4 h-4" />
            )}
            {loading ? "Creating account…" : "Create Account"}
          </button>

          <p className="text-center text-xs pt-1" style={{ color: "#8a7fac" }}>
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold transition"
              style={{ color: "#7050c0" }}
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}