"use client";

import { PageHeader } from "@/components/ui/page-header";
import { GlassCard } from "@/components/ui/page-header";
import { Save, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
  const [showApiKey, setShowApiKey] = useState(false);

  return (
    <>
      <PageHeader
        title="General Settings"
        subtitle="Manage your organization protocols and authentication nodes"
      />

      <div className="max-w-2xl space-y-6 pb-20">
        {/* Organization */}
        <GlassCard>
          <div className="px-6 py-5 border-b border-[#00ff9c]/10 bg-white/[0.01]">
            <h2 className="text-[11px] font-bold text-[#00ff9c] uppercase tracking-widest font-mono">ORGANIZATION_NODE</h2>
          </div>
          <div className="px-6 py-6 space-y-6">
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-zinc-600 uppercase tracking-widest font-mono">NODE_IDENTIFIER</label>
              <input
                type="text"
                defaultValue="Speak Club"
                className="w-full px-4 py-3 text-[13px] bg-black border border-[#00ff9c]/10 rounded-xl text-white focus:border-[#00ff9c] outline-none transition-all font-mono"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-zinc-600 uppercase tracking-widest font-mono">SYSTEM_SLUG</label>
              <input
                type="text"
                defaultValue="demo-agency"
                className="w-full px-4 py-3 text-[13px] bg-black border border-[#00ff9c]/10 rounded-xl text-[#00ff9c] focus:border-[#00ff9c] outline-none transition-all font-mono opacity-80"
              />
            </div>
            <button className="inline-flex items-center gap-2 px-6 py-3 text-[11px] font-bold text-black bg-[#00ff9c] hover:bg-[#00e68d] rounded-xl transition-all shadow-[0_0_20px_rgba(0,255,156,0.1)] uppercase tracking-widest font-mono">
              <Save className="h-4 w-4" />
              COMMIT_CHANGES
            </button>
          </div>
        </GlassCard>

        {/* Retell AI Integration */}
        <GlassCard delay={100}>
          <div className="px-6 py-5 border-b border-[#00ff9c]/10 bg-white/[0.01]">
            <h2 className="text-[11px] font-bold text-[#00ff9c] uppercase tracking-widest font-mono">RETELL_AI_BRIDGE</h2>
            <p className="text-[10px] text-zinc-500 mt-1 font-mono uppercase tracking-tighter">SECURE_VOICE_GATEWAY_V2_ENCRYPTED</p>
          </div>
          <div className="px-6 py-6 space-y-6">
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-zinc-600 uppercase tracking-widest font-mono">PRIVATE_ACCESS_KEY</label>
              <div className="relative">
                <input
                  type={showApiKey ? "text" : "password"}
                  defaultValue="YOUR_RETELL_API_KEY"
                  className="w-full px-4 py-3 text-[13px] bg-black border border-[#00ff9c]/10 rounded-xl text-white focus:border-[#00ff9c] outline-none transition-all font-mono pr-12"
                />
                <button
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-zinc-600 hover:text-[#00ff9c] transition-all"
                >
                  {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <button className="inline-flex items-center gap-2 px-6 py-3 text-[11px] font-bold text-black bg-[#00ff9c] hover:bg-[#00e68d] rounded-xl transition-all uppercase tracking-widest font-mono">
              <Save className="h-4 w-4" />
              SYNCHRONIZE_BRIDGE
            </button>
          </div>
        </GlassCard>

        {/* n8n Integration */}
        <GlassCard delay={200}>
          <div className="px-6 py-5 border-b border-[#00ff9c]/10 bg-white/[0.01]">
            <h2 className="text-[11px] font-bold text-[#00ff9c] uppercase tracking-widest font-mono">N8N_AUTOMATION_UPLINK</h2>
          </div>
          <div className="px-6 py-6 space-y-6">
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-zinc-600 uppercase tracking-widest font-mono">COMMAND_BASE_URL</label>
              <input
                type="url"
                defaultValue="https://app.workflow-tech.info/"
                className="w-full px-4 py-3 text-[13px] bg-black border border-[#00ff9c]/10 rounded-xl text-[#00ff9c] focus:border-[#00ff9c] outline-none transition-all font-mono opacity-80"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-zinc-600 uppercase tracking-widest font-mono">UPLINK_TOKEN</label>
              <div className="relative">
                <input
                  type="password"
                  defaultValue="your_n8n_api_key_here"
                  className="w-full px-4 py-3 text-[13px] bg-black border border-[#00ff9c]/10 rounded-xl text-white focus:border-[#00ff9c] outline-none transition-all font-mono pr-12"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-zinc-600 hover:text-[#00ff9c] transition-all">
                  <Eye className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-zinc-600 uppercase tracking-widest font-mono">BOOKING_WEBHOOK</label>
                <input
                  type="url"
                  defaultValue="https://app.workflow-tech.info/webhook/booking"
                  className="w-full px-4 py-3 text-[11px] bg-black border border-[#00ff9c]/5 rounded-xl text-zinc-400 focus:border-[#00ff9c] outline-none transition-all font-mono"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-zinc-600 uppercase tracking-widest font-mono">AVAILABILITY_WEBHOOK</label>
                <input
                  type="url"
                  defaultValue="https://app.workflow-tech.info/webhook-test/availability"
                  className="w-full px-4 py-3 text-[11px] bg-black border border-[#00ff9c]/5 rounded-xl text-zinc-400 focus:border-[#00ff9c] outline-none transition-all font-mono"
                />
              </div>
            </div>
            <button className="inline-flex items-center gap-2 px-6 py-3 text-[11px] font-bold text-black bg-[#00ff9c] hover:bg-[#00e68d] rounded-xl transition-all uppercase tracking-widest font-mono">
              <Save className="h-4 w-4" />
              INITIALIZE_AUTOMATION
            </button>
          </div>
        </GlassCard>

        {/* Danger Zone */}
        <GlassCard delay={300}>
          <div className="px-6 py-5 border-b border-red-500/10 bg-red-500/[0.02]">
            <h2 className="text-[11px] font-bold text-red-500 uppercase tracking-[0.2em] font-mono">!!! DANGER_ZONE !!!</h2>
          </div>
          <div className="px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <p className="text-[13px] font-bold text-white font-mono uppercase tracking-widest">PURGE_ORGANIZATION</p>
              <p className="text-[11px] text-zinc-600 mt-1 font-mono uppercase tracking-tighter italic">Warning: This action is irreversible. All data points will be deleted.</p>
            </div>
            <button className="px-8 py-3 text-[11px] font-bold text-red-500 border border-red-500/20 hover:bg-red-500/10 rounded-xl transition-all uppercase tracking-[0.2em] font-mono">
              TERMINATE
            </button>
          </div>
        </GlassCard>
      </div>
    </>
  );
}
