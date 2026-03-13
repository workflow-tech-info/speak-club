import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Simple, transparent pricing for Speak-Club's AI voice agent platform. Start free, scale with usage.",
  keywords: ["AI voice agent pricing", "voice AI platform cost", "AI call center pricing"],
};

const PLANS = [
  {
    name: "Starter",
    price: "$0",
    period: "Free forever",
    desc: "For developers exploring voice AI",
    features: [
      "1 AI voice agent",
      "100 minutes/month",
      "REST API access",
      "Community support",
      "Standard voices",
    ],
    cta: "Start Free",
    color: "#666",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$99",
    period: "/month",
    desc: "For growing businesses",
    features: [
      "10 AI voice agents",
      "5,000 minutes/month",
      "WebSocket streaming",
      "Multi-agent orchestration",
      "Premium voices + cloning",
      "Priority support",
      "Analytics dashboard",
    ],
    cta: "Get Started",
    color: "#00ff9c",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For organizations at scale",
    features: [
      "Unlimited agents",
      "Unlimited minutes",
      "Dedicated infrastructure",
      "Custom SLA (99.99%)",
      "SSO + RBAC",
      "On-premise deployment",
      "Dedicated success manager",
      "Custom integrations",
    ],
    cta: "Contact Sales",
    color: "#00d9ff",
    highlight: false,
  },
];

export default function PricingPage() {
  return (
    <div className="pt-24">
      <section className="py-24 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6" style={{ fontFamily: "'Orbitron', sans-serif", color: "#e6e6e6" }}>
            Simple, Transparent <span style={{ color: "#00ff9c" }}>Pricing</span>
          </h1>
          <p className="text-[16px] max-w-xl mx-auto" style={{ color: "#888" }}>
            Start free. Scale with usage. No hidden fees.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className="rounded-2xl p-8 flex flex-col relative"
                style={{
                  background: plan.highlight ? "rgba(0,255,156,0.03)" : "rgba(255,255,255,0.02)",
                  border: `1px solid ${plan.highlight ? "rgba(0,255,156,0.2)" : "rgba(255,255,255,0.06)"}`,
                }}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase" style={{ background: "#00ff9c", color: "#0a0a0a" }}>
                    Most Popular
                  </div>
                )}
                <h3 className="text-[18px] font-bold mb-1" style={{ color: plan.color, fontFamily: "'Orbitron', sans-serif" }}>{plan.name}</h3>
                <p className="text-[13px] mb-6" style={{ color: "#666" }}>{plan.desc}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold" style={{ color: "#e6e6e6" }}>{plan.price}</span>
                  <span className="text-[14px] ml-1" style={{ color: "#666" }}>{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-[13px]" style={{ color: "#aaa" }}>
                      <span style={{ color: plan.color }}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="block text-center px-6 py-3 rounded-xl text-[14px] font-semibold transition-all"
                  style={{
                    background: plan.highlight ? "#00ff9c" : "transparent",
                    color: plan.highlight ? "#0a0a0a" : plan.color,
                    border: plan.highlight ? "none" : `1px solid ${plan.color}40`,
                  }}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
