"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  BarChart3,
  Users,
  PhoneCall,
  ClipboardCheck,
  Bot,
  Phone,
  Settings,
  ChevronLeft,
  X
} from "lucide-react";
import { useState, useEffect } from "react";

const navSections = [
  {
    label: "OVERVIEW",
    items: [
      { name: "Dashboard", href: "/", icon: LayoutDashboard },
      { name: "Analytics", href: "/analytics", icon: BarChart3 },
    ],
  },
  {
    label: "MANAGEMENT",
    items: [
      { name: "Clients", href: "/clients", icon: Users },
      { name: "Call Logs", href: "/call-logs", icon: PhoneCall },
      { name: "QA Review", href: "/qa-review", icon: ClipboardCheck },
    ],
  },
  {
    label: "SYSTEM",
    items: [
      { name: "Agents", href: "/agents", icon: Bot },
      { name: "Phone Numbers", href: "/phone-numbers", icon: Phone },
      { name: "Settings", href: "/settings", icon: Settings },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleToggle = () => setMobileOpen((prev) => !prev);
    document.addEventListener("toggleMobileMenu", handleToggle);
    return () => document.removeEventListener("toggleMobileMenu", handleToggle);
  }, []);

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col transition-all duration-300 ease-in-out",
          collapsed ? "w-[72px]" : "w-60",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
        style={{ background: "var(--color-sidebar)" }}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-[64px] px-4 border-b" style={{ borderColor: "var(--color-sidebar-border)" }}>
          <Link href="/" className="flex items-center gap-2.5 min-w-0">
            <div className="flex-shrink-0 h-8 w-8 rounded-lg bg-blue-500 flex items-center justify-center">
              <Bot className="h-4.5 w-4.5 text-white" strokeWidth={2} />
            </div>
            {!collapsed && (
              <span className="text-[15px] font-semibold text-white truncate tracking-tight">
                Speak Club
              </span>
            )}
          </Link>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden md:flex flex-shrink-0 h-7 w-7 rounded-md items-center justify-center hover:bg-white/10 transition-colors"
              style={{ color: "var(--color-sidebar-text)" }}
            >
              <ChevronLeft className={cn("h-4 w-4 transition-transform duration-300", collapsed && "rotate-180")} />
            </button>
            <button
              onClick={() => setMobileOpen(false)}
              className="md:hidden flex-shrink-0 h-7 w-7 rounded-md flex items-center justify-center hover:bg-white/10 transition-colors"
              style={{ color: "var(--color-sidebar-text)" }}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto sidebar-nav px-3 py-4 space-y-6">
        {navSections.map((section) => (
          <div key={section.label}>
            {!collapsed && (
              <p
                className="px-3 mb-2 text-[10px] font-semibold tracking-[0.12em] uppercase"
                style={{ color: "var(--color-sidebar-section)" }}
              >
                {section.label}
              </p>
            )}
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        "group flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium transition-all duration-150",
                        collapsed && "justify-center px-0",
                        isActive
                          ? "text-blue-400"
                          : "hover:bg-white/[0.06]"
                      )}
                      style={{
                        color: isActive ? "#60a5fa" : "var(--color-sidebar-text)",
                        background: isActive ? "var(--color-sidebar-active)" : undefined,
                      }}
                      title={collapsed ? item.name : undefined}
                    >
                      <item.icon className="h-[18px] w-[18px] flex-shrink-0" strokeWidth={isActive ? 2 : 1.7} />
                      {!collapsed && <span>{item.name}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-3 py-3 border-t" style={{ borderColor: "var(--color-sidebar-border)" }}>
        <div className={cn("flex items-center gap-2.5 px-2 py-1.5", collapsed && "justify-center px-0")}>
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-bold text-white">U</span>
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-[13px] font-medium text-white/90 truncate">Admin User</p>
              <p className="text-[11px] truncate" style={{ color: "var(--color-sidebar-text)" }}>admin@agency.io</p>
            </div>
          )}
        </div>
      </div>
    </aside>
    </>
  );
}
