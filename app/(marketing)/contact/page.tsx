"use client";

import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-24">
      <section className="py-24 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6" style={{ fontFamily: "'Orbitron', sans-serif", color: "#e6e6e6" }}>
            Get in <span style={{ color: "#00ff9c" }}>Touch</span>
          </h1>
          <p className="text-[16px] max-w-xl mx-auto" style={{ color: "#888" }}>
            Ready to transform your voice operations? Let&apos;s talk.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-xl mx-auto px-4">
          {submitted ? (
            <div className="text-center rounded-2xl p-12" style={{ background: "rgba(0,255,156,0.03)", border: "1px solid rgba(0,255,156,0.15)" }}>
              <div className="text-4xl mb-4">✓</div>
              <h2 className="text-xl font-bold mb-2" style={{ color: "#00ff9c", fontFamily: "'Orbitron', sans-serif" }}>Message Sent</h2>
              <p className="text-[14px]" style={{ color: "#888" }}>We&apos;ll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-[12px] font-semibold uppercase tracking-wider mb-2" style={{ color: "#555" }}>Name</label>
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  className="w-full px-4 py-3 text-[14px] rounded-xl focus:outline-none transition-all"
                  style={{ color: "#e6e6e6", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                />
              </div>
              <div>
                <label className="block text-[12px] font-semibold uppercase tracking-wider mb-2" style={{ color: "#555" }}>Email</label>
                <input
                  type="email"
                  required
                  placeholder="you@company.com"
                  className="w-full px-4 py-3 text-[14px] rounded-xl focus:outline-none transition-all"
                  style={{ color: "#e6e6e6", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                />
              </div>
              <div>
                <label className="block text-[12px] font-semibold uppercase tracking-wider mb-2" style={{ color: "#555" }}>Company</label>
                <input
                  type="text"
                  placeholder="Company name"
                  className="w-full px-4 py-3 text-[14px] rounded-xl focus:outline-none transition-all"
                  style={{ color: "#e6e6e6", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                />
              </div>
              <div>
                <label className="block text-[12px] font-semibold uppercase tracking-wider mb-2" style={{ color: "#555" }}>Message</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell us about your project..."
                  className="w-full px-4 py-3 text-[14px] rounded-xl focus:outline-none transition-all resize-none"
                  style={{ color: "#e6e6e6", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                />
              </div>
              <button
                type="submit"
                className="w-full py-3.5 text-[14px] font-bold rounded-xl transition-all"
                style={{ background: "#00ff9c", color: "#0a0a0a", boxShadow: "0 0 30px rgba(0,255,156,0.15)" }}
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
