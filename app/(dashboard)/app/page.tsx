"use client";

import { PageHeader } from "@/components/ui/page-header";
import { GlassCard } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { StatusPill } from "@/components/ui/status-pill";
import { clients, dashboardStats } from "@/lib/mock-data";
import { Users, PhoneCall, CalendarCheck, TrendingUp, DollarSign, Plus, ClipboardCheck } from "lucide-react";

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        title="Agency Dashboard"
        subtitle="Overview of all client operations and performance metrics"
        actions={
          <>
            <button className="inline-flex items-center gap-2 px-4 py-2 text-[13px] font-bold text-[#050505] bg-[#00ff9c] hover:bg-[#00e68c] rounded-xl transition-all shadow-[0_0_15px_rgba(0,255,156,0.2)]">
              <Plus className="h-4 w-4" strokeWidth={3} />
              Add Client
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2 text-[13px] font-bold text-[#00ff9c] bg-[#00ff9c]/5 border border-[#00ff9c]/20 hover:bg-[#00ff9c]/10 rounded-xl transition-all">
              <ClipboardCheck className="h-4 w-4" />
              QA Review Queue
            </button>
          </>
        }
      />

      {/* ── Stat Cards ────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        <StatCard
          label="Total Clients"
          value={dashboardStats.totalClients}
          icon={Users}
          subtext="All time"
          delay={0}
        />
        <StatCard
          label="Total Calls"
          value={dashboardStats.totalCalls}
          icon={PhoneCall}
          subtext="All time"
          delay={40}
        />
        <StatCard
          label="Overall Booking Rate"
          value={`${dashboardStats.overallBookingRate}%`}
          icon={CalendarCheck}
          subtext="Across all clients"
          subtextColor="text-blue-500"
          delay={80}
        />
        <StatCard
          label="Overall Success Rate"
          value={`${dashboardStats.overallSuccessRate}%`}
          icon={TrendingUp}
          subtext="Across all clients"
          subtextColor="text-emerald-500"
          delay={120}
        />
        <StatCard
          label="Total Spend"
          value={dashboardStats.totalSpend}
          icon={DollarSign}
          subtext="All time"
          delay={160}
        />
      </div>

      {/* ── Client Overview Table ─────────────────────── */}
      <GlassCard delay={200}>
        <div className="px-6 py-5 border-b border-white/5 bg-white/[0.01]">
          <h2 className="text-sm font-bold tracking-widest text-[#00ff9c] uppercase font-mono">Client Overview</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5">
                <th className="px-6 py-4 text-[10px] font-bold tracking-widest text-zinc-500 uppercase font-mono">Client</th>
                <th className="px-6 py-4 text-[10px] font-bold tracking-widest text-zinc-500 uppercase text-center font-mono">Agents</th>
                <th className="px-6 py-4 text-[10px] font-bold tracking-widest text-zinc-500 uppercase text-center font-mono">Calls (30d)</th>
                <th className="px-6 py-4 text-[10px] font-bold tracking-widest text-zinc-500 uppercase text-center font-mono">Booking %</th>
                <th className="px-6 py-4 text-[10px] font-bold tracking-widest text-zinc-500 uppercase text-center font-mono">Success %</th>
                <th className="px-6 py-4 text-[10px] font-bold tracking-widest text-zinc-500 uppercase text-center font-mono">Status</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr
                  key={client.id}
                  className="border-b border-white/5 last:border-0 hover:bg-[#00ff9c]/[0.02] transition-colors duration-150 cursor-pointer group"
                >
                  <td className="px-6 py-4">
                    <p className="text-[13px] font-bold text-white tracking-tight">{client.name}</p>
                    <p className="text-[11px] text-zinc-500 mt-1 font-mono">{client.industry}</p>
                  </td>
                  <td className="px-6 py-4 text-[13px] text-zinc-400 text-center font-mono tabular-nums">{client.agentCount}</td>
                  <td className="px-6 py-4 text-[13px] font-bold text-white text-center font-mono tabular-nums">
                    {client.callsLast30d}
                  </td>
                  <td className="px-6 py-4 text-[13px] font-bold text-center font-mono tabular-nums">
                    <span className={client.bookingRate > 0 ? "text-[#00ff9c]" : "text-zinc-700"}>
                      {client.bookingRate > 0 ? `${client.bookingRate}%` : "0%"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[13px] font-bold text-center font-mono tabular-nums">
                    <span className={client.successRate > 0 ? "text-[#00ff9c]" : "text-zinc-700"}>
                      {client.successRate > 0 ? `${client.successRate}%` : "0%"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <StatusPill variant={client.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </>
  );
}
