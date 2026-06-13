"use client";

import type { ReactNode } from "react";
import { ChevronDown, LogOut } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useStudentData } from "@/hooks/useStudentData";
import { apiUpdateStudentProfile } from "@/lib/api";
import React, { useState } from "react";
import { Loader2 } from "lucide-react";

const gradeOptions = ["Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12"];
const boardOptions = ["CBSE", "ICSE", "State Board", "IB", "Cambridge"];
const languageOptions = ["English", "Hindi", "Bengali", "Tamil", "Telugu"];

const learningStyles = [
  "Visual Examples",
  "Step-by-Step Reasoning",
  "Analogies",
  "Practice First",
];

const tutoringPace = ["Relaxed", "Balanced", "Fast"];
const appearance = ["Light", "Dark", "System"];

const notifications = [
  "Daily Learning Reminder",
  "Weekly Learning Report",
  "Streak Reminders",
];

export default function Page() {
  const { profile, loading, mutateProfile } = useStudentData();
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!profile) return;
    setIsSaving(true);
    try {
      const formData = new FormData(e.currentTarget);
      const paceMap: Record<string, string> = { "Relaxed": "SLOW", "Balanced": "MEDIUM", "Fast": "FAST" };
      const updates = {
        learningPace: paceMap[formData.get("pace") as string] || "MEDIUM",
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        parentEmails: formData.get("parentEmails") as string,
      };
      await apiUpdateStudentProfile(profile.id, updates);
      mutateProfile(updates);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <AppShell headerTitle="Settings">
        <div className="flex h-64 items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-purple-500" /></div>
      </AppShell>
    );
  }

  return (
    <AppShell headerTitle="Settings" headerSubtitle="Customize preferences">
      <div className="mx-auto w-full max-w-5xl px-1 py-8 sm:px-3 md:py-12">
        <header className="mb-10 flex max-w-2xl flex-col items-start justify-between gap-4 md:mb-12 md:flex-row md:items-end">
          <div className="space-y-3">
            <h1 className="font-[var(--font-serif-editorial)] text-5xl font-semibold leading-[0.96] tracking-normal text-[hsl(var(--foreground))] sm:text-6xl">
              Settings
            </h1>
            <p className="max-w-xl text-base leading-7 text-[hsl(var(--muted-foreground))]">
              Customize your learning experience and preferences.
            </p>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="grid gap-5 lg:grid-cols-[1fr_1fr]">


          <SettingsCard title="Appearance">
            <SegmentedRadio name="appearance" options={appearance} defaultValue="System" />
          </SettingsCard>

          <SettingsCard title="Learning Preferences" className="lg:col-span-2">
            <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
              <fieldset className="space-y-3">
                <legend className="text-sm font-medium text-[hsl(var(--foreground))]">
                  Preferred Learning Style
                </legend>
                <div className="grid gap-3 sm:grid-cols-2">
                  {learningStyles.map((style, index) => (
                    <CheckOption key={style} label={style} defaultChecked={index < 2} />
                  ))}
                </div>
              </fieldset>

              <fieldset className="space-y-3">
                <legend className="text-sm font-medium text-[hsl(var(--foreground))]">
                  Tutoring Pace
                </legend>
                <SegmentedRadio 
                  name="pace" 
                  options={tutoringPace} 
                  defaultValue={{ "SLOW": "Relaxed", "MEDIUM": "Balanced", "FAST": "Fast" }[profile?.learningPace || "MEDIUM"] || "Balanced"} 
                />
              </fieldset>
            </div>
          </SettingsCard>

          <SettingsCard title="Account">
            <div className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <TextField label="Name" name="name" id="name" defaultValue={profile?.name || ""} />
                <TextField label="Email" name="email" id="email" defaultValue={profile?.email || ""} type="email" />
              </div>
              <div className="pt-2 border-t border-[hsl(var(--border-subtle))]">
                <p className="text-xs text-zinc-500 mb-4 leading-relaxed">
                  <strong>Parent Access:</strong> You can securely grant your parents access to view your dashboard by entering their registered email addresses below.
                </p>
                <TextField label="Parent Emails (comma separated)" name="parentEmails" id="parentEmails" defaultValue={profile?.parentEmails || ""} placeholder="parent1@example.com, parent2@example.com" />
              </div>
              <div className="flex items-center justify-between border-t border-[hsl(var(--border-subtle))] pt-5">
                <Button variant="outline" type="button" className="bg-white/45 text-[hsl(var(--danger))] hover:bg-[hsl(var(--danger)/0.08)]">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
                <Button type="submit" disabled={isSaving} className="bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg px-6">
                  {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </div>
          </SettingsCard>
        </form>
      </div>
    </AppShell>
  );
}

function SettingsCard({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Card
      className={cn(
        "rounded-[22px] border-[hsl(var(--border-subtle))] bg-[hsl(var(--surface)/0.78)] shadow-[0_12px_38px_rgba(120,80,160,0.07)]",
        className
      )}
    >
      <CardHeader className="p-6 pb-0">
        <CardTitle className="text-[15px] font-semibold tracking-normal">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-6">{children}</CardContent>
    </Card>
  );
}

function SelectField({
  label,
  name,
  id,
  options,
  defaultValue,
}: {
  label: string;
  name: string;
  id: string;
  options: string[];
  defaultValue?: string;
}) {
  return (
    <label className="block space-y-2" htmlFor={id}>
      <span className="text-xs font-medium text-[hsl(var(--muted-foreground))]">{label}</span>
      <span className="relative block">
        <select
          id={id}
          name={name}
          defaultValue={defaultValue || options[0]}
          className="h-12 w-full appearance-none rounded-[14px] border border-[hsl(var(--border))] bg-[hsl(var(--background)/0.76)] px-4 pr-10 text-sm font-medium text-[hsl(var(--foreground))] shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] outline-none transition focus:border-[hsl(var(--primary)/0.65)] focus:ring-4 focus:ring-[hsl(var(--primary)/0.12)]"
        >
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
      </span>
    </label>
  );
}

function TextField({
  label,
  name,
  id,
  defaultValue,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  id: string;
  defaultValue: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block space-y-2" htmlFor={id}>
      <span className="text-xs font-medium text-[hsl(var(--muted-foreground))]">{label}</span>
      <input
        type={type}
        name={name}
        id={id}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="h-12 w-full rounded-[14px] border border-[hsl(var(--border))] bg-[hsl(var(--background)/0.76)] px-4 text-sm font-medium text-[hsl(var(--foreground))] shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] outline-none transition placeholder:text-[hsl(var(--muted-foreground))] focus:border-[hsl(var(--primary)/0.65)] focus:ring-4 focus:ring-[hsl(var(--primary)/0.12)]"
      />
    </label>
  );
}

function SegmentedRadio({
  name,
  options,
  defaultValue,
}: {
  name: string;
  options: string[];
  defaultValue: string;
}) {
  return (
    <div className="grid gap-2 rounded-[16px] border border-[hsl(var(--border-subtle))] bg-[hsl(var(--background)/0.54)] p-1.5 sm:grid-cols-3">
      {options.map((option) => (
        <label key={option} className="relative">
          <input
            type="radio"
            name={name}
            value={option}
            defaultChecked={option === defaultValue}
            className="peer sr-only"
          />
          <span className="flex h-10 cursor-pointer items-center justify-center rounded-[12px] px-3 text-center text-sm font-medium text-[hsl(var(--muted-foreground))] transition peer-checked:bg-white peer-checked:text-[hsl(var(--foreground))] peer-checked:shadow-[0_6px_18px_rgba(76,55,112,0.1)] peer-focus-visible:ring-4 peer-focus-visible:ring-[hsl(var(--primary)/0.12)] dark:peer-checked:bg-[hsl(var(--surface-2))]">
            {option}
          </span>
        </label>
      ))}
    </div>
  );
}

function CheckOption({ label, defaultChecked }: { label: string; defaultChecked?: boolean }) {
  return (
    <label className="flex min-h-12 cursor-pointer items-center gap-3 rounded-[14px] border border-[hsl(var(--border))] bg-[hsl(var(--background)/0.58)] px-4 text-sm font-medium text-[hsl(var(--foreground))] transition hover:bg-[hsl(var(--surface-2)/0.75)]">
      <input
        type="checkbox"
        defaultChecked={defaultChecked}
        className="h-4 w-4 rounded border-[hsl(var(--border))] accent-[hsl(var(--primary))] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[hsl(var(--primary)/0.14)]"
      />
      <span>{label}</span>
    </label>
  );
}

function ToggleRow({ label, defaultChecked }: { label: string; defaultChecked?: boolean }) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
      <span className="text-sm font-medium text-[hsl(var(--foreground))]">{label}</span>
      <input
        type="checkbox"
        defaultChecked={defaultChecked}
        className="peer sr-only"
      />
      <span className="relative h-7 w-12 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--surface-3)/0.7)] transition peer-checked:border-[hsl(var(--primary)/0.15)] peer-checked:bg-[hsl(var(--primary))] peer-focus-visible:ring-4 peer-focus-visible:ring-[hsl(var(--primary)/0.14)] peer-checked:[&>span]:translate-x-5">
        <span className="absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow-[0_2px_8px_rgba(45,35,65,0.18)] transition" />
      </span>
    </label>
  );
}
