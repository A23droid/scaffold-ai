"use client";

import React from "react";
import Link from "next/link";
import { 
  AlertTriangle, 
  TrendingUp, 
  Map, 
  Activity, 
  BookOpen, 
  ChevronRight,
  ArrowRight,
  Sparkles,
  Award,
  Clock,
  Layers,
  ArrowUpRight
} from "lucide-react";

import { AppShell } from "@/components/layout/AppShell";
import { MOCK_STUDENT, MOCK_STUCK_POINTS } from "@/mock-data";

export default function StuckMapPage() {
  // Hardcoded bottleneck metrics mapping to Aria Chen's mock profile
  const bottlenecks = [
    { name: "Factorisation", subject: "Mathematics", count: 8, severity: "deep", active: true },
    { name: "Unit Conversion", subject: "Physics", count: 6, severity: "moderate", active: true },
    { name: "Sign Errors", subject: "Mathematics", count: 4, severity: "mild", active: false }
  ];

  return (
    <AppShell headerTitle="Stuck Map" headerSubtitle="Friction diagnostics & dependency tracking">
      
      {/* Background Soft Glow Accents */}
      <div className="absolute top-12 left-1/3 w-[450px] h-[450px] bg-purple-300/10 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] bg-pink-300/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-12">
        
        {/* LEFT / MAIN COLUMN (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Header Description Section */}
          <div className="bg-white border border-zinc-200/50 rounded-2xl p-6 md:p-8 shadow-[0_8px_30px_rgba(120,80,200,0.02)]">
            <div className="max-w-xl space-y-2">
              <h1 className="text-3xl font-light tracking-tight text-[#2c2235]" style={{ fontFamily: 'var(--font-serif-editorial)' }}>
                Conceptual Friction Points
              </h1>
              <p className="text-zinc-550 text-xs leading-relaxed">
                This map isolates concepts where Aria Chen is repeatedly getting stuck during Socratic session dialogs. By resolving these primary friction points, we prevent systemic misconceptions in dependent topics.
              </p>
            </div>
          </div>

          {/* Top Learning Bottlenecks */}
          <div className="bg-white border border-zinc-200/60 rounded-2xl p-6 shadow-[0_8px_30px_rgba(120,80,200,0.03)]">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-base font-bold text-zinc-900">Top Learning Bottlenecks</h3>
                <p className="text-[11px] text-zinc-500">Repeated blockages tracked during learning worksheets</p>
              </div>
              <AlertTriangle className="w-4 h-4 text-purple-600" />
            </div>

            <div className="space-y-4">
              {bottlenecks.map((bot) => (
                <div key={bot.name} className="border border-zinc-100 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-purple-200 transition-colors">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${bot.severity === 'deep' ? 'bg-red-500' : bot.severity === 'moderate' ? 'bg-amber-400' : 'bg-emerald-500'}`} />
                      <h4 className="text-sm font-bold text-zinc-800">{bot.name}</h4>
                      <span className="text-[9px] bg-zinc-100 text-zinc-500 px-1.5 py-0.2 rounded font-semibold uppercase">{bot.subject}</span>
                    </div>
                    <p className="text-xs text-zinc-500">
                      {bot.name === 'Factorisation' ? 'Confusion resolving binomial factor pairings with sign shifts.' :
                       bot.name === 'Unit Conversion' ? 'Friction multiplying velocity values by metric powers of ten.' :
                       'Incorrect subtraction distribution across brackets.'}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 shrink-0 self-start sm:self-auto">
                    <div className="text-right">
                      <span className="text-lg font-extrabold text-zinc-800 block leading-tight">{bot.count}</span>
                      <span className="text-[9px] text-zinc-400 font-medium uppercase tracking-wider">stuck events</span>
                    </div>

                    <div className="w-20 bg-zinc-150 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${bot.active ? 'bg-purple-600' : 'bg-emerald-500'}`} 
                        style={{ width: `${(bot.count / 10) * 100}%` }} 
                      />
                    </div>
                    
                    <span className={`text-[9.5px] font-bold px-2 py-0.5 rounded-full border ${
                      bot.active ? 'bg-red-50 text-red-700 border-red-200/50' : 'bg-emerald-50 text-emerald-700 border-emerald-200/50'
                    }`}>
                      {bot.active ? 'Active' : 'Resolved'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Concept Relationship View (Notion/Linear style tree) */}
          <div className="bg-white border border-zinc-200/60 rounded-2xl p-6 shadow-[0_8px_30px_rgba(120,80,200,0.03)]">
            <div className="mb-6">
              <h3 className="text-base font-bold text-zinc-900">Concept Relationship View</h3>
              <p className="text-[11px] text-zinc-500">Structural mapping of downstream conceptual dependencies</p>
            </div>

            <div className="space-y-6 max-w-md">
              {/* Mathematics Hierarchy */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 font-bold text-xs text-zinc-800">
                  <div className="w-4 h-4 rounded bg-purple-100 border border-purple-200 text-purple-700 flex items-center justify-center font-bold text-[9px]">M</div>
                  <span>Mathematics Syllabus</span>
                </div>
                
                <div className="pl-4 border-l border-zinc-200 ml-2.5 space-y-2.5">
                  
                  {/* Factorisation */}
                  <div className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-4 before:h-px before:bg-zinc-200 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-zinc-700">Factorisation</span>
                      <span className="text-[8px] bg-red-100 text-red-800 px-1 rounded font-bold uppercase">Critical Block</span>
                    </div>
                    <span className="text-[10px] text-zinc-400 font-medium">8 occurrences</span>
                  </div>

                  {/* Fractions */}
                  <div className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-4 before:h-px before:bg-zinc-200 flex items-center justify-between text-xs">
                    <span className="text-zinc-650">Fractions & Ratios</span>
                    <span className="text-[10px] text-zinc-400 font-medium">1 occurrence</span>
                  </div>

                  {/* Sign Errors */}
                  <div className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-4 before:h-px before:bg-zinc-200 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-zinc-650">Sign Errors in Factors</span>
                      <span className="text-[8px] bg-emerald-100 text-emerald-800 px-1 rounded font-bold uppercase">Resolved</span>
                    </div>
                    <span className="text-[10px] text-emerald-600 font-semibold">Done</span>
                  </div>

                </div>
              </div>

              {/* Physics Hierarchy */}
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center gap-2 font-bold text-xs text-zinc-800">
                  <div className="w-4 h-4 rounded bg-blue-100 border border-blue-200 text-blue-700 flex items-center justify-center font-bold text-[9px]">P</div>
                  <span>Physics Syllabus</span>
                </div>
                
                <div className="pl-4 border-l border-zinc-200 ml-2.5 space-y-2.5">
                  
                  {/* Unit Conversion */}
                  <div className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-4 before:h-px before:bg-zinc-200 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-zinc-700">Unit Conversion</span>
                      <span className="text-[8px] bg-amber-100 text-amber-800 px-1 rounded font-bold uppercase">Active Block</span>
                    </div>
                    <span className="text-[10px] text-zinc-400 font-medium">6 occurrences</span>
                  </div>

                  {/* Kinematics */}
                  <div className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-4 before:h-px before:bg-zinc-200 flex items-center justify-between text-xs">
                    <span className="text-zinc-650">Kinematics Formulae</span>
                    <span className="text-[10px] text-zinc-400 font-medium">2 occurrences</span>
                  </div>

                </div>
              </div>

            </div>
          </div>

        </div>

        {/* RIGHT COLUMN (1/3 width) */}
        <div className="space-y-6">

          {/* Risk Prediction */}
          <div className="bg-white border border-zinc-200/60 rounded-2xl p-6 shadow-[0_8px_30px_rgba(120,80,200,0.03)] space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-zinc-900">Risk Prediction</h3>
              <Activity className="w-4.5 h-4.5 text-purple-600" />
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-purple-50/50 border border-purple-100/50 rounded-xl space-y-1">
                <span className="text-[9px] font-bold text-purple-700 uppercase tracking-wider block">Dependency Alert</span>
                <p className="text-xs text-zinc-750 leading-relaxed font-semibold">
                  Students struggling with <b>Factorisation</b> often struggle with <b>Quadratic Equations</b> next.
                </p>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-zinc-500 font-medium">Calculated Next-Unit Risk:</span>
                <div className="text-right">
                  <span className="text-2xl font-extrabold text-purple-700 block leading-tight">72%</span>
                  <span className="text-[9px] text-zinc-400 uppercase tracking-wider font-bold">Severity Risk</span>
                </div>
              </div>

              <div className="w-full bg-zinc-100 h-1.5 rounded-full overflow-hidden">
                <div className="h-full bg-purple-600 rounded-full" style={{ width: "72%" }} />
              </div>
            </div>
          </div>

          {/* Learning Trajectory */}
          <div className="bg-white border border-zinc-200/60 rounded-2xl p-6 shadow-[0_8px_30px_rgba(120,80,200,0.03)] space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-zinc-900">Learning Trajectory</h3>
              <Award className="w-4.5 h-4.5 text-purple-600" />
            </div>

            <div className="space-y-3.5">
              {/* Mastery bar block */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-500 font-medium">Current Algebra Mastery</span>
                  <span className="font-extrabold text-zinc-800">74%</span>
                </div>
                <div className="w-full bg-zinc-100 h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: "74%" }} />
                </div>
              </div>

              <div className="p-3 bg-zinc-50 border border-zinc-150 rounded-xl space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-800">
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                  <span>Projected Timeline</span>
                </div>
                <p className="text-[11px] text-zinc-550 leading-relaxed">
                  With regular Socratic check-ins resolving sign distributions, Aria Chen is projected to reach <b>90% mastery</b> in <b>3 weeks</b>.
                </p>
              </div>
            </div>
          </div>

          {/* Progress Over Time (Minimal trend timeline) */}
          <div className="bg-white border border-zinc-200/60 rounded-2xl p-6 shadow-[0_8px_30px_rgba(120,80,200,0.03)] space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-zinc-900">Progress Over Time</h3>
              <Clock className="w-4.5 h-4.5 text-purple-600" />
            </div>

            <p className="text-[10px] text-zinc-500">Diagnostics of active blocks resolved vs created over the last 4 weeks.</p>

            <div className="space-y-4 relative pl-3 border-l border-zinc-100 ml-1.5">
              {/* Week 4 */}
              <div className="relative text-[11px] space-y-0.5">
                <div className="absolute -left-[16px] top-1 w-2 h-2 rounded-full bg-purple-600 ring-2 ring-purple-100" />
                <div className="font-bold text-zinc-800 flex items-center justify-between">
                  <span>Week 4 (Current)</span>
                  <span className="text-[9px] text-rose-500 font-bold uppercase">2 active • 8 resolved</span>
                </div>
                <p className="text-[10px] text-zinc-500">Sign Errors fully resolved; Factorisation remains deep friction.</p>
              </div>

              {/* Week 3 */}
              <div className="relative text-[11px] space-y-0.5">
                <div className="absolute -left-[16px] top-1 w-2 h-2 rounded-full bg-zinc-300" />
                <div className="font-semibold text-zinc-700 flex items-center justify-between">
                  <span>Week 3</span>
                  <span className="text-[9px] text-zinc-400">3 active • 5 resolved</span>
                </div>
                <p className="text-[10px] text-zinc-500">Focused practice on coefficient isolation variables.</p>
              </div>

              {/* Week 2 */}
              <div className="relative text-[11px] space-y-0.5">
                <div className="absolute -left-[16px] top-1 w-2 h-2 rounded-full bg-zinc-300" />
                <div className="font-semibold text-zinc-700 flex items-center justify-between">
                  <span>Week 2</span>
                  <span className="text-[9px] text-zinc-400">4 active • 3 resolved</span>
                </div>
                <p className="text-[10px] text-zinc-500">Initial algebraic factoring blockages detected.</p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </AppShell>
  );
}
