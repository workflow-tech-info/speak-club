import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Technology",
  description: "Explore Speak-Club's real-time voice AI infrastructure — speech recognition, LLM reasoning, voice synthesis, and multi-agent orchestration.",
  keywords: ["voice AI infrastructure", "real time voice AI", "AI voice technology", "speech recognition AI", "voice synthesis platform"],
};

const PIPELINE = [
  { step: "01", title: "Telephony Layer", desc: "Inbound/outbound calls via SIP, Twilio, Vonage, or Telnyx. Numbers provisioned globally in seconds.", color: "#00ff9c" },
  { step: "02", title: "WebSocket Audio Stream", desc: "Low-latency bidirectional audio streaming. Sub-200ms connection handshake for real-time conversation.", color: "#00d9ff" },
  { step: "03", title: "Speech Recognition (STT)", desc: "State-of-the-art speech-to-text powered by providers like Deepgram and Gladia with <500ms latency.", color: "#00ff9c" },
  { step: "04", title: "LLM Reasoning Engine", desc: "Multi-model support: OpenAI, Anthropic, Google, Qwen. Contextual reasoning with tool calling and structured outputs.", color: "#00d9ff" },
  { step: "05", title: "Tool Execution Layer", desc: "AI agents call your APIs, query databases, create tickets, and execute business logic in real-time.", color: "#7bff00" },
  { step: "06", title: "Voice Synthesis (TTS)", desc: "Ultra-natural speech via ElevenLabs with 29+ languages, voice cloning, and streaming audio pipelines.", color: "#00ff9c" },
];

export default function TechnologyPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-24 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6" style={{ fontFamily: "'Orbitron', sans-serif", color: "#e6e6e6" }}>
            Voice AI <span style={{ color: "#00ff9c" }}>Technology</span>
          </h1>
          <p className="text-[16px] max-w-2xl mx-auto" style={{ color: "#888" }}>
            Real-time voice infrastructure that combines the best STT, LLM, and TTS providers into a single programmable platform.
          </p>
        </div>
      </section>

      {/* Pipeline */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          {PIPELINE.map((item) => (
            <div key={item.step} className="flex gap-6 group">
              <div className="flex flex-col items-center">
                <div className="h-10 w-10 rounded-full flex items-center justify-center text-[12px] font-bold flex-shrink-0" style={{ background: `${item.color}10`, color: item.color, border: `1px solid ${item.color}30`, fontFamily: "'JetBrains Mono', monospace" }}>
                  {item.step}
                </div>
                <div className="w-px flex-1 mt-2" style={{ background: `${item.color}20` }} />
              </div>
              <div className="pb-8">
                <h3 className="text-[18px] font-bold mb-2" style={{ color: item.color }}>{item.title}</h3>
                <p className="text-[14px] leading-relaxed" style={{ color: "#888" }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-24" style={{ background: "rgba(0,255,156,0.02)" }}>
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { value: "<580ms", label: "Response Latency" },
              { value: "29+", label: "Languages Supported" },
              { value: "99.98%", label: "Uptime SLA" },
              { value: "50+", label: "LLM & Voice Models" },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-6 rounded-2xl" style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(0,255,156,0.08)" }}>
                <p className="text-3xl font-bold mb-1" style={{ color: "#00ff9c", fontFamily: "'Orbitron', sans-serif" }}>{stat.value}</p>
                <p className="text-[12px] uppercase tracking-wider" style={{ color: "#666" }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
