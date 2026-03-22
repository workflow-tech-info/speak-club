"use client";

import { useEffect, useState } from "react";
import { PageHeader, GlassCard } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { db } from "@/lib/insforge";
import { PhoneCall, Clock, Timer, TrendingUp, DollarSign, CalendarCheck, PhoneIncoming, ArrowRightLeft, Loader2 } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function AnalyticsPage() {
  const [stats, setStats] = useState<any>(null);
  const [dailyData, setDailyData] = useState<any[]>([]);
  const [sentiment, setSentiment] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnalytics() {
      const [{ data: s }, { data: dd }, { data: sd }] = await Promise.all([
        db.analytics.getOverallStats(),
        db.analytics.getDailyStats(),
        db.analytics.getSentimentDistribution()
      ]);
      if (s) setStats(s);
      if (dd) setDailyData(dd);
      if (sd) setSentiment(sd);
      setLoading(false);
    }
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-[#00ff9c] animate-spin" />
      </div>
    );
  }
  return (
    <>
      <PageHeader
        title="Analytics"
        subtitle="Insights and performance metrics for your voice AI operations"
        actions={
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 px-3 py-2 text-[12px] font-bold text-[#00ff9c] bg-[#00ff9c]/5 border border-[#00ff9c]/20 hover:bg-[#00ff9c]/10 rounded-lg transition-all">
              📅 PERIOD SELECTION
            </button>
            <select className="px-3 py-2 text-[12px] font-bold text-zinc-400 bg-black/40 border border-white/5 rounded-lg appearance-none cursor-pointer hover:border-[#00ff9c]/30 transition-all pr-8 uppercase tracking-widest font-mono">
              <option>ALL AGENTS</option>
              {['SOPHIA', 'JAMES', 'AVA'].map(name => <option key={name}>{name}</option>)}
            </select>
            <select className="px-3 py-2 text-[12px] font-bold text-zinc-400 bg-black/40 border border-white/5 rounded-lg appearance-none cursor-pointer hover:border-[#00ff9c]/30 transition-all pr-8 uppercase tracking-widest font-mono">
              <option>ALL CLIENTS</option>
              {['MERIDIAN HEALTH', 'APEX AUTO SALES'].map(client => <option key={client}>{client}</option>)}
            </select>
          </div>
        }
      />

      {/* ── Top Stat Cards ────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        <StatCard label="Total Calls" value={stats?.total_calls || 0} icon={PhoneCall} subtext="last 30 days" delay={0} />
        <StatCard label="Total Minutes" value={stats?.total_minutes || 0} icon={Clock} subtext="last 30 days" delay={40} />
        <StatCard label="Avg Duration" value={stats?.avg_duration || "0:00"} icon={Timer} subtext="per call" delay={80} />
        <StatCard label="Success Rate" value={`${stats?.success_rate || 0}%`} icon={TrendingUp} subtext="completed calls" subtextColor="text-emerald-500" delay={120} />
        <StatCard label="Total Spend" value={`$${stats?.total_spend || 0}`} icon={DollarSign} subtext="All time" delay={160} />
      </div>

      {/* ── Rate Cards ────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard label="Booking Rate" value={`${stats?.booking_rate || 0}%`} icon={CalendarCheck} subtext="Of completed calls" subtextColor="text-emerald-500" delay={200} />
        <StatCard label="Pickup Rate" value={`${stats?.pickup_rate || 0}%`} icon={PhoneIncoming} subtext="Of all calls" subtextColor="text-emerald-500" delay={240} />
        <StatCard label="Transfer Rate" value={`${stats?.transfer_rate || 0}%`} icon={ArrowRightLeft} subtext="Of completed calls" delay={280} />
      </div>

      {/* ── Charts Row ────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Area Chart */}
        <GlassCard className="lg:col-span-2 p-6" delay={320}>
          <h3 className="text-sm font-bold tracking-widest text-[#00ff9c] uppercase font-mono mb-1">CALL LOGISTICS OVER TIME</h3>
          <p className="text-[11px] text-zinc-500 mb-8 font-mono tracking-tight text-zinc-500 uppercase">SYSTEM DATA ANALYTICS // NODE_STATUS: ACTIVE</p>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dailyData}>
                <defs>
                  <linearGradient id="callsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00ff9c" stopOpacity={0.15} />
                    <stop offset="100%" stopColor="#00ff9c" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" />
                <XAxis dataKey="date" tick={{ fill: "#a1a1aa", fontSize: 11 }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fill: "#a1a1aa", fontSize: 11 }} tickLine={false} axisLine={false} width={30} />
                <Tooltip
                  contentStyle={{
                    background: "rgba(10,10,10,0.9)",
                    border: "1px solid rgba(0,255,156,0.2)",
                    borderRadius: "8px",
                    boxShadow: "0 4px 20px rgba(0,255,156,0.1)",
                    fontSize: "11px",
                    fontFamily: "var(--font-mono)",
                    color: "#fff",
                  }}
                  itemStyle={{ color: "#00ff9c" }}
                />
                <Area type="monotone" dataKey="calls" stroke="#00ff9c" strokeWidth={2} fill="url(#callsGrad)" dot={{ r: 3, fill: '#00ff9c' }} />
                <Area type="monotone" dataKey="bookings" stroke="#888888" strokeWidth={2} fill="url(#bookingsGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Donut Chart */}
        <GlassCard className="p-6 flex flex-col" delay={360}>
          <h3 className="text-sm font-bold tracking-widest text-[#00ff9c] uppercase font-mono mb-1">INTERACTION SENTIMENT</h3>
          <p className="text-[11px] text-zinc-500 mb-8 font-mono tracking-tight text-zinc-500 uppercase">MONTHLY REPORT // S_LEVEL: 04</p>
          <div className="flex-1 flex items-center justify-center">
            <div className="h-[180px] w-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sentiment}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {sentiment.map((entry: any, i: number) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "rgba(255,255,255,0.95)",
                      border: "1px solid rgba(0,0,0,0.06)",
                      borderRadius: "12px",
                      boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                      fontSize: "12px",
                    }}
                    formatter={(value) => [`${value}%`, ""]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="flex justify-center gap-5 mt-2">
            {sentiment.map((s: any) => (
              <div key={s.name} className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
                <span className="text-[11px] text-zinc-500">{s.name}</span>
                <span className="text-[11px] font-bold text-zinc-700">{s.value}%</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </>
  );
}
