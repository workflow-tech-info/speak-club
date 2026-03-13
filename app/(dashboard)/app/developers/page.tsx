"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { GlassCard } from "@/components/ui/page-header";
import {
  Key,
  Webhook,
  Code2,
  Globe,
  Zap,
  ArrowUpRight,
  Copy,
  Check,
  ChevronRight,
  Terminal,
  BookOpen,
  MessageSquare,
  Shield,
  Eye,
  EyeOff,
} from "lucide-react";
import { cn } from "@/lib/utils";

const API_ENDPOINTS = [
  { method: "GET", path: "/v1/agents", desc: "List all agents" },
  { method: "POST", path: "/v1/agents", desc: "Create an agent" },
  { method: "GET", path: "/v1/calls", desc: "List all call logs" },
  { method: "POST", path: "/v1/calls/outbound", desc: "Start an outbound call" },
  { method: "GET", path: "/v1/phone-numbers", desc: "List phone numbers" },
  { method: "POST", path: "/v1/phone-numbers", desc: "Import SIP phone number" },
  { method: "GET", path: "/v1/analytics", desc: "Get call analytics" },
  { method: "POST", path: "/v1/voices/tts", desc: "Generate speech via ElevenLabs" },
];

const WEBHOOK_EVENTS = [
  { event: "call.started", desc: "Fired when a call begins" },
  { event: "call.ended", desc: "Fired when a call ends, includes transcript" },
  { event: "call.analysis.ready", desc: "When sentiment + summary is ready" },
  { event: "agent.created", desc: "When a new agent is created" },
  { event: "agent.updated", desc: "When agent config is changed" },
  { event: "booking.made", desc: "When agent successfully books an appointment" },
];

const SDKS = [
  { name: "Node.js / TypeScript", install: "npm install @speak-club/sdk", status: "stable" },
  { name: "Python", install: "pip install speak-club", status: "stable" },
  { name: "REST API", install: "curl https://api.speakclub.io/v1/...", status: "stable" },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={copy} className="p-1.5 text-zinc-400 hover:text-zinc-200 transition-colors rounded-md hover:bg-white/10">
      {copied ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5" />}
    </button>
  );
}

function MethodBadge({ method }: { method: string }) {
  const colors: Record<string, string> = {
    GET: "text-emerald-600 bg-emerald-50 border-emerald-100",
    POST: "text-blue-600 bg-blue-50 border-blue-100",
    DELETE: "text-red-600 bg-red-50 border-red-100",
    PATCH: "text-amber-600 bg-amber-50 border-amber-100",
  };
  return (
    <span className={`px-2 py-0.5 text-[10px] font-bold rounded border ${colors[method] || "text-zinc-600 bg-zinc-50"}`}>
      {method}
    </span>
  );
}

export default function DevelopersPage() {
  const [showKey, setShowKey] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>("endpoints");
  const API_KEY = "YOUR_SPEAK_CLUB_API_KEY";

  const sections = [
    { id: "endpoints", label: "API Endpoints", icon: Terminal },
    { id: "webhooks", label: "Webhooks", icon: Webhook },
    { id: "sdks", label: "SDKs & Libraries", icon: Code2 },
    { id: "keys", label: "API Keys", icon: Key },
  ];

  return (
    <>
      <PageHeader
        title="Developers"
        subtitle="API reference, webhooks, and integration tools for building with Speak Club"
        actions={
          <a
            href="https://docs.vapi.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-[11px] font-bold text-black bg-[#00ff9c] hover:bg-[#00e68d] rounded-xl transition-all shadow-[0_0_15px_rgba(0,255,156,0.2)] uppercase tracking-widest font-mono"
          >
            <BookOpen className="h-4 w-4" />
            TERMINAL_DOCS
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        }
      />

      {/* Quick stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: "API Version", value: "v1.4.2", icon: Zap, color: "text-[#00ff9c]" },
          { label: "Uptime (30d)", value: "99.98%", icon: Globe, color: "text-emerald-500" },
          { label: "Avg Latency", value: "<580ms", icon: MessageSquare, color: "text-indigo-400" },
          { label: "Rate Limit", value: "1000/min", icon: Shield, color: "text-amber-500" },
        ].map((stat) => (
          <GlassCard key={stat.label}>
            <div className="px-5 py-4 flex items-center gap-3">
              <stat.icon className={`h-5 w-5 ${stat.color} opacity-80`} />
              <div>
                <p className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold font-mono">{stat.label}</p>
                <p className="text-[14px] font-bold text-white font-mono">{stat.value}</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full lg:w-56 flex-shrink-0">
          <GlassCard>
            <div className="p-3 space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-[11px] font-bold rounded-xl transition-all text-left group font-mono uppercase tracking-widest ${
                    activeSection === section.id
                      ? "bg-[#00ff9c]/10 text-[#00ff9c] shadow-[inset_0_0_10px_rgba(0,255,156,0.05)]"
                      : "text-zinc-500 hover:bg-white/5 hover:text-zinc-300"
                  }`}
                >
                  <section.icon className="h-4 w-4 flex-shrink-0" />
                  {section.label}
                  <ChevronRight className={`h-3.5 w-3.5 ml-auto transition-transform ${activeSection === section.id ? "rotate-90" : "group-hover:translate-x-0.5"}`} />
                </button>
              ))}
            </div>

            <div className="mx-3 mb-3 mt-2 p-3 bg-black/60 border border-[#00ff9c]/10 rounded-xl">
              <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest mb-2 font-mono">BASE_URL</p>
              <div className="flex items-center justify-between">
                <code className="text-[11px] text-[#00ff9c] font-mono break-all opacity-80">api.speakclub.io</code>
                <CopyButton text="https://api.speakclub.io/v1" />
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-6">

          {/* API Endpoints */}
          {activeSection === "endpoints" && (
            <GlassCard>
              <div className="px-6 py-5 border-b border-[#00ff9c]/10 bg-white/[0.01]">
                <h2 className="text-[11px] font-bold text-[#00ff9c] uppercase tracking-widest font-mono">REST_API_ENDPOINTS</h2>
                <p className="text-[11px] text-zinc-500 mt-1 font-mono uppercase tracking-tighter">REQ_HEADER: <code className="font-mono bg-white/5 px-1 rounded text-[#00ff9c]">AUTH_BEARER_TOKEN</code></p>
              </div>
              <div className="divide-y divide-[#00ff9c]/5">
                {API_ENDPOINTS.map((ep) => (
                  <div key={ep.path} className="px-6 py-4 flex items-center gap-4 hover:bg-[#00ff9c]/[0.02] transition-colors group cursor-pointer">
                    <span className={cn(
                      "px-2 py-0.5 text-[10px] font-bold rounded border font-mono",
                      ep.method === "GET" ? "text-emerald-500 border-emerald-500/20 bg-emerald-500/5" :
                      ep.method === "POST" ? "text-blue-500 border-blue-500/20 bg-blue-500/5" :
                      "text-zinc-500 border-white/10"
                    )}>{ep.method}</span>
                    <code className="text-[12px] font-mono text-white flex-1">{ep.path}</code>
                    <span className="text-[11px] text-zinc-600 hidden sm:block font-mono uppercase tracking-tighter">{ep.desc.toUpperCase()}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-zinc-700 group-hover:text-[#00ff9c] transition-colors flex-shrink-0" />
                  </div>
                ))}
              </div>
            </GlassCard>
          )}

          {/* Webhooks */}
          {activeSection === "webhooks" && (
            <GlassCard>
              <div className="px-6 py-5 border-b border-[#00ff9c]/10 bg-white/[0.01]">
                <h2 className="text-[11px] font-bold text-[#00ff9c] uppercase tracking-widest font-mono">WEBHOOK_EVENTS</h2>
                <p className="text-[11px] text-zinc-500 mt-1 font-mono uppercase tracking-tighter italic">payload format: application/json</p>
              </div>

              <div className="px-6 py-5 border-b border-[#00ff9c]/5 space-y-3">
                <label className="block text-[10px] font-bold text-zinc-600 uppercase tracking-widest font-mono">ENDPOINT_DESTINATION</label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    defaultValue="https://your-app.com/api/webhooks/speak-club"
                    className="flex-1 px-4 py-3 text-[13px] border border-[#00ff9c]/20 rounded-xl bg-black text-white focus:border-[#00ff9c] outline-none transition-all font-mono"
                  />
                  <button className="px-6 py-3 text-[11px] font-bold text-black bg-[#00ff9c] hover:bg-[#00e68d] rounded-xl transition-all shadow-[0_0_15px_rgba(0,255,156,0.1)] uppercase font-mono tracking-widest">
                    SYNC
                  </button>
                </div>
              </div>

              <div className="divide-y divide-[#00ff9c]/5">
                {WEBHOOK_EVENTS.map((ev) => (
                  <div key={ev.event} className="px-6 py-4 flex items-center gap-4 hover:bg-white/[0.01] transition-colors">
                    <div className="flex-1">
                      <code className="text-[12px] font-mono text-white font-bold">{ev.event}</code>
                      <p className="text-[11px] text-zinc-600 mt-0.5 font-mono uppercase tracking-tighter">{ev.desc}</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#00ff9c] animate-pulse" />
                      <span className="text-[10px] text-zinc-500 font-mono font-bold uppercase tracking-widest">ACTIVE</span>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          )}

          {/* SDKs */}
          {activeSection === "sdks" && (
            <GlassCard>
              <div className="px-6 py-5 border-b border-[#00ff9c]/10 bg-white/[0.01]">
                <h2 className="text-[11px] font-bold text-[#00ff9c] uppercase tracking-widest font-mono">CLIENT_REPOSITORIES</h2>
                <p className="text-[11px] text-zinc-500 mt-1 font-mono uppercase tracking-tighter">OFFICIAL_PROTOCOLS_V1</p>
              </div>
              <div className="divide-y divide-[#00ff9c]/5">
                {SDKS.map((sdk) => (
                  <div key={sdk.name} className="px-6 py-5 hover:bg-white/[0.01] transition-colors group">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-[13px] font-bold text-white font-mono uppercase tracking-widest">{sdk.name}</h3>
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md border uppercase tracking-widest font-mono mt-2 inline-block ${sdk.status === 'stable' ? 'bg-[#00ff9c]/5 text-[#00ff9c] border-[#00ff9c]/20' : 'bg-amber-500/10 text-amber-500 border-amber-500/20'}`}>
                          {sdk.status}_VERSION
                        </span>
                      </div>
                      <button className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold text-[#00ff9c] hover:bg-[#00ff9c]/5 rounded-lg transition-all uppercase tracking-widest font-mono opacity-60 hover:opacity-100">
                        DOCS <ArrowUpRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between bg-black/60 border border-[#00ff9c]/10 rounded-xl px-4 py-3 group-hover:border-[#00ff9c]/30 transition-all">
                      <code className="text-[12px] text-[#00ff9c] font-mono opacity-80">{sdk.install}</code>
                      <CopyButton text={sdk.install} />
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          )}

          {/* API Keys */}
          {activeSection === "keys" && (
            <GlassCard>
              <div className="px-6 py-5 border-b border-[#00ff9c]/10 bg-white/[0.01]">
                <h2 className="text-[11px] font-bold text-[#00ff9c] uppercase tracking-widest font-mono">SECURE_CREDENTIALS</h2>
                <p className="text-[11px] text-zinc-500 mt-1 font-mono uppercase tracking-tighter italic">Warning: Do not expose these keys in client-side codebases.</p>
              </div>
              <div className="px-6 py-6 space-y-8">
                {/* Live Key */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono">LIVE_AUTH_TOKEN</label>
                    <span className="px-2 py-0.5 text-[9px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded uppercase tracking-widest font-mono">LIVE_STREAM</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-black border border-[#00ff9c]/20 rounded-xl shadow-[inset_0_0_10px_rgba(0,255,156,0.05)]">
                      <Key className="h-4 w-4 text-[#00ff9c] opacity-50 flex-shrink-0" />
                      <code className="text-[13px] font-mono text-white flex-1 overflow-hidden text-ellipsis whitespace-nowrap opacity-80">
                        {showKey ? API_KEY : "sk_live_" + "•".repeat(30)}
                      </code>
                    </div>
                    <button onClick={() => setShowKey(!showKey)} className="p-3 text-zinc-500 hover:text-[#00ff9c] border border-white/5 bg-white/5 rounded-xl transition-all">
                      {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                    <CopyButton text={API_KEY} />
                  </div>
                </div>

                {/* Vapi Key */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono">VAPI_INFRASTRUCTURE_KEY</label>
                    <a href="https://dashboard.vapi.ai" target="_blank" rel="noopener noreferrer" className="text-[10px] text-[#00ff9c] hover:underline flex items-center gap-1 uppercase tracking-widest font-mono opacity-60 hover:opacity-100">DASHBOARD <ArrowUpRight className="h-3 w-3" /></a>
                  </div>
                  <input
                    type="password"
                    defaultValue="YOUR_VAPI_API_KEY"
                    className="w-full px-4 py-3 text-[13px] border border-[#00ff9c]/10 rounded-xl bg-black text-white focus:border-[#00ff9c] outline-none transition-all font-mono"
                  />
                </div>

                {/* ElevenLabs Key */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono">ELEVENLABS_VOICE_KEY</label>
                    <a href="https://elevenlabs.io/app/developers" target="_blank" rel="noopener noreferrer" className="text-[10px] text-[#00ff9c] hover:underline flex items-center gap-1 uppercase tracking-widest font-mono opacity-60 hover:opacity-100">DASHBOARD <ArrowUpRight className="h-3 w-3" /></a>
                  </div>
                  <input
                    type="password"
                    defaultValue="YOUR_ELEVENLABS_API_KEY"
                    className="w-full px-4 py-3 text-[13px] border border-[#00ff9c]/10 rounded-xl bg-black text-white focus:border-[#00ff9c] outline-none transition-all font-mono"
                  />
                </div>

                <button className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 text-[12px] font-bold text-black bg-[#00ff9c] hover:bg-[#00e68d] rounded-xl transition-all shadow-[0_0_20px_rgba(0,255,156,0.2)] uppercase tracking-[0.2em] font-mono">
                  <Check className="h-4 w-4" />
                  PERSIST_ENCRYPTED_KEYS
                </button>
              </div>
            </GlassCard>
          )}
        </div>
      </div>
    </>
  );
}
