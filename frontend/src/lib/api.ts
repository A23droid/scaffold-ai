const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...options?.headers },
    ...options,
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error((error as any).detail || `API error ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export interface StudentListItem {
  id: string;
  name: string;
  email: string;
}

export async function apiGetStudents(parentEmail?: string) {
  const query = parentEmail ? `?parent_email=${encodeURIComponent(parentEmail)}` : "";
  return apiFetch<StudentListItem[]>(`/students${query}`);
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role?: string;
}

export function apiRegister(payload: RegisterPayload) {
  return apiFetch<{ id: string; role: string }>("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

// ─── Student ──────────────────────────────────────────────────────────────────

export const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export interface StudentProfileData {
  id: string;
  userId: string;
  name: string;
  email: string;
  grade: string | null;
  board: string | null;
  preferredLanguage: string;
  learningPace: string | null;
  xp: number;
  streak: number;
  level: number;
  parentEmails: string | null;
}

export function apiGetStudentProfile(studentProfileId: string) {
  return apiFetch<StudentProfileData>(`/students/${studentProfileId}/profile`);
}

export function apiUpdateStudentProfile(studentProfileId: string, updates: Partial<StudentProfileData>) {
  return apiFetch<{ status: string }>(`/students/${studentProfileId}/profile`, {
    method: "PATCH",
    body: JSON.stringify(updates),
  });
}

export interface HeatmapData {
  id: string;
  date: string;
  level: number;
}

export function apiGetActivityHeatmap(studentProfileId: string) {
  return apiFetch<HeatmapData[]>(`/students/${studentProfileId}/activity-heatmap`);
}

export interface TrajectoryData {
  name: string;
  mastery: number;
  sessions: number;
}

export function apiGetTrajectory(studentProfileId: string) {
  return apiFetch<TrajectoryData[]>(`/students/${studentProfileId}/trajectory`);
}

export interface SessionData {
  id: string;
  subject: string | null;
  topic: string | null;
  status: string;
  intent: string | null;
  createdAt: string | null;
  completedAt: string | null;
}

export function apiGetStudentSessions(studentProfileId: string) {
  return apiFetch<SessionData[]>(`/students/${studentProfileId}/sessions`);
}

export interface ConceptMasteryData {
  id: string;
  subject: string;
  topic: string;
  concept: string;
  status: "KNOWN" | "PARTIAL" | "UNKNOWN" | "MISCONCEPTION";
  attempts: number;
  updatedAt: string | null;
}

export function apiGetStudentConcepts(studentProfileId: string) {
  return apiFetch<ConceptMasteryData[]>(`/students/${studentProfileId}/concepts`);
}

export interface MisconceptionData {
  id: string;
  concept: string | null;
  frequency: number;
  lastSeenAt: string | null;
  misconceptionName: string | null;
  misconceptionDescription: string | null;
}

export function apiGetStudentMisconceptions(studentProfileId: string) {
  return apiFetch<MisconceptionData[]>(`/students/${studentProfileId}/misconceptions`);
}

// ─── Chat ─────────────────────────────────────────────────────────────────────

export interface ChatPayload {
  message: string;
  session_id: string;
  student_id: string;
}

export interface ChatResponseData {
  response: string;
  diagnosis?: any;
  next_stage?: string;
  concept_states?: Record<string, string>;
}

export function apiChat(payload: ChatPayload) {
  return apiFetch<ChatResponseData>("/chat", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
