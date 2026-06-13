// ─── User & Auth ─────────────────────────────────────────────────────────────

export type UserRole = "student" | "teacher" | "parent";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  grade?: string;
  school?: string;
  createdAt: string;
}

export interface StudentProfile extends User {
  role: "student";
  grade: string;
  subjects: string[];
  learningGoals: string[];
  parentId?: string;
  teacherIds: string[];
  xp: number;
  streak: number;
  level: number;
}

export interface TeacherProfile extends User {
  role: "teacher";
  subjects: string[];
  studentIds: string[];
  classIds: string[];
}

export interface ParentProfile extends User {
  role: "parent";
  childIds: string[];
}

// ─── Navigation ──────────────────────────────────────────────────────────────

export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: string;
  badge?: string | number;
  roles?: UserRole[];
  isExternal?: boolean;
}

export interface NavSection {
  id: string;
  label?: string;
  items: NavItem[];
}

// ─── Sessions ─────────────────────────────────────────────────────────────────

export type SessionStatus = "active" | "completed" | "paused" | "abandoned";
export type SessionMode = "explore" | "practice" | "review" | "challenge";

export interface Session {
  id: string;
  userId: string;
  subject: string;
  topic: string;
  mode: SessionMode;
  status: SessionStatus;
  startedAt: string;
  endedAt?: string;
  durationMinutes?: number;
  messages: ChatMessage[];
  stuckPoints: StuckPoint[];
  xpEarned?: number;
  conceptsExplored: string[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  type?: "text" | "hint" | "explanation" | "quiz" | "encouragement";
  attachments?: Attachment[];
}

export interface Attachment {
  id: string;
  type: "image" | "equation" | "diagram" | "code";
  url?: string;
  content?: string;
}

// ─── Stuck Map ────────────────────────────────────────────────────────────────

export interface StuckPoint {
  id: string;
  sessionId: string;
  userId: string;
  concept: string;
  subject: string;
  description: string;
  severity: "mild" | "moderate" | "deep";
  resolvedAt?: string;
  relatedConcepts: string[];
  timestamp: string;
}

export interface ConceptNode {
  id: string;
  label: string;
  subject: string;
  mastery: number; // 0–100
  stuckCount: number;
  connectedTo: string[];
  x?: number;
  y?: number;
}

// ─── Progress & Analytics ─────────────────────────────────────────────────────

export interface SubjectProgress {
  subject: string;
  color: string;
  masteryPercent: number;
  sessionsCount: number;
  totalMinutes: number;
  weeklyActivity: DayActivity[];
  topConcepts: ConceptMastery[];
}

export interface DayActivity {
  date: string;
  minutes: number;
  sessions: number;
  xpEarned: number;
}

export interface ConceptMastery {
  concept: string;
  mastery: number;
  lastPracticed: string;
}

export interface ProgressSnapshot {
  userId: string;
  periodStart: string;
  periodEnd: string;
  totalSessions: number;
  totalMinutes: number;
  xpEarned: number;
  currentStreak: number;
  subjectBreakdown: SubjectProgress[];
  weeklyXp: WeeklyXp[];
  recentBadges: Badge[];
}

export interface WeeklyXp {
  week: string;
  xp: number;
  goal: number;
}

// ─── Gamification ─────────────────────────────────────────────────────────────

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  earnedAt?: string;
  rarity: "common" | "rare" | "epic" | "legendary";
}

export interface Achievement {
  id: string;
  badge: Badge;
  userId: string;
  earnedAt: string;
}

// ─── Classes & Assignments ────────────────────────────────────────────────────

export interface Class {
  id: string;
  name: string;
  subject: string;
  teacherId: string;
  studentIds: string[];
  description?: string;
  color: string;
  createdAt: string;
}

export interface Assignment {
  id: string;
  classId: string;
  title: string;
  description: string;
  dueDate: string;
  subject: string;
  topics: string[];
  status: "draft" | "published" | "closed";
  completionRate?: number;
}

// ─── Settings ────────────────────────────────────────────────────────────────

export interface UserSettings {
  theme: "light" | "dark" | "system";
  notifications: NotificationSettings;
  learning: LearningSettings;
  privacy: PrivacySettings;
}

export interface NotificationSettings {
  emailDigest: boolean;
  sessionReminders: boolean;
  achievementAlerts: boolean;
  parentReports: boolean;
}

export interface LearningSettings {
  dailyGoalMinutes: number;
  preferredDifficulty: "adaptive" | "easy" | "medium" | "hard";
  hintFrequency: "often" | "sometimes" | "rarely";
  voiceEnabled: boolean;
}

export interface PrivacySettings {
  shareProgressWithTeacher: boolean;
  shareProgressWithParent: boolean;
  showInLeaderboard: boolean;
}

// ─── UI State ─────────────────────────────────────────────────────────────────

export interface SidebarState {
  isOpen: boolean;
  isMobileOpen: boolean;
  isCollapsed: boolean;
}

export interface ThemeState {
  theme: "light" | "dark" | "system";
  resolvedTheme: "light" | "dark";
}

// ─── API Shapes ───────────────────────────────────────────────────────────────

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}
