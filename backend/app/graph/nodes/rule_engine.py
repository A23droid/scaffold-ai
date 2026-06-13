from app.graph.state import GraphState

def rule_engine_node(state: GraphState) -> GraphState:
    """
    Deterministic rule engine to handle logic before LLM processing.
    """
    session = state.get("session")
    profile = state.get("profile")
    
    messages = state.get("messages", [])
    
    if not session or not profile:
        return state
        
    is_session_dict = isinstance(session, dict)
    failed_attempts = session.get("failed_attempts", 0) if is_session_dict else session.failed_attempts
    max_attempts = session.get("max_attempts_before_hint", 3) if is_session_dict else session.max_attempts_before_hint
    
    # Analyze the latest student message
    if messages:
        latest_message = messages[-1].content.lower()
        
        # RULE 1: Sign Error Interception (Deterministic Regex)
        if "2" in latest_message and "3" in latest_message and "-2" not in latest_message and "-3" not in latest_message:
            state["current_misconception"] = "SIGN_ERROR"
            state["next_action"] = "socratic"
            return state
            
        # RULE 2: Correct progression detected
        if "-2" in latest_message and "-3" in latest_message:
            state["understanding"] = state.get("understanding", 0) + 1
            state["next_action"] = "socratic" # LLM will validate the logic
            return state

    # 1. Determine next action based on failed attempts
    if failed_attempts >= max_attempts:
        state["next_action"] = "hint"
    else:
        # Default route to initial diagnosis or socratic if already diagnosed
        if state.get("diagnosis"):
            state["next_action"] = "socratic"
        else:
            state["next_action"] = "diagnose"
        
    state["session"] = session
    state["profile"] = profile
    
    return state
