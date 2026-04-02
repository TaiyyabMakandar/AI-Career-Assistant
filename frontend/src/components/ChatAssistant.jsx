import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Send, MessageSquare, Loader2, User, Bot, Trash2 } from 'lucide-react';
import API_BASE_URL from '../services/api';

const ChatAssistant = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchHistory = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/history`);
      setMessages(response.data);
    } catch (err) {
      console.error('Failed to fetch history:', err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    const formData = new FormData();
    formData.append('message', input);

    try {
      const response = await axios.post(`${API_BASE_URL}/chat`, formData);
      const assistantMessage = { role: 'assistant', content: response.data.response };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Connection error. Make sure your backend is running.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-12rem)] flex flex-col animate-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2 underline decoration-blue-500 decoration-4 underline-offset-8">
          AI Career Assistant
        </h2>
        <p className="text-slate-400 mt-4">
          Chat with our AI for personalized career guidance, interview tips, or resume advice.
        </p>
      </div>

      <div className="flex-1 glass bg-slate-900/40 border-slate-800 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center px-4 opacity-50">
              <MessageSquare size={48} className="mb-4 text-slate-700" />
              <p className="text-slate-400 font-medium">No messages yet. Ask something about your career!</p>
            </div>
          ) : (
            messages.map((msg, index) => (
              <div 
                key={index} 
                className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                  msg.role === 'user' ? 'bg-blue-600' : 'bg-slate-700'
                }`}>
                  {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
                </div>
                <div className={`max-w-[80%] px-5 py-3 rounded-2xl text-slate-200 leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-blue-600/20 border border-blue-600/30' 
                    : 'bg-slate-800 border border-slate-700'
                }`}>
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))
          )}
          {loading && (
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center shrink-0">
                <Loader2 size={20} className="animate-spin text-blue-400" />
              </div>
              <div className="bg-slate-800 border border-slate-700 px-5 py-3 rounded-2xl">
                <p className="text-slate-500 italic">Thinking...</p>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSend} className="p-4 bg-slate-900/60 border-t border-slate-800">
          <div className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about your career..."
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-6 py-4 pr-16 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-medium"
            />
            <button
              disabled={loading || !input.trim()}
              className="absolute right-2 p-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 text-white rounded-lg transition-all"
            >
              <Send size={20} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatAssistant;
