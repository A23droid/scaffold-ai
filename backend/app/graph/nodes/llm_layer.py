import os
import json
from langchain_core.messages import SystemMessage, HumanMessage, AIMessage
from pydantic import BaseModel, Field
from langchain_groq import ChatGroq
from app.graph.state import GraphState
from dotenv import load_dotenv

load_dotenv()

# Initialize Groq Model
grok_model = ChatGroq(
    model="llama-3.1-8b-instant", 
    api_key=os.getenv("GROQ_API_KEY", "dummy-key-for-now")
)

def _build_system_prompt(state: GraphState, role: str) -> str:
    profile = state.get("profile")
    session = state.get("session")
    
    prompt = f"You are a helpful, expert tutor.\n"
    prompt += f"Role: {role}\n"
    prompt += f"CRITICAL RULE: The 'Student Profile' and 'Concept States' provided below are derived from backend analytics of the student's past sessions. Do NOT say 'you mentioned earlier' or 'you said'. If you reference this knowledge, frame it as your observation from their past learning history, like 'I can tell from our past sessions that you're familiar with...' or 'I've noticed you've been working on...'.\n\n"
    
    if profile:
        is_dict = isinstance(profile, dict)
        grade = profile.get("grade") if is_dict else profile.grade
        weakTopics = profile.get("weakTopics", []) if is_dict else profile.weakTopics
        pace = profile.get("pace") if is_dict else profile.pace
        strictness = profile.get("strictnessPreference") if is_dict else profile.strictnessPreference
        misconceptionHistory = profile.get("misconceptionHistory", []) if is_dict else profile.misconceptionHistory
        
        prompt += f"Student Profile:\n"
        prompt += f"- Grade: {grade}\n"
        prompt += f"- Weak Topics: {', '.join(weakTopics)}\n"
        prompt += f"- Preferred Pace: {pace}\n"
        prompt += f"- Strictness: {strictness}\n"
        misconceptions_str = ', '.join([json.dumps(m) if isinstance(m, dict) else str(m) for m in misconceptionHistory])
        prompt += f"- Known Misconceptions: {misconceptions_str}\n\n"
        
    if session:
        is_dict = isinstance(session, dict)
        subject = session.get("subject") if is_dict else session.subject
        problem = session.get("problem") if is_dict else session.problem
        failed_attempts = session.get("failed_attempts", 0) if is_dict else session.failed_attempts
        
        prompt += f"Current Session:\n"
        prompt += f"- Subject: {subject}\n"
        prompt += f"- Problem: {problem}\n"
        prompt += f"- Failed Attempts: {failed_attempts}\n"
        
    return prompt

class DiagnosisOutput(BaseModel):
    requiredConcept: str = Field(description="What concept is required to solve this?")
    possibleMisconceptions: str = Field(description="Comma-separated list of likely misconceptions")
    question: str = Field(description="Ask ONE diagnostic question. Do not solve the question.")

class GeneratedConceptNode(BaseModel):
    name: str = Field(description="Name of the concept")
    prerequisites: list[str] = Field(description="List of prerequisite concept names")

class ConceptGraphOutput(BaseModel):
    concepts: list[GeneratedConceptNode] = Field(description="The graph of concepts for the topic")

class ConceptStateUpdate(BaseModel):
    concept: str = Field(description="The concept name")
    status: str = Field(description="One of: KNOWN, PARTIAL, UNKNOWN, MISCONCEPTION")

class ConceptEvaluatorOutput(BaseModel):
    updates: list[ConceptStateUpdate] = Field(description="Updates to the concept mastery states based on the student's message")

def concept_graph_generator_node(state: GraphState) -> GraphState:
    """Dynamically generates a concept graph for any topic."""
    session = state.get("session")
    if not session or not session.topic:
        return state
        
    sys_prompt = f"You are a master curriculum designer. The student is learning '{session.subject}' and the topic is '{session.topic}'. Break this topic down into a micro-graph of 4-7 fundamental concepts. For each concept, list any prerequisites from within this same list."
    
    structured_model = grok_model.with_structured_output(ConceptGraphOutput)
    try:
        response = structured_model.invoke([SystemMessage(content=sys_prompt)])
        graph_dict = {}
        states_dict = {}
        for c in response.concepts:
            graph_dict[c.name] = {"prerequisites": c.prerequisites}
            states_dict[c.name] = "UNKNOWN" # Default state
            
        state["concept_graph"] = graph_dict
        state["concept_states"] = states_dict
    except Exception as e:
        print(f"Warning: Concept Graph Generator failed to parse structured output: {e}")
    
    return state

def concept_evaluator_node(state: GraphState) -> GraphState:
    """Classifies the student's latest message into concept mastery states."""
    messages = state.get("messages", [])
    graph = state.get("concept_graph")
    states = state.get("concept_states")
    
    if not messages or not graph or not states:
        return state
        
    graph_str = str(graph)
    current_states_str = str(states)
    
    sys_prompt = f"You are a Knowledge Tracing Engine. Evaluate the student's latest response against the concept graph: {graph_str}. Current states: {current_states_str}. Which concepts did their response prove they know, partially know, don't know, or hold a misconception about? Output ONLY the state updates."
    
    structured_model = grok_model.with_structured_output(ConceptEvaluatorOutput)
    try:
        response = structured_model.invoke([SystemMessage(content=sys_prompt)] + messages)
        for update in response.updates:
            if update.concept in states:
                states[update.concept] = update.status
    except Exception as e:
        print(f"Warning: Concept Evaluator failed to parse structured output: {e}")
            
    state["concept_states"] = states
    return state

def diagnosis_node(state: GraphState) -> GraphState:
    """Analyzes the latest message and context to diagnose a misconception using structured output."""
    messages = state.get("messages", [])
    if not messages:
        return state
        
    sys_prompt = _build_system_prompt(state, "Diagnostician. Determine required concept, likely misconceptions, and ask ONE diagnostic question.")
    
    structured_model = grok_model.with_structured_output(DiagnosisOutput)
    try:
        response = structured_model.invoke([SystemMessage(content=sys_prompt)] + messages)
        
        # Store the structured JSON diagnosis in state
        
        # Safely parse the possibleMisconceptions string into a list
        misconceptions = []
        if response.possibleMisconceptions:
            # Sometimes the model still outputs a stringified JSON array, try to parse it
            if response.possibleMisconceptions.strip().startswith("["):
                try:
                    import json
                    misconceptions = json.loads(response.possibleMisconceptions)
                except:
                    misconceptions = [response.possibleMisconceptions]
            else:
                misconceptions = [response.possibleMisconceptions]
                
        state["diagnostic_state"] = {
            "requiredConcept": response.requiredConcept,
            "possibleMisconceptions": misconceptions,
            "diagnosticQuestion": response.question
        }
        
        # Append the question as the AI's response so the user sees it
        state["messages"].append(AIMessage(content=response.question))
    except Exception as e:
        print(f"Warning: Diagnosis node failed to parse structured output: {e}")
    
    state["current_stage"] = "diagnosis"
    
    return state

def socratic_node(state: GraphState) -> GraphState:
    """Generates the next guiding question."""
    messages = state.get("messages", [])
    diagnosis = state.get("diagnosis", {})
    current_misconception = state.get("current_misconception")
    concept_states = state.get("concept_states")
    
    contextual_info = f"Rule engine detected misconception: {current_misconception}" if current_misconception else f"Diagnosis: {diagnosis}"
    
    if concept_states:
        contextual_info += f" | Concept States: {concept_states}. Focus on guiding the student to understand the earliest UNKNOWN or MISCONCEPTION concept."
        
    sys_prompt = _build_system_prompt(state, f"Socratic Tutor. Context: {contextual_info}. Ask ONE targeted question to help the student. DO NOT give the answer. If they made a sign error, guide them toward signs.")
    
    response = grok_model.invoke([SystemMessage(content=sys_prompt)] + messages)
    
    state["messages"].append(response)
    state["current_stage"] = "socratic_question"
    
    return state

def hint_node(state: GraphState) -> GraphState:
    """Provides a more direct hint after too many failed attempts."""
    messages = state.get("messages", [])
    
    sys_prompt = _build_system_prompt(state, "Scaffolded Hint Provider. The student is struggling (too many failed attempts). Provide a clear hint or part of the solution to unblock them, but leave the final step to them.")
    
    response = grok_model.invoke([SystemMessage(content=sys_prompt)] + messages)
    
    state["messages"].append(response)
    state["current_stage"] = "hint"
    
    return state
