"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Flame, 
  Target, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Layers, 
  BookOpen, 
  Calendar, 
  Sparkles,
  ArrowRight,
  Clock,
  Award,
  ChevronRight,
  Brain,
  Zap,
  Info
} from "lucide-react";

import { AppShell } from "@/components/layout/AppShell";
import { 
  MOCK_STUDENT, 
  MOCK_STUCK_POINTS, 
  MOCK_SUBJECT_PROGRESS,
  MOCK_RECENT_SESSIONS
} from "@/mock-data";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"all" | "math" | "physics" | "chemistry">("all");
  const [expandedStuckPoint, setExpandedStuckPoint] = useState<string | null>("stuck-1");

  // Filter progress details
  const activeSubjectData = MOCK_SUBJECT_PROGRESS.filter(
    (sub) => activeTab === "all" || sub.subject.toLowerCase() === activeTab
  );

  // Overall confidence average calculation
  const overallConfidence = Math.round(
    MOCK_SUBJECT_PROGRESS.reduce((sum, sub) => sum + sub.masteryPercent, 0) / MOCK_SUBJECT_PROGRESS.length
  );

  // Generate 7x22 heatmap cells to represent study consistency (larger than hero preview)
  const heatmapData = Array.from({ length: 154 }, (_, i) => {
    const values = [0, 1, 2, 3, 4];
    // Create organic learning blocks
    let level = 0;
    if (i % 7 === 0 || i % 7 === 3 || i % 7 === 5) {
      level = values[(i + 1) % 5];
    } else if (i % 4 === 0) {
      level = values[i % 3];
    }
    return { id: i, level };
  });

  return (
    <AppShell headerTitle="Student Dashboard" headerSubtitle={`Welcome back, ${MOCK_STUDENT.name}`}>
      
      {/* Background Soft Glow Accents */}
      <div className="absolute top-12 left-1/3 w-[450px] h-[450px] bg-purple-300/10 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] bg-pink-300/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* DASHBOARD CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto pb-12">
        
        {/* LEFT / MAIN COLUMN (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Welcome Back Card */}
          <div className="relative overflow-hidden rounded-2xl border border-purple-100 bg-gradient-to-r from-purple-900 via-indigo-950 to-zinc-950 p-6 md:p-8 text-white shadow-lg">
            {/* Visual backdrop grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-500/20 border border-purple-400/30 text-xs text-purple-200 font-medium">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Level {MOCK_STUDENT.level} Student</span>
                </div>
                <h1 className="text-3xl font-light tracking-tight md:text-4xl" style={{ fontFamily: 'var(--font-serif-editorial)' }}>
                  A truly personalized learning journey
                </h1>
                <p className="text-sm text-zinc-300 max-w-md leading-relaxed">
                  You're making great progress! You are currently <b>3 stuck points</b> away from fully mastering Newton's Second Law. Let's resolve them together.
                </p>
              </div>

              {/* XP Level progress bar */}
              <div className="md:w-56 bg-white/5 border border-white/10 p-4.5 rounded-xl backdrop-blur-sm self-stretch md:self-auto flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs font-medium mb-1.5">
                  <span className="text-zinc-300">Level Progress</span>
                  <span className="text-zinc-100">{MOCK_STUDENT.xp} / 5,000 XP</span>
                </div>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden mb-3">
                  <div className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full" style={{ width: `${(MOCK_STUDENT.xp / 5000) * 100}%` }} />
                </div>
                <span className="text-[10px] text-zinc-400 font-medium">
                  +1,200 XP earned this week
                </span>
              </div>
            </div>
          </div>

          {/* Continue Session Card */}
          <div className="bg-white border border-zinc-200/60 rounded-2xl p-6 shadow-[0_8px_30px_rgba(120,80,200,0.03)] hover:shadow-[0_12px_36px_rgba(120,80,200,0.05)] transition-all duration-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-600 animate-ping" />
                  <span className="text-[11px] font-bold text-purple-600 uppercase tracking-wider">Active Session In Progress</span>
                </div>
                <h3 className="text-xl font-bold text-zinc-800 mt-1">Quadratic Equations Practice</h3>
                <p className="text-xs text-zinc-500">Mathematics • Socratic Exploration</p>
              </div>
              <Link 
                href="/session" 
                className="inline-flex items-center gap-1.5 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold text-xs px-5 py-2.5 rounded-full hover:opacity-95 active:scale-[0.98] transition-all shadow-md self-start md:self-auto"
              >
                <span>Resume Socratic Session</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Socratic tutoring chat block inside dashboard */}
            <div className="border border-zinc-100 bg-zinc-50/50 rounded-xl p-4.5 space-y-3">
              <div className="flex gap-2.5">
                <div className="w-7 h-7 rounded-full bg-purple-100 border border-purple-200 text-purple-700 flex items-center justify-center font-bold text-[10px] shrink-0">
                  S
                </div>
                <div className="bg-white border border-zinc-100 rounded-xl p-3 text-xs text-zinc-700 shadow-sm leading-relaxed">
                  <div className="font-semibold text-purple-800 mb-0.5">Socratic Guide</div>
                  "Let's look at completing the square for <b>x² + 6x + 2 = 0</b>. How can we write <b>x² + 6x</b> as a perfect square binomial? What number should we add to make it complete?"
                </div>
              </div>
              <div className="flex gap-2.5 justify-end">
                <div className="bg-purple-950 text-white rounded-xl p-3 text-xs max-w-[85%] shadow-sm leading-relaxed">
                  <div className="font-semibold text-purple-300 mb-0.5">{MOCK_STUDENT.name}</div>
                  "If we take half of the x coefficient, which is 3, and square it, we get 9. So we add 9?"
                </div>
                <div className="w-7 h-7 rounded-full bg-purple-800 text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                  AC
                </div>
              </div>
            </div>
          </div>

          {/* Concept Mastery Heatmap */}
          <div className="bg-white border border-zinc-200/60 rounded-2xl p-6 shadow-[0_8px_30px_rgba(120,80,200,0.03)]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div>
                <h3 className="text-lg font-bold text-zinc-900">Concept Mastery Heatmap</h3>
                <p className="text-xs text-zinc-500">Visual mapping of daily concept repetitions, reviews, and study density.</p>
              </div>

              {/* Subject Tabs */}
              <div className="flex bg-zinc-100 p-0.5 rounded-lg text-xs font-medium shrink-0">
                {(["all", "math", "physics", "chemistry"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1 rounded-md transition-all uppercase text-[10px] tracking-wider ${activeTab === tab ? 'bg-white text-purple-700 shadow-xs' : 'text-zinc-500 hover:text-zinc-900'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom 7 rows x 22 columns Heatmap Grid */}
            <div className="flex items-center gap-3 py-2 overflow-x-auto">
              <div className="flex flex-col justify-between text-[10px] text-zinc-400 h-20 font-semibold pr-1">
                <span>Mon</span>
                <span>Wed</span>
                <span>Fri</span>
              </div>
              <div className="grid grid-flow-col grid-rows-7 gap-1.5 min-w-[340px]">
                {heatmapData.map((cell) => {
                  // Select shade depending on filter and cell level
                  const intensities = [
                    "bg-zinc-100", 
                    "bg-purple-100/70", 
                    "bg-purple-300/70", 
                    "bg-purple-500", 
                    "bg-pink-500"
                  ];
                  let colorClass = intensities[cell.level];
                  // If filter is specific subject, change colors to match subject theme
                  if (activeTab === "math" && cell.level > 0) {
                    colorClass = ["bg-zinc-100", "bg-purple-100", "bg-purple-300", "bg-purple-500", "bg-purple-600"][cell.level];
                  } else if (activeTab === "physics" && cell.level > 0) {
                    colorClass = ["bg-zinc-100", "bg-blue-100", "bg-blue-300", "bg-blue-500", "bg-blue-600"][cell.level];
                  } else if (activeTab === "chemistry" && cell.level > 0) {
                    colorClass = ["bg-zinc-100", "bg-emerald-100", "bg-emerald-300", "bg-emerald-500", "bg-emerald-600"][cell.level];
                  }

                  return (
                    <div 
                      key={cell.id} 
                      className={`w-2.5 h-2.5 rounded-[3px] ${colorClass} hover:scale-130 transition-transform duration-100 cursor-pointer`}
                      title={`Activity index: ${cell.level}`}
                    />
                  );
                })}
              </div>
            </div>

            {/* Grid legend */}
            <div className="flex items-center justify-end gap-1.5 text-[10px] text-zinc-400 mt-4 font-medium">
              <span>Less</span>
              <div className="w-2.5 h-2.5 bg-zinc-100 rounded-[2px]" />
              <div className="w-2.5 h-2.5 bg-purple-100/70 rounded-[2px]" />
              <div className="w-2.5 h-2.5 bg-purple-300/70 rounded-[2px]" />
              <div className="w-2.5 h-2.5 bg-purple-500 rounded-[2px]" />
              <div className="w-2.5 h-2.5 bg-pink-500 rounded-[2px]" />
              <span>More repetitions</span>
            </div>
          </div>

          {/* Recent Sessions */}
          <div className="bg-white border border-zinc-200/60 rounded-2xl p-6 shadow-[0_8px_30px_rgba(120,80,200,0.03)]">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-lg font-bold text-zinc-900">Recent Sessions</h3>
                <p className="text-xs text-zinc-500">History of your Socratic focus worksheets and challenges.</p>
              </div>
              <Clock className="w-4 h-4 text-zinc-400" />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-zinc-600">
                <thead>
                  <tr className="border-b border-zinc-100 text-zinc-400 font-bold uppercase tracking-wider text-[9px] pb-2">
                    <th className="py-2">Subject / Topic</th>
                    <th className="py-2">Mode</th>
                    <th className="py-2">Duration</th>
                    <th className="py-2">Concepts Explored</th>
                    <th className="py-2 text-right">XP Earned</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-50">
                  {MOCK_RECENT_SESSIONS.map((session) => (
                    <tr key={session.id} className="hover:bg-zinc-50/50 transition-colors">
                      <td className="py-3.5">
                        <div className="font-semibold text-zinc-900">{session.topic}</div>
                        <div className="text-[10px] text-zinc-400 font-medium">{session.subject}</div>
                      </td>
                      <td className="py-3.5">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold capitalize border ${
                          session.mode === 'practice' ? 'bg-blue-50 text-blue-700 border-blue-200/40' :
                          session.mode === 'explore' ? 'bg-purple-50 text-purple-700 border-purple-200/40' :
                          session.mode === 'review' ? 'bg-emerald-50 text-emerald-700 border-emerald-200/40' :
                          'bg-amber-50 text-amber-700 border-amber-200/40'
                        }`}>
                          {session.mode}
                        </span>
                      </td>
                      <td className="py-3.5 font-medium text-zinc-500">{session.durationMinutes} mins</td>
                      <td className="py-3.5">
                        <div className="flex flex-wrap gap-1">
                          {session.conceptsExplored.map((c) => (
                            <span key={c} className="text-[9px] bg-zinc-100 text-zinc-600 px-1.5 py-0.2 rounded">
                              {c}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3.5 text-right font-bold text-purple-600">+{session.xpEarned} XP</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN (1/3 width) */}
        <div className="space-y-6">

          {/* Confidence Score Dials */}
          <div className="bg-white border border-zinc-200/60 rounded-2xl p-6 shadow-[0_8px_30px_rgba(120,80,200,0.03)] flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-zinc-900">Confidence Score</h3>
                <p className="text-[11px] text-zinc-500">Average syllabus mastery index</p>
              </div>
              <div className="flex items-center gap-1 font-bold text-emerald-500 text-xs">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+5.4%</span>
              </div>
            </div>

            {/* Large Radial Arc */}
            <div className="relative w-36 h-36 mx-auto flex items-center justify-center my-2">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="72" cy="72" r="62" className="stroke-zinc-100 fill-none" strokeWidth="9" />
                <circle cx="72" cy="72" r="62" className="stroke-purple-600 fill-none" strokeWidth="9" strokeDasharray="389" strokeDashoffset={389 - (389 * overallConfidence) / 100} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-extrabold text-zinc-850">{overallConfidence}%</span>
                <span className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold mt-0.5">Overall</span>
              </div>
            </div>

            {/* Subject Breakdown Progress Lines */}
            <div className="space-y-3.5 mt-5">
              {MOCK_SUBJECT_PROGRESS.map((sub) => (
                <div key={sub.subject} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-zinc-700">{sub.subject}</span>
                    <span className="font-bold text-zinc-900">{sub.masteryPercent}%</span>
                  </div>
                  <div className="w-full bg-zinc-100 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500" 
                      style={{ 
                        width: `${sub.masteryPercent}%`, 
                        backgroundColor: sub.color 
                      }} 
                    />
                  </div>
                  <div className="flex items-center gap-3 text-[9px] text-zinc-400 font-medium">
                    <span>{sub.sessionsCount} sessions</span>
                    <span>•</span>
                    <span>{Math.round(sub.totalMinutes / 60)} hrs active</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Daily Streak & Weekly Progress */}
          <div className="bg-white border border-zinc-200/60 rounded-2xl p-6 shadow-[0_8px_30px_rgba(120,80,200,0.03)]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-zinc-900">Daily Streak</h3>
              <div className="flex items-center gap-1 bg-amber-50 border border-amber-200/70 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                <Flame className="w-3.5 h-3.5 fill-amber-500 stroke-amber-500" />
                <span>{MOCK_STUDENT.streak} Days active</span>
              </div>
            </div>

            {/* Streak Grid timeline */}
            <div className="grid grid-cols-7 gap-2">
              {["M", "T", "W", "T", "F", "S", "S"].map((day, idx) => {
                const activeDays = [true, false, true, true, true, true, false];
                const isActive = activeDays[idx];
                return (
                  <div key={idx} className="flex flex-col items-center gap-1">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold transition-all ${
                      isActive ? 'bg-amber-100/90 text-amber-800 border border-amber-300 shadow-xs' : 'bg-zinc-100 text-zinc-400'
                    }`}>
                      {isActive ? "🔥" : day}
                    </div>
                    <span className="text-[9px] text-zinc-400 font-semibold">{day}</span>
                  </div>
                );
              })}
            </div>

            {/* Weekly study minutes checklist */}
            <div className="border-t border-zinc-100 mt-5 pt-4">
              <h4 className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-3">Weekly Study Progress</h4>
              <div className="space-y-2.5">
                {MOCK_SUBJECT_PROGRESS.slice(0, 3).map((sub) => {
                  const totalWeeklyMinutes = sub.weeklyActivity.reduce((sum, act) => sum + act.minutes, 0);
                  return (
                    <div key={sub.subject} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: sub.color }} />
                        <span className="font-medium text-zinc-700">{sub.subject}</span>
                      </div>
                      <span className="font-bold text-zinc-800">{totalWeeklyMinutes} mins</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Misconception Tracker (Weak Topics) */}
          <div className="bg-white border border-zinc-200/60 rounded-2xl p-6 shadow-[0_8px_30px_rgba(120,80,200,0.03)]">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-zinc-900">Weak Topics</h3>
                <p className="text-[11px] text-zinc-500">Misconceptions we are tracking in Socratic dialogs</p>
              </div>
              <AlertTriangle className="w-4 h-4 text-pink-500" />
            </div>

            <div className="space-y-3">
              {MOCK_STUCK_POINTS.map((sp) => {
                const isExpanded = expandedStuckPoint === sp.id;
                return (
                  <div 
                    key={sp.id}
                    className="border border-zinc-100 rounded-xl p-3 hover:border-purple-200/80 hover:bg-purple-50/10 transition-all cursor-pointer group"
                    onClick={() => setExpandedStuckPoint(isExpanded ? null : sp.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${sp.severity === 'deep' ? 'bg-red-500' : 'bg-amber-400'}`} />
                        <h4 className="text-xs font-bold text-zinc-800">{sp.concept}</h4>
                      </div>
                      <span className="text-[9px] text-purple-600 font-bold group-hover:underline">
                        {isExpanded ? "Hide Guidance" : "Resolve"}
                      </span>
                    </div>
                    <p className="text-[10px] text-zinc-500 mt-1 pl-3.5 line-clamp-1">{sp.description}</p>
                    
                    {/* Guidance expansion */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pl-3.5 pt-3 mt-3 border-t border-zinc-100 text-[10px] text-zinc-600 space-y-2 overflow-hidden"
                        >
                          <div className="bg-purple-50 rounded-lg p-2.5 border border-purple-100/50">
                            <span className="font-semibold text-purple-800 block mb-0.5">Socratic Helper Strategy</span>
                            <span>Rather than looking up rules, review leading term variables. Socratic Guide will guide isolates when dividing polynomials.</span>
                          </div>
                          <Link 
                            href="/session"
                            className="inline-flex items-center gap-1 text-[9px] font-bold text-purple-700 hover:text-purple-900 mt-1.5"
                          >
                            <span>Trigger Socratic Practice Session</span>
                            <ChevronRight className="w-3 h-3" />
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Learning Style Card */}
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50/50 border border-purple-100/60 rounded-2xl p-6 shadow-[0_8px_30px_rgba(120,80,200,0.02)]">
            <div className="flex items-center gap-2 mb-3">
              <Brain className="w-4.5 h-4.5 text-purple-700" />
              <h3 className="text-sm font-bold text-purple-900">Cognitive Profile & Insights</h3>
            </div>
            <div className="space-y-3 text-[11px] text-zinc-600 leading-relaxed">
              <p>
                <b>Conceptual Explorer:</b> Aria demonstrates high visual retention, excelling at drawing acceleration maps and balancing electron grids.
              </p>
              <div className="flex items-start gap-2 bg-white/70 border border-purple-100 p-2.5 rounded-xl">
                <Zap className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                <p className="text-[10px]">
                  <b>Recommendation:</b> Tends to bypass intermediate equations in multi-step algebra. ScaffoldAI is prioritizing scaffolding prompts during algebraic coefficient rearrangements.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </AppShell>
  );
}
