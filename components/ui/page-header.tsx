import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export function PageHeader({ title, subtitle, actions }: PageHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-8 animate-fade-in">
      <div>
        <h1 className="text-[24px] font-black tracking-tight text-[#00ff9c] uppercase" style={{ fontFamily: 'var(--font-display)', textShadow: '0 0 20px rgba(0,255,156,0.2)' }}>{title}</h1>
        {subtitle && (
          <p className="mt-1 text-[13px] text-zinc-500 font-mono tracking-tight">{subtitle}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-3">{actions}</div>}
    </div>
  );
}

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function GlassCard({ children, className, delay = 0 }: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-black/40 backdrop-blur-md border border-white/5 overflow-hidden animate-fade-in-up hover:border-[#00ff9c]/20 transition-all duration-500",
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
