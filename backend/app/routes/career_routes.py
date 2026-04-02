from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from app.services.ai_service import ai_service
from app.services.resume_parser import resume_parser_service
from typing import List, Dict, Any

router = APIRouter()

# In-memory history for simplicity (per project requirements)
chat_history: List[Dict[str, str]] = []

@router.post("/analyze-resume")
async def analyze_resume(file: UploadFile = File(...)):
    """
    Extracts text from uploaded PDF and analyzes it.
    """
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")
    
    content = await file.read()
    resume_text = resume_parser_service.extract_text_from_pdf(content)
    
    if not resume_text or len(resume_text) < 10:
        raise HTTPException(status_code=400, detail="Invalid or empty PDF.")

    prompt = f"Analyze this resume and provide: Strengths, Weaknesses, Missing Skills, and Improvement Suggestions. Resume: {resume_text}"
    analysis = ai_service.generate_response(prompt)
    
    # Store in history
    chat_history.append({"role": "user", "content": f"Uploaded resume: {file.filename}"})
    chat_history.append({"role": "assistant", "content": analysis})
    
    return {"analysis": analysis, "resume_text": resume_text}

@router.post("/job-match")
async def job_match(resume_text: str = Form(...), job_description: str = Form(...)):
    """
    Matches extracted resume text with a provided job description.
    """
    prompt = f"Compare this resume with the job description. Give a match percentage (0-100), missing keywords, and suggestions to improve. Resume: {resume_text}. Job Description: {job_description}"
    match_result = ai_service.generate_response(prompt)
    
    # Store in history
    chat_history.append({"role": "user", "content": f"Job Match Request: {job_description[:50]}..."})
    chat_history.append({"role": "assistant", "content": match_result})
    
    return {"match_result": match_result}

@router.post("/interview-questions")
async def interview_questions(resume_text: str = Form(...)):
    """
    Generates interview questions based on resume.
    """
    prompt = f"Generate 5 technical and 5 HR interview questions based on this resume: {resume_text}"
    questions = ai_service.generate_response(prompt)
    
    # Store in history
    chat_history.append({"role": "user", "content": "Generate interview questions."})
    chat_history.append({"role": "assistant", "content": questions})
    
    return {"questions": questions}

@router.post("/chat")
async def career_chat(message: str = Form(...)):
    """
    Interactive career advice chat.
    """
    prompt = f"You are a Career Assistant. Help the user with their career-related question: {message}"
    response = ai_service.generate_response(prompt)
    
    # Store in history
    chat_history.append({"role": "user", "content": message})
    chat_history.append({"role": "assistant", "content": response})
    
    return {"response": response}

@router.get("/history")
async def get_history():
    """
    Returns the chat history.
    """
    return chat_history

@router.post("/clear")
async def clear_history():
    """
    Clears the chat history.
    """
    global chat_history
    chat_history = []
    return {"status": "success", "message": "History cleared"}
