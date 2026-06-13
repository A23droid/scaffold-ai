import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes}m`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function getMasteryLabel(percent: number): string {
  if (percent >= 90) return "Mastered";
  if (percent >= 70) return "Proficient";
  if (percent >= 50) return "Developing";
  if (percent >= 25) return "Beginning";
  return "Not Started";
}

export function getMasteryColor(percent: number): string {
  if (percent >= 90) return "#10b981";
  if (percent >= 70) return "#8b5cf6";
  if (percent >= 50) return "#3b82f6";
  if (percent >= 25) return "#f59e0b";
  return "#ef4444";
}

export function xpToNextLevel(level: number): number {
  return level * 500;
}

export function xpProgress(xp: number, level: number): number {
  const levelStart = ((level - 1) * (level - 1) * 250);
  const levelEnd = xpToNextLevel(level);
  return Math.min(100, Math.round(((xp - levelStart) / (levelEnd - levelStart)) * 100));
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "…";
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function getSeverityColor(severity: "mild" | "moderate" | "deep"): string {
  return {
    mild: "#f59e0b",
    moderate: "#f97316",
    deep: "#ef4444",
  }[severity];
}

export function getSubjectColor(subject: string): string {
  const colors: Record<string, string> = {
    Mathematics: "#8b5cf6",
    Physics: "#3b82f6",
    Chemistry: "#10b981",
    Biology: "#f59e0b",
    English: "#ef4444",
    History: "#6366f1",
  };
  return colors[subject] ?? "#8b5cf6";
}
