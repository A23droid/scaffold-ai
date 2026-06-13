import type { Metadata } from "next";
import { AppShell } from "@/components/layout/AppShell";

export const metadata: Metadata = { title: "Settings" };

export default function Page() {
  return (
    <AppShell headerTitle="Settings">
      <div className="flex items-center justify-center h-64 text-[hsl(var(--muted-foreground))]">
        <div className="text-center space-y-2">
          <p className="text-lg font-medium">/settings</p>
          <p className="text-sm">Page implementation coming soon</p>
        </div>
      </div>
    </AppShell>
  );
}
