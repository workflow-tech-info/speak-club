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
            className="inline-flex items-center gap-2 px-4 py-2 text-[13px] font-medium text-zinc-600 bg-white border border-zinc-200 hover:bg-zinc-50 rounded-xl transition-colors"
          >
            <BookOpen className="h-4 w-4" />
            Full Docs
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        }
      />

      {/* Quick stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: "API Version", value: "v1.4.2", icon: Zap, color: "text-blue-500" },
          { label: "Uptime (30d)", value: "99.98%", icon: Globe, color: "text-emerald-500" },
          { label: "Avg Latency", value: "<580ms", icon: MessageSquare, color: "text-indigo-500" },
          { label: "Rate Limit", value: "1000/min", icon: Shield, color: "text-amber-500" },
        ].map((stat) => (
          <GlassCard key={stat.label}>
            <div className="px-5 py-4 flex items-center gap-3">
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
              <div>
                <p className="text-[11px] text-zinc-400 uppercase tracking-wide font-semibold">{stat.label}</p>
                <p className="text-[15px] font-bold text-zinc-900">{stat.value}</p>
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
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-[13px] font-medium rounded-xl transition-colors text-left group ${
                    activeSection === section.id
                      ? "bg-blue-50 text-blue-600"
                      : "text-zinc-600 hover:bg-zinc-50"
                  }`}
                >
                  <section.icon className="h-4 w-4 flex-shrink-0" />
                  {section.label}
                  <ChevronRight className={`h-3.5 w-3.5 ml-auto transition-transform ${activeSection === section.id ? "rotate-90" : "group-hover:translate-x-0.5"}`} />
                </button>
              ))}
            </div>

            <div className="mx-3 mb-3 mt-2 p-3 bg-zinc-900 rounded-xl">
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-2">Base URL</p>
              <div className="flex items-center justify-between">
                <code className="text-[11px] text-green-400 font-mono break-all">api.speakclub.io</code>
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
              <div className="px-6 py-5 border-b border-[var(--color-card-border)]">
                <h2 className="text-[15px] font-bold text-zinc-900">REST API Endpoints</h2>
                <p className="text-[12px] text-zinc-400 mt-0.5">All requests require an <code className="font-mono bg-zinc-100 px-1 rounded">Authorization: Bearer YOUR_API_KEY</code> header.</p>
              </div>
              <div className="divide-y divide-[var(--color-card-border)]">
                {API_ENDPOINTS.map((ep) => (
                  <div key={ep.path} className="px-6 py-4 flex items-center gap-4 hover:bg-zinc-50/70 transition-colors group cursor-pointer">
                    <MethodBadge method={ep.method} />
                    <code className="text-[13px] font-mono text-zinc-700 flex-1">{ep.path}</code>
                    <span className="text-[12px] text-zinc-400 hidden sm:block">{ep.desc}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-zinc-300 group-hover:text-zinc-600 transition-colors flex-shrink-0" />
                  </div>
                ))}
              </div>
            </GlassCard>
          )}

          {/* Webhooks */}
          {activeSection === "webhooks" && (
            <GlassCard>
              <div className="px-6 py-5 border-b border-[var(--color-card-border)]">
                <h2 className="text-[15px] font-bold text-zinc-900">Webhook Events</h2>
                <p className="text-[12px] text-zinc-400 mt-0.5">Configure your endpoint URL below. We'll POST a JSON payload for each event type.</p>
              </div>

              <div className="px-6 py-5 border-b border-[var(--color-card-border)] space-y-3">
                <label className="block text-[12px] font-semibold text-zinc-500 uppercase tracking-wider">Webhook URL</label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    defaultValue="https://your-app.com/api/webhooks/speak-club"
                    className="flex-1 px-4 py-2.5 text-[13px] border border-zinc-200 rounded-xl bg-zinc-50 focus:bg-white focus:border-blue-400 focus:ring-1 focus:ring-blue-100 outline-none transition-all font-mono"
                  />
                  <button className="px-4 py-2.5 text-[13px] font-semibold text-white bg-blue-500 hover:bg-blue-600 rounded-xl transition-colors">
                    Save
                  </button>
                </div>
              </div>

              <div className="divide-y divide-[var(--color-card-border)]">
                {WEBHOOK_EVENTS.map((ev) => (
                  <div key={ev.event} className="px-6 py-4 flex items-center gap-4">
                    <div className="flex-1">
                      <code className="text-[13px] font-mono text-zinc-800 font-semibold">{ev.event}</code>
                      <p className="text-[12px] text-zinc-400 mt-0.5">{ev.desc}</p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      <span className="text-[11px] text-zinc-400">Active</span>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          )}

          {/* SDKs */}
          {activeSection === "sdks" && (
            <GlassCard>
              <div className="px-6 py-5 border-b border-[var(--color-card-border)]">
                <h2 className="text-[15px] font-bold text-zinc-900">SDKs & Libraries</h2>
                <p className="text-[12px] text-zinc-400 mt-0.5">Official client libraries to integrate with Speak Club in your language of choice.</p>
              </div>
              <div className="divide-y divide-[var(--color-card-border)]">
                {SDKS.map((sdk) => (
                  <div key={sdk.name} className="px-6 py-5">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="text-[14px] font-bold text-zinc-900">{sdk.name}</h3>
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${sdk.status === 'stable' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                          {sdk.status}
                        </span>
                      </div>
                      <button className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-semibold text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        Docs <ArrowUpRight className="h-3 w-3" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between bg-zinc-900 rounded-xl px-4 py-3">
                      <code className="text-[12px] text-green-400 font-mono">{sdk.install}</code>
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
              <div className="px-6 py-5 border-b border-[var(--color-card-border)]">
                <h2 className="text-[15px] font-bold text-zinc-900">API Keys</h2>
                <p className="text-[12px] text-zinc-400 mt-0.5">Keep your keys secret. Never expose them on the client side.</p>
              </div>
              <div className="px-6 py-6 space-y-6">
                {/* Live Key */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-[13px] font-semibold text-zinc-700">Live API Key</label>
                    <span className="px-2 py-0.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 rounded">LIVE</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 flex items-center gap-2 px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl">
                      <Key className="h-4 w-4 text-zinc-400 flex-shrink-0" />
                      <code className="text-[13px] font-mono text-zinc-700 flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
                        {showKey ? API_KEY : "sk_live_" + "•".repeat(30)}
                      </code>
                    </div>
                    <button onClick={() => setShowKey(!showKey)} className="p-2.5 text-zinc-400 hover:text-zinc-600 border border-zinc-200 rounded-xl transition-colors">
                      {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                    <CopyButton text={API_KEY} />
                  </div>
                </div>

                {/* Vapi Key */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-[13px] font-semibold text-zinc-700">Vapi API Key</label>
                    <a href="https://dashboard.vapi.ai" target="_blank" rel="noopener noreferrer" className="text-[12px] text-blue-500 hover:text-blue-600 flex items-center gap-1">Vapi Dashboard <ArrowUpRight className="h-3 w-3" /></a>
                  </div>
                  <input
                    type="password"
                    defaultValue="YOUR_VAPI_API_KEY"
                    className="w-full px-4 py-2.5 text-[13px] border border-zinc-200 rounded-xl bg-zinc-50 focus:bg-white focus:border-blue-400 focus:ring-1 focus:ring-blue-100 outline-none transition-all font-mono"
                  />
                </div>

                {/* ElevenLabs Key */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-[13px] font-semibold text-zinc-700">ElevenLabs API Key</label>
                    <a href="https://elevenlabs.io/app/developers" target="_blank" rel="noopener noreferrer" className="text-[12px] text-blue-500 hover:text-blue-600 flex items-center gap-1">ElevenLabs Dashboard <ArrowUpRight className="h-3 w-3" /></a>
                  </div>
                  <input
                    type="password"
                    defaultValue="YOUR_ELEVENLABS_API_KEY"
                    className="w-full px-4 py-2.5 text-[13px] border border-zinc-200 rounded-xl bg-zinc-50 focus:bg-white focus:border-blue-400 focus:ring-1 focus:ring-blue-100 outline-none transition-all font-mono"
                  />
                </div>

                <button className="inline-flex items-center gap-2 px-5 py-2.5 text-[13px] font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-xl transition-colors">
                  <Check className="h-4 w-4" />
                  Save All Keys
                </button>
              </div>
            </GlassCard>
          )}
        </div>
      </div>
    </>
  );
}
