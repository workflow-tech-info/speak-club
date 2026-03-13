"use client";

import { PageHeader, GlassCard } from "@/components/ui/page-header";
import { StatusPill } from "@/components/ui/status-pill";
import { agents } from "@/lib/mock-data";
import { Bot, PhoneCall, Mic, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function AgentsPage() {
  return (
    <>
      <PageHeader
        title="Agents"
        subtitle="Manage and monitor all your AI voice agents"
        actions={
          <button className="inline-flex items-center gap-2 px-4 py-2 text-[11px] font-bold text-black bg-[#00ff9c] hover:bg-[#00e68d] rounded-xl transition-all shadow-[0_0_15px_rgba(0,255,156,0.2)] uppercase tracking-widest font-mono">
            <Plus className="h-4 w-4" />
            ADD_AGENT
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {agents.map((agent, i) => (
          <GlassCard key={agent.id} delay={i * 40}>
            <Link
              href={`/agents/${agent.id}`}
              className="p-5 cursor-pointer block group"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "h-10 w-10 rounded-xl flex items-center justify-center border transition-all",
                    agent.status === "active"
                      ? "bg-[#00ff9c]/10 text-[#00ff9c] border-[#00ff9c]/30"
                      : agent.status === "training"
                        ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                        : "bg-white/5 text-zinc-600 border-white/5"
                  )}>
                    <Bot className="h-5 w-5" strokeWidth={1.8} />
                  </div>
                  <div>
                    <h3 className="text-[14px] font-bold text-white font-mono uppercase tracking-tight">{agent.name}</h3>
                    <p className="text-[11px] text-zinc-500 font-mono uppercase tracking-tighter mt-0.5">{agent.role}</p>
                  </div>
                </div>
                <StatusPill variant={agent.status} />
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="rounded-xl bg-white/[0.03] border border-white/5 px-3 py-2.5 group-hover:border-[#00ff9c]/20 transition-all">
                  <div className="flex items-center gap-1.5 mb-1">
                    <PhoneCall className="h-3 w-3 text-zinc-600" />
                    <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest font-mono">CALLS</span>
                  </div>
                  <p className="text-[15px] font-bold text-[#00ff9c] tabular-nums font-mono leading-none">
                    {agent.totalCalls.toLocaleString()}
                  </p>
                </div>
                <div className="rounded-xl bg-white/[0.03] border border-white/5 px-3 py-2.5 group-hover:border-[#00ff9c]/20 transition-all">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Mic className="h-3 w-3 text-zinc-600" />
                    <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest font-mono">VOICE</span>
                  </div>
                  <p className="text-[12px] font-bold text-zinc-300 truncate font-mono uppercase tracking-tighter leading-none">
                    {agent.voiceModel.replace('11labs-', '')}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="pt-4 border-t border-[#00ff9c]/5">
                <p className="text-[11px] text-zinc-600 font-mono uppercase tracking-widest">
                  <span className="text-zinc-400 font-bold">{agent.clientName.toUpperCase()}</span> · {agent.language.toUpperCase()}
                </p>
              </div>
            </Link>
          </GlassCard>
        ))}
      </div>
    </>
  );
}
