import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";

export const metadata: Metadata = {
  title: "Speak Club",
  description: "AI Voice Agent Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Sidebar />
        <div className="md:ml-60 min-h-screen flex flex-col transition-all duration-300">
          <Header />
          <main className="flex-1 bg-[var(--color-surface)]">
            <div className="mx-auto max-w-[1400px] px-4 md:px-8 py-4 md:py-6">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
