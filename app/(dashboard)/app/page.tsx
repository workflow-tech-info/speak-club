"use client";

import { useEffect, useState } from "react";
import { PageHeader, GlassCard } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { StatusPill } from "@/components/ui/status-pill";
import { db } from "@/lib/insforge";
import { Users, PhoneCall, CalendarCheck, TrendingUp, DollarSign, Plus, ClipboardCheck } from "lucide-react";
import { AddClientModal } from "@/components/modals/add-client-modal";

export default function DashboardPage() {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const { data } = await db.clients.getAll();
    if (data) setClients(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const stats = {
    totalClients: clients.length,
    totalCalls: 85,
    overallBookingRate: 50,
    overallSuccessRate: 71,
    totalSpend: "$19.51",
  };

  return (
    <>
      <PageHeader
        title="Agency Dashboard"
        subtitle="Overview of all client operations and performance metrics"
        actions={
          <>
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 text-[13px] font-bold text-[#050505] bg-[#00ff9c] hover:bg-[#00e68c] rounded-xl transition-all shadow-[0_0_15px_rgba(0,255,156,0.2)]"
            >
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
          value={stats.totalClients}
          icon={Users}
          subtext="All time"
          delay={0}
        />
        <StatCard
          label="Total Calls"
          value={stats.totalCalls}
          icon={PhoneCall}
          subtext="All time"
          delay={40}
        />
        <StatCard
          label="Overall Booking Rate"
          value={`${stats.overallBookingRate}%`}
          icon={CalendarCheck}
          subtext="Across all clients"
          subtextColor="text-blue-500"
          delay={80}
        />
        <StatCard
          label="Overall Success Rate"
          value={`${stats.overallSuccessRate}%`}
          icon={TrendingUp}
          subtext="Across all clients"
          subtextColor="text-emerald-500"
          delay={120}
        />
        <StatCard
          label="Total Spend"
          value={stats.totalSpend}
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
          {loading ? (
            <div className="p-12 text-center text-zinc-500 font-mono animate-pulse">Loading backend data...</div>
          ) : (
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
                    <td className="px-6 py-4 text-[13px] text-zinc-400 text-center font-mono tabular-nums">{client.agent_count}</td>
                    <td className="px-6 py-4 text-[13px] font-bold text-white text-center font-mono tabular-nums">
                      {client.calls_last_30d}
                    </td>
                    <td className="px-6 py-4 text-[13px] font-bold text-center font-mono tabular-nums">
                      <span className={client.booking_rate > 0 ? "text-[#00ff9c]" : "text-zinc-700"}>
                        {client.booking_rate > 0 ? `${client.booking_rate}%` : "0%"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[13px] font-bold text-center font-mono tabular-nums">
                      <span className={client.success_rate > 0 ? "text-[#00ff9c]" : "text-zinc-700"}>
                        {client.success_rate > 0 ? `${client.success_rate}%` : "0%"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <StatusPill variant={client.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </GlassCard>

      <AddClientModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onSuccess={fetchData}
      />
    </>
  );
}
