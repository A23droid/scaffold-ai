import type { Metadata } from "next";
import { AppShell } from "@/components/layout/AppShell";

export const metadata: Metadata = { title: "Teacher" };

export default function Page() {
  return (
    <AppShell headerTitle="Teacher">
      <div className="flex items-center justify-center h-64 text-[hsl(var(--muted-foreground))]">
        <div className="text-center space-y-2">
          <p className="text-lg font-medium">/teacher</p>
          <p className="text-sm">Page implementation coming soon</p>
        </div>
      </div>
    </AppShell>
  );
}
