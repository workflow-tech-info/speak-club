import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description: "Insights on AI voice agents, voice AI infrastructure, call center automation, and the future of conversational AI.",
  keywords: ["AI voice agents blog", "voice AI insights", "AI call center articles"],
};

const ARTICLES = [
  {
    slug: "future-of-ai-voice-agents",
    title: "The Future of AI Voice Agents in Enterprise",
    excerpt: "How multi-agent orchestration is transforming customer support and sales operations at scale.",
    date: "2025-03-10",
    readTime: "8 min read",
    category: "Industry",
  },
  {
    slug: "building-voice-ai-pipelines",
    title: "Building Real-Time Voice AI Pipelines",
    excerpt: "A deep dive into WebSocket streaming, speech recognition, and voice synthesis for production systems.",
    date: "2025-03-05",
    readTime: "12 min read",
    category: "Engineering",
  },
  {
    slug: "ai-call-center-automation",
    title: "AI Call Center Automation: Complete Guide",
    excerpt: "How AI phone agents reduce costs by 70% while improving customer satisfaction scores.",
    date: "2025-02-28",
    readTime: "10 min read",
    category: "Guide",
  },
  {
    slug: "multi-agent-orchestration",
    title: "Multi-Agent Orchestration Explained",
    excerpt: "Understanding how multiple AI agents work together with context-preserving transfers.",
    date: "2025-02-20",
    readTime: "6 min read",
    category: "Technical",
  },
  {
    slug: "voice-ai-developer-tools",
    title: "Developer Tools for Voice AI Infrastructure",
    excerpt: "SDKs, APIs, and webhooks for building production-grade voice AI applications.",
    date: "2025-02-15",
    readTime: "7 min read",
    category: "Developers",
  },
];

function ArticleSchema({ article }: { article: typeof ARTICLES[0] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    author: { "@type": "Organization", name: "Speak-Club" },
    publisher: { "@type": "Organization", name: "Speak-Club" },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function BlogPage() {
  return (
    <div className="pt-24">
      <section className="py-24 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6" style={{ fontFamily: "'Orbitron', sans-serif", color: "#e6e6e6" }}>
            <span style={{ color: "#00ff9c" }}>Blog</span>
          </h1>
          <p className="text-[16px] max-w-xl mx-auto" style={{ color: "#888" }}>
            Insights on voice AI, multi-agent systems, and the future of conversational infrastructure.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-4xl mx-auto px-4 space-y-5">
          {ARTICLES.map((article) => (
            <article key={article.slug}>
              <ArticleSchema article={article} />
              <div className="group rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:scale-[1.005] cursor-pointer" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold" style={{ background: "rgba(0,255,156,0.08)", color: "#00ff9c" }}>
                    {article.category}
                  </span>
                  <span className="text-[12px]" style={{ color: "#555" }}>{article.date}</span>
                  <span className="text-[12px]" style={{ color: "#555" }}>·</span>
                  <span className="text-[12px]" style={{ color: "#555" }}>{article.readTime}</span>
                </div>
                <h2 className="text-[20px] font-bold mb-2" style={{ color: "#e6e6e6" }}>{article.title}</h2>
                <p className="text-[14px]" style={{ color: "#888" }}>{article.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
