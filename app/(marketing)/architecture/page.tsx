import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Architecture",
  description: "Explore Speak-Club's voice infrastructure pipeline — from telephony to AI agent routing, business tool execution, and voice synthesis.",
  keywords: ["voice AI architecture", "AI voice pipeline", "multi-agent orchestration", "real time voice AI infrastructure"],
};

const PIPELINE_STEPS = [
  { icon: "📞", label: "Caller", desc: "Inbound or outbound phone call initiated" },
  { icon: "📡", label: "Telephony Provider", desc: "SIP/PSTN via Twilio, Vonage, or Telnyx" },
  { icon: "🔌", label: "WebSocket Audio Stream", desc: "Bidirectional real-time audio transport" },
  { icon: "🎙️", label: "Speech Recognition", desc: "STT via Deepgram, Gladia, or Whisper" },
  { icon: "🧠", label: "AI Agent Router", desc: "Multi-agent orchestration with context preservation" },
  { icon: "⚡", label: "Business Tools & APIs", desc: "CRM, database, ticketing, analytics integration" },
  { icon: "🔊", label: "Voice Synthesis", desc: "TTS via ElevenLabs with 29+ languages" },
  { icon: "📱", label: "Caller Response", desc: "Natural conversational response delivered" },
];

const COMPONENTS = [
  { title: "Real-time Streaming", desc: "Sub-200ms WebSocket connections for zero-lag conversations", color: "#00ff9c" },
  { title: "Multi-agent Orchestration", desc: "Context-preserving transfers between specialized AI agents", color: "#00d9ff" },
  { title: "LLM Reasoning Engine", desc: "Multi-model support with tool calling and structured outputs", color: "#7bff00" },
  { title: "Tool Execution Layer", desc: "API calls, database queries, and business logic in real-time", color: "#00d9ff" },
  { title: "Voice Synthesis", desc: "Ultra-natural speech generation with voice cloning support", color: "#00ff9c" },
];

export default function ArchitecturePage() {
  return (
    <div className="pt-24">
      <section className="py-24 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6" style={{ fontFamily: "'Orbitron', sans-serif", color: "#e6e6e6" }}>
            System <span style={{ color: "#00ff9c" }}>Architecture</span>
          </h1>
          <p className="text-[16px] max-w-2xl mx-auto" style={{ color: "#888" }}>
            A complete voice infrastructure pipeline from caller to AI agent response.
          </p>
        </div>
      </section>

      {/* Pipeline Visualization */}
      <section className="pb-24">
        <div className="max-w-3xl mx-auto px-4">
          <div className="relative">
            {PIPELINE_STEPS.map((step, i) => (
              <div key={step.label} className="flex gap-6 mb-1">
                <div className="flex flex-col items-center">
                  <div className="h-12 w-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: "rgba(0,255,156,0.06)", border: "1px solid rgba(0,255,156,0.12)" }}>
                    {step.icon}
                  </div>
                  {i < PIPELINE_STEPS.length - 1 && (
                    <div className="w-px h-8 my-1" style={{ background: "rgba(0,255,156,0.15)" }} />
                  )}
                </div>
                <div className="pt-2 pb-4">
                  <h3 className="text-[16px] font-bold" style={{ color: "#00ff9c" }}>{step.label}</h3>
                  <p className="text-[13px] mt-0.5" style={{ color: "#666" }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Components */}
      <section className="py-24" style={{ background: "rgba(0,255,156,0.02)" }}>
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-10 text-center" style={{ fontFamily: "'Orbitron', sans-serif", color: "#e6e6e6" }}>Key Components</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {COMPONENTS.map((comp) => (
              <div key={comp.title} className="rounded-2xl p-6" style={{ background: "rgba(0,0,0,0.3)", border: `1px solid ${comp.color}15` }}>
                <h3 className="text-[15px] font-bold mb-2" style={{ color: comp.color }}>{comp.title}</h3>
                <p className="text-[13px]" style={{ color: "#777" }}>{comp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
