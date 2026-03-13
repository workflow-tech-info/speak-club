import type { Metadata } from "next";
import { MarketingNav } from "@/components/marketing/nav";
import { MarketingFooter } from "@/components/marketing/footer";

export const metadata: Metadata = {
  title: {
    default: "Speak-Club | The Operating System For Voice AI Companies",
    template: "%s | Speak-Club",
  },
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-h-screen"
      style={{
        background: "#0a0a0a",
        color: "#e6e6e6",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <MarketingNav />
      <main>{children}</main>
      <MarketingFooter />
    </div>
  );
}
