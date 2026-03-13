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
      <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-100 rounded-xl mb-6">
        <Layers className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-[13px] font-semibold text-blue-900">About Squads</p>
          <p className="text-[12px] text-blue-600 mt-0.5">
            Squads orchestrate multiple specialized agents with seamless, context-preserving transfers. Perfect for complex workflows like medical triage or e-commerce support.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {SQUADS.map(squad => (
          <GlassCard key={squad.id}>
            <div className="px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <div className="h-9 w-9 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0">
                    <GitBranch className="h-5 w-5 text-indigo-500" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-[15px] font-bold text-zinc-900">{squad.name}</h3>
                      <span className="px-2 py-0.5 text-[10px] font-bold text-indigo-600 bg-indigo-50 rounded-full">{squad.tag}</span>
                      <StatusPill variant={squad.status as any} />
                    </div>
                    <p className="text-[12px] text-zinc-400 mt-0.5">{squad.description}</p>
                  </div>
                </div>

                {/* Agents */}
                <div className="flex items-center gap-2 ml-12 mt-3">
                  <Users className="h-3.5 w-3.5 text-zinc-400" />
                  <div className="flex items-center gap-1.5">
                    {squad.agents.map((agent, i) => (
                      <span key={agent} className="flex items-center gap-1">
                        <span className="px-2 py-0.5 text-[11px] font-medium text-zinc-600 bg-zinc-100 rounded-full">{agent}</span>
                        {i < squad.agents.length - 1 && <ArrowRight className="h-3 w-3 text-zinc-300" />}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 flex-shrink-0">
                <div className="text-right">
                  <p className="text-[18px] font-bold text-zinc-900">{squad.calls.toLocaleString()}</p>
                  <p className="text-[11px] text-zinc-400">total calls</p>
                </div>
                <button className="px-4 py-2 text-[12px] font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors whitespace-nowrap">
                  Configure
                </button>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </>
  );
}
