import React from 'react';

export const TaskHistory = ({ tasks }) => {
  return (
    <div className="card p-6 space-y-4">
      <h3 className="section-title flex items-center gap-2">
        <span>📋</span>
        Execution History
      </h3>
      
      {tasks.length === 0 ? (
        <div className="text-center py-8 space-y-2">
          <p className="text-4xl">📭</p>
          <p className="text-slate-500 dark:text-slate-400 text-sm">No tasks executed yet</p>
          <p className="text-xs text-slate-400 dark:text-slate-500">Tasks will appear here</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
          {tasks.map((task, idx) => (
            <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-700/30 rounded-lg border border-slate-200 dark:border-slate-600 space-y-2 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors">
              <div className="flex justify-between items-start gap-2">
                <span className="font-medium text-slate-900 dark:text-white text-sm">{task.agent}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
                  {task.timestamp.toLocaleTimeString()}
                </span>
              </div>
              
              <p className="text-sm text-slate-700 dark:text-slate-300 line-clamp-2">{task.task}</p>
              
              {task.error ? (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                  <p className="text-xs text-red-700 dark:text-red-300 font-medium">❌ Error</p>
                  <p className="text-xs text-red-600 dark:text-red-400 mt-1 line-clamp-2">{task.error}</p>
                </div>
              ) : (
                <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg p-3">
                  <p className="text-xs text-emerald-700 dark:text-emerald-300 font-medium">✅ Success</p>
                  {task.result && (
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 line-clamp-2">
                      {typeof task.result === 'string' ? task.result : JSON.stringify(task.result).substring(0, 100)}...
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
