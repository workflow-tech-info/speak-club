"use client";

import { usePathname } from "next/navigation";
import { Search, Sun, Moon } from "lucide-react";
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
      className="sticky top-0 z-30 flex items-center justify-between h-[64px] px-8 border-b backdrop-blur-xl"
      style={{
        background: "var(--color-header)",
        borderColor: "var(--color-card-border)",
      }}
    >
      {/* Left: Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm">
        {currentPage && (
          <span className="text-zinc-700 font-medium">{currentPage}</span>
        )}
      </div>

      {/* Right: Search + Actions */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="flex items-center gap-2 bg-zinc-100/80 rounded-lg px-3 py-1.5 w-[200px] hover:bg-zinc-100 transition-colors">
          <Search className="h-3.5 w-3.5 text-zinc-400" />
          <span className="text-[13px] text-zinc-400">Search...</span>
        </div>

        {/* Theme toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="h-8 w-8 rounded-lg flex items-center justify-center text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 transition-colors"
        >
          {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>

        {/* Divider */}
        <div className="h-6 w-px bg-zinc-200" />

        {/* Avatar */}
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-blue-200 transition-all">
          <span className="text-xs font-bold text-white">U</span>
        </div>
      </div>
    </header>
  );
}
