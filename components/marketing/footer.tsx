import Link from "next/link";

export function MarketingFooter() {
  return (
    <footer style={{ borderTop: "1px solid rgba(0,255,156,0.06)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="text-[13px] font-bold uppercase tracking-wider mb-4" style={{ color: "#00ff9c" }}>Product</h4>
            <ul className="space-y-2.5">
              {["Technology", "Use Cases", "Architecture", "Pricing"].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase().replace(" ", "-")}`} className="text-[13px] transition-colors" style={{ color: "#666" }}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[13px] font-bold uppercase tracking-wider mb-4" style={{ color: "#00ff9c" }}>Developers</h4>
            <ul className="space-y-2.5">
              {["Documentation", "API Reference", "SDKs", "Webhooks"].map((item) => (
                <li key={item}>
                  <Link href="/developers" className="text-[13px] transition-colors" style={{ color: "#666" }}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[13px] font-bold uppercase tracking-wider mb-4" style={{ color: "#00ff9c" }}>Company</h4>
            <ul className="space-y-2.5">
              {["Blog", "Contact", "Careers", "About"].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase()}`} className="text-[13px] transition-colors" style={{ color: "#666" }}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[13px] font-bold uppercase tracking-wider mb-4" style={{ color: "#00ff9c" }}>Legal</h4>
            <ul className="space-y-2.5">
              {["Privacy Policy", "Terms of Service", "Security", "Compliance"].map((item) => (
                <li key={item}>
                  <span className="text-[13px]" style={{ color: "#666" }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded flex items-center justify-center text-[10px] font-black" style={{ background: "#00ff9c", color: "#0a0a0a" }}>SC</div>
            <span className="text-[13px] font-semibold" style={{ color: "#00ff9c", fontFamily: "'Orbitron', sans-serif" }}>Speak-Club</span>
          </div>
          <p className="text-[12px]" style={{ color: "#444" }}>© 2025 Speak-Club. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
