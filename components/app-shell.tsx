"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";

const AUTH_ROUTES = ["/login", "/logout"];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = AUTH_ROUTES.some((route) => pathname.startsWith(route));

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <>
      <Sidebar />
      <div className="md:ml-60 min-h-screen flex flex-col transition-all duration-300">
        <Header />
        <main className="flex-1 bg-[var(--color-surface)]">
          <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-4 md:py-6">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
