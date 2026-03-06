"use client";

import { PageHeader } from "@/components/ui/page-header";
import { StatusPill } from "@/components/ui/status-pill";
import { agents } from "@/lib/mock-data";
import { Bot, PhoneCall, Mic, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AgentsPage() {
  return (
    <>
      <PageHeader
        title="Agents"
        subtitle="Manage and monitor all your AI voice agents"
        actions={
          <button className="inline-flex items-center gap-2 px-4 py-2 text-[13px] font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-xl transition-colors">
            <Plus className="h-4 w-4" />
            Add Agent
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {agents.map((agent, i) => (
          <div
            key={agent.id}
            className="animate-fade-in-up rounded-2xl bg-white border border-[var(--color-card-border)] p-5 hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-all duration-300 cursor-pointer"
            style={{ animationDelay: `${i * 40}ms` }}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "h-10 w-10 rounded-xl flex items-center justify-center",
                  agent.status === "active"
                    ? "bg-zinc-900 text-white"
                    : agent.status === "training"
                      ? "bg-amber-100 text-amber-600"
                      : "bg-zinc-100 text-zinc-400"
                )}>
                  <Bot className="h-5 w-5" strokeWidth={1.8} />
                </div>
                <div>
                  <h3 className="text-[14px] font-semibold text-zinc-900">{agent.name}</h3>
                  <p className="text-[12px] text-zinc-400">{agent.role}</p>
                </div>
              </div>
              <StatusPill variant={agent.status} />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="rounded-xl bg-zinc-50 px-3 py-2.5">
                <div className="flex items-center gap-1.5 mb-1">
                  <PhoneCall className="h-3 w-3 text-zinc-400" />
                  <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">Calls</span>
                </div>
                <p className="text-[14px] font-bold text-zinc-800 tabular-nums">
                  {agent.totalCalls.toLocaleString()}
                </p>
              </div>
              <div className="rounded-xl bg-zinc-50 px-3 py-2.5">
                <div className="flex items-center gap-1.5 mb-1">
                  <Mic className="h-3 w-3 text-zinc-400" />
                  <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">Voice</span>
                </div>
                <p className="text-[13px] font-bold text-zinc-800 truncate">{agent.voiceModel}</p>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-3 border-t border-[var(--color-card-border)]">
              <p className="text-[12px] text-zinc-400">
                <span className="text-zinc-600 font-medium">{agent.clientName}</span> · {agent.language}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
