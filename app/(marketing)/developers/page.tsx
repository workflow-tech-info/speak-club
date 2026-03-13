import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Developers",
  description: "Speak-Club provides a programmable voice infrastructure layer. Create AI voice agents, integrate APIs, and deploy multi-agent orchestration systems.",
  keywords: ["voice AI developer platform", "websocket voice AI platform", "AI voice agent API"],
};

const CAPABILITIES = [
  "Create AI voice agents",
  "Integrate external APIs",
  "Connect CRMs and databases",
  "Deploy multi-agent orchestration systems",
];

const CODE_EXAMPLE = `import { SpeakClub } from '@speak-club/sdk';

const client = new SpeakClub({
  apiKey: process.env.SC_API_KEY,
});

// Create a voice agent
const agent = await client.agents.create({
  name: 'Support Agent',
  systemPrompt: 'You are a helpful support agent...',
  voice: 'eleven_multilingual_v2',
  tools: ['crm_lookup', 'ticket_create'],
});

// Make an outbound call
await client.calls.create({
  agentId: agent.id,
  phoneNumberId: 'pn_xxx',
  customer: { number: '+14155551234' },
});`;

export default function DevelopersPage() {
  return (
    <div className="pt-24">
      <section className="py-24 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6" style={{ fontFamily: "'Orbitron', sans-serif", color: "#e6e6e6" }}>
            Built for <span style={{ color: "#00d9ff" }}>Developers</span>
          </h1>
          <p className="text-[16px] max-w-2xl mx-auto" style={{ color: "#888" }}>
            Speak-Club provides a programmable voice infrastructure layer. Ship voice AI in hours, not months.
          </p>
        </div>
      </section>

      {/* Capabilities */}
      <section className="pb-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid sm:grid-cols-2 gap-4">
            {CAPABILITIES.map((cap) => (
              <div key={cap} className="flex items-center gap-3 px-5 py-4 rounded-xl" style={{ background: "rgba(0,217,255,0.04)", border: "1px solid rgba(0,217,255,0.1)" }}>
                <span style={{ color: "#00d9ff" }}>▸</span>
                <span className="text-[14px] font-medium" style={{ color: "#ccc" }}>{cap}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Code Example */}
      <section className="pb-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(0,217,255,0.1)" }}>
            <div className="px-5 py-3 flex items-center gap-2" style={{ background: "rgba(0,217,255,0.05)", borderBottom: "1px solid rgba(0,217,255,0.08)" }}>
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full" style={{ background: "#ff5f56" }} />
                <div className="h-2.5 w-2.5 rounded-full" style={{ background: "#ffbd2e" }} />
                <div className="h-2.5 w-2.5 rounded-full" style={{ background: "#27c93f" }} />
              </div>
              <span className="text-[11px] font-mono ml-3" style={{ color: "#666" }}>quickstart.ts</span>
            </div>
            <pre className="p-6 overflow-x-auto text-[13px] leading-relaxed" style={{ background: "rgba(0,0,0,0.5)", color: "#00d9ff", fontFamily: "'JetBrains Mono', monospace" }}>
              <code>{CODE_EXAMPLE}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* SDKs */}
      <section className="py-24" style={{ background: "rgba(0,217,255,0.02)" }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-8" style={{ fontFamily: "'Orbitron', sans-serif", color: "#e6e6e6" }}>Official SDKs</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { name: "Node.js", cmd: "npm install @speak-club/sdk" },
              { name: "Python", cmd: "pip install speak-club" },
              { name: "REST API", cmd: "curl api.speakclub.io/v1" },
            ].map((sdk) => (
              <div key={sdk.name} className="rounded-xl p-5" style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(0,217,255,0.1)" }}>
                <h3 className="text-[15px] font-bold mb-2" style={{ color: "#00d9ff" }}>{sdk.name}</h3>
                <code className="text-[11px]" style={{ color: "#666", fontFamily: "'JetBrains Mono', monospace" }}>{sdk.cmd}</code>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
