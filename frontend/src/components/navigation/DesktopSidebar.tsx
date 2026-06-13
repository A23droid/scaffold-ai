"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Sparkles, Map, Clock, Settings,
  Users, ClipboardList, AlertTriangle, TrendingUp,
  ChevronLeft, ChevronRight, LogOut, Flame
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/lib/sidebar";
import { Avatar, ProgressBar, Tooltip } from "@/components/primitives";
import { MOCK_STUDENT, STUDENT_NAV_SECTIONS } from "@/mock-data";
import type { NavItem } from "@/types";

const ICON_MAP: Record<string, React.ElementType> = {
  LayoutDashboard, Sparkles, Map, Clock, Settings,
  Users, ClipboardList, AlertTriangle, TrendingUp,
};

function NavIcon({ name }: { name: string }) {
  const Icon = ICON_MAP[name] ?? LayoutDashboard;
  return <Icon className="h-[18px] w-[18px] flex-shrink-0" strokeWidth={1.75} />;
}

function SidebarNavItem({ item, isCollapsed }: { item: NavItem; isCollapsed: boolean }) {
  const pathname = usePathname();
  const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

  const content = (
    <Link
      href={item.href}
      className={cn(
        "relative flex items-center gap-3 rounded-[var(--radius-md)] px-3 py-2.5 text-sm font-medium transition-all duration-150 group",
        isActive
          ? "bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))]"
          : "text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--surface-2))] hover:text-[hsl(var(--foreground))]",
        isCollapsed && "justify-center px-2.5"
      )}
    >
      {isActive && (
        <motion.div
          layoutId="sidebar-active"
          className="absolute inset-0 rounded-[var(--radius-md)] bg-[hsl(var(--primary)/0.1)]"
          transition={{ type: "spring", bounce: 0.2, duration: 0.3 }}
        />
      )}
      <span className={cn("relative z-10", isActive && "text-[hsl(var(--primary))]")}>
        <NavIcon name={item.icon} />
      </span>
      {!isCollapsed && (
        <span className="relative z-10 truncate">{item.label}</span>
      )}
      {!isCollapsed && item.badge && (
        <span className="ml-auto relative z-10 text-xs bg-[hsl(var(--primary)/0.15)] text-[hsl(var(--primary))] px-1.5 py-0.5 rounded-full font-medium">
          {item.badge}
        </span>
      )}
    </Link>
  );

  if (isCollapsed) {
    return <Tooltip content={item.label}>{content}</Tooltip>;
  }

  return content;
}

export function DesktopSidebar() {
  const { isCollapsed, toggleCollapse } = useSidebar();
  const user = MOCK_STUDENT;
  const levelProgress = Math.round(((user.xp % 500) / 500) * 100);

  return (
    <motion.aside
      animate={{ width: isCollapsed ? 72 : 240 }}
      transition={{ type: "spring", bounce: 0.1, duration: 0.35 }}
      className="hidden md:flex flex-col h-screen bg-[hsl(var(--surface))] border-r border-[hsl(var(--border))] relative z-20 flex-shrink-0 overflow-hidden"
    >
      {/* Logo */}
      <div className={cn("flex items-center h-[var(--header-height)] px-4 flex-shrink-0", isCollapsed && "justify-center px-3")}>
        <Link href="/dashboard" className="flex items-center gap-2.5 min-w-0">
          <div className="h-8 w-8 rounded-[var(--radius-sm)] gradient-primary flex items-center justify-center flex-shrink-0 shadow-[0_2px_8px_hsl(262_80%_60%/0.3)]">
            <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 text-white" fill="none" stroke="currentColor" strokeWidth={2.2}>
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="font-bold text-[15px] tracking-tight text-[hsl(var(--foreground))] overflow-hidden whitespace-nowrap"
              >
                ScaffoldAI
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto overflow-x-hidden">
        {STUDENT_NAV_SECTIONS.map((section) => (
          <div key={section.id} className="space-y-0.5">
            {section.label && !isCollapsed && (
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[hsl(var(--muted-foreground)/0.6)] px-3 py-2">
                {section.label}
              </p>
            )}
            {section.label && isCollapsed && (
              <div className="h-px w-8 mx-auto bg-[hsl(var(--border))] my-2" />
            )}
            {section.items.map((item) => (
              <SidebarNavItem key={item.id} item={item} isCollapsed={isCollapsed} />
            ))}
          </div>
        ))}
      </nav>

      {/* User card */}
      <div className={cn("px-3 py-3 border-t border-[hsl(var(--border))] flex-shrink-0", isCollapsed && "px-2")}>
        {!isCollapsed ? (
          <div className="rounded-[var(--radius-md)] bg-[hsl(var(--surface-2))] p-3 space-y-2.5">
            <div className="flex items-center gap-2.5 min-w-0">
              <Avatar src={user.avatar} name={user.name} size="sm" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate leading-tight">{user.name}</p>
                <p className="text-[11px] text-[hsl(var(--muted-foreground))] truncate">{user.grade}</p>
              </div>
              <div className="flex items-center gap-1 text-[hsl(var(--warning))] flex-shrink-0">
                <Flame className="h-3.5 w-3.5" />
                <span className="text-xs font-bold">{user.streak}</span>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-[hsl(var(--muted-foreground))]">Level {user.level}</span>
                <span className="text-[10px] font-medium text-[hsl(var(--primary))]">{user.xp} XP</span>
              </div>
              <ProgressBar value={levelProgress} size="sm" />
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <Tooltip content={user.name}>
              <Avatar src={user.avatar} name={user.name} size="sm" />
            </Tooltip>
          </div>
        )}

        <button
          onClick={toggleCollapse}
          className="mt-2 w-full flex items-center justify-center gap-2 py-1.5 px-2 rounded-[var(--radius-sm)] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--surface-2))] hover:text-[hsl(var(--foreground))] transition-colors text-xs"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <>
              <ChevronLeft className="h-4 w-4" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </motion.aside>
  );
}
