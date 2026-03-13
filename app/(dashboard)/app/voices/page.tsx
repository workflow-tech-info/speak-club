"use client";

import { PageHeader } from "@/components/ui/page-header";
import { GlassCard } from "@/components/ui/page-header";
import { Mic, Play, Plus, Search, Star, Filter } from "lucide-react";
import { useState } from "react";

const VOICES = [
  { id: "v1", name: "Rachel", accent: "American", gender: "Female", tags: ["conversational", "warm"], samples: 120, preview: "#", status: "default" },
  { id: "v2", name: "Adam", accent: "American", gender: "Male", tags: ["authoritative", "clear"], samples: 89, preview: "#", status: "default" },
  { id: "v3", name: "Aria", accent: "American", gender: "Female", tags: ["friendly", "energetic"], samples: 76, preview: "#", status: "cloned" },
  { id: "v4", name: "Daniel", accent: "British", gender: "Male", tags: ["professional", "calm"], samples: 112, preview: "#", status: "default" },
  { id: "v5", name: "Bella", accent: "American", gender: "Female", tags: ["soft", "empathetic"], samples: 95, preview: "#", status: "default" },
  { id: "v6", name: "Callum", accent: "Australian", gender: "Male", tags: ["casual", "friendly"], samples: 67, preview: "#", status: "community" },
  { id: "v7", name: "Siren", accent: "American", gender: "Female", tags: ["natural", "realistic"], samples: 203, preview: "#", status: "cloned" },
  { id: "v8", name: "Josh", accent: "American", gender: "Male", tags: ["deep", "confident"], samples: 88, preview: "#", status: "default" },
];

export default function VoicesPage() {
  const [search, setSearch] = useState("");
  const [playing, setPlaying] = useState<string | null>(null);

  const filtered = VOICES.filter(v =>
    v.name.toLowerCase().includes(search.toLowerCase()) ||
    v.accent.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <PageHeader
        title="Voice Library"
        subtitle="ACCESS_VOICE_MODELS_FOR_NEURAL_UPLINK_PROTOCOL_ASSIGNMENT."
        actions={
          <button className="inline-flex items-center gap-2 px-6 py-2.5 text-[11px] font-bold text-black bg-[#00ff9c] hover:bg-[#00e68d] rounded-xl transition-all shadow-[0_0_15px_rgba(0,255,156,0.2)] font-mono uppercase tracking-widest">
            <Plus className="h-4 w-4" />
            CLONE_VOICE_PROTOCOL
          </button>
        }
      />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
          <input
            type="text"
            placeholder="SEARCH_VOICES..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-[13px] border border-[#00ff9c]/20 rounded-xl bg-black text-white focus:border-[#00ff9c] outline-none transition-all font-mono placeholder:text-zinc-800"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
          {["All", "Default", "Cloned", "Community"].map(f => (
            <button key={f} className="shrink-0 px-4 py-2 text-[11px] font-bold text-zinc-500 bg-white/[0.02] border border-white/5 rounded-xl hover:border-[#00ff9c]/30 hover:text-[#00ff9c] transition-all font-mono uppercase tracking-widest">
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map(voice => (
          <GlassCard key={voice.id}>
            <div className="p-4 space-y-4">
              <div className="flex items-start justify-between">
                <div className="h-10 w-10 rounded-xl bg-[#00ff9c]/5 border border-[#00ff9c]/20 flex items-center justify-center flex-shrink-0">
                  <Mic className="h-5 w-5 text-[#00ff9c]" />
                </div>
                <span className={`px-2 py-0.5 text-[9px] font-bold rounded-lg border uppercase tracking-widest font-mono ${
                  voice.status === "cloned" ? "bg-[#00ff9c]/10 text-[#00ff9c] border-[#00ff9c]/40 shadow-[0_0_8px_rgba(0,255,156,0.2)]" :
                  voice.status === "community" ? "bg-amber-500/5 text-amber-500/60 border-amber-500/20" :
                  "bg-white/5 text-zinc-600 border-white/10"
                }`}>
                  {voice.status}
                </span>
              </div>

              <div>
                <h3 className="text-[14px] font-bold text-white font-mono uppercase tracking-tight">{voice.name}</h3>
                <p className="text-[11px] text-zinc-500 font-mono uppercase tracking-tighter mt-0.5">{voice.accent} · {voice.gender}</p>
              </div>

              <div className="flex flex-wrap gap-1">
                {voice.tags.map(t => (
                  <span key={t} className="px-2 py-0.5 text-[9px] font-bold text-zinc-500 bg-white/[0.03] border border-white/5 rounded-md uppercase tracking-wider font-mono">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => setPlaying(playing === voice.id ? null : voice.id)}
                  className={`flex items-center gap-1.5 flex-1 justify-center py-2 text-[11px] font-bold rounded-lg transition-all border uppercase tracking-widest font-mono ${
                    playing === voice.id 
                      ? "bg-[#00ff9c] text-black border-[#00ff9c] shadow-[0_0_15px_rgba(0,255,156,0.3)]" 
                      : "bg-white/5 text-zinc-300 border-white/10 hover:border-[#00ff9c]/40 hover:text-[#00ff9c]"
                  }`}
                >
                  <Play className="h-3.5 w-3.5" />
                  {playing === voice.id ? "PLAYING..." : "PREVIEW"}
                </button>
                <button className="py-2 px-3 text-[11px] font-bold text-[#00ff9c] bg-[#00ff9c]/10 border border-[#00ff9c]/20 hover:bg-[#00ff9c]/20 rounded-lg transition-all uppercase tracking-widest font-mono">
                  ASSIGN
                </button>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </>
  );
}
