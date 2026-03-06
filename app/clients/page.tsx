"use client";

import { PageHeader } from "@/components/ui/page-header";
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
          <button className="inline-flex items-center gap-2 px-4 py-2 text-[13px] font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-xl transition-colors">
            <Plus className="h-4 w-4" />
            Add Client
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {clients.map((client, i) => (
          <div
            key={client.id}
            className="animate-fade-in-up rounded-2xl bg-white border border-[var(--color-card-border)] p-5 hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-all duration-300 cursor-pointer"
            style={{ animationDelay: `${i * 40}ms` }}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-[14px] font-semibold text-zinc-900">{client.name}</h3>
                <p className="text-[12px] text-zinc-400 mt-0.5">{client.industry}</p>
              </div>
              <StatusPill variant={client.status} />
            </div>

            {/* Footer stats */}
            <div className="flex items-center gap-4 pt-3 border-t border-[var(--color-card-border)]">
              <div className="flex items-center gap-1.5 text-[12px] text-zinc-400">
                <Bot className="h-3.5 w-3.5" />
                <span className="font-medium">{client.agentCount} agents</span>
              </div>
              <div className="flex items-center gap-1.5 text-[12px] text-zinc-400">
                <PhoneCall className="h-3.5 w-3.5" />
                <span className="font-medium">{client.callsLast30d} calls</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
