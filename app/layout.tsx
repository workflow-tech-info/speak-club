import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Speak-Club | The Operating System For Voice AI Companies",
    template: "%s | Speak-Club",
  },
  description: "Speak-Club transforms phone numbers into intelligent AI workforces. Customer support, sales calls, analytics queries, and developer operations — all handled through one conversational interface.",
  keywords: ["AI voice agents", "voice AI infrastructure", "AI call center automation", "AI phone agent platform", "voice automation software", "AI receptionist software"],
  openGraph: {
    type: "website",
    siteName: "Speak-Club",
    title: "Speak-Club | The Operating System For Voice AI Companies",
    description: "Speak-Club transforms phone numbers into intelligent AI workforces.",
    url: "https://speak-club.io",
  },
  twitter: {
    card: "summary_large_image",
    title: "Speak-Club | The Operating System For Voice AI Companies",
    description: "Speak-Club transforms phone numbers into intelligent AI workforces.",
  },
  metadataBase: new URL("https://speak-club.io"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
