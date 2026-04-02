import React, { useState } from 'react';
import axios from 'axios';
import { Upload, FileText, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import API_BASE_URL from '../services/api';

const ResumeUpload = ({ setResumeText }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setError('');
    } else {
      setError('Please upload a valid PDF file.');
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first.');
      return;
    }

    setLoading(true);
    setError('');
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${API_BASE_URL}/analyze-resume`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setAnalysis(response.data.analysis);
      setResumeText(response.data.resume_text);
    } catch (err) {
      console.error(err);
      setError('Failed to analyze resume. Make sure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2 underline decoration-blue-500 decoration-4 underline-offset-8">
          Analyze Your Resume
        </h2>
        <p className="text-slate-400 mt-4">
          Upload your resume in PDF format to get instant AI-powered feedback on how to improve it.
        </p>
      </div>

      <div className="glass p-10 flex flex-col items-center justify-center border-dashed border-2 border-slate-700 hover:border-blue-500/50 transition-colors group cursor-pointer relative">
        <input 
          type="file" 
          onChange={handleFileChange} 
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          accept=".pdf"
        />
        <div className="w-16 h-16 bg-blue-600/10 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          <Upload className="text-blue-400" size={32} />
        </div>
        <p className="text-slate-300 font-medium mb-1">
          {file ? file.name : "Click or drag to upload resume (PDF)"}
        </p>
        <p className="text-slate-500 text-sm">MAX 5MB</p>
      </div>

      <button
        onClick={handleUpload}
        disabled={loading || !file}
        className="w-full mt-6 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 text-white font-semibold py-4 rounded-xl transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"
      >
        {loading ? <Loader2 className="animate-spin" /> : <FileText size={20} />}
        {loading ? 'Analyzing...' : 'Analyze Resume'}
      </button>

      {error && (
        <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 flex items-center gap-2">
          <AlertCircle size={20} />
          {error}
        </div>
      )}

      {analysis && (
        <div className="mt-10 animate-fade-in bg-slate-800/50 rounded-2xl p-8 border border-slate-700 shadow-xl">
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-700">
            <CheckCircle2 className="text-emerald-400" size={24} />
            <h3 className="text-xl font-bold text-white">Analysis Results</h3>
          </div>
          <div className="prose prose-invert max-w-none">
            <div className="whitespace-pre-wrap text-slate-300 leading-relaxed text-lg bg-slate-900/50 p-6 rounded-xl border border-slate-800">
              {analysis}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;
