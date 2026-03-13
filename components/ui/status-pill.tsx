import { cn } from "@/lib/utils";

type PillVariant = "active" | "inactive" | "onboarding" | "training" | "positive" | "neutral" | "negative" | "completed" | "missed" | "failed" | "in-progress" | "phone" | "web" | "booking" | "transferred" | "pending" | "reviewed" | "flagged";

const variantStyles: Record<PillVariant, string> = {
  active:        "bg-[var(--color-pill-green-bg)] text-[var(--color-pill-green-text)]",
  completed:     "bg-[var(--color-pill-green-bg)] text-[var(--color-pill-green-text)]",
  positive:      "bg-[var(--color-pill-green-bg)] text-[var(--color-pill-green-text)]",
  booking:       "bg-[var(--color-pill-green-bg)] text-[var(--color-pill-green-text)]",
  reviewed:      "bg-[var(--color-pill-green-bg)] text-[var(--color-pill-green-text)]",
  inactive:      "bg-[var(--color-pill-gray-bg)] text-[var(--color-pill-gray-text)]",
  neutral:       "bg-[var(--color-pill-gray-bg)] text-[var(--color-pill-gray-text)]",
  missed:        "bg-[var(--color-pill-amber-bg)] text-[var(--color-pill-amber-text)]",
  training:      "bg-[var(--color-pill-amber-bg)] text-[var(--color-pill-amber-text)]",
  pending:       "bg-[var(--color-pill-amber-bg)] text-[var(--color-pill-amber-text)]",
  onboarding:    "bg-[var(--color-pill-amber-bg)] text-[var(--color-pill-amber-text)]",
  "in-progress": "bg-[var(--color-pill-blue-bg)] text-[var(--color-pill-blue-text)]",
  phone:         "bg-[var(--color-pill-blue-bg)] text-[var(--color-pill-blue-text)]",
  transferred:   "bg-[var(--color-pill-blue-bg)] text-[var(--color-pill-blue-text)]",
  web:           "bg-[var(--color-pill-purple-bg)] text-[var(--color-pill-purple-text)]",
  negative:      "bg-[var(--color-pill-red-bg)] text-[var(--color-pill-red-text)]",
  failed:        "bg-[var(--color-pill-red-bg)] text-[var(--color-pill-red-text)]",
  flagged:       "bg-[var(--color-pill-red-bg)] text-[var(--color-pill-red-text)]",
};

const labels: Partial<Record<PillVariant, string>> = {
  "in-progress": "In Progress",
};

interface StatusPillProps {
  variant: PillVariant;
  className?: string;
}

export function StatusPill({ variant, className }: StatusPillProps) {
  const isNeon = variant === 'active' || variant === 'completed' || variant === 'positive' || variant === 'booking' || variant === 'reviewed';
  
  return (
    <span className={cn(
      "inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-widest font-mono",
      variantStyles[variant],
      isNeon && "shadow-[0_0_8px_rgba(0,255,156,0.15)] border border-[var(--color-pill-green-text)]/10",
      className
    )}>
      {labels[variant] ?? variant}
    </span>
  );
}
