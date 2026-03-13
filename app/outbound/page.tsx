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
            <button
              onClick={() => setMode("single")}
              className={`px-4 py-2 text-[13px] font-medium rounded-xl transition-colors ${mode === "single" ? "bg-blue-500 text-white" : "bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-50"}`}
            >
              Single Call
            </button>
            <button
              onClick={() => setMode("batch")}
              className={`px-4 py-2 text-[13px] font-medium rounded-xl transition-colors flex items-center gap-2 ${mode === "batch" ? "bg-blue-500 text-white" : "bg-white border border-zinc-200 text-zinc-600 hover:bg-zinc-50"}`}
            >
              <Users className="h-4 w-4" />
              Batch
            </button>
          </div>
        }
      />

      <div className="max-w-2xl space-y-6">
        <GlassCard>
          <div className="px-6 py-5 border-b border-[var(--color-card-border)]">
            <h2 className="text-[15px] font-bold text-zinc-900">
              {mode === "single" ? "Single Outbound Call" : "Batch Outbound Campaign"}
            </h2>
          </div>
          <div className="px-6 py-6 space-y-5">
            {/* Agent Select */}
            <div>
              <label className="block text-[13px] font-semibold text-zinc-700 mb-1.5">Select Agent</label>
              <select className="w-full px-4 py-2.5 text-[13px] border border-zinc-200 rounded-xl bg-zinc-50 focus:bg-white focus:border-blue-400 outline-none transition-all">
                {agents.filter(a => a.status === "active").map(a => (
                  <option key={a.id} value={a.id}>{a.name} — {a.role}</option>
                ))}
              </select>
            </div>

            {/* From Number */}
            <div>
              <label className="block text-[13px] font-semibold text-zinc-700 mb-1.5">From Phone Number</label>
              <select className="w-full px-4 py-2.5 text-[13px] border border-zinc-200 rounded-xl bg-zinc-50 focus:bg-white focus:border-blue-400 outline-none transition-all">
                {phoneNumbers.filter(p => p.status === "active").map(p => (
                  <option key={p.id} value={p.id}>{p.number} — {p.nickname}</option>
                ))}
              </select>
            </div>

            {/* Target Numbers */}
            {mode === "single" ? (
              <div>
                <label className="block text-[13px] font-semibold text-zinc-700 mb-1.5">To Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className="w-full pl-10 pr-4 py-2.5 text-[13px] border border-zinc-200 rounded-xl bg-zinc-50 focus:bg-white focus:border-blue-400 focus:ring-1 focus:ring-blue-100 outline-none transition-all font-mono"
                  />
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[13px] font-semibold text-zinc-700">Target Phone Numbers</label>
                  <span className="text-[12px] text-zinc-400">{numbers.length} number{numbers.length !== 1 ? "s" : ""}</span>
                </div>
                <div className="space-y-2">
                  {numbers.map((_, i) => (
                    <div key={i} className="flex gap-2">
                      <input
                        type="tel"
                        placeholder={`+1 (555) 000-000${i}`}
                        className="flex-1 px-4 py-2.5 text-[13px] border border-zinc-200 rounded-xl bg-zinc-50 focus:bg-white focus:border-blue-400 outline-none transition-all font-mono"
                      />
                      {numbers.length > 1 && (
                        <button onClick={() => removeNumber(i)} className="p-2.5 text-zinc-400 hover:text-red-500 border border-zinc-200 rounded-xl transition-colors">
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button onClick={addNumber} className="flex items-center gap-2 text-[13px] font-medium text-blue-500 hover:text-blue-600 transition-colors mt-1">
                    <Plus className="h-4 w-4" />
                    Add another number
                  </button>
                </div>
              </div>
            )}

            {/* Schedule */}
            <div className="flex items-center gap-3 py-1">
              <button
                onClick={() => setScheduled(!scheduled)}
                className={`relative h-5 w-9 rounded-full transition-colors ${scheduled ? "bg-blue-500" : "bg-zinc-200"}`}
              >
                <div className={`absolute top-0.5 h-4 w-4 bg-white rounded-full shadow transition-all ${scheduled ? "left-4" : "left-0.5"}`} />
              </button>
              <span className="text-[13px] font-medium text-zinc-600">Schedule for later</span>
            </div>

            {scheduled && (
              <div className="grid grid-cols-2 gap-4 animate-in slide-in-from-top-2 duration-200">
                <div>
                  <label className="block text-[13px] font-semibold text-zinc-700 mb-1.5">
                    <Calendar className="inline h-3.5 w-3.5 mr-1" />
                    Earliest At
                  </label>
                  <input
                    type="datetime-local"
                    className="w-full px-4 py-2.5 text-[13px] border border-zinc-200 rounded-xl bg-zinc-50 focus:bg-white focus:border-blue-400 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-semibold text-zinc-700 mb-1.5">Latest At (optional)</label>
                  <input
                    type="datetime-local"
                    className="w-full px-4 py-2.5 text-[13px] border border-zinc-200 rounded-xl bg-zinc-50 focus:bg-white focus:border-blue-400 outline-none transition-all"
                  />
                </div>
              </div>
            )}

            <button className="w-full flex items-center justify-center gap-2 px-5 py-3 text-[14px] font-semibold text-white bg-blue-500 hover:bg-blue-600 rounded-xl transition-colors shadow-sm shadow-blue-200">
              <Send className="h-4 w-4" />
              {scheduled ? "Schedule Call" : "Launch Call Now"}
            </button>
          </div>
        </GlassCard>
      </div>
    </>
  );
}
