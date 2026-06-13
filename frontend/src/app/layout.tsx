import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme";
import { SidebarProvider } from "@/lib/sidebar";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: {
    default: "ScaffoldAI",
    template: "%s · ScaffoldAI",
  },
  description: "A personalized AI learning companion powered by everything you've learned.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <SessionProvider refetchOnWindowFocus={false}>
          <ThemeProvider>
            <SidebarProvider>
              {children}
            </SidebarProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

