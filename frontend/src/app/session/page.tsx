"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  ChevronRight, 
  HelpCircle, 
  CheckCircle2, 
  AlertTriangle, 
  Target, 
  TrendingUp, 
  Clock, 
  ArrowLeft,
  ArrowRight,
  Info,
  Check,
  RotateCcw
} from "lucide-react";

import { AppShell } from "@/components/layout/AppShell";

export default function SessionPage() {
  // Input fields for the two factors
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [reflectionText, setReflectionText] = useState("");
  
  // Interactive states
  const [verificationState, setVerificationState] = useState<"idle" | "correct" | "incorrect">("idle");
  const [activeHintLevel, setActiveHintLevel] = useState<1 | 2 | 3 | 4>(1);
  const [sessionCompleted, setSessionCompleted] = useState(false);

  // Validate the student's response
  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const val1 = parseInt(num1.trim());
    const val2 = parseInt(num2.trim());

    // Correct pairs are (-2 and -3) or (-3 and -2)
    if ((val1 === -2 && val2 === -3) || (val1 === -3 && val2 === -2)) {
      setVerificationState("correct");
    } else {
      setVerificationState("incorrect");
      // Prompt user to check hints
      if (activeHintLevel < 4) {
        setActiveHintLevel((prev) => (prev + 1) as 1 | 2 | 3 | 4);
      }
    }
  };

  const handleReset = () => {
    setNum1("");
    setNum2("");
    setVerificationState("idle");
  };

  // Stepped Hint Data
  const hints = {
    1: {
      title: "Level 1: Question Analysis",
      content: "Which two numbers multiply to positive 6 and add to negative 5?"
    },
    2: {
      title: "Level 2: Sign Alignment",
      content: "Since the product (+6) is positive, the signs of both numbers must be the same. Since the sum (-5) is negative, both numbers must be negative. Look for two negative integers."
    },
    3: {
      title: "Level 3: Factoring Rule",
      content: "To factor a trinomial x² + bx + c, find two integers p and q such that p * q = c and p + q = b. Here, c = 6 and b = -5."
    },
    4: {
      title: "Level 4: Concrete Steps",
      content: "List the factor pairs of 6: (1, 6) and (2, 3). Since they must sum to -5 when both are negative: -1 + (-6) = -7 (incorrect), and -2 + (-3) = -5 (correct!). Try inputting these values."
    }
  };

  return (
    <AppShell headerTitle="Socratic Session" headerSubtitle="Trinomial Factoring Focus" fullBleed={true}>
      
      {/* Background Soft Glow Accents */}
      <div className="absolute top-12 left-1/4 w-[500px] h-[500px] bg-purple-300/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] bg-pink-300/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Main Workspace layout split into Main Area (left) and Sidebar (right) */}
      <div className="min-h-[calc(100vh-80px)] flex flex-col lg:flex-row relative z-10">
        
        {/* LEFT / MAIN WORKSPACE AREA (2/3 width) */}
        <div className="flex-1 p-6 md:p-10 lg:p-14 max-w-4xl mx-auto w-full space-y-8">
          
          {/* Header breadcrumb */}
          <div className="flex items-center gap-2">
            <Link 
              href="/dashboard" 
              className="inline-flex items-center gap-1.5 text-zinc-500 hover:text-zinc-950 text-xs font-semibold group transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Dashboard</span>
            </Link>
            <span className="text-zinc-300">/</span>
            <span className="text-xs text-purple-600 font-semibold uppercase tracking-wider">Session Workspace</span>
          </div>

          {/* Worksheet Main Paper Card */}
          <div className="bg-white border border-zinc-200/60 rounded-3xl p-6 md:p-10 shadow-[0_16px_40px_rgba(120,80,200,0.04)] space-y-8 relative overflow-hidden">
            
            {/* Soft decorative accent */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-100/30 rounded-bl-full pointer-events-none" />

            {/* Active Question Title */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest block">Active Equation Workspace</span>
              <h1 
                className="text-4xl md:text-5xl font-light text-[#2c2235] tracking-tight py-1"
                style={{ fontFamily: 'var(--font-serif-editorial)' }}
              >
                Solve x² - 5x + 6 = 0
              </h1>
            </div>

            {/* Socratic Diagnosis Banner */}
            <div className="flex items-start gap-3 p-4 bg-purple-50/60 border border-purple-100/50 rounded-2xl">
              <Sparkles className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700">Diagnosis Insight</span>
                <p className="text-xs text-zinc-650 leading-relaxed">
                  Possible struggle with factorization. Rather than using quadratic formulas directly, let's break this down using standard factoring decomposition.
                </p>
              </div>
            </div>

            {/* Guided Question Section */}
            <div className="space-y-4 pt-2">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Guided Question</span>
                <h3 className="text-lg font-bold text-zinc-800 leading-tight">
                  Which two numbers multiply to 6 and add to -5?
                </h3>
              </div>

              {/* Student Response Area */}
              <AnimatePresence mode="wait">
                {verificationState !== "correct" ? (
                  <motion.form 
                    key="input-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleVerify}
                    className="space-y-4 max-w-md"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex-1 space-y-1.5">
                        <label className="text-[10px] font-semibold text-zinc-450 uppercase">First Integer</label>
                        <input 
                          type="number" 
                          placeholder="e.g. -2" 
                          value={num1}
                          onChange={(e) => setNum1(e.target.value)}
                          className="w-full bg-zinc-50 border border-zinc-200/80 rounded-xl px-4 py-3 text-sm font-semibold focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all text-zinc-800 placeholder-zinc-350"
                          required
                          disabled={verificationState === "correct"}
                        />
                      </div>
                      <span className="text-zinc-350 font-bold self-end pb-3.5">&</span>
                      <div className="flex-1 space-y-1.5">
                        <label className="text-[10px] font-semibold text-zinc-450 uppercase">Second Integer</label>
                        <input 
                          type="number" 
                          placeholder="e.g. -3" 
                          value={num2}
                          onChange={(e) => setNum2(e.target.value)}
                          className="w-full bg-zinc-50 border border-zinc-200/80 rounded-xl px-4 py-3 text-sm font-semibold focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all text-zinc-800 placeholder-zinc-350"
                          required
                          disabled={verificationState === "correct"}
                        />
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button 
                        type="submit" 
                        className="bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-95 text-white font-bold text-xs px-6 py-3 rounded-full shadow-md active:scale-98 transition-all"
                      >
                        Verify Factors
                      </button>
                      
                      {verificationState === "incorrect" && (
                        <button 
                          type="button"
                          onClick={handleReset}
                          className="border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-650 font-bold text-xs px-5 py-3 rounded-full transition-all flex items-center gap-1.5"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Clear</span>
                        </button>
                      )}
                    </div>

                    {verificationState === "incorrect" && (
                      <motion.div 
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-start gap-2 text-rose-600 text-[11px] font-semibold"
                      >
                        <AlertTriangle className="w-4 h-4 shrink-0" />
                        <span>Those numbers don't multiply to 6 and add to -5. Adaptive hints have advanced to guide you!</span>
                      </motion.div>
                    )}
                  </motion.form>
                ) : (
                  <motion.div 
                    key="correct-prompt"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-6 max-w-2xl bg-emerald-50/30 border border-emerald-100/70 p-6 rounded-2xl"
                  >
                    <div className="flex items-center gap-2.5 text-emerald-700 font-bold text-sm">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-100" />
                      <span>Factors are correct: (x - 2)(x - 3) = 0. Therefore, x = 2 and x = 3.</span>
                    </div>

                    {/* Socratic Reflection Box unlocked */}
                    <div className="space-y-3 pt-2 border-t border-emerald-100/50">
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wider block">Meta-Cognitive Reflection</span>
                        <h4 className="text-sm font-bold text-zinc-800">
                          What helped you recognize the correct negative factors?
                        </h4>
                      </div>
                      <textarea
                        rows={3}
                        placeholder="Write down your logical reasoning (e.g. looking at signs, factors of 6)..."
                        value={reflectionText}
                        onChange={(e) => setReflectionText(e.target.value)}
                        className="w-full bg-white border border-zinc-200/80 rounded-xl p-3.5 text-xs focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all text-zinc-800 leading-relaxed"
                        disabled={sessionCompleted}
                      />
                      
                      <div className="flex gap-3 pt-1">
                        {!sessionCompleted ? (
                          <button
                            onClick={() => setSessionCompleted(true)}
                            className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-6 py-2.5 rounded-full shadow-md active:scale-98 transition-all flex items-center gap-1.5"
                            disabled={!reflectionText.trim()}
                          >
                            <span>Save Reflection & Complete</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          <div className="space-y-3 w-full">
                            <div className="flex items-center gap-2 text-purple-700 font-bold text-xs">
                              <Check className="w-4 h-4 text-purple-600" />
                              <span>Session completion record saved successfully! +120 XP added.</span>
                            </div>
                            <Link
                              href="/dashboard"
                              className="inline-flex items-center gap-1.5 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold text-xs px-6 py-2.5 rounded-full shadow-md active:scale-98 hover:opacity-95 transition-all"
                            >
                              <span>Return to Dashboard</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Adaptive Hint Progression Widget */}
            <div className="border-t border-zinc-100 pt-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Adaptive Hint Progression</span>
                
                {/* Steps Selector */}
                <div className="flex bg-zinc-100 p-0.5 rounded-lg text-xs font-semibold self-start sm:self-auto">
                  {([1, 2, 3, 4] as const).map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setActiveHintLevel(lvl)}
                      className={`px-3 py-1 rounded-md transition-all text-[10px] uppercase tracking-wider ${
                        activeHintLevel === lvl ? 'bg-white text-purple-700 shadow-xs' : 'text-zinc-500 hover:text-zinc-900'
                      }`}
                    >
                      Level {lvl}
                    </button>
                  ))}
                </div>
              </div>

              {/* Hint Content display */}
              <div className="bg-slate-50/50 border border-zinc-100 rounded-2xl p-5 space-y-1.5 transition-all">
                <div className="flex items-center gap-1.5 text-purple-700 font-bold text-xs">
                  <Info className="w-3.5 h-3.5" />
                  <span>{hints[activeHintLevel].title}</span>
                </div>
                <p className="text-zinc-600 text-xs leading-relaxed">
                  {hints[activeHintLevel].content}
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* RIGHT SIDEBAR PANEL (1/3 width) */}
        <div className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-zinc-200/60 bg-white/40 p-6 md:p-8 space-y-6 shrink-0">
          
          {/* Current Topic details */}
          <div className="bg-white border border-zinc-200/50 rounded-2xl p-5 shadow-xs space-y-3">
            <div>
              <span className="text-[9px] font-bold text-purple-600 uppercase tracking-widest block">Focus Unit</span>
              <h3 className="text-base font-bold text-zinc-800">Quadratic Factoring</h3>
              <p className="text-[10px] text-zinc-400 font-medium">Algebra • Grade 9 Core</p>
            </div>
            <p className="text-[11px] text-zinc-655 leading-relaxed">
              Decompose trinomial formulas into twin linear factors to identify coordinate intercepts.
            </p>
          </div>

          {/* Confidence Score Radial Dial */}
          <div className="bg-white border border-zinc-200/50 rounded-2xl p-5 shadow-xs flex flex-col items-center text-center">
            <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider mb-3 block self-start">Topic Mastery Progress</span>
            
            <div className="relative w-28 h-28 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="56" cy="56" r="48" className="stroke-zinc-100 fill-none" strokeWidth="6.5" />
                <circle cx="56" cy="56" r="48" className="stroke-purple-600 fill-none" strokeWidth="6.5" strokeDasharray="301" strokeDashoffset={301 - (301 * 68) / 100} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-extrabold text-zinc-800">68%</span>
                <span className="text-[8px] uppercase tracking-wider text-zinc-450 font-bold mt-0.5">Confidence</span>
              </div>
            </div>
            
            <div className="flex items-center gap-1 text-[10px] text-emerald-500 font-bold mt-3">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Syllabus pacing is optimal</span>
            </div>
          </div>

          {/* Misconceptions tracked in this module */}
          <div className="bg-white border border-zinc-200/50 rounded-2xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider">Misconceptions</span>
              <AlertTriangle className="w-3.5 h-3.5 text-pink-500" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-[10.5px]">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-zinc-700 font-semibold">Leading Coefficient</span>
                </div>
                <span className="text-[8px] bg-emerald-100 text-emerald-800 px-1.5 rounded font-bold uppercase">Resolved</span>
              </div>
              
              <div className="flex items-center justify-between text-[10.5px]">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span className="text-zinc-700 font-semibold">Sign Alignment</span>
                </div>
                <span className="text-[8px] bg-amber-100 text-amber-800 px-1.5 rounded font-bold uppercase">Active</span>
              </div>
            </div>
          </div>

          {/* Worksheet Steps Timeline */}
          <div className="bg-white border border-zinc-200/50 rounded-2xl p-5 shadow-xs space-y-4">
            <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider block">Session Progress</span>
            
            <div className="space-y-3.5 relative pl-3.5 border-l border-zinc-100 ml-1.5">
              {/* Step 1 */}
              <div className="relative text-[10px]">
                <div className="absolute -left-[18.5px] top-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-white" />
                <div className="font-semibold text-zinc-500">Step 1: Analyze Trinomial</div>
                <p className="text-[9px] text-zinc-400">Identify variables a, b, and c</p>
              </div>

              {/* Step 2 */}
              <div className="relative text-[10px]">
                <div className={`absolute -left-[18.5px] top-0.5 w-2.5 h-2.5 rounded-full border border-white ${
                  verificationState === 'correct' ? 'bg-emerald-500' : 'bg-purple-600 ring-2 ring-purple-100'
                }`} />
                <div className={`font-semibold ${verificationState === 'correct' ? 'text-zinc-500' : 'text-zinc-800'}`}>
                  Step 2: Factor Identification
                </div>
                <p className="text-[9px] text-zinc-400">Match product and sum properties</p>
              </div>

              {/* Step 3 */}
              <div className="relative text-[10px]">
                <div className={`absolute -left-[18.5px] top-0.5 w-2.5 h-2.5 rounded-full border border-white ${
                  sessionCompleted ? 'bg-emerald-500' : verificationState === 'correct' ? 'bg-purple-600 ring-2 ring-purple-100' : 'bg-zinc-200'
                }`} />
                <div className={`font-semibold ${
                  sessionCompleted ? 'text-zinc-500' : verificationState === 'correct' ? 'text-zinc-850' : 'text-zinc-400'
                }`}>
                  Step 3: Socratic Reflection
                </div>
                <p className="text-[9px] text-zinc-400">Log meta-cognitive learning triggers</p>
              </div>

              {/* Step 4 */}
              <div className="relative text-[10px]">
                <div className={`absolute -left-[18.5px] top-0.5 w-2.5 h-2.5 rounded-full border border-white ${
                  sessionCompleted ? 'bg-purple-650' : 'bg-zinc-200'
                }`} />
                <div className={`font-semibold ${sessionCompleted ? 'text-zinc-800 font-bold' : 'text-zinc-400'}`}>
                  Step 4: Completion
                </div>
                <p className="text-[9px] text-zinc-400">Update syllabus confidence levels</p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </AppShell>
  );
}
