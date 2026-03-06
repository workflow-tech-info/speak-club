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
        <div className="animate-fade-in-up rounded-2xl bg-white border border-[var(--color-card-border)] p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[12px] font-medium text-zinc-400">Pending Review</p>
              <p className="text-[28px] font-bold text-amber-600 mt-1 leading-none">{pending}</p>
            </div>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-500"><Clock className="w-5 h-5" /></div>
          </div>
        </div>
        <div className="animate-fade-in-up rounded-2xl bg-white border border-[var(--color-card-border)] p-5" style={{ animationDelay: "40ms" }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[12px] font-medium text-zinc-400">Flagged</p>
              <p className="text-[28px] font-bold text-red-600 mt-1 leading-none">{flagged}</p>
            </div>
            <div className="p-2 rounded-xl bg-red-50 text-red-500"><AlertTriangle className="w-5 h-5" /></div>
          </div>
        </div>
        <div className="animate-fade-in-up rounded-2xl bg-white border border-[var(--color-card-border)] p-5" style={{ animationDelay: "80ms" }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[12px] font-medium text-zinc-400">Reviewed</p>
              <p className="text-[28px] font-bold text-emerald-600 mt-1 leading-none">{reviewed}</p>
            </div>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-500"><CheckCircle2 className="w-5 h-5" /></div>
          </div>
        </div>
        <div className="animate-fade-in-up rounded-2xl bg-white border border-[var(--color-card-border)] p-5" style={{ animationDelay: "120ms" }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[12px] font-medium text-zinc-400">Avg. Score</p>
              <p className="text-[28px] font-bold text-blue-600 mt-1 leading-none">{avgScore}</p>
            </div>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-500"><Star className="w-5 h-5" /></div>
          </div>
        </div>
      </div>

      {/* ── Review Queue ──────────────────────────────── */}
      <GlassCard delay={160}>
        <div className="px-6 py-5 border-b border-[var(--color-card-border)]">
          <h2 className="text-base font-bold tracking-tight text-zinc-900">Review Queue</h2>
          <p className="text-[12px] text-zinc-400 mt-0.5">Click a review to see full call transcript</p>
        </div>
        <div className="divide-y divide-[var(--color-card-border)]">
          {qaReviews.map((review) => (
            <div key={review.id} className="px-6 py-4 hover:bg-zinc-50/60 transition-colors cursor-pointer">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  {statusIcons[review.status]}
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-[13px] font-semibold text-zinc-900">{review.agentName}</p>
                      <span className="text-[11px] text-zinc-300">·</span>
                      <span className="text-[12px] text-zinc-400">{review.clientName}</span>
                    </div>
                    <p className="text-[12px] text-zinc-500 mt-0.5 line-clamp-1">{review.summary}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                  <div className={cn("px-2.5 py-0.5 rounded-lg text-[12px] font-bold tabular-nums", scoreColor(review.score), scoreBg(review.score))}>
                    {review.score}/100
                  </div>
                  <StatusPill variant={review.sentiment} />
                  <span className="text-[12px] text-zinc-400 whitespace-nowrap">{review.time}</span>
                </div>
              </div>
              <div className="flex items-center gap-4 ml-7">
                <span className="text-[11px] text-zinc-400">Duration: {review.duration}</span>
                {review.reviewedBy && (
                  <span className="text-[11px] text-zinc-400">Reviewed by: <span className="text-zinc-600 font-medium">{review.reviewedBy}</span></span>
                )}
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </>
  );
}
