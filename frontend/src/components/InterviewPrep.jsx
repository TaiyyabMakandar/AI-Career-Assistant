import React, { useState } from 'react';
import axios from 'axios';
import { Target, HelpCircle, Loader2, Sparkles, Send } from 'lucide-react';
import API_BASE_URL from '../services/api';

const InterviewPrep = ({ resumeText }) => {
  const [questions, setQuestions] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateQuestions = async () => {
    if (!resumeText) {
      setError('Please upload a resume first under the "Resume Analysis" tab.');
      return;
    }

    setLoading(true);
    setError('');
    
    const formData = new FormData();
    formData.append('resume_text', resumeText);

    try {
      const response = await axios.post(`${API_BASE_URL}/interview-questions`, formData);
      setQuestions(response.data.questions);
    } catch (err) {
      console.error(err);
      setError('Failed to generate. Ensure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2 underline decoration-blue-500 decoration-4 underline-offset-8">
          Interview Preparation
        </h2>
        <p className="text-slate-400 mt-4">
          Prepare for your upcoming interview with custom questions generated from your specific profile.
        </p>
      </div>

      <div className="glass p-10 flex flex-col items-center justify-center border-slate-700 bg-slate-900/40 mb-10">
        <div className="w-16 h-16 bg-blue-600/10 rounded-full flex items-center justify-center mb-6">
          <HelpCircle className="text-blue-400" size={32} />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Ready to Practice?</h3>
        <p className="text-slate-400 text-center max-w-md mb-8">
          Our AI will analyze your work experience and generate 5 Technical and 5 HR questions tailored precisely to you.
        </p>
        <button
          onClick={generateQuestions}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 text-white font-semibold py-3 px-8 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={20} />}
          {loading ? 'Generating...' : 'Generate Practice Questions'}
        </button>
      </div>

      {questions && (
        <div className="mt-10 animate-fade-in bg-slate-800/50 rounded-2xl p-8 border border-slate-700 shadow-xl">
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-700">
            <Target className="text-emerald-400" size={24} />
            <h3 className="text-xl font-bold text-white">Your Custom Questions</h3>
          </div>
          <div className="prose prose-invert max-w-none">
            <div className="whitespace-pre-wrap text-slate-300 leading-relaxed text-lg bg-slate-900/50 p-6 rounded-xl border border-slate-800">
              {questions}
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 flex items-center gap-2">
          <AlertCircle size={20} />
          {error}
        </div>
      )}
    </div>
  );
};

export default InterviewPrep;
