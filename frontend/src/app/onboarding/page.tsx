import type { Metadata } from "next";

export const metadata: Metadata = { title: "Get Started" };

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-[hsl(var(--background))] flex items-center justify-center p-4">
      <div className="text-center space-y-2 text-[hsl(var(--muted-foreground))]">
        <p className="text-lg font-medium">/onboarding</p>
        <p className="text-sm">Full-screen onboarding flow — no sidebar</p>
      </div>
    </div>
  );
}
