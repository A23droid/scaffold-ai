import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Integer, Float, ForeignKey, DateTime, Enum, JSON, Boolean
from sqlalchemy.orm import relationship
from app.db.base import Base
import enum

def generate_uuid():
    return str(uuid.uuid4())

def utc_now():
    return datetime.now(timezone.utc)

class UserRole(str, enum.Enum):
    STUDENT = "STUDENT"
    TEACHER = "TEACHER"
    PARENT = "PARENT"

class LearningPace(str, enum.Enum):
    SLOW = "SLOW"
    MEDIUM = "MEDIUM"
    FAST = "FAST"

class InputType(str, enum.Enum):
    TEXT = "TEXT"
    IMAGE = "IMAGE"
    PDF = "PDF"

class SessionStatus(str, enum.Enum):
    ACTIVE = "ACTIVE"
    COMPLETED = "COMPLETED"

class RoleType(str, enum.Enum):
    USER = "USER"
    AI = "AI"

class UnderstandingLevel(str, enum.Enum):
    NONE = "NONE"
    PARTIAL = "PARTIAL"
    GOOD = "GOOD"

class StrictnessLevel(str, enum.Enum):
    HINT_ONLY = "HINT_ONLY"
    GUIDED = "GUIDED"
    REVIEW = "REVIEW"

class AttachmentType(str, enum.Enum):
    IMAGE = "IMAGE"
    PDF = "PDF"

class ConceptStatus(str, enum.Enum):
    KNOWN = "KNOWN"
    PARTIAL = "PARTIAL"
    UNKNOWN = "UNKNOWN"
    MISCONCEPTION = "MISCONCEPTION"

class SessionIntent(str, enum.Enum):
    PROBLEM_SOLVING = "PROBLEM_SOLVING"
    CONCEPT_UNDERSTANDING = "CONCEPT_UNDERSTANDING"
    GENERAL = "GENERAL"

class User(Base):
    __tablename__ = "users"
    id = Column(String, primary_key=True, default=generate_uuid)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=True) # Added for NextAuth credentials
    image = Column(String, nullable=True)
    role = Column(Enum(UserRole), nullable=False)
    createdAt = Column(DateTime(timezone=True), default=utc_now)
    updatedAt = Column(DateTime(timezone=True), default=utc_now, onupdate=utc_now)

    student_profile = relationship("StudentProfile", back_populates="user", uselist=False)
    teacher_profile = relationship("TeacherProfile", back_populates="user", uselist=False)
    parent_profile = relationship("ParentProfile", back_populates="user", uselist=False)

class StudentProfile(Base):
    __tablename__ = "student_profiles"
    id = Column(String, primary_key=True, default=generate_uuid)
    userId = Column(String, ForeignKey("users.id", ondelete="CASCADE"), unique=True)
    grade = Column(String)
    board = Column(String)
    preferredLanguage = Column(String)
    learningPace = Column(Enum(LearningPace), default=LearningPace.MEDIUM)
    streak = Column(Integer, default=0)
    xp = Column(Integer, default=0)
    createdAt = Column(DateTime(timezone=True), default=utc_now)
    lastActiveAt = Column(DateTime(timezone=True), nullable=True)

    user = relationship("User", back_populates="student_profile")
    parents = relationship("ParentStudent", back_populates="student")
    sessions = relationship("Session", back_populates="student")
    misconceptions = relationship("StudentMisconception", back_populates="student")
    concept_masteries = relationship("StudentConceptMastery", back_populates="student")

class TeacherProfile(Base):
    __tablename__ = "teacher_profiles"
    id = Column(String, primary_key=True, default=generate_uuid)
    userId = Column(String, ForeignKey("users.id", ondelete="CASCADE"), unique=True)
    school = Column(String)
    subjects = Column(JSON) # JSON array of subjects
    createdAt = Column(DateTime(timezone=True), default=utc_now)

    user = relationship("User", back_populates="teacher_profile")
    assignments = relationship("Assignment", back_populates="teacher")

class ParentProfile(Base):
    __tablename__ = "parent_profiles"
    id = Column(String, primary_key=True, default=generate_uuid)
    userId = Column(String, ForeignKey("users.id", ondelete="CASCADE"), unique=True)
    createdAt = Column(DateTime(timezone=True), default=utc_now)

    user = relationship("User", back_populates="parent_profile")
    children = relationship("ParentStudent", back_populates="parent")

class ParentStudent(Base):
    __tablename__ = "parent_students"
    id = Column(String, primary_key=True, default=generate_uuid)
    parentId = Column(String, ForeignKey("parent_profiles.id", ondelete="CASCADE"))
    studentId = Column(String, ForeignKey("student_profiles.id", ondelete="CASCADE"))

    parent = relationship("ParentProfile", back_populates="children")
    student = relationship("StudentProfile", back_populates="parents")

class Assignment(Base):
    __tablename__ = "assignments"
    id = Column(String, primary_key=True, default=generate_uuid)
    teacherId = Column(String, ForeignKey("teacher_profiles.id", ondelete="CASCADE"))
    title = Column(String)
    subject = Column(String)
    description = Column(String)
    strictness = Column(String)
    dueDate = Column(DateTime(timezone=True))
    createdAt = Column(DateTime(timezone=True), default=utc_now)

    teacher = relationship("TeacherProfile", back_populates="assignments")

class Session(Base):
    __tablename__ = "sessions"
    id = Column(String, primary_key=True, default=generate_uuid)
    studentId = Column(String, ForeignKey("student_profiles.id", ondelete="CASCADE"))
    assignmentId = Column(String, ForeignKey("assignments.id", ondelete="SET NULL"), nullable=True)
    title = Column(String)
    subject = Column(String)
    topic = Column(String)
    subtopic = Column(String)
    intent = Column(Enum(SessionIntent, native_enum=False), default=SessionIntent.GENERAL)
    inputType = Column(Enum(InputType))
    status = Column(Enum(SessionStatus), default=SessionStatus.ACTIVE)
    createdAt = Column(DateTime(timezone=True), default=utc_now)
    completedAt = Column(DateTime(timezone=True), nullable=True)

    student = relationship("StudentProfile", back_populates="sessions")
    messages = relationship("SessionMessage", back_populates="session")
    diagnoses = relationship("SessionDiagnosis", back_populates="session")
    insights = relationship("SessionInsight", back_populates="session")
    attachments = relationship("Attachment", back_populates="session")

class SessionMessage(Base):
    __tablename__ = "session_messages"
    id = Column(String, primary_key=True, default=generate_uuid)
    sessionId = Column(String, ForeignKey("sessions.id", ondelete="CASCADE"))
    role = Column(Enum(RoleType))
    content = Column(String)
    createdAt = Column(DateTime(timezone=True), default=utc_now)

    session = relationship("Session", back_populates="messages")

class SessionDiagnosis(Base):
    __tablename__ = "session_diagnoses"
    id = Column(String, primary_key=True, default=generate_uuid)
    sessionId = Column(String, ForeignKey("sessions.id", ondelete="CASCADE"))
    understandingLevel = Column(Enum(UnderstandingLevel))
    misconceptionType = Column(String)
    confidence = Column(Float)
    createdAt = Column(DateTime(timezone=True), default=utc_now)

    session = relationship("Session", back_populates="diagnoses")

class MisconceptionMaster(Base):
    __tablename__ = "misconception_master"
    id = Column(String, primary_key=True, default=generate_uuid)
    subject = Column(String)
    topic = Column(String)
    concept = Column(String)
    code = Column(String, unique=True, index=True)
    name = Column(String)
    description = Column(String)

    student_misconceptions = relationship("StudentMisconception", back_populates="misconception")

class StudentMisconception(Base):
    __tablename__ = "student_misconceptions"
    id = Column(String, primary_key=True, default=generate_uuid)
    studentId = Column(String, ForeignKey("student_profiles.id", ondelete="CASCADE"))
    misconceptionId = Column(String, ForeignKey("misconception_master.id", ondelete="CASCADE"))
    concept = Column(String)
    frequency = Column(Integer, default=0)
    lastSeenAt = Column(DateTime(timezone=True), default=utc_now)
    masteryScore = Column(Float, default=0.0)

    student = relationship("StudentProfile", back_populates="misconceptions")
    misconception = relationship("MisconceptionMaster", back_populates="student_misconceptions")

class SessionInsight(Base):
    __tablename__ = "session_insights"
    id = Column(String, primary_key=True, default=generate_uuid)
    sessionId = Column(String, ForeignKey("sessions.id", ondelete="CASCADE"))
    strength = Column(String)
    weakness = Column(String)
    recommendation = Column(String)

    session = relationship("Session", back_populates="insights")

class TeacherSettings(Base):
    __tablename__ = "teacher_settings"
    id = Column(String, primary_key=True, default=generate_uuid)
    teacherId = Column(String, ForeignKey("teacher_profiles.id", ondelete="CASCADE"))
    assignmentId = Column(String, ForeignKey("assignments.id", ondelete="CASCADE"), nullable=True)
    strictness = Column(Enum(StrictnessLevel), default=StrictnessLevel.GUIDED)
    allowPrerequisites = Column(Boolean, default=True)

class StudentConceptMastery(Base):
    __tablename__ = "student_concept_mastery"
    id = Column(String, primary_key=True, default=generate_uuid)
    studentId = Column(String, ForeignKey("student_profiles.id", ondelete="CASCADE"))
    subject = Column(String)
    topic = Column(String)
    concept = Column(String)
    status = Column(Enum(ConceptStatus, native_enum=False), default=ConceptStatus.UNKNOWN)
    attempts = Column(Integer, default=0)
    updatedAt = Column(DateTime(timezone=True), default=utc_now, onupdate=utc_now)

    student = relationship("StudentProfile", back_populates="concept_masteries")

class Attachment(Base):
    __tablename__ = "attachments"
    id = Column(String, primary_key=True, default=generate_uuid)
    sessionId = Column(String, ForeignKey("sessions.id", ondelete="CASCADE"))
    type = Column(Enum(AttachmentType))
    url = Column(String)

    session = relationship("Session", back_populates="attachments")
