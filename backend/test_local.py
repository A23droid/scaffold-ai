import asyncio
import os
from dotenv import load_dotenv

load_dotenv()

from app.graph.workflow import app_workflow_builder
from app.models.profile import StudentProfileContext
from app.models.session import CurrentSessionContext
from langchain_core.messages import HumanMessage

app_workflow = app_workflow_builder.compile()

async def run():
    profile = StudentProfileContext(grade="9th", weakTopics=["Factorisation", "Fractions"], misconceptionHistory=[], pace="MEDIUM", strictnessPreference="HINT_ONLY", recentSessions=[])
    session = CurrentSessionContext(problem="I don't understand the components of a human heart.", subject="Biology", topic="Human Heart", teacherMode="HINT_ONLY", intent="CONCEPT_UNDERSTANDING", failed_attempts=0)
    
    input_state = {
        "messages": [HumanMessage(content="What is the heart?")],
        "input_type": "text",
        "profile": profile,
        "session": session,
    }
    
    config = {"configurable": {"thread_id": "test_1"}}
    try:
        final_state = await app_workflow.ainvoke(input_state, config=config)
        print("Success")
    except Exception as e:
        import traceback
        traceback.print_exc()

asyncio.run(run())
