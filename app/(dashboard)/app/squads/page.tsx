"use client";

import { PageHeader } from "@/components/ui/page-header";
import { GlassCard } from "@/components/ui/page-header";
import { Bot, Plus, ArrowRight, Users, Layers, GitBranch } from "lucide-react";
import { StatusPill } from "@/components/ui/status-pill";

const SQUADS = [
  {
    id: "sq1",
    name: "Healthcare Intake Squad",
    description: "Medical triage, scheduling, and follow-up automation",
    agents: ["Luna", "Sophia", "Emma"],
    calls: 842,
    status: "active",
    tag: "Healthcare",
  },
  {
    id: "sq2",
    name: "Real Estate Sales Squad",
    description: "Lead qualification, property viewing booking, and follow-up",
    agents: ["Ava", "Marcus", "James"],
    calls: 1203,
    status: "active",
    tag: "Real Estate",
  },
  {
    id: "sq3",
    name: "Insurance Claims Squad",
    description: "Claims intake, verification routing, and customer support",
    agents: ["Olivia", "Noah"],
    calls: 321,
    status: "active",
    tag: "Insurance",
  },
];

export default function SquadsPage() {
  return (
    <>
      <PageHeader
        title="Squads"
        subtitle="Multi-agent orchestration — route callers between specialized agents with context preservation"
        actions={
          <button className="inline-flex items-center gap-2 px-4 py-2 text-[13px] font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-xl transition-colors">
            <Plus className="h-4 w-4" />
            Create Squad
          </button>
        }
      />

      {/* Info Banner */}
      <div className="flex items-start gap-3 p-4 bg-[#00ff9c]/5 border border-[#00ff9c]/20 rounded-xl mb-6 shadow-[0_0_15px_rgba(0,255,156,0.05)]">
        <Layers className="h-5 w-5 text-[#00ff9c] flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-[11px] font-bold text-[#00ff9c] uppercase tracking-widest font-mono">ENCRYPTED_INTEL: ABOUT_SQUADS</p>
          <p className="text-[12px] text-zinc-400 mt-1 font-mono tracking-tight leading-relaxed">
            Squads orchestrate multiple specialized agents with seamless, context-preserving transfers. Perfect for complex workflows like medical triage or e-commerce support.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {SQUADS.map(squad => (
          <GlassCard key={squad.id}>
            <div className="px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-4 mb-1">
                  <div className="h-10 w-10 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-[#00ff9c]/30 transition-all">
                    <GitBranch className="h-5 w-5 text-zinc-500 group-hover:text-[#00ff9c]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-[15px] font-bold text-white font-mono uppercase tracking-tight">{squad.name}</h3>
                      <span className="px-2 py-0.5 text-[9px] font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 rounded-lg uppercase tracking-widest font-mono">{squad.tag}</span>
                      <StatusPill variant={squad.status as any} />
                    </div>
                    <p className="text-[12px] text-zinc-500 mt-1 font-mono tracking-tighter">{squad.description}</p>
                  </div>
                </div>

                {/* Agents */}
                <div className="flex items-center gap-3 ml-14 mt-4">
                  <Users className="h-3.5 w-3.5 text-zinc-600" />
                  <div className="flex items-center gap-2">
                    {squad.agents.map((agent, i) => (
                      <span key={agent} className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 text-[10px] font-bold text-white bg-white/[0.05] border border-white/10 rounded-lg font-mono uppercase tracking-widest">{agent}</span>
                        {i < squad.agents.length - 1 && <ArrowRight className="h-3 w-3 text-[#00ff9c] opacity-50" />}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 flex-shrink-0">
                <div className="text-right">
                  <p className="text-[20px] font-bold text-[#00ff9c] font-mono leading-none">{squad.calls.toLocaleString()}</p>
                  <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest mt-1">TOTAL_CALLS</p>
                </div>
                <button className="px-5 py-2.5 text-[11px] font-bold text-[#00ff9c] bg-[#00ff9c]/10 border border-[#00ff9c]/20 hover:bg-[#00ff9c]/20 rounded-xl transition-all uppercase tracking-widest font-mono shadow-[0_0_10px_rgba(0,255,156,0.05)]">
                  CONFIGURE
                </button>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </>
  );
}
