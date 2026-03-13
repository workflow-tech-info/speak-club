"use client";

import { PageHeader } from "@/components/ui/page-header";
import { GlassCard } from "@/components/ui/page-header";
import { StatusPill } from "@/components/ui/status-pill";
import { qaReviews } from "@/lib/mock-data";
import { CheckCircle2, AlertTriangle, Clock, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const scoreColor = (score: number) => {
  if (score >= 80) return "text-emerald-600";
  if (score >= 60) return "text-amber-600";
  return "text-red-600";
};

const scoreBg = (score: number) => {
  if (score >= 80) return "bg-emerald-50";
  if (score >= 60) return "bg-amber-50";
  return "bg-red-50";
};

const statusIcons = {
  reviewed: <CheckCircle2 className="h-4 w-4 text-emerald-500" />,
  flagged: <AlertTriangle className="h-4 w-4 text-red-500" />,
  pending: <Clock className="h-4 w-4 text-amber-500" />,
};

export default function QAReviewPage() {
  const pending = qaReviews.filter(r => r.status === "pending").length;
  const flagged = qaReviews.filter(r => r.status === "flagged").length;
  const reviewed = qaReviews.filter(r => r.status === "reviewed").length;
  const avgScore = Math.round(qaReviews.reduce((sum, r) => sum + r.score, 0) / qaReviews.length);

  return (
    <>
      <PageHeader
        title="QA Review"
        subtitle="Review and score call quality across all agents"
      />

      {/* ── Summary Cards ─────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Pending Review", value: pending, icon: Clock, color: "text-amber-500", bg: "bg-amber-500/10" },
          { label: "Flagged", value: flagged, icon: AlertTriangle, color: "text-red-500", bg: "bg-red-500/10" },
          { label: "Reviewed", value: reviewed, icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-500/10" },
          { label: "Avg. Score", value: avgScore, icon: Star, color: "text-[#00ff9c]", bg: "bg-[#00ff9c]/10" }
        ].map((item, i) => (
          <div key={i} className="animate-fade-in-up rounded-2xl bg-[#050505] border border-[#00ff9c]/10 p-5 shadow-[0_0_20px_rgba(0,255,156,0.02)]" style={{ animationDelay: `${i * 40}ms` }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono">{item.label}</p>
                <p className={cn("text-[28px] font-bold mt-1 leading-none font-mono", item.color)}>{item.value}</p>
              </div>
              <div className={cn("p-2 rounded-xl", item.bg, item.color)}><item.icon className="w-5 h-5" /></div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Review Queue ──────────────────────────────── */}
      <GlassCard delay={160}>
        <div className="px-6 py-5 border-b border-[#00ff9c]/10 bg-white/[0.01]">
          <h2 className="text-sm font-bold tracking-widest text-[#00ff9c] uppercase font-mono">REVIEW_QUEUE</h2>
          <p className="text-[11px] text-zinc-500 mt-1 font-mono uppercase tracking-tighter">Click a review to see full call transcript</p>
        </div>
        <div className="divide-y divide-[#00ff9c]/5">
          {qaReviews.map((review) => (
            <div key={review.id} className="px-6 py-4 hover:bg-[#00ff9c]/[0.02] transition-colors cursor-pointer group">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="mt-0.5">{statusIcons[review.status]}</div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-[13px] font-bold text-white font-mono">{review.agentName}</p>
                      <span className="text-[11px] text-zinc-700 font-mono">·</span>
                      <span className="text-[12px] text-zinc-500 font-mono italic">{review.clientName}</span>
                    </div>
                    <p className="text-[12px] text-zinc-400 mt-0.5 line-clamp-1 font-mono tracking-tight">{review.summary}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                  <div className={cn(
                    "px-2.5 py-0.5 rounded-lg text-[12px] font-bold font-mono border",
                    review.score >= 80 ? "text-emerald-500 border-emerald-500/20 bg-emerald-500/5" :
                    review.score >= 60 ? "text-amber-500 border-amber-500/20 bg-amber-500/5" :
                    "text-red-500 border-red-500/20 bg-red-500/5"
                  )}>
                    {review.score}/100
                  </div>
                  <StatusPill variant={review.sentiment} />
                  <span className="text-[11px] text-zinc-600 font-mono tabular-nums">{review.time}</span>
                </div>
              </div>
              <div className="flex items-center gap-4 ml-7">
                <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">DURATION: {review.duration}</span>
                {review.reviewedBy && (
                  <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">
                    REVIEWED_BY: <span className="text-[#00ff9c] font-bold">{review.reviewedBy.toUpperCase()}</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </>
  );
}
