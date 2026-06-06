import React, { useState, useEffect } from 'react';
import { AgentCard } from './AgentCard';
import { TaskExecutor } from './TaskExecutor';
import { TaskHistory } from './TaskHistory';

export const AgentDashboard = () => {
  const [agents] = useState([
    { name: 'fanAgent', status: 'active' },
    { name: 'transitAgent', status: 'active' },
    { name: 'medicalAgent', status: 'active' },
    { name: 'businessAgent', status: 'active' }
  ]);

  const [selectedAgent, setSelectedAgent] = useState(null);
  const [taskHistory, setTaskHistory] = useState([]);
  const [stats, setStats] = useState({ total: 0, success: 0, failed: 0 });

  const handleTaskExecute = (taskData) => {
    setTaskHistory([taskData, ...taskHistory]);
    setStats(prev => ({
      ...prev,
      total: prev.total + 1,
      success: taskData.error ? prev.success : prev.success + 1,
      failed: taskData.error ? prev.failed + 1 : prev.failed
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-950 dark:via-indigo-950 dark:to-slate-950">
      {/* Header */}
      <header className="bg-gradient-to-r from-white to-indigo-50/50 dark:from-slate-900 dark:to-indigo-900/20 backdrop-blur-xl border-b border-indigo-100 dark:border-indigo-900/30 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl sm:text-4xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-3">
                <span className="text-3xl">🤖</span> WorldCupOS
              </h1>
              <p className="text-indigo-600 dark:text-indigo-400 text-xs sm:text-sm mt-2 font-medium tracking-wide">INTELLIGENT AI ORCHESTRATION PLATFORM</p>
            </div>
            <div className="text-right bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl px-6 py-4 shadow-lg shadow-indigo-200 dark:shadow-indigo-900/50">
              <div className="text-2xl sm:text-3xl font-black text-white">{stats.success}/{stats.total}</div>
              <p className="text-xs text-indigo-100 font-semibold tracking-widest mt-1">SUCCESS RATE</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-xs font-semibold uppercase tracking-widest mb-2">Total Tasks</p>
                <p className="text-4xl font-black">{stats.total}</p>
              </div>
              <div className="text-6xl opacity-30 group-hover:opacity-50 transition-opacity">📊</div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-xs font-semibold uppercase tracking-widest mb-2">Successful</p>
                <p className="text-4xl font-black">{stats.success}</p>
              </div>
              <div className="text-6xl opacity-30 group-hover:opacity-50 transition-opacity">✅</div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-red-100 text-xs font-semibold uppercase tracking-widest mb-2">Failed</p>
                <p className="text-4xl font-black">{stats.failed}</p>
              </div>
              <div className="text-6xl opacity-30 group-hover:opacity-50 transition-opacity">❌</div>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 p-6 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-amber-100 text-xs font-semibold uppercase tracking-widest mb-2">Success Rate</p>
                <p className="text-4xl font-black">
                  {stats.total === 0 ? '0%' : Math.round((stats.success / stats.total) * 100) + '%'}
                </p>
              </div>
              <div className="text-6xl opacity-30 group-hover:opacity-50 transition-opacity">📈</div>
            </div>
          </div>
        </div>

        {/* Agents Section */}
        <section className="mb-12">
          <div className="mb-8">
            <h2 className="text-3xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-3">
              <span className="text-4xl">⚙️</span>
              Available Agents
            </h2>
            <p className="text-indigo-600 dark:text-indigo-400 text-sm mt-2 font-medium">Select an agent to begin task execution</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {agents.map(agent => (
              <div
                key={agent.name}
                onClick={() => setSelectedAgent(agent.name)}
                className={`cursor-pointer transition-all ${
                  selectedAgent === agent.name 
                    ? 'ring-2 ring-indigo-400' 
                    : 'hover:shadow-lg'
                }`}
              >
                <AgentCard
                  agent={agent.name}
                  status={agent.status}
                  onSelect={() => setSelectedAgent(agent.name)}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Control Section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <div className="lg:col-span-2">
            <TaskExecutor
              selectedAgent={selectedAgent}
              onExecute={handleTaskExecute}
            />
          </div>

          <div>
            <TaskHistory tasks={taskHistory.slice(0, 5)} />
          </div>
        </section>

        {/* Full History */}
        <section>
          <div className="mb-6">
            <h2 className="section-title flex items-center gap-2">
              <span className="text-xl">📊</span>
              Task History
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">All executed tasks and their results</p>
          </div>
          <TaskHistory tasks={taskHistory} />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 backdrop-blur-sm mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            🌍 WorldCupOS | Powered by AI Agents | Last Updated: {new Date().toLocaleString()}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">Industry-Standard Agentic AI Platform</p>
        </div>
      </footer>
    </div>
  );
};
