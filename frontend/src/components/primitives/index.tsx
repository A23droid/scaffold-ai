import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn, getInitials } from "@/lib/utils";

// ─── Badge ────────────────────────────────────────────────────────────────────

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full text-xs font-medium px-2.5 py-0.5 transition-colors",
  {
    variants: {
      variant: {
        default: "bg-[hsl(var(--primary)/0.12)] text-[hsl(var(--primary))]",
        secondary: "bg-[hsl(var(--surface-2))] text-[hsl(var(--muted-foreground))]",
        success: "bg-[hsl(var(--success)/0.12)] text-[hsl(var(--success))]",
        warning: "bg-[hsl(var(--warning)/0.12)] text-[hsl(var(--warning))]",
        danger: "bg-[hsl(var(--danger)/0.12)] text-[hsl(var(--danger))]",
        outline: "border border-[hsl(var(--border))] text-[hsl(var(--foreground))]",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => (
    <span ref={ref} className={cn(badgeVariants({ variant, className }))} {...props} />
  )
);
Badge.displayName = "Badge";

// ─── Avatar ───────────────────────────────────────────────────────────────────

interface AvatarProps {
  src?: string;
  name: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  color?: string;
}

const sizeClasses = {
  xs: "h-6 w-6 text-[10px]",
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-xl",
};

function Avatar({ src, name, size = "md", className, color }: AvatarProps) {
  const [imgError, setImgError] = React.useState(false);
  const initials = getInitials(name);

  return (
    <div
      className={cn(
        "relative rounded-full flex items-center justify-center font-semibold overflow-hidden flex-shrink-0",
        sizeClasses[size],
        className
      )}
      style={
        !src || imgError
          ? { background: color ?? `hsl(262 80% 60% / 0.15)`, color: color ?? `hsl(262 80% 60%)` }
          : undefined
      }
    >
      {src && !imgError ? (
        <img
          src={src}
          alt={name}
          className="h-full w-full object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        initials
      )}
    </div>
  );
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────

interface ProgressBarProps {
  value: number;
  max?: number;
  color?: string;
  className?: string;
  size?: "sm" | "md";
  animated?: boolean;
}

function ProgressBar({ value, max = 100, color, className, size = "sm", animated = false }: ProgressBarProps) {
  const percent = Math.min(100, Math.round((value / max) * 100));
  return (
    <div
      className={cn(
        "w-full rounded-full overflow-hidden bg-[hsl(var(--surface-3))]",
        size === "sm" ? "h-1.5" : "h-2.5",
        className
      )}
    >
      <div
        className={cn("h-full rounded-full transition-all duration-500", animated && "animate-pulse")}
        style={{ width: `${percent}%`, background: color ?? "hsl(var(--primary))" }}
      />
    </div>
  );
}

// ─── Stat ─────────────────────────────────────────────────────────────────────

interface StatProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: { value: number; label?: string };
  className?: string;
}

function Stat({ label, value, icon, trend, className }: StatProps) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <div className="flex items-center gap-1.5 text-xs text-[hsl(var(--muted-foreground))]">
        {icon && <span className="opacity-70">{icon}</span>}
        {label}
      </div>
      <div className="text-2xl font-bold text-[hsl(var(--foreground))] leading-none">{value}</div>
      {trend && (
        <div
          className={cn(
            "text-xs font-medium",
            trend.value > 0 ? "text-[hsl(var(--success))]" : trend.value < 0 ? "text-[hsl(var(--danger))]" : "text-[hsl(var(--muted-foreground))]"
          )}
        >
          {trend.value > 0 ? "↑" : trend.value < 0 ? "↓" : "→"} {Math.abs(trend.value)}%{trend.label ? ` ${trend.label}` : ""}
        </div>
      )}
    </div>
  );
}

// ─── Separator ────────────────────────────────────────────────────────────────

function Separator({ className, orientation = "horizontal" }: { className?: string; orientation?: "horizontal" | "vertical" }) {
  return (
    <div
      className={cn(
        "bg-[hsl(var(--border))] flex-shrink-0",
        orientation === "horizontal" ? "h-px w-full" : "w-px h-full",
        className
      )}
    />
  );
}

// ─── Tooltip ─────────────────────────────────────────────────────────────────

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
}

function Tooltip({ content, children }: TooltipProps) {
  return (
    <div className="relative group/tooltip">
      {children}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 -translate-y-2 z-50 pointer-events-none opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-150">
        <div className="bg-[hsl(var(--foreground))] text-[hsl(var(--background))] text-xs font-medium px-2 py-1 rounded-md whitespace-nowrap shadow-lg">
          {content}
        </div>
      </div>
    </div>
  );
}

export { Badge, badgeVariants, Avatar, ProgressBar, Stat, Separator, Tooltip };
