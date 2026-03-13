"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { name: "Home", href: "/" },
  { name: "Technology", href: "/technology" },
  { name: "Use Cases", href: "/use-cases" },
  { name: "Developers", href: "/developers" },
  { name: "Architecture", href: "/architecture" },
  { name: "Pricing", href: "/pricing" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export function MarketingNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl"
      style={{ background: "rgba(10,10,10,0.85)", borderBottom: "1px solid rgba(0,255,156,0.08)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div
              className="h-8 w-8 rounded-lg flex items-center justify-center text-[14px] font-black"
              style={{ background: "#00ff9c", color: "#0a0a0a" }}
            >
              SC
            </div>
            <span
              className="text-[15px] font-bold tracking-tight hidden sm:block"
              style={{ color: "#00ff9c", fontFamily: "'Orbitron', sans-serif" }}
            >
              Speak-Club
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-3 py-2 text-[13px] font-medium rounded-lg transition-all duration-200"
                  style={{
                    color: isActive ? "#00ff9c" : "#999",
                    background: isActive ? "rgba(0,255,156,0.06)" : "transparent",
                  }}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 text-[13px] font-semibold rounded-lg transition-all"
              style={{ background: "#00ff9c", color: "#0a0a0a" }}
            >
              Login
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg transition-colors"
              style={{ color: "#999" }}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div
          className="lg:hidden px-4 pb-4 animate-in slide-in-from-top-2 duration-200"
          style={{ borderTop: "1px solid rgba(0,255,156,0.06)" }}
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2.5 text-[14px] font-medium rounded-lg transition-colors"
              style={{ color: pathname === item.href ? "#00ff9c" : "#888" }}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
