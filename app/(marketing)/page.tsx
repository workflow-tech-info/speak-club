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

export default function HomePage() {
  return (
    <>
      {/* ━━━ HERO ━━━ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Grid background */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "linear-gradient(rgba(0,255,156,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,156,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px]" style={{ background: "rgba(0,255,156,0.04)" }} />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px]" style={{ background: "rgba(0,217,255,0.03)" }} />

        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <div className="inline-block px-4 py-1.5 rounded-full text-[12px] font-semibold tracking-wider uppercase mb-8" style={{ background: "rgba(0,255,156,0.08)", color: "#00ff9c", border: "1px solid rgba(0,255,156,0.15)" }}>
            Voice AI Infrastructure
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-[1.05] tracking-tight mb-8" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            <span style={{ color: "#e6e6e6" }}>Your Business,</span>
            <br />
            <span style={{ color: "#00ff9c" }}>On Call.</span>
          </h1>

          <div className="space-y-2 mb-10">
            <p className="text-xl sm:text-2xl font-bold text-white tracking-wide">Customers get help.</p>
            <p className="text-xl sm:text-2xl font-bold text-white tracking-wide">Leads get qualified.</p>
            <p className="text-xl sm:text-2xl font-bold text-white tracking-wide">Teams get answers.</p>
            <p className="text-2xl sm:text-3xl font-black text-[#00ff9c] mt-4 tracking-widest">JUST ASK.</p>
          </div>

          <div className="max-w-2xl mx-auto space-y-4 mb-12">
            <p className="text-[16px] sm:text-[18px] leading-relaxed text-zinc-400 font-medium">
              Your most powerful companion for running modern companies.
            </p>
            <p className="text-[16px] sm:text-[18px] leading-relaxed text-zinc-500">
              One number that connects customers, teams, and data into a single conversation.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/login"
              className="px-8 py-3.5 text-[14px] font-bold rounded-xl transition-all"
              style={{ background: "#00ff9c", color: "#0a0a0a", boxShadow: "0 0 40px rgba(0,255,156,0.2)" }}
            >
              Start Building
            </Link>
            <Link
              href="/architecture"
              className="px-8 py-3.5 text-[14px] font-bold rounded-xl transition-all"
              style={{ color: "#00ff9c", border: "1px solid rgba(0,255,156,0.2)", background: "rgba(0,255,156,0.03)" }}
            >
              View Architecture
            </Link>
          </div>

          {/* Matrix rain hint */}
          <div className="mt-16 flex justify-center gap-3 opacity-30">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="w-px bg-gradient-to-b from-transparent via-[#00ff9c] to-transparent" style={{ height: `${40 + i * 12}px`, animationDelay: `${i * 0.2}s` }} />
            ))}
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
