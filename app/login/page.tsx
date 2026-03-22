"use client";

import { useState } from "react";
import { Bot, Eye, EyeOff, Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

import { insforge } from "@/lib/insforge";

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/app";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { data, error: authError } = await insforge.auth.signInWithPassword({
      email,
      password,
    });

    if (data) {
      window.location.href = redirect;
    } else {
      setError(authError?.message || "Invalid email or password");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4" style={{ background: "#0a0a0a" }}>
      {/* Ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl" style={{ background: "rgba(0,255,156,0.03)" }} />
        <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] rounded-full blur-3xl" style={{ background: "rgba(0,217,255,0.03)" }} />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-10 gap-4">
          <div className="h-14 w-14 rounded-2xl flex items-center justify-center shadow-lg" style={{ background: "#00ff9c", boxShadow: "0 8px 32px rgba(0,255,156,0.25)" }}>
            <Bot className="h-7 w-7" style={{ color: "#0a0a0a" }} strokeWidth={2} />
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight" style={{ color: "#00ff9c", fontFamily: "'Orbitron', sans-serif" }}>Speak-Club</h1>
            <p className="text-[14px] mt-1" style={{ color: "#666" }}>AI Voice Agent Management Platform</p>
          </div>
        </div>

        {/* Card */}
        <div className="rounded-2xl backdrop-blur-xl p-8 shadow-2xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(0,255,156,0.1)" }}>
          <h2 className="text-[20px] font-bold mb-1" style={{ color: "#e6e6e6" }}>Welcome back</h2>
          <p className="text-[13px] mb-7" style={{ color: "#666" }}>Sign in to access the dashboard</p>

          {error && (
            <div className="mb-5 px-4 py-3 rounded-xl text-[13px] font-medium" style={{ background: "rgba(255,0,0,0.08)", border: "1px solid rgba(255,0,0,0.15)", color: "#ff6b6b" }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[12px] font-semibold uppercase tracking-wider mb-2" style={{ color: "#555" }}>
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@speak-club.io"
                required
                className="w-full px-4 py-3 text-[14px] rounded-xl focus:outline-none transition-all"
                style={{ color: "#e6e6e6", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", }}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-[12px] font-semibold uppercase tracking-wider" style={{ color: "#555" }}>
                  Password
                </label>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 text-[14px] rounded-xl focus:outline-none transition-all pr-12"
                  style={{ color: "#e6e6e6", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 transition-colors"
                  style={{ color: "#555" }}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 disabled:opacity-60 disabled:cursor-not-allowed text-[14px] font-semibold rounded-xl transition-all"
              style={{ background: "#00ff9c", color: "#0a0a0a", boxShadow: "0 4px 24px rgba(0,255,156,0.2)" }}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Authenticating...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-[12px] mt-6" style={{ color: "#333" }}>
          © 2025 Speak-Club. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" style={{ background: "#0a0a0a" }} />}>
      <LoginForm />
    </Suspense>
  );
}
