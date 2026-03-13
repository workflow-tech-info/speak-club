"use client";

import { useState } from "react";
import Link from "next/link";
import { Bot, Eye, EyeOff, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate login
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 px-4">
      {/* Ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-indigo-500/5 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-10 gap-4">
          <div className="h-14 w-14 rounded-2xl bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/25">
            <Bot className="h-7 w-7 text-white" strokeWidth={2} />
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white tracking-tight">Speak Club</h1>
            <p className="text-zinc-400 text-[14px] mt-1">AI Voice Agent Management Platform</p>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl backdrop-blur-xl p-8 shadow-2xl">
          <h2 className="text-[20px] font-bold text-white mb-1">Welcome back</h2>
          <p className="text-zinc-400 text-[13px] mb-7">Sign in to your account to continue</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[12px] font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@agency.io"
                required
                className="w-full px-4 py-3 text-[14px] text-white bg-white/[0.06] border border-white/[0.1] rounded-xl placeholder-zinc-600 focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30 transition-all"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-[12px] font-semibold text-zinc-400 uppercase tracking-wider">
                  Password
                </label>
                <button type="button" className="text-[12px] text-blue-400 hover:text-blue-300 transition-colors font-medium">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 text-[14px] text-white bg-white/[0.06] border border-white/[0.1] rounded-xl placeholder-zinc-600 focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/30 transition-all pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 rounded border-zinc-600 bg-zinc-800 text-blue-500 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer"
              />
              <label htmlFor="remember" className="text-[13px] text-zinc-400 cursor-pointer select-none">
                Remember me for 30 days
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-blue-500 hover:bg-blue-400 disabled:opacity-60 disabled:cursor-not-allowed text-white text-[14px] font-semibold rounded-xl transition-all shadow-lg shadow-blue-500/25"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/[0.06] text-center">
            <p className="text-[13px] text-zinc-500">
              Don&apos;t have an account?{" "}
              <button className="text-blue-400 hover:text-blue-300 transition-colors font-medium">
                Contact your admin
              </button>
            </p>
          </div>
        </div>

        <p className="text-center text-[12px] text-zinc-600 mt-6">
          © 2025 Speak Club. All rights reserved.
        </p>
      </div>
    </div>
  );
}
