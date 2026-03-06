"use client";

import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  subtext?: string;
  subtextColor?: string;
  delay?: number;
}

export function StatCard({ label, value, icon: Icon, subtext, subtextColor, delay = 0 }: StatCardProps) {
  return (
    <div
      className="animate-fade-in-up rounded-2xl bg-white border border-[var(--color-card-border)] p-5 hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-all duration-300"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[13px] font-medium text-zinc-400">{label}</p>
          <p className="text-[28px] font-bold tracking-tight text-zinc-900 mt-1 leading-none">{value}</p>
          {subtext && (
            <p className={cn("text-[11px] font-medium mt-2", subtextColor || "text-zinc-400")}>
              {subtext}
            </p>
          )}
        </div>
        <div className="p-2 rounded-xl bg-zinc-50 text-zinc-400">
          <Icon className="w-5 h-5" strokeWidth={1.7} />
        </div>
      </div>
    </div>
  );
}
