"use client";

import React from "react";
import { Menu, Bell, Sun, Moon, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/lib/sidebar";
import { useTheme } from "@/lib/theme";
import { Avatar, Tooltip } from "@/components/primitives";
import { useSession } from "next-auth/react";
import { useStudentData } from "@/hooks/useStudentData";
import { Flame } from "lucide-react";

interface HeaderProps {
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
  className?: string;
}

export function Header({ title, subtitle, actions, className }: HeaderProps) {
  const { toggleMobile } = useSidebar();
  const { resolvedTheme, toggleTheme } = useTheme();
  const { data: session } = useSession();
  const { profile } = useStudentData();
  const userName = session?.user?.name || "Student";
  const userEmail = session?.user?.email || "";
  const userInitials = userName.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <header
      className={cn(
        "h-[var(--header-height)] flex items-center px-4 md:px-6 gap-4",
        "bg-[hsl(var(--background)/0.85)] backdrop-blur-md",
        "border-b border-[hsl(var(--border-subtle))]",
        "sticky top-0 z-30 flex-shrink-0",
        className
      )}
    >
      {/* Mobile menu toggle */}
      <button
        onClick={toggleMobile}
        className="md:hidden h-9 w-9 flex items-center justify-center rounded-[var(--radius-sm)] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--surface-2))] transition-colors flex-shrink-0"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Title area */}
      <div className="flex-1 min-w-0">
        {title && (
          <div>
            <h1 className="text-base font-semibold text-[hsl(var(--foreground))] leading-tight truncate">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xs text-[hsl(var(--muted-foreground))] truncate">{subtitle}</p>
            )}
          </div>
        )}
      </div>

      {/* Search — desktop (Removed) */}

      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Streak Counter */}
        {profile && profile.streak > 0 && (
          <Tooltip content="Daily Streak">
            <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-orange-50 text-orange-600 border border-orange-100 mr-2 shadow-sm">
              <Flame className="h-3.5 w-3.5 fill-orange-500 text-orange-500" />
              <span className="text-xs font-bold">{profile.streak}</span>
            </div>
          </Tooltip>
        )}

        {actions && <div className="flex items-center mr-1">{actions}</div>}
        <Tooltip content={resolvedTheme === "light" ? "Switch to dark" : "Switch to light"}>
          <button
            onClick={toggleTheme}
            className="h-9 w-9 flex items-center justify-center rounded-[var(--radius-sm)] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--surface-2))] hover:text-[hsl(var(--foreground))] transition-colors"
            aria-label="Toggle theme"
          >
            {resolvedTheme === "light" ? (
              <Moon className="h-4.5 w-4.5" />
            ) : (
              <Sun className="h-4.5 w-4.5" />
            )}
          </button>
        </Tooltip>

        {/* Notifications (Removed) */}

        {/* Avatar */}
        <button className="ml-1 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary))]">
          <Avatar name={userName} size="sm" />
        </button>
      </div>
    </header>
  );
}
