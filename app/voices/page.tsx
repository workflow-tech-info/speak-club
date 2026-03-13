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
        subtitle="Browse ElevenLabs voices. Assign them to agents for natural-sounding calls."
        actions={
          <button className="inline-flex items-center gap-2 px-4 py-2 text-[13px] font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-xl transition-colors">
            <Plus className="h-4 w-4" />
            Clone a Voice
          </button>
        }
      />

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search voices..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-[13px] border border-zinc-200 rounded-xl bg-white focus:border-blue-400 focus:ring-1 focus:ring-blue-100 outline-none transition-all"
          />
        </div>
        {["All", "Default", "Cloned", "Community"].map(f => (
          <button key={f} className="px-3 py-2 text-[12px] font-medium text-zinc-600 bg-white border border-zinc-200 rounded-xl hover:bg-zinc-50 transition-colors">
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map(voice => (
          <GlassCard key={voice.id}>
            <div className="p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center flex-shrink-0">
                  <Mic className="h-5 w-5 text-blue-500" />
                </div>
                <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                  voice.status === "cloned" ? "bg-indigo-50 text-indigo-600" :
                  voice.status === "community" ? "bg-amber-50 text-amber-600" :
                  "bg-zinc-100 text-zinc-500"
                }`}>
                  {voice.status}
                </span>
              </div>

              <div>
                <h3 className="text-[15px] font-bold text-zinc-900">{voice.name}</h3>
                <p className="text-[12px] text-zinc-400">{voice.accent} · {voice.gender}</p>
              </div>

              <div className="flex flex-wrap gap-1">
                {voice.tags.map(t => (
                  <span key={t} className="px-2 py-0.5 text-[10px] font-medium text-zinc-500 bg-zinc-100 rounded-full">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => setPlaying(playing === voice.id ? null : voice.id)}
                  className={`flex items-center gap-1.5 flex-1 justify-center py-2 text-[12px] font-semibold rounded-lg transition-colors ${
                    playing === voice.id ? "bg-blue-500 text-white" : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                  }`}
                >
                  <Play className="h-3.5 w-3.5" />
                  {playing === voice.id ? "Playing..." : "Preview"}
                </button>
                <button className="py-2 px-3 text-[12px] font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                  Assign
                </button>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </>
  );
}
