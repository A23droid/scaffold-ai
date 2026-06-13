"use client";

import React from "react";
import { Menu, Bell, Sun, Moon, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/lib/sidebar";
import { useTheme } from "@/lib/theme";
import { Avatar, Tooltip } from "@/components/primitives";
import { MOCK_STUDENT } from "@/mock-data";

interface HeaderProps {
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
  className?: string;
}

export function Header({ title, subtitle, actions, className }: HeaderProps) {
  const { toggleMobile } = useSidebar();
  const { resolvedTheme, toggleTheme } = useTheme();
  const user = MOCK_STUDENT;

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

      {/* Search — desktop */}
      <div className="hidden md:flex items-center gap-2 h-9 px-3 rounded-[var(--radius-md)] bg-[hsl(var(--surface-2))] text-[hsl(var(--muted-foreground))] text-sm cursor-pointer hover:bg-[hsl(var(--surface-3))] transition-colors min-w-[200px]">
        <Search className="h-4 w-4 flex-shrink-0" />
        <span className="flex-1 text-xs">Search concepts, sessions…</span>
        <kbd className="text-[10px] bg-[hsl(var(--surface-3))] px-1.5 py-0.5 rounded-sm font-mono">⌘K</kbd>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-1.5">
        {actions}

        {/* Theme toggle */}
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

        {/* Notifications */}
        <Tooltip content="Notifications">
          <button className="relative h-9 w-9 flex items-center justify-center rounded-[var(--radius-sm)] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--surface-2))] hover:text-[hsl(var(--foreground))] transition-colors">
            <Bell className="h-4.5 w-4.5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[hsl(var(--primary))] ring-2 ring-[hsl(var(--background))]" />
          </button>
        </Tooltip>

        {/* Avatar */}
        <button className="ml-1 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary))]">
          <Avatar src={user.avatar} name={user.name} size="sm" />
        </button>
      </div>
    </header>
  );
}
