"use client";

import { PageHeader, GlassCard } from "@/components/ui/page-header";
import { StatusPill } from "@/components/ui/status-pill";
import { clients } from "@/lib/mock-data";
import { Bot, PhoneCall, Plus } from "lucide-react";

export default function ClientsPage() {
  return (
    <>
      <PageHeader
        title="Clients"
        subtitle="Manage your clients and their agent assignments"
        actions={
          <button className="inline-flex items-center gap-2 px-4 py-2 text-[11px] font-bold text-black bg-[#00ff9c] hover:bg-[#00e68d] rounded-xl transition-all shadow-[0_0_15px_rgba(0,255,156,0.2)] uppercase tracking-widest font-mono">
            <Plus className="h-4 w-4" />
            ADD_CLIENT
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {clients.map((client, i) => (
          <GlassCard key={client.id} delay={i * 40}>
            <div className="p-5 cursor-pointer group">
              {/* Header */}
              <div className="flex items-start justify-between mb-5">
                <div>
                  <h3 className="text-[14px] font-bold text-white font-mono uppercase tracking-tight">{client.name}</h3>
                  <p className="text-[11px] text-zinc-500 font-mono uppercase tracking-tighter mt-0.5">{client.industry}</p>
                </div>
                <StatusPill variant={client.status} />
              </div>

              {/* Footer stats */}
              <div className="flex items-center gap-5 pt-4 border-t border-[#00ff9c]/5">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-500 font-mono uppercase tracking-widest">
                  <Bot className="h-3.5 w-3.5 text-[#00ff9c] opacity-50" />
                  <span>{client.agentCount} AGENTS</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-500 font-mono uppercase tracking-widest">
                  <PhoneCall className="h-3.5 w-3.5 text-[#00ff9c] opacity-50" />
                  <span>{client.callsLast30d} CALLS</span>
                </div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </>
  );
}
