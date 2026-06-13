from pydantic import BaseModel, Field
from typing import List, Optional, Any

class StudentProfileContext(BaseModel):
    grade: str = Field(description="The grade level of the student, e.g., '10th', '12th', 'College'")
    board: Optional[str] = Field(default=None, description="The educational board, e.g., 'CBSE', 'ICSE', 'Common Core'")
    preferredLanguage: str = Field(default="English", description="Preferred language for explanations")
    weakTopics: List[str] = Field(default_factory=list, description="List of topics the student struggles with, e.g., ['Algebra', 'Fractions']")
    misconceptionHistory: List[Any] = Field(default_factory=list, description="Common mistakes they make, can be structured dicts")
    pace: str = Field(default="Average", description="Preferred learning pace: 'Fast', 'Average', 'Needs more scaffolding'")
    strictnessPreference: str = Field(default="Medium", description="Teacher strictness: 'Lenient', 'Medium', 'Strict'")
    masteryScores: dict[str, float] = Field(default_factory=dict, description="Topic mastery scores from 0.0 to 1.0")
    recentSessions: List[str] = Field(default_factory=list, description="Brief summaries of the last few sessions to maintain context")
