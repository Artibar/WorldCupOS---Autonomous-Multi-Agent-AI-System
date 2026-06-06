import React, { useState } from 'react';

export const AgentCard = ({ agent, status, onSelect }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const statusConfig = {
    active: { bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-700 dark:text-emerald-300', dot: 'bg-emerald-500' },
    busy: { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-700 dark:text-amber-300', dot: 'bg-amber-500' },
    inactive: { bg: 'bg-slate-100 dark:bg-slate-700/50', text: 'text-slate-600 dark:text-slate-400', dot: 'bg-slate-400' }
  };

  const agentIcons = {
    fanAgent: '👤',
    transitAgent: '🚌',
    medicalAgent: '🚑',
    businessAgent: '🏢'
  };

  const agentDescriptions = {
    fanAgent: 'Fan trip planning & bookings',
    transitAgent: 'Transit & crowd management',
    medicalAgent: 'Medical emergency response',
    businessAgent: 'Business operations'
  };

  const config = statusConfig[status] || statusConfig.inactive;

  return (
    <div 
      onClick={onSelect}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 transition-all duration-200 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-600 cursor-pointer p-5 space-y-3 group"
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-start gap-3">
          <span className={`text-4xl transition-transform duration-300 ${isHovered ? 'scale-110' : 'scale-100'}`}>
            {agentIcons[agent] || '🤖'}
          </span>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-slate-900 dark:text-white text-sm">{agent}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{agentDescriptions[agent]}</p>
          </div>
        </div>
      </div>
      
      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        <span className={`inline-block w-2 h-2 rounded-full ${config.dot} animate-pulse-soft`}></span>
        <span className="capitalize">{status}</span>
      </div>
      
      <p className="text-xs text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">Click to interact →</p>
    </div>
  );
};
