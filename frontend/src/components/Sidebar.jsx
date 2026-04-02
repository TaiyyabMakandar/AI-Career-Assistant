import React from 'react';
import { LayoutDashboard, FileText, Briefcase, MessageSquare, Trash2 } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, clearHistory }) => {
  const menuItems = [
    { id: 'analyze', icon: FileText, label: 'Resume Analysis' },
    { id: 'match', icon: Briefcase, label: 'Job Matcher' },
    { id: 'questions', icon: LayoutDashboard, label: 'Interview Prep' },
    { id: 'chat', icon: MessageSquare, label: 'AI Career Chat' },
  ];

  return (
    <div className="w-64 h-screen bg-slate-900 border-r border-slate-800 p-6 flex flex-col">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20">
          CA
        </div>
        <h1 className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
          Career AI
        </h1>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              activeTab === item.id 
                ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20 shadow-[0_0_15px_rgba(37,99,235,0.1)]' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <item.icon size={20} />
            <span className="font-medium text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-slate-800">
        <button 
          onClick={clearHistory}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all duration-200 text-sm font-medium"
        >
          <Trash2 size={20} />
          Clear Session
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

