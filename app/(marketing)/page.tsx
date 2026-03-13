import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Speak-Club | The Operating System For Voice AI Companies",
  description: "Speak-Club transforms phone numbers into intelligent AI workforces. Customer support, sales calls, analytics queries, and developer operations — all handled through one conversational interface.",
  keywords: ["AI voice agents", "voice AI infrastructure", "AI call center automation", "AI phone agent platform", "voice automation software", "AI receptionist software", "real time voice AI infrastructure"],
  alternates: { canonical: "https://speak-club.io" },
};

const AGENTS = [
  { emoji: "🎧", name: "Support Agent", desc: "Resolves issues 24/7" },
  { emoji: "💼", name: "Sales Agent", desc: "Qualifies & books leads" },
  { emoji: "📊", name: "Analytics Agent", desc: "Queries live data" },
  { emoji: "⚙️", name: "DevOps Agent", desc: "Monitors infrastructure" },
  { emoji: "📞", name: "Receptionist Agent", desc: "Routes every caller" },
  { emoji: "👥", name: "HR Assistant", desc: "Handles internal queries" },
];

const INTEGRATIONS = [
  "CRM", "Databases", "Analytics platforms", "Ticketing systems", "Internal APIs"
];

const LANGUAGES = [
  { flag: "🇺🇸", name: "English" },
  { flag: "🇪🇸", name: "Spanish" },
  { flag: "🇸🇦", name: "Arabic" },
  { flag: "🇮🇳", name: "Hindi" },
  { flag: "🇮🇳", name: "Tamil" },
  { flag: "🇨🇳", name: "Mandarin" },
  { flag: "🇩🇪", name: "German" },
];

import { MatrixRain } from "@/components/matrix-rain";

export default function HomePage() {
  return (
    <>
      {/* ━━━ HERO ━━━ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <MatrixRain />
        
        {/* Gradients to fade Matrix rain and content */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505] z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505] z-10" />

        <div className="relative max-w-5xl mx-auto px-4 text-center z-20">
          <div className="inline-block px-4 py-1.5 rounded-full text-[11px] font-bold tracking-[0.3em] uppercase mb-12 animate-fade-in shadow-[0_0_20px_rgba(0,255,156,0.15)]" style={{ background: "rgba(0,255,156,0.1)", color: "#00ff9c", border: "1px solid rgba(0,255,156,0.2)" }}>
            NEURAL_BUSINESS_UPLINK
          </div>

          <h1 className="text-4xl sm:text-7xl md:text-9xl font-black leading-[0.95] tracking-tighter mb-8 md:mb-12 drop-shadow-[0_0_30px_rgba(0,255,156,0.3)]" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            <span style={{ color: "#ffffff" }}>YOUR BUSINESS,</span>
            <br />
            <span style={{ color: "#00ff9c" }}>ON CALL.</span>
          </h1>

          <div className="space-y-3 md:space-y-4 mb-12 md:mb-16">
            <p className="text-lg sm:text-2xl md:text-3xl font-bold text-white/90 tracking-wide uppercase font-mono">Customers get help.</p>
            <p className="text-lg sm:text-2xl md:text-3xl font-bold text-white/90 tracking-wide uppercase font-mono">Leads get qualified.</p>
            <p className="text-lg sm:text-2xl md:text-3xl font-bold text-white/90 tracking-wide uppercase font-mono">Teams get answers.</p>
            <div className="h-px w-16 md:w-24 mx-auto bg-[#00ff9c]/30 my-6 md:my-8" />
            <p className="text-2xl sm:text-4xl md:text-5xl font-black text-[#00ff9c] tracking-[0.3em] md:tracking-[0.5em] uppercase font-mono animate-pulse">JUST ASK.</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/login"
              className="px-10 py-4 text-[14px] font-bold rounded-xl transition-all hover:scale-105 active:scale-95 shadow-[0_0_50px_rgba(0,255,156,0.3)]"
              style={{ background: "#00ff9c", color: "#0a0a0a" }}
            >
              INITIALIZE_SESSION
            </Link>
            <Link
              href="/architecture"
              className="px-10 py-4 text-[14px] font-bold rounded-xl transition-all hover:bg-[#00ff9c]/10 border border-[#00ff9c]/30"
              style={{ color: "#00ff9c", background: "rgba(0,255,156,0.02)" }}
            >
              UPLINK_PROTOCOL
            </Link>
          </div>
        </div>
      </section>

      {/* ━━━ THE PROBLEM ━━━ */}
      <section className="py-24 sm:py-32">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: "'Orbitron', sans-serif", color: "#e6e6e6" }}>
              Every company today is <span style={{ color: "#ff4444" }}>drowning in tools</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-12">
            {["CRMs", "Support platforms", "Sales pipelines", "Dashboards", "Databases"].map((tool) => (
              <div key={tool} className="px-4 py-3 rounded-xl text-center text-[13px] font-medium" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", color: "#999" }}>
                {tool}
              </div>
            ))}
          </div>

          <div className="rounded-2xl p-8 sm:p-10" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>
            <p className="text-[15px] mb-6" style={{ color: "#888" }}>Yet to understand what&apos;s happening inside a business, humans still need to:</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {["Read dashboards", "Switch between apps", "Manually answer calls", "Interpret analytics"].map((item) => (
                <div key={item} className="flex items-center gap-3 px-4 py-3 rounded-lg" style={{ background: "rgba(255,68,68,0.04)", border: "1px solid rgba(255,68,68,0.08)" }}>
                  <span style={{ color: "#ff4444" }}>×</span>
                  <span className="text-[14px]" style={{ color: "#aaa" }}>{item}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 text-[16px] font-semibold" style={{ color: "#ff4444" }}>This creates massive inefficiencies.</p>
          </div>
        </div>
      </section>

      {/* ━━━ THE SOLUTION ━━━ */}
      <section className="py-24 sm:py-32" style={{ background: "rgba(0,255,156,0.02)" }}>
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: "'Orbitron', sans-serif", color: "#e6e6e6" }}>
              The <span style={{ color: "#00ff9c" }}>Speak-Club</span> Solution
            </h2>
            <p className="text-[16px] max-w-2xl mx-auto" style={{ color: "#888" }}>
              Speak-Club converts a company&apos;s phone system into an intelligent AI interface.
              Instead of navigating software, teams simply talk to their company.
            </p>
          </div>

          {/* Conversation mockup */}
          <div className="max-w-xl mx-auto mb-16 rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(0,255,156,0.1)", background: "rgba(0,0,0,0.5)" }}>
            <div className="px-4 py-2.5 flex items-center gap-2" style={{ background: "rgba(0,255,156,0.05)", borderBottom: "1px solid rgba(0,255,156,0.08)" }}>
              <div className="h-2.5 w-2.5 rounded-full" style={{ background: "#00ff9c" }} />
              <span className="text-[11px] font-semibold tracking-wider uppercase" style={{ color: "#00ff9c", fontFamily: "'JetBrains Mono', monospace" }}>Live Conversation</span>
            </div>
            <div className="p-6 space-y-5">
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-full flex items-center justify-center text-[12px] font-bold flex-shrink-0" style={{ background: "rgba(0,217,255,0.1)", color: "#00d9ff" }}>F</div>
                <div className="rounded-xl px-4 py-3 text-[14px]" style={{ background: "rgba(0,217,255,0.05)", border: "1px solid rgba(0,217,255,0.1)", color: "#ccc" }}>
                  &ldquo;How did we perform last quarter?&rdquo;
                </div>
              </div>
              <div className="flex gap-3 justify-end">
                <div className="rounded-xl px-4 py-3 text-[14px] max-w-md" style={{ background: "rgba(0,255,156,0.05)", border: "1px solid rgba(0,255,156,0.1)", color: "#ccc" }}>
                  &ldquo;Revenue increased 18%. Customer churn dropped in the enterprise segment. The main growth driver was the automotive sector.&rdquo;
                </div>
                <div className="h-8 w-8 rounded-full flex items-center justify-center text-[12px] font-bold flex-shrink-0" style={{ background: "rgba(0,255,156,0.1)", color: "#00ff9c" }}>AI</div>
              </div>
            </div>
          </div>

          {/* Integrations */}
          <div className="text-center mb-6">
            <p className="text-[13px] font-semibold uppercase tracking-wider" style={{ color: "#555" }}>Powered by live integrations with</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {INTEGRATIONS.map((item) => (
              <div key={item} className="px-4 py-2 rounded-full text-[13px] font-medium" style={{ background: "rgba(0,255,156,0.04)", border: "1px solid rgba(0,255,156,0.1)", color: "#00ff9c" }}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ ONE NUMBER, INFINITE AGENTS ━━━ */}
      <section className="py-24 sm:py-32">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: "'Orbitron', sans-serif", color: "#e6e6e6" }}>
              One Number. <span style={{ color: "#00d9ff" }}>Infinite Agents.</span>
            </h2>
            <p className="text-[16px] max-w-xl mx-auto" style={{ color: "#888" }}>
              Behind a single phone number lives an entire network of AI specialists.
              Calls are routed automatically through multi-agent orchestration.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {AGENTS.map((agent) => (
              <div
                key={agent.name}
                className="group rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02]"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(0,217,255,0.08)" }}
              >
                <div className="text-2xl mb-3">{agent.emoji}</div>
                <h3 className="text-[15px] font-bold mb-1" style={{ color: "#e6e6e6" }}>{agent.name}</h3>
                <p className="text-[13px]" style={{ color: "#666" }}>{agent.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ BUILT FOR DEVELOPERS ━━━ */}
      <section className="py-24 sm:py-32" style={{ background: "rgba(0,217,255,0.02)" }}>
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: "'Orbitron', sans-serif", color: "#e6e6e6" }}>
              Built For <span style={{ color: "#00d9ff" }}>Developers</span>
            </h2>
            <p className="text-[16px] max-w-xl mx-auto" style={{ color: "#888" }}>
              Speak-Club integrates through modern infrastructure.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            {/* Tech Stack */}
            <div className="rounded-2xl p-6" style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(0,217,255,0.1)" }}>
              <h3 className="text-[14px] font-bold mb-4" style={{ color: "#00d9ff", fontFamily: "'JetBrains Mono', monospace" }}>Infrastructure</h3>
              <div className="space-y-2">
                {["WebSockets", "REST APIs", "MCP integrations", "Webhooks", "Streaming audio pipelines"].map((tech) => (
                  <div key={tech} className="flex items-center gap-2.5 px-3 py-2 rounded-lg" style={{ background: "rgba(0,217,255,0.03)" }}>
                    <span className="text-[12px]" style={{ color: "#00d9ff", fontFamily: "'JetBrains Mono', monospace" }}>▸</span>
                    <span className="text-[13px] font-medium" style={{ color: "#ccc" }}>{tech}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Compatible with */}
            <div className="rounded-2xl p-6" style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(0,217,255,0.1)" }}>
              <h3 className="text-[14px] font-bold mb-4" style={{ color: "#00d9ff", fontFamily: "'JetBrains Mono', monospace" }}>Compatible with</h3>
              <div className="space-y-3">
                {["ElevenLabs", "Vapi", "Twilio"].map((tool) => (
                  <div key={tool} className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ background: "rgba(0,217,255,0.04)", border: "1px solid rgba(0,217,255,0.08)" }}>
                    <div className="h-8 w-8 rounded-lg flex items-center justify-center text-[11px] font-bold" style={{ background: "rgba(0,217,255,0.1)", color: "#00d9ff" }}>{tool[0]}</div>
                    <span className="text-[14px] font-semibold" style={{ color: "#ddd" }}>{tool}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ GLOBAL VOICE INFRASTRUCTURE ━━━ */}
      <section className="py-24 sm:py-32">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: "'Orbitron', sans-serif", color: "#e6e6e6" }}>
            Global Voice <span style={{ color: "#7bff00" }}>Infrastructure</span>
          </h2>
          <p className="text-[16px] max-w-xl mx-auto mb-12" style={{ color: "#888" }}>
            Speak-Club agents speak every major language. Businesses scale globally without hiring multilingual teams.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {LANGUAGES.map((lang) => (
              <div key={lang.name} className="flex items-center gap-2.5 px-5 py-3 rounded-xl" style={{ background: "rgba(123,255,0,0.04)", border: "1px solid rgba(123,255,0,0.1)" }}>
                <span className="text-xl">{lang.flag}</span>
                <span className="text-[14px] font-medium" style={{ color: "#ccc" }}>{lang.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ CTA ━━━ */}
      <section className="py-24 sm:py-32 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ fontFamily: "'Orbitron', sans-serif", color: "#00ff9c" }}>
            Ready to transform your voice operations?
          </h2>
          <p className="text-[16px] mb-10" style={{ color: "#888" }}>
            Join the companies building the future of voice AI with Speak-Club.
          </p>
          <Link
            href="/contact"
            className="inline-block px-10 py-4 text-[15px] font-bold rounded-xl transition-all"
            style={{ background: "#00ff9c", color: "#0a0a0a", boxShadow: "0 0 60px rgba(0,255,156,0.15)" }}
          >
            Get Started Today
          </Link>
        </div>
      </section>
    </>
  );
}
