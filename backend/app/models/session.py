from pydantic import BaseModel, Field
from typing import Optional, List

class CurrentSessionContext(BaseModel):
    problem: str = Field(description="The specific problem or doubt the student has raised")
    subject: Optional[str] = Field(default=None, description="The subject of the problem, e.g., 'Math', 'Physics'")
    topic: Optional[str] = Field(default=None, description="The specific topic, e.g., 'Quadratics'")
    intent: Optional[str] = Field(default="GENERAL", description="The intent of the session")
    grade: Optional[str] = Field(default=None, description="The grade level for the context of this problem")
    assignment: Optional[str] = Field(default=None, description="Any specific assignment or context this problem belongs to")
    teacherMode: str = Field(default="Socratic", description="The mode of teaching, e.g., 'Socratic', 'Direct Instruction'")
    failed_attempts: int = Field(default=0, description="Number of consecutive failed attempts at answering the current question")
    max_attempts_before_hint: int = Field(default=3, description="Threshold for failed attempts before giving a direct hint")
