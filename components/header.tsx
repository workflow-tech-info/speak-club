"use client";

import { usePathname } from "next/navigation";
import { Search, Sun, Moon, Menu } from "lucide-react";
import { useState } from "react";

const pageTitles: Record<string, string> = {
  "/": "Dashboard",
  "/analytics": "Analytics",
  "/clients": "Clients",
  "/call-logs": "Call Logs",
  "/qa-review": "QA Review",
  "/agents": "Agents",
  "/phone-numbers": "Phone Numbers",
  "/settings": "Settings",
};

export function Header() {
  const pathname = usePathname();
  const [darkMode, setDarkMode] = useState(false);
  const currentPage = pageTitles[pathname] || "Dashboard";

  return (
    <header
      className="sticky top-0 z-30 flex items-center justify-between h-[64px] px-4 md:px-8 border-b backdrop-blur-xl"
      style={{
        background: "var(--color-header)",
        borderColor: "var(--color-card-border)",
      }}
    >
      {/* Left: Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm">
        <button 
          className="md:hidden p-1.5 -ml-1.5 mr-1 text-zinc-500 hover:bg-[#00ff9c]/10 rounded-lg transition-colors"
          onClick={() => document.dispatchEvent(new CustomEvent('toggleMobileMenu'))}
        >
          <Menu className="h-5 w-5" />
        </button>
        {currentPage && (
          <span className="text-[#00ff9c] font-bold tracking-tight uppercase text-[12px]" style={{ fontFamily: 'var(--font-display)' }}>
            {currentPage}
          </span>
        )}
      </div>

      {/* Right: Search + Actions */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="hidden sm:flex items-center gap-2 bg-white/[0.03] border border-white/[0.05] rounded-lg px-3 py-1.5 w-[240px] hover:border-[#00ff9c]/30 transition-all group">
          <Search className="h-3.5 w-3.5 text-zinc-500 group-hover:text-[#00ff9c] transition-colors" />
          <span className="text-[12px] text-zinc-500 font-mono tracking-tight">System Search...</span>
        </div>

        {/* Divider */}
        <div className="h-4 w-px bg-white/[0.1] hidden sm:block" />

        {/* Status Indicator */}
        <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-[#00ff9c]/5 border border-[#00ff9c]/10">
          <div className="h-1.5 w-1.5 rounded-full bg-[#00ff9c] animate-pulse shadow-[0_0_8px_#00ff9c]" />
          <span className="text-[10px] font-bold text-[#00ff9c] uppercase tracking-widest">Live</span>
        </div>

        {/* Avatar */}
        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#00ff9c] to-[#00b36b] flex items-center justify-center cursor-pointer hover:scale-105 transition-all shadow-[0_0_15px_rgba(0,255,156,0.2)]">
          <span className="text-xs font-bold text-[#050505] font-mono">A</span>
        </div>
      </div>
    </header>
  );
}
