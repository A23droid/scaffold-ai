import type {
  StudentProfile,
  TeacherProfile,
  ParentProfile,
  Session,
  StuckPoint,
  SubjectProgress,
  ProgressSnapshot,
  Badge,
  Class,
  Assignment,
  ConceptNode,
  NavSection,
} from "@/types";

// ─── Users ────────────────────────────────────────────────────────────────────

export const MOCK_STUDENT: StudentProfile = {
  id: "student-1",
  name: "Aria Chen",
  email: "aria.chen@school.edu",
  avatar: "/avatars/aria.png",
  role: "student",
  grade: "Grade 9",
  subjects: ["Mathematics", "Physics", "Chemistry", "English"],
  learningGoals: ["Master quadratic equations", "Understand Newton's laws"],
  teacherIds: ["teacher-1"],
  xp: 3480,
  streak: 12,
  level: 7,
  createdAt: "2024-09-01",
};

export const MOCK_TEACHER: TeacherProfile = {
  id: "teacher-1",
  name: "Ms. Priya Sharma",
  email: "p.sharma@school.edu",
  avatar: "/avatars/priya.png",
  role: "teacher",
  subjects: ["Mathematics", "Physics"],
  studentIds: ["student-1", "student-2", "student-3"],
  classIds: ["class-1", "class-2"],
  createdAt: "2023-08-15",
};

export const MOCK_PARENT: ParentProfile = {
  id: "parent-1",
  name: "Wei Chen",
  email: "wei.chen@gmail.com",
  role: "parent",
  childIds: ["student-1"],
  createdAt: "2024-09-01",
};

// ─── Badges ───────────────────────────────────────────────────────────────────

export const MOCK_BADGES: Badge[] = [
  {
    id: "badge-1",
    name: "First Step",
    description: "Complete your first session",
    icon: "🌱",
    color: "#10b981",
    earnedAt: "2024-09-05",
    rarity: "common",
  },
  {
    id: "badge-2",
    name: "Week Warrior",
    description: "7-day learning streak",
    icon: "🔥",
    color: "#f59e0b",
    earnedAt: "2024-09-12",
    rarity: "rare",
  },
  {
    id: "badge-3",
    name: "Unstuck",
    description: "Resolve 10 stuck moments",
    icon: "💡",
    color: "#8b5cf6",
    earnedAt: "2024-10-01",
    rarity: "epic",
  },
  {
    id: "badge-4",
    name: "Deep Diver",
    description: "30-minute unbroken focus session",
    icon: "🌊",
    color: "#3b82f6",
    earnedAt: "2024-10-15",
    rarity: "rare",
  },
];

// ─── Sessions ─────────────────────────────────────────────────────────────────

export const MOCK_RECENT_SESSIONS: Session[] = [
  {
    id: "session-1",
    userId: "student-1",
    subject: "Mathematics",
    topic: "Quadratic Equations",
    mode: "practice",
    status: "completed",
    startedAt: "2024-11-12T14:30:00",
    endedAt: "2024-11-12T15:10:00",
    durationMinutes: 40,
    messages: [],
    stuckPoints: [],
    xpEarned: 120,
    conceptsExplored: ["Factoring", "Quadratic Formula", "Discriminant"],
  },
  {
    id: "session-2",
    userId: "student-1",
    subject: "Physics",
    topic: "Newton's Second Law",
    mode: "explore",
    status: "completed",
    startedAt: "2024-11-11T16:00:00",
    endedAt: "2024-11-11T16:45:00",
    durationMinutes: 45,
    messages: [],
    stuckPoints: [],
    xpEarned: 95,
    conceptsExplored: ["Force", "Mass", "Acceleration", "Free Body Diagrams"],
  },
  {
    id: "session-3",
    userId: "student-1",
    subject: "Chemistry",
    topic: "Periodic Table Trends",
    mode: "review",
    status: "completed",
    startedAt: "2024-11-10T10:00:00",
    endedAt: "2024-11-10T10:30:00",
    durationMinutes: 30,
    messages: [],
    stuckPoints: [],
    xpEarned: 80,
    conceptsExplored: ["Electronegativity", "Atomic Radius"],
  },
  {
    id: "session-4",
    userId: "student-1",
    subject: "Mathematics",
    topic: "Trigonometry Basics",
    mode: "challenge",
    status: "completed",
    startedAt: "2024-11-09T15:00:00",
    endedAt: "2024-11-09T15:50:00",
    durationMinutes: 50,
    messages: [],
    stuckPoints: [],
    xpEarned: 145,
    conceptsExplored: ["SOH-CAH-TOA", "Unit Circle", "Sine & Cosine Graphs"],
  },
];

// ─── Stuck Points ────────────────────────────────────────────────────────────

export const MOCK_STUCK_POINTS: StuckPoint[] = [
  {
    id: "stuck-1",
    sessionId: "session-1",
    userId: "student-1",
    concept: "Completing the Square",
    subject: "Mathematics",
    description: "Confused about how to rearrange terms when leading coefficient ≠ 1",
    severity: "deep",
    relatedConcepts: ["Quadratic Equations", "Algebra Manipulation"],
    timestamp: "2024-11-12T14:52:00",
  },
  {
    id: "stuck-2",
    sessionId: "session-2",
    userId: "student-1",
    concept: "Normal Force",
    subject: "Physics",
    description: "Not sure when normal force equals mg vs when it doesn't",
    severity: "moderate",
    resolvedAt: "2024-11-11T16:30:00",
    relatedConcepts: ["Newton's Laws", "Free Body Diagrams"],
    timestamp: "2024-11-11T16:20:00",
  },
  {
    id: "stuck-3",
    sessionId: "session-3",
    userId: "student-1",
    concept: "Ionization Energy Trend",
    subject: "Chemistry",
    description: "Why does ionization energy dip at certain groups?",
    severity: "mild",
    resolvedAt: "2024-11-10T10:25:00",
    relatedConcepts: ["Periodic Trends", "Electron Configuration"],
    timestamp: "2024-11-10T10:15:00",
  },
];

// ─── Concept Graph Nodes ──────────────────────────────────────────────────────

export const MOCK_CONCEPT_NODES: ConceptNode[] = [
  { id: "cn-1", label: "Algebra", subject: "Mathematics", mastery: 78, stuckCount: 2, connectedTo: ["cn-2", "cn-3"] },
  { id: "cn-2", label: "Quadratic Equations", subject: "Mathematics", mastery: 62, stuckCount: 3, connectedTo: ["cn-1", "cn-4"] },
  { id: "cn-3", label: "Linear Equations", subject: "Mathematics", mastery: 90, stuckCount: 0, connectedTo: ["cn-1"] },
  { id: "cn-4", label: "Completing the Square", subject: "Mathematics", mastery: 35, stuckCount: 5, connectedTo: ["cn-2", "cn-5"] },
  { id: "cn-5", label: "Quadratic Formula", subject: "Mathematics", mastery: 70, stuckCount: 1, connectedTo: ["cn-4"] },
  { id: "cn-6", label: "Newton's Laws", subject: "Physics", mastery: 65, stuckCount: 2, connectedTo: ["cn-7", "cn-8"] },
  { id: "cn-7", label: "Free Body Diagrams", subject: "Physics", mastery: 55, stuckCount: 3, connectedTo: ["cn-6"] },
  { id: "cn-8", label: "Kinematics", subject: "Physics", mastery: 80, stuckCount: 1, connectedTo: ["cn-6"] },
];

// ─── Progress ─────────────────────────────────────────────────────────────────

export const MOCK_SUBJECT_PROGRESS: SubjectProgress[] = [
  {
    subject: "Mathematics",
    color: "#8b5cf6",
    masteryPercent: 68,
    sessionsCount: 24,
    totalMinutes: 860,
    weeklyActivity: [
      { date: "Mon", minutes: 40, sessions: 1, xpEarned: 120 },
      { date: "Tue", minutes: 0, sessions: 0, xpEarned: 0 },
      { date: "Wed", minutes: 55, sessions: 2, xpEarned: 160 },
      { date: "Thu", minutes: 30, sessions: 1, xpEarned: 90 },
      { date: "Fri", minutes: 45, sessions: 1, xpEarned: 135 },
      { date: "Sat", minutes: 20, sessions: 1, xpEarned: 60 },
      { date: "Sun", minutes: 0, sessions: 0, xpEarned: 0 },
    ],
    topConcepts: [
      { concept: "Linear Equations", mastery: 90, lastPracticed: "2024-11-10" },
      { concept: "Quadratic Formula", mastery: 70, lastPracticed: "2024-11-12" },
      { concept: "Factoring", mastery: 65, lastPracticed: "2024-11-12" },
    ],
  },
  {
    subject: "Physics",
    color: "#3b82f6",
    masteryPercent: 54,
    sessionsCount: 16,
    totalMinutes: 620,
    weeklyActivity: [
      { date: "Mon", minutes: 0, sessions: 0, xpEarned: 0 },
      { date: "Tue", minutes: 45, sessions: 1, xpEarned: 95 },
      { date: "Wed", minutes: 0, sessions: 0, xpEarned: 0 },
      { date: "Thu", minutes: 50, sessions: 1, xpEarned: 110 },
      { date: "Fri", minutes: 0, sessions: 0, xpEarned: 0 },
      { date: "Sat", minutes: 35, sessions: 1, xpEarned: 85 },
      { date: "Sun", minutes: 0, sessions: 0, xpEarned: 0 },
    ],
    topConcepts: [
      { concept: "Kinematics", mastery: 80, lastPracticed: "2024-11-09" },
      { concept: "Newton's Laws", mastery: 65, lastPracticed: "2024-11-11" },
      { concept: "Free Body Diagrams", mastery: 55, lastPracticed: "2024-11-11" },
    ],
  },
  {
    subject: "Chemistry",
    color: "#10b981",
    masteryPercent: 71,
    sessionsCount: 12,
    totalMinutes: 420,
    weeklyActivity: [
      { date: "Mon", minutes: 30, sessions: 1, xpEarned: 80 },
      { date: "Tue", minutes: 0, sessions: 0, xpEarned: 0 },
      { date: "Wed", minutes: 0, sessions: 0, xpEarned: 0 },
      { date: "Thu", minutes: 0, sessions: 0, xpEarned: 0 },
      { date: "Fri", minutes: 30, sessions: 1, xpEarned: 80 },
      { date: "Sat", minutes: 0, sessions: 0, xpEarned: 0 },
      { date: "Sun", minutes: 40, sessions: 1, xpEarned: 100 },
    ],
    topConcepts: [
      { concept: "Periodic Trends", mastery: 75, lastPracticed: "2024-11-10" },
      { concept: "Electron Configuration", mastery: 68, lastPracticed: "2024-11-08" },
    ],
  },
];

export const MOCK_PROGRESS_SNAPSHOT: ProgressSnapshot = {
  userId: "student-1",
  periodStart: "2024-11-06",
  periodEnd: "2024-11-12",
  totalSessions: 7,
  totalMinutes: 280,
  xpEarned: 840,
  currentStreak: 12,
  subjectBreakdown: MOCK_SUBJECT_PROGRESS,
  weeklyXp: [
    { week: "Oct W1", xp: 520, goal: 600 },
    { week: "Oct W2", xp: 680, goal: 600 },
    { week: "Oct W3", xp: 590, goal: 600 },
    { week: "Oct W4", xp: 740, goal: 600 },
    { week: "Nov W1", xp: 840, goal: 700 },
  ],
  recentBadges: MOCK_BADGES.slice(2),
};

// ─── Classes ──────────────────────────────────────────────────────────────────

export const MOCK_CLASSES: Class[] = [
  {
    id: "class-1",
    name: "Mathematics 9A",
    subject: "Mathematics",
    teacherId: "teacher-1",
    studentIds: ["student-1", "student-2", "student-3", "student-4"],
    description: "Advanced Grade 9 Mathematics",
    color: "#8b5cf6",
    createdAt: "2024-09-01",
  },
  {
    id: "class-2",
    name: "Physics 9B",
    subject: "Physics",
    teacherId: "teacher-1",
    studentIds: ["student-1", "student-5", "student-6"],
    description: "Grade 9 Physics",
    color: "#3b82f6",
    createdAt: "2024-09-01",
  },
];

export const MOCK_ASSIGNMENTS: Assignment[] = [
  {
    id: "assign-1",
    classId: "class-1",
    title: "Quadratic Equations Practice",
    description: "Complete exercises 3.1–3.5 using ScaffoldAI",
    dueDate: "2024-11-20",
    subject: "Mathematics",
    topics: ["Quadratic Equations", "Factoring", "Quadratic Formula"],
    status: "published",
    completionRate: 62,
  },
  {
    id: "assign-2",
    classId: "class-2",
    title: "Newton's Laws Review",
    description: "Review sessions on all three laws, focus on FBDs",
    dueDate: "2024-11-18",
    subject: "Physics",
    topics: ["Newton's Laws", "Free Body Diagrams"],
    status: "published",
    completionRate: 45,
  },
];

// ─── Navigation ───────────────────────────────────────────────────────────────

export const STUDENT_NAV_SECTIONS: NavSection[] = [
  {
    id: "main",
    items: [
      { id: "dashboard", label: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
      { id: "stuck-map", label: "Stuck Map", href: "/stuck-map", icon: "Map" },
      { id: "history", label: "History", href: "/history", icon: "Clock" },
    ],
  },
  {
    id: "secondary",
    label: "Account",
    items: [
      { id: "settings", label: "Settings", href: "/settings", icon: "Settings" },
    ],
  },
];

export const TEACHER_NAV_SECTIONS: NavSection[] = [
  {
    id: "main",
    items: [
      { id: "teacher", label: "Overview", href: "/teacher", icon: "LayoutDashboard" },
      { id: "classes", label: "My Classes", href: "/teacher/classes", icon: "Users" },
      { id: "assignments", label: "Assignments", href: "/teacher/assignments", icon: "ClipboardList" },
      { id: "stuck-insights", label: "Stuck Insights", href: "/teacher/stuck-insights", icon: "AlertTriangle" },
    ],
  },
  {
    id: "secondary",
    label: "Account",
    items: [
      { id: "settings", label: "Settings", href: "/settings", icon: "Settings" },
    ],
  },
];

export const PARENT_NAV_SECTIONS: NavSection[] = [
  {
    id: "main",
    items: [
      { id: "parent", label: "Overview", href: "/parent", icon: "LayoutDashboard" },
      { id: "progress", label: "Progress", href: "/parent/progress", icon: "TrendingUp" },
    ],
  },
  {
    id: "secondary",
    label: "Account",
    items: [
      { id: "settings", label: "Settings", href: "/settings", icon: "Settings" },
    ],
  },
];

// ─── Subjects ─────────────────────────────────────────────────────────────────

export const SUBJECTS = [
  { id: "math", label: "Mathematics", icon: "∑", color: "#8b5cf6" },
  { id: "physics", label: "Physics", icon: "⚡", color: "#3b82f6" },
  { id: "chemistry", label: "Chemistry", icon: "⚗️", color: "#10b981" },
  { id: "biology", label: "Biology", icon: "🧬", color: "#f59e0b" },
  { id: "english", label: "English", icon: "✍️", color: "#ef4444" },
  { id: "history", label: "History", icon: "🏛️", color: "#6366f1" },
];

// ─── Session Modes ────────────────────────────────────────────────────────────

export const SESSION_MODES = [
  {
    id: "explore",
    label: "Explore",
    description: "Discover new concepts with guided questions",
    icon: "Compass",
    color: "#8b5cf6",
  },
  {
    id: "practice",
    label: "Practice",
    description: "Work through problems with AI support",
    icon: "PenLine",
    color: "#3b82f6",
  },
  {
    id: "review",
    label: "Review",
    description: "Revisit and reinforce what you've learned",
    icon: "RefreshCw",
    color: "#10b981",
  },
  {
    id: "challenge",
    label: "Challenge",
    description: "Push your limits with harder problems",
    icon: "Zap",
    color: "#f59e0b",
  },
];
