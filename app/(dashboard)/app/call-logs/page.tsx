"use client";

import { useEffect, useState } from "react";
import { PageHeader, GlassCard } from "@/components/ui/page-header";
import { StatusPill } from "@/components/ui/status-pill";
import { CallDrawer } from "@/components/ui/call-drawer";
import { db } from "@/lib/insforge";
import { Phone, Globe, Search, Download, Loader2 } from "lucide-react";

export default function CallLogsPage() {
  const [callLogs, setCallLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCall, setSelectedCall] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [agentFilter, setAgentFilter] = useState("All Agents");
  const [statusFilter, setStatusFilter] = useState("All Statuses");

  useEffect(() => {
    async function fetchLogs() {
      const { data } = await db.callLogs.getAll(50);
      if (data) setCallLogs(data);
      setLoading(false);
    }
    fetchLogs();
  }, []);

  // Get unique agents for the filter
  const uniqueAgents = Array.from(new Set(callLogs.map(c => c.agent?.name || "Unknown Agent"))).sort();

  const filteredLogs = callLogs.filter((call) => {
    const agentName = call.agent?.name || "Unknown Agent";
    const clientName = call.client?.name || "Unknown Client";
    const matchesSearch = 
      agentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      call.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesAgent = agentFilter === "All Agents" || agentName === agentFilter;
    const matchesStatus = statusFilter === "All Statuses" || call.status === statusFilter.toLowerCase();

    return matchesSearch && matchesAgent && matchesStatus;
  });

  return (
    <>
      <PageHeader
        title="Call Logs"
        subtitle="Detailed history of all calls processed by your voice agents"
      />

      <GlassCard>
        <div className="px-4 sm:px-6 py-5 border-b border-[var(--color-card-border)] flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-center justify-between w-full lg:w-auto gap-4">
            <div>
              <h2 className="text-sm font-bold tracking-widest text-[#00ff9c] uppercase font-mono">Recent Call Stream</h2>
              <p className="text-[11px] text-zinc-500 mt-1 font-mono">{filteredLogs.length} RECORDS_FOUND</p>
            </div>
            <button className="flex shrink-0 items-center gap-2 px-3 py-1.5 text-[11px] font-bold text-[#00ff9c] bg-[#00ff9c]/5 border border-[#00ff9c]/20 rounded-lg hover:bg-[#00ff9c]/10 transition-all uppercase tracking-widest">
              <Download className="h-3.5 w-3.5" />
              EXPORT
            </button>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500" />
              <input 
                type="text"
                placeholder="SEARCH_CALLS..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-[11px] font-bold text-white bg-black/40 border border-white/5 rounded-lg outline-none focus:border-[#00ff9c]/30 transition-all placeholder:text-zinc-600 font-mono uppercase tracking-tight"
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select 
                value={agentFilter}
                onChange={(e) => setAgentFilter(e.target.value)}
                className="flex-1 sm:w-auto px-3 py-2 text-[11px] font-bold text-zinc-400 bg-black/40 border border-white/5 rounded-lg appearance-none cursor-pointer hover:border-[#00ff9c]/20 transition-all outline-none uppercase font-mono tracking-widest"
              >
                <option>ALL AGENTS</option>
                {uniqueAgents.map(agent => (
                  <option key={agent} value={agent}>{agent.toUpperCase()}</option>
                ))}
              </select>
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="flex-1 sm:w-auto px-3 py-2 text-[11px] font-bold text-zinc-400 bg-black/40 border border-white/5 rounded-lg appearance-none cursor-pointer hover:border-[#00ff9c]/20 transition-all outline-none uppercase font-mono tracking-widest"
              >
                <option>ALL STATUSES</option>
                <option value="Completed">COMPLETED</option>
                <option value="Missed">MISSED</option>
                <option value="Failed">FAILED</option>
                <option value="In-progress">IN_PROGRESS</option>
              </select>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5">
                <th className="px-6 py-4 text-[10px] font-bold tracking-widest text-zinc-500 uppercase font-mono">Agent_ID</th>
                <th className="px-6 py-4 text-[10px] font-bold tracking-widest text-zinc-500 uppercase text-center font-mono">Type</th>
                <th className="px-6 py-4 text-[10px] font-bold tracking-widest text-zinc-500 uppercase text-center font-mono">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold tracking-widest text-zinc-500 uppercase text-right font-mono">Duration</th>
                <th className="px-6 py-4 text-[10px] font-bold tracking-widest text-zinc-500 uppercase text-center font-mono">Sentiment</th>
                <th className="px-6 py-4 text-[10px] font-bold tracking-widest text-zinc-500 uppercase text-center font-mono">Outcomes</th>
                <th className="px-6 py-4 text-[10px] font-bold tracking-widest text-zinc-500 uppercase text-right font-mono">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.length > 0 ? (
                filteredLogs.map((call) => (
                  <tr
                    key={call.id}
                    onClick={() => setSelectedCall(call)}
                    className="border-b border-white/5 last:border-0 hover:bg-[#00ff9c]/[0.02] transition-colors duration-150 cursor-pointer group"
                  >
                    <td className="px-6 py-4">
                      <p className="text-[13px] font-bold text-white tracking-tight">{call.agent?.name || "Unknown Agent"}</p>
                      <p className="text-[11px] text-zinc-500 mt-1 font-mono uppercase tracking-tight">{call.client?.name || "Unknown Client"}</p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="inline-flex items-center gap-1.5">
                        {call.type === "phone" ? (
                          <Phone className="h-3.5 w-3.5 text-zinc-400" />
                        ) : (
                          <Globe className="h-3.5 w-3.5 text-zinc-400" />
                        )}
                        <StatusPill variant={call.type} />
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <StatusPill variant={call.status} />
                    </td>
                    <td className="px-6 py-4 text-[13px] text-white text-right tabular-nums font-mono font-bold">
                      {call.duration}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <StatusPill variant={call.sentiment} />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        {call.bookingMade && <StatusPill variant="booking" />}
                        {call.transferred && <StatusPill variant="transferred" />}
                        {!call.bookingMade && !call.transferred && (
                          <span className="text-[12px] text-zinc-800 font-mono">—</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[12px] text-zinc-500 text-right font-mono uppercase tracking-tight">
                      {call.time}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-zinc-400 text-[13px]">
                    No calls found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Drawer */}
      <CallDrawer 
        call={selectedCall} 
        isOpen={!!selectedCall} 
        onClose={() => setSelectedCall(null)} 
      />
    </>
  );
}
