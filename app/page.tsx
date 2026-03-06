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
            <button className="inline-flex items-center gap-2 px-4 py-2 text-[13px] font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-xl transition-colors">
              <Plus className="h-4 w-4" />
              Add Client
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2 text-[13px] font-medium text-zinc-600 bg-white border border-zinc-200 hover:bg-zinc-50 rounded-xl transition-colors">
              <ClipboardCheck className="h-4 w-4" />
              QA Review Queue
            </button>
          </>
        }
      />

      {/* ── Stat Cards ────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
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
        <div className="px-6 py-5 border-b border-[var(--color-card-border)]">
          <h2 className="text-base font-bold tracking-tight text-zinc-900">Client Overview</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[var(--color-card-border)]">
                <th className="px-6 py-3.5 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase">Client</th>
                <th className="px-6 py-3.5 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase text-center"># Agents</th>
                <th className="px-6 py-3.5 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase text-center">Calls (30d)</th>
                <th className="px-6 py-3.5 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase text-center">Booking Rate</th>
                <th className="px-6 py-3.5 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase text-center">Success Rate</th>
                <th className="px-6 py-3.5 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr
                  key={client.id}
                  className="border-b border-[var(--color-card-border)] last:border-0 hover:bg-zinc-50/60 transition-colors duration-150 cursor-pointer"
                >
                  <td className="px-6 py-4">
                    <p className="text-[13px] font-semibold text-zinc-900">{client.name}</p>
                    <p className="text-[12px] text-zinc-400 mt-0.5">{client.industry}</p>
                  </td>
                  <td className="px-6 py-4 text-[13px] text-zinc-600 text-center tabular-nums">{client.agentCount}</td>
                  <td className="px-6 py-4 text-[13px] font-medium text-zinc-700 text-center tabular-nums">
                    {client.callsLast30d}
                  </td>
                  <td className="px-6 py-4 text-[13px] font-medium text-center tabular-nums">
                    <span className={client.bookingRate > 0 ? "text-blue-600" : "text-zinc-300"}>
                      {client.bookingRate > 0 ? `${client.bookingRate}%` : "0%"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[13px] font-medium text-center tabular-nums">
                    <span className={client.successRate > 0 ? "text-emerald-600" : "text-zinc-300"}>
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
