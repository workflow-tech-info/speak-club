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
      className="animate-fade-in-up rounded-2xl bg-black/40 backdrop-blur-md border border-white/5 p-5 hover:border-[#00ff9c]/20 transition-all duration-300 group"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[12px] font-bold text-zinc-500 uppercase tracking-widest">{label}</p>
          <p className="text-[28px] font-black tracking-tight text-white mt-2 leading-none font-mono" style={{ textShadow: '0 0 10px rgba(255,255,255,0.1)' }}>{value}</p>
          {subtext && (
            <p className={cn("text-[11px] font-bold mt-3 font-mono tracking-tight", subtextColor || "text-zinc-500")}>
              {subtext}
            </p>
          )}
        </div>
        <div className="p-2.5 rounded-xl bg-[#00ff9c]/5 text-[#00ff9c] group-hover:bg-[#00ff9c]/10 transition-colors shadow-[0_0_15px_rgba(0,255,156,0.05)]">
          <Icon className="w-5 h-5" strokeWidth={2} />
        </div>
      </div>
    </div>
  );
}
