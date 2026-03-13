import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Use Cases",
  description: "Discover how companies use Speak-Club for customer support automation, sales acceleration, founder intelligence, and developer operations.",
  keywords: ["AI customer support voice", "AI call center automation", "voice automation software", "AI phone agents"],
};

const USE_CASES = [
  {
    title: "Customer Support Automation",
    desc: "Speak-Club voice agents resolve customer requests instantly. 24/7 availability without human agents.",
    features: ["Order tracking", "Returns processing", "Warranty verification", "Troubleshooting"],
    color: "#00ff9c",
    icon: "🎧",
  },
  {
    title: "Sales Acceleration",
    desc: "Outbound AI callers automate the entire sales pipeline from first touch to close.",
    features: ["Lead qualification", "Appointment booking", "Follow-ups", "Renewals"],
    color: "#00d9ff",
    icon: "💼",
  },
  {
    title: "Founder Intelligence",
    desc: "Executives query their company conversationally. Speak-Club fetches data from dashboards and databases in real time.",
    features: ["Revenue insights", "Growth analysis", "Churn tracking", "Market trends"],
    color: "#7bff00",
    icon: "🧠",
  },
  {
    title: "Developer Operations",
    desc: "Engineering teams interact with infrastructure through voice — no dashboards needed.",
    features: ["Check deployment status", "Query logs", "Create tickets", "Inspect metrics"],
    color: "#00d9ff",
    icon: "⚙️",
  },
];

export default function UseCasesPage() {
  return (
    <div className="pt-24">
      <section className="py-24 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6" style={{ fontFamily: "'Orbitron', sans-serif", color: "#e6e6e6" }}>
            Use <span style={{ color: "#00ff9c" }}>Cases</span>
          </h1>
          <p className="text-[16px] max-w-2xl mx-auto" style={{ color: "#888" }}>
            From customer support to developer operations — Speak-Club adapts to every business function.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-5xl mx-auto px-4 space-y-8">
          {USE_CASES.map((uc) => (
            <div key={uc.title} className="rounded-2xl p-8 sm:p-10 transition-all duration-300" style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${uc.color}15` }}>
              <div className="flex items-start gap-4 mb-6">
                <span className="text-3xl">{uc.icon}</span>
                <div>
                  <h2 className="text-2xl font-bold mb-2" style={{ color: uc.color, fontFamily: "'Orbitron', sans-serif" }}>{uc.title}</h2>
                  <p className="text-[15px]" style={{ color: "#888" }}>{uc.desc}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {uc.features.map((f) => (
                  <div key={f} className="px-4 py-3 rounded-xl text-center text-[13px] font-medium" style={{ background: `${uc.color}08`, border: `1px solid ${uc.color}15`, color: "#ccc" }}>
                    {f}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
