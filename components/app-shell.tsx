"use client";

import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="matrix-grid matrix-scanline min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen transition-all duration-300 md:pl-60">
        <Header />
        <main className="flex-1">
          <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-4 md:py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
