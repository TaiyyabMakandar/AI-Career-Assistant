import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './components/Sidebar';
import ResumeUpload from './components/ResumeUpload';
import JobMatcher from './components/JobMatcher';
import InterviewPrep from './components/InterviewPrep';
import ChatAssistant from './components/ChatAssistant';
import API_BASE_URL from './services/api';

function App() {
  const [activeTab, setActiveTab] = useState('analyze');
  const [resumeText, setResumeText] = useState('');
  const [history, setHistory] = useState([]);

  const clearHistory = async () => {
    try {
      await axios.post(`${API_BASE_URL}/clear`);
      setHistory([]);
      alert("Session history cleared!");
    } catch (err) {
      console.error(err);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'analyze':
        return <ResumeUpload setResumeText={setResumeText} />;
      case 'match':
        return <JobMatcher resumeText={resumeText} />;
      case 'questions':
        return <InterviewPrep resumeText={resumeText} />;
      case 'chat':
        return <ChatAssistant />;
      default:
        return <ResumeUpload setResumeText={setResumeText} />;
    }
  };

  return (
    <div className="flex bg-slate-950 text-slate-200 min-h-screen font-sans selection:bg-blue-600/30 selection:text-white antialiased">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        clearHistory={clearHistory}
      />
      
      <main className="flex-1 p-10 overflow-y-auto custom-scrollbar bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/10 via-slate-950 to-slate-950">
        <div className="max-w-6xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;
