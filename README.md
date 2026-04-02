# 🚀 AI Career Assistant

> An intelligent, AI-powered career platform that helps you analyze your resume, match jobs, prepare for interviews, and get personalized career guidance — all in one place.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![FastAPI](https://img.shields.io/badge/FastAPI-Python-009688?logo=fastapi)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?logo=tailwindcss)
![HuggingFace](https://img.shields.io/badge/HuggingFace-LLM-FFD21E?logo=huggingface)

---

## 📋 Table of Contents

- [About the Project](#-about-the-project)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Folder Structure](#-folder-structure)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#-environment-variables)
- [How to Run](#-how-to-run)
- [API Endpoints](#-api-endpoints)
- [Screenshots](#-screenshots)
- [Future Improvements](#-future-improvements)
- [Disclaimer](#️-disclaimer)

---

## 📖 About the Project

**AI Career Assistant** is a full-stack web application designed to supercharge your job search. Powered by large language models (LLMs) via the HuggingFace Inference API, it provides:

- **Instant resume analysis** — understand your strengths and weaknesses
- **Job description matching** — see exactly how well you fit a role
- **Tailored interview prep** — get questions generated from your resume
- **AI career chat** — ask anything, get expert-level advice

---

## ✨ Features

| Feature | Description |
|---|---|
| 📄 **Resume Upload & Analysis** | Upload PDF resume → AI returns strengths, weaknesses, missing skills, and improvement suggestions |
| 🎯 **Job Description Matcher** | Paste a job description → See match percentage and missing keywords |
| 🎤 **Interview Preparation** | Generate 5 technical + 5 HR questions tailored to your resume |
| 💬 **AI Chat Assistant** | Real-time career guidance via conversational AI |
| 🗂️ **Sidebar Navigation** | Clean, tabbed navigation between all features |
| 📡 **REST API Backend** | FastAPI backend with CORS, error handling, and session history |
| 🛡️ **Offline Fallback** | Graceful error messages when the backend is unavailable |

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| [React 19](https://react.dev/) + [Vite](https://vite.dev/) | UI framework & build tool |
| [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first styling |
| [Axios](https://axios-http.com/) | HTTP client for API calls |
| [Lucide React](https://lucide.dev/) | Icon library |

### Backend
| Technology | Purpose |
|---|---|
| [FastAPI](https://fastapi.tiangolo.com/) | Python web framework |
| [Uvicorn](https://www.uvicorn.org/) | ASGI server |
| [HuggingFace Hub](https://huggingface.co/docs/huggingface_hub/) | LLM inference API |
| [PyPDF2](https://pypi.org/project/PyPDF2/) | PDF text extraction |
| [python-dotenv](https://pypi.org/project/python-dotenv/) | Environment variable management |

### AI Model
- **`meta-llama/Llama-3.2-1B-Instruct`** via HuggingFace Serverless Inference API

---

## 📁 Folder Structure

```
Career_Assistant/
├── backend/
│   ├── app/
│   │   ├── main.py               # FastAPI app entry point, CORS setup
│   │   ├── routes/
│   │   │   └── career_routes.py  # All API route handlers
│   │   └── services/
│   │       ├── ai_service.py     # HuggingFace LLM integration
│   │       └── resume_parser.py  # PDF text extraction
│   ├── venv/                     # Python virtual environment
│   └── .env                      # Environment variables (HF_TOKEN)
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatAssistant.jsx   # AI chat interface
│   │   │   ├── ResumeUpload.jsx    # PDF upload + analysis UI
│   │   │   ├── JobMatcher.jsx      # Job description matcher UI
│   │   │   ├── InterviewPrep.jsx   # Interview questions UI
│   │   │   └── Sidebar.jsx         # Navigation sidebar
│   │   ├── App.jsx                 # Root component, tab routing
│   │   ├── main.jsx                # React entry point
│   │   └── index.css               # Global styles + Tailwind imports
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── prompt.txt
└── README.md
```

---

## ✅ Prerequisites

Make sure you have the following installed:

- **Node.js** v18+ and **npm** v9+
- **Python** 3.9+
- A **HuggingFace account** with an API token ([Get one free here](https://huggingface.co/settings/tokens))

---

## 🔧 Installation

### Backend Setup

```bash
# 1. Navigate to the backend directory
cd backend

# 2. Create and activate a virtual environment
python -m venv venv

# On Windows:
.\venv\Scripts\activate

# On macOS/Linux:
source venv/bin/activate

# 3. Install Python dependencies
pip install fastapi uvicorn huggingface-hub python-dotenv PyPDF2

# 4. Create your .env file (see Environment Variables section below)
```

### Frontend Setup

```bash
# 1. Navigate to the frontend directory
cd frontend

# 2. Install Node dependencies
npm install

# 3. (Tailwind v4 Vite plugin is already configured in vite.config.js)
```

---

## 🔐 Environment Variables

Create a `.env` file inside the `backend/` directory:

```env
HF_TOKEN=your_huggingface_api_token_here
MODEL_ID=meta-llama/Llama-3.2-1B-Instruct
```

> 💡 Get your free HuggingFace token at: https://huggingface.co/settings/tokens  
> The token must have **Read** access.

---

## ▶️ How to Run

### 1. Start the Backend

```bash
cd backend
.\venv\Scripts\activate        # Windows
# source venv/bin/activate     # macOS/Linux

python -m app.main
```

Backend will be live at: **http://127.0.0.1:8000**  
Interactive API docs: **http://127.0.0.1:8000/docs**

---

### 2. Start the Frontend

Open a **new terminal**:

```bash
cd frontend
npm run dev
```

Frontend will be live at: **http://localhost:5173**

---

## 📡 API Endpoints

Base URL: `http://127.0.0.1:8000/api`

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| `GET` | `/` | Health check | — |
| `POST` | `/api/analyze-resume` | Upload & analyze PDF resume | `multipart/form-data: file` |
| `POST` | `/api/job-match` | Match resume with job description | `form: resume_text, job_description` |
| `POST` | `/api/interview-questions` | Generate interview questions | `form: resume_text` |
| `POST` | `/api/chat` | AI career chat | `form: message` |
| `GET` | `/api/history` | Retrieve session history | — |
| `POST` | `/api/clear` | Clear session history | — |

---

### 📋 Sample API Request & Response

**`POST /api/chat`**

```bash
curl -X POST "http://127.0.0.1:8000/api/chat" \
  -F "message=What skills should I learn for a backend developer role?"
```

**Response:**
```json
{
  "response": "To become a strong backend developer, focus on these core skills:\n\n1. **Proficiency in a backend language** — Python (FastAPI/Django), Node.js, or Java\n2. **Database management** — SQL (PostgreSQL, MySQL) and NoSQL (MongoDB)\n3. **REST API design** — building and documenting clean, versioned APIs\n4. **Version control** — Git and GitHub workflows\n5. **Cloud basics** — AWS, GCP, or Azure fundamentals\n\nWould you like a study roadmap for any of these?"
}
```

---

**`POST /api/job-match`**

```bash
curl -X POST "http://127.0.0.1:8000/api/job-match" \
  -F "resume_text=Python developer, 3 years, Django, PostgreSQL" \
  -F "job_description=Senior Python Developer with Django, AWS, Docker experience"
```

**Response:**
```json
{
  "match_result": "**Match Score: ~65%**\n\n✅ Matched Skills: Python, Django, PostgreSQL\n❌ Missing: AWS, Docker, CI/CD pipelines\n\n📌 Suggestions:\n- Add AWS certifications or projects\n- Containerize a personal project with Docker\n- Highlight database optimization experience"
}
```

---

## 📸 Screenshots

> _Add screenshots of your running application here._

| Feature | Screenshot |
|---------|------------|
| Resume Upload | _(Add screenshot)_ |
| Job Matcher | _(Add screenshot)_ |
| Interview Prep | _(Add screenshot)_ |
| AI Chat | _(Add screenshot)_ |

---

## 🔮 Future Improvements

- [ ] 🔐 **User Authentication** — Login/signup with JWT tokens
- [ ] 💾 **Persistent History** — Store conversations in a database (PostgreSQL/SQLite)
- [ ] 📊 **Resume Scoring Dashboard** — Visual score cards and progress tracking
- [ ] 🌐 **Job Board Integration** — Fetch live job listings from LinkedIn/Indeed
- [ ] 📧 **Email Reports** — Send AI analysis directly to your email
- [ ] 🌍 **Multi-language Support** — Career guidance in multiple languages
- [ ] 🤖 **Model Selector** — Switch between different LLMs (GPT-4, Claude, Gemini)
- [ ] 📱 **Mobile App** — React Native companion app

---

## ⚠️ Disclaimer

This application uses **Large Language Models (LLMs)** to generate career advice, resume analysis, and interview questions. Please note:

- AI-generated responses may **not always be 100% accurate** or up-to-date.
- Resume analysis and job matching are **AI suggestions**, not professional career counseling.
- Always cross-verify important career decisions with a qualified human expert.
- The HuggingFace API is used for inference; follow [HuggingFace's Terms of Service](https://huggingface.co/terms-of-service).

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Built with ❤️ using React + FastAPI + HuggingFace AI

⭐ Star this repo if you found it helpful!

</div>
