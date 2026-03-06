"use client";

import { PageHeader } from "@/components/ui/page-header";
import { GlassCard } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { analyticsData, sentimentData, analyticsStats } from "@/lib/mock-data";
import { PhoneCall, Clock, Timer, TrendingUp, DollarSign, CalendarCheck, PhoneIncoming, ArrowRightLeft } from "lucide-react";
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
  return (
    <>
      <PageHeader
        title="Analytics"
        subtitle="Insights and performance metrics for your voice AI operations"
        actions={
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-2 px-3 py-1.5 text-[12px] font-medium text-zinc-600 bg-white border border-zinc-200 hover:bg-zinc-50 rounded-lg transition-colors">
              📅 Pick a date range
            </button>
            <select className="px-3 py-1.5 text-[12px] font-medium text-zinc-600 bg-white border border-zinc-200 rounded-lg appearance-none cursor-pointer hover:bg-zinc-50 transition-colors pr-7">
              <option>All Agents</option>
              <option>Sophia</option>
              <option>James</option>
              <option>Ava</option>
            </select>
            <select className="px-3 py-1.5 text-[12px] font-medium text-zinc-600 bg-white border border-zinc-200 rounded-lg appearance-none cursor-pointer hover:bg-zinc-50 transition-colors pr-7">
              <option>All Clients</option>
              <option>Meridian Health</option>
              <option>Apex Auto Sales</option>
            </select>
          </div>
        }
      />

      {/* ── Top Stat Cards ────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        <StatCard label="Total Calls" value={analyticsStats.totalCalls} icon={PhoneCall} subtext="last 30 days" delay={0} />
        <StatCard label="Total Minutes" value={analyticsStats.totalMinutes} icon={Clock} subtext="last 30 days" delay={40} />
        <StatCard label="Avg Duration" value={analyticsStats.avgDuration} icon={Timer} subtext="per call" delay={80} />
        <StatCard label="Success Rate" value={`${analyticsStats.successRate}%`} icon={TrendingUp} subtext="completed calls" subtextColor="text-emerald-500" delay={120} />
        <StatCard label="Total Spend" value={analyticsStats.totalSpend} icon={DollarSign} subtext="All time" delay={160} />
      </div>

      {/* ── Rate Cards ────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard label="Booking Rate" value={`${analyticsStats.bookingRate}%`} icon={CalendarCheck} subtext="Of completed calls" subtextColor="text-emerald-500" delay={200} />
        <StatCard label="Pickup Rate" value={`${analyticsStats.pickupRate}%`} icon={PhoneIncoming} subtext="Of all calls" subtextColor="text-emerald-500" delay={240} />
        <StatCard label="Transfer Rate" value={`${analyticsStats.transferRate}%`} icon={ArrowRightLeft} subtext="Of completed calls" delay={280} />
      </div>

      {/* ── Charts Row ────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Area Chart */}
        <GlassCard className="lg:col-span-2 p-6" delay={320}>
          <h3 className="text-[15px] font-bold text-zinc-900 mb-0.5">Calls Over Time</h3>
          <p className="text-[12px] text-zinc-400 mb-6">Daily call volume and bookings</p>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analyticsData}>
                <defs>
                  <linearGradient id="callsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#18181b" stopOpacity={0.12} />
                    <stop offset="100%" stopColor="#18181b" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="bookingsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.15} />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" />
                <XAxis dataKey="date" tick={{ fill: "#a1a1aa", fontSize: 11 }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fill: "#a1a1aa", fontSize: 11 }} tickLine={false} axisLine={false} width={30} />
                <Tooltip
                  contentStyle={{
                    background: "rgba(255,255,255,0.95)",
                    border: "1px solid rgba(0,0,0,0.06)",
                    borderRadius: "12px",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                    fontSize: "12px",
                  }}
                />
                <Area type="monotone" dataKey="calls" stroke="#18181b" strokeWidth={2} fill="url(#callsGrad)" />
                <Area type="monotone" dataKey="bookings" stroke="#3b82f6" strokeWidth={2} fill="url(#bookingsGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Donut Chart */}
        <GlassCard className="p-6 flex flex-col" delay={360}>
          <h3 className="text-[15px] font-bold text-zinc-900 mb-0.5">Sentiment Breakdown</h3>
          <p className="text-[12px] text-zinc-400 mb-4">Based on all calls this month</p>
          <div className="flex-1 flex items-center justify-center">
            <div className="h-[180px] w-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sentimentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {sentimentData.map((entry, i) => (
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
            {sentimentData.map((s) => (
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
