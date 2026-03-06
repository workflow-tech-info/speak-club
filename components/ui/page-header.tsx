import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export function PageHeader({ title, subtitle, actions }: PageHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-6 animate-fade-in">
      <div>
        <h1 className="text-[22px] font-bold tracking-tight text-zinc-900">{title}</h1>
        {subtitle && (
          <p className="mt-0.5 text-[13px] text-zinc-400">{subtitle}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
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
        "rounded-2xl bg-white border border-[var(--color-card-border)] overflow-hidden animate-fade-in-up",
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
