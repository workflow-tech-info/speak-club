"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { GlassCard } from "@/components/ui/page-header";
import { Phone, Calendar, Users, Send, Plus, X } from "lucide-react";
import { agents } from "@/lib/mock-data";
import { phoneNumbers } from "@/lib/mock-data";

export default function OutboundPage() {
  const [mode, setMode] = useState<"single" | "batch">("single");
  const [numbers, setNumbers] = useState([""]);
  const [scheduled, setScheduled] = useState(false);

  const addNumber = () => setNumbers([...numbers, ""]);
  const removeNumber = (i: number) => setNumbers(numbers.filter((_, idx) => idx !== i));

  return (
    <>
      <PageHeader
        title="Outbound Calling"
        subtitle="Launch single or batch outbound call campaigns via Vapi"
        actions={
          <div className="flex gap-2">
            {[
              { id: 'single', label: 'SINGLE_CALL' },
              { id: 'batch', label: 'BATCH_OP', icon: Users }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setMode(item.id as any)}
                className={`px-4 py-2 text-[11px] font-bold rounded-xl transition-all border uppercase tracking-widest font-mono flex items-center gap-2 ${
                  mode === item.id 
                    ? "bg-[#00ff9c] text-black border-[#00ff9c] shadow-[0_0_15px_rgba(0,255,156,0.3)]" 
                    : "bg-white/5 text-zinc-500 border-white/10 hover:border-[#00ff9c]/30 hover:text-[#00ff9c]"
                }`}
              >
                {item.icon && <item.icon className="h-4 w-4" />}
                {item.label}
              </button>
            ))}
          </div>
        }
      />

      <div className="max-w-2xl space-y-6">
        <GlassCard>
          <div className="px-6 py-5 border-b border-[#00ff9c]/10 bg-white/[0.01]">
            <h2 className="text-sm font-bold tracking-widest text-[#00ff9c] uppercase font-mono">
              {mode === "single" ? "SINGLE_OUTBOUND_STREAM" : "BATCH_CAMPAIGN_SEQUENCE"}
            </h2>
          </div>
          <div className="px-6 py-6 space-y-6">
            {/* Agent Select */}
            <div>
              <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 font-mono">SELECT_AGENT_AUTH</label>
              <select className="w-full px-4 py-3 text-[13px] border border-[#00ff9c]/20 rounded-xl bg-black text-white focus:border-[#00ff9c] outline-none transition-all font-mono appearance-none cursor-pointer">
                {agents.filter(a => a.status === "active").map(a => (
                  <option key={a.id} value={a.id}>{a.name.toUpperCase()} — {a.role.toUpperCase()}</option>
                ))}
              </select>
            </div>

            {/* From Number */}
            <div>
              <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 font-mono">SOURCE_ORIGIN_ID</label>
              <select className="w-full px-4 py-3 text-[13px] border border-[#00ff9c]/20 rounded-xl bg-black text-white focus:border-[#00ff9c] outline-none transition-all font-mono appearance-none cursor-pointer">
                {phoneNumbers.filter(p => p.status === "active").map(p => (
                  <option key={p.id} value={p.id}>{p.number} — {p.nickname.toUpperCase()}</option>
                ))}
              </select>
            </div>

            {/* Target Numbers */}
            {mode === "single" ? (
              <div>
                <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 font-mono">TARGET_DESTINATION</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-600" />
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className="w-full pl-10 pr-4 py-3 text-[13px] border border-[#00ff9c]/20 rounded-xl bg-black text-white focus:border-[#00ff9c] outline-none transition-all font-mono placeholder:text-zinc-800"
                  />
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono">TARGET_RECEPTORS</label>
                  <span className="text-[10px] text-[#00ff9c] font-mono font-bold uppercase">{numbers.length} NODES</span>
                </div>
                <div className="space-y-3">
                  {numbers.map((_, i) => (
                    <div key={i} className="flex gap-3">
                      <input
                        type="tel"
                        placeholder={`+1 (555) 000-000${i}`}
                        className="flex-1 px-4 py-3 text-[13px] border border-[#00ff9c]/20 rounded-xl bg-black text-white focus:border-[#00ff9c] outline-none transition-all font-mono placeholder:text-zinc-800"
                      />
                      {numbers.length > 1 && (
                        <button onClick={() => removeNumber(i)} className="p-3 text-zinc-500 hover:text-red-500 border border-white/5 bg-white/5 rounded-xl transition-all hover:border-red-500/30">
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button onClick={addNumber} className="flex items-center gap-2 text-[11px] font-bold text-[#00ff9c] hover:text-[#00ff9c]/80 transition-all mt-2 uppercase tracking-widest font-mono">
                    <Plus className="h-4 w-4" />
                    APPEND_TARGET_NODE
                  </button>
                </div>
              </div>
            )}

            {/* Schedule */}
            <div className="flex items-center gap-4 py-2">
              <button
                onClick={() => setScheduled(!scheduled)}
                className={`relative h-6 w-11 rounded-full transition-all border ${scheduled ? "bg-[#00ff9c]/20 border-[#00ff9c]" : "bg-white/5 border-white/10"}`}
              >
                <div className={`absolute top-0.5 h-4 w-4 rounded-full shadow transition-all ${scheduled ? "left-6 bg-[#00ff9c]" : "left-0.5 bg-zinc-600"}`} />
              </button>
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest font-mono">SCHEDULE_FOR_SEQUENCING</span>
            </div>

            {scheduled && (
              <div className="grid grid-cols-2 gap-4 animate-fade-in-up duration-300">
                <div>
                  <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 font-mono">
                    <Calendar className="inline h-3.5 w-3.5 mr-1.5 text-[#00ff9c]" />
                    EST_START
                  </label>
                  <input
                    type="datetime-local"
                    className="w-full px-4 py-3 text-[13px] border border-[#00ff9c]/20 rounded-xl bg-black text-white focus:border-[#00ff9c] outline-none transition-all font-mono sm-invert-calendar"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 font-mono">LIMIT_END</label>
                  <input
                    type="datetime-local"
                    className="w-full px-4 py-3 text-[13px] border border-[#00ff9c]/20 rounded-xl bg-black text-white focus:border-[#00ff9c] outline-none transition-all font-mono"
                  />
                </div>
              </div>
            )}

            <button className="w-full flex items-center justify-center gap-3 px-5 py-4 text-[13px] font-bold text-black bg-[#00ff9c] hover:bg-[#00e68d] rounded-xl transition-all shadow-[0_0_20px_rgba(0,255,156,0.2)] uppercase tracking-[0.2em] font-mono mt-4">
              <Send className="h-4 w-4" />
              {scheduled ? "SCHEDULE_UPSTREAM_TASK" : "INITIATE_CAMPAIGN_FLOW"}
            </button>
          </div>
        </GlassCard>
      </div>
    </>
  );
}
