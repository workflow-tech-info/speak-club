"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { GlassCard } from "@/components/ui/page-header";
import { StatusPill } from "@/components/ui/status-pill";
import { CallDrawer } from "@/components/ui/call-drawer";
import { callLogs } from "@/lib/mock-data";
import type { CallLog } from "@/lib/mock-data";
import { Phone, Globe } from "lucide-react";

export default function CallLogsPage() {
  const [selectedCall, setSelectedCall] = useState<CallLog | null>(null);

  return (
    <>
      <PageHeader
        title="Call Logs"
        subtitle="Detailed history of all calls processed by your voice agents"
      />

      <GlassCard>
        <div className="px-6 py-5 border-b border-[var(--color-card-border)] flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold tracking-tight text-zinc-900">Recent Calls</h2>
            <p className="text-[12px] text-zinc-400 mt-0.5">{callLogs.length} calls shown</p>
          </div>
          <div className="flex items-center gap-2">
            <select className="px-3 py-1.5 text-[12px] font-medium text-zinc-600 bg-zinc-50 border border-zinc-200 rounded-lg appearance-none cursor-pointer hover:bg-zinc-100 transition-colors">
              <option>All Agents</option>
            </select>
            <select className="px-3 py-1.5 text-[12px] font-medium text-zinc-600 bg-zinc-50 border border-zinc-200 rounded-lg appearance-none cursor-pointer hover:bg-zinc-100 transition-colors">
              <option>All Statuses</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[var(--color-card-border)]">
                <th className="px-6 py-3.5 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase">Agent</th>
                <th className="px-6 py-3.5 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase text-center">Type</th>
                <th className="px-6 py-3.5 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase text-center">Status</th>
                <th className="px-6 py-3.5 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase text-right">Duration</th>
                <th className="px-6 py-3.5 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase text-center">Sentiment</th>
                <th className="px-6 py-3.5 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase text-center">Outcomes</th>
                <th className="px-6 py-3.5 text-[11px] font-semibold tracking-wider text-zinc-400 uppercase text-right">Time</th>
              </tr>
            </thead>
            <tbody>
              {callLogs.map((call) => (
                <tr
                  key={call.id}
                  onClick={() => setSelectedCall(call)}
                  className="border-b border-[var(--color-card-border)] last:border-0 hover:bg-zinc-50/60 transition-colors duration-150 cursor-pointer"
                >
                  <td className="px-6 py-4">
                    <p className="text-[13px] font-semibold text-zinc-900">{call.agentName}</p>
                    <p className="text-[12px] text-zinc-400 mt-0.5">{call.clientName}</p>
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
                  <td className="px-6 py-4 text-[13px] text-zinc-600 text-right tabular-nums font-medium">
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
                        <span className="text-[12px] text-zinc-300">—</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[13px] text-zinc-400 text-right whitespace-nowrap">
                    {call.time}
                  </td>
                </tr>
              ))}
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
