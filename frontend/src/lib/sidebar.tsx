"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

interface SidebarContextValue {
  isOpen: boolean;
  isMobileOpen: boolean;
  isCollapsed: boolean;
  openMobile: () => void;
  closeMobile: () => void;
  toggleMobile: () => void;
  toggleCollapse: () => void;
}

const SidebarContext = createContext<SidebarContextValue | undefined>(undefined);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isMobileOpen, setMobileOpen] = useState(false);
  const [isCollapsed, setCollapsed] = useState(false);

  const openMobile = useCallback(() => setMobileOpen(true), []);
  const closeMobile = useCallback(() => setMobileOpen(false), []);
  const toggleMobile = useCallback(() => setMobileOpen((v) => !v), []);
  const toggleCollapse = useCallback(() => setCollapsed((v) => !v), []);

  return (
    <SidebarContext.Provider
      value={{
        isOpen: true,
        isMobileOpen,
        isCollapsed,
        openMobile,
        closeMobile,
        toggleMobile,
        toggleCollapse,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used within SidebarProvider");
  return ctx;
}
