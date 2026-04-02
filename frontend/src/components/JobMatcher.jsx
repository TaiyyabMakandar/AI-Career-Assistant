import React, { useState } from 'react';
import axios from 'axios';
import { Briefcase, Target, AlertCircle, Loader2, Sparkles, CheckCircle2 } from 'lucide-react';
import API_BASE_URL from '../services/api';

const JobMatcher = ({ resumeText }) => {
  const [jobDescription, setJobDescription] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleMatch = async () => {
    if (!resumeText) {
      setError('Please upload a resume first under the "Resume Analysis" tab.');
      return;
    }
    if (!jobDescription) {
      setError('Please paste a job description.');
      return;
    }

    setLoading(true);
    setError('');
    
    const formData = new FormData();
    formData.append('resume_text', resumeText);
    formData.append('job_description', jobDescription);

    try {
      const response = await axios.post(`${API_BASE_URL}/job-match`, formData);
      setResult(response.data.match_result);
    } catch (err) {
      console.error(err);
      setError('Failed to match. Ensure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2 underline decoration-blue-500 decoration-4 underline-offset-8">
          Job Description Matcher
        </h2>
        <p className="text-slate-400 mt-4">
          Paste the job description you are targeting to see how well your resume matches.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <label className="text-slate-300 font-medium ml-1 flex items-center gap-2">
              <Briefcase size={18} className="text-blue-400" />
              Target Job Description
            </label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here..."
              className="w-full h-80 bg-slate-900 border border-slate-700 rounded-2xl p-6 text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none leading-relaxed"
            />
          </div>

          <button
            onClick={handleMatch}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 text-white font-semibold py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Target size={20} />}
            {loading ? 'Matching...' : 'Match Resume'}
          </button>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700 h-full flex flex-col">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-700">
              <div className="flex items-center gap-2">
                <Sparkles className="text-amber-400" size={20} />
                <h3 className="text-xl font-bold text-white">AI Match Report</h3>
              </div>
            </div>

            {result ? (
              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                <div className="whitespace-pre-wrap text-slate-300 leading-relaxed bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                  {result}
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
                <div className="w-12 h-12 bg-slate-700/50 rounded-full flex items-center justify-center mb-4">
                  <Target className="text-slate-500" size={24} />
                </div>
                <p className="text-slate-500 italic">
                  Paste JD and click Match to generate report.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 flex items-center gap-2">
          <AlertCircle size={20} />
          {error}
        </div>
      )}
    </div>
  );
};

export default JobMatcher;
