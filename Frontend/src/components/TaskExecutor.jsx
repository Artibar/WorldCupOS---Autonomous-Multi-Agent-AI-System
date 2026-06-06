import React, { useState } from 'react';

export const TaskExecutor = ({ selectedAgent, onExecute }) => {
  const [taskInput, setTaskInput] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);

  const agentPrompts = {
    fanAgent: [
      'Plan trip to match at Lusail Stadium on June 20',
      'Book flights and accommodation for World Cup',
      'Find best routes to Al Bayt Stadium'
    ],
    transitAgent: [
      'Reroute buses due to crowd surge at Stadium 974',
      'Check transit availability to Khalifa Stadium',
      'Optimize shuttle routes for match day'
    ],
    medicalAgent: [
      'Respond to medical emergency at Education City Stadium',
      'Find nearest hospital to Lusail Stadium',
      'Dispatch ambulance to Ras Abu Aboud Stadium'
    ],
    businessAgent: [
      'Check food supply for match day',
      'Update merchandise inventory',
      'Monitor crowd demand levels'
    ]
  };

  const handleExecute = async () => {
    if (!taskInput.trim() || !selectedAgent) return;

    setIsExecuting(true);
    try {
      console.log('Testing /test endpoint first...');
      const testRes = await fetch('http://localhost:5000/test');
      console.log('Test endpoint status:', testRes.status);
      const testData = await testRes.json();
      console.log('Test endpoint data:', testData);
      
      console.log('Sending execute-task request...');
      // Call backend agent
      const response = await fetch('http://localhost:5000/execute-task', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agent: selectedAgent, task: taskInput })
      });
      
      console.log('Response status:', response.status);
      
      const text = await response.text();
      console.log('Response text:', text.substring(0, 200));
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${text.substring(0, 100)}`);
      }
      
      const result = JSON.parse(text);
      onExecute({ agent: selectedAgent, task: taskInput, result, timestamp: new Date() });
      setTaskInput('');
    } catch (error) {
      console.error('Full error:', error);
      onExecute({ agent: selectedAgent, task: taskInput, error: error.message, timestamp: new Date() });
    } finally {
      setIsExecuting(false);
    }
  };

  if (!selectedAgent) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 transition-all duration-200 p-12 text-center space-y-3">
        <div className="text-4xl">🎯</div>
        <p className="text-slate-500 dark:text-slate-400">Select an agent to get started</p>
        <p className="text-xs text-slate-400 dark:text-slate-500">Choose from available agents to execute tasks</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 transition-all duration-200 p-6 space-y-5">
      <div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
          <span className="text-lg">⚡</span>
          {selectedAgent}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Configure and execute tasks for this agent</p>
      </div>

      <div className="space-y-2">
        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wide">Quick Templates</label>
        <div className="grid gap-2">
          {(agentPrompts[selectedAgent] || []).map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => setTaskInput(prompt)}
              className="text-left p-3 rounded-lg border border-slate-200 dark:border-slate-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-sm text-slate-700 dark:text-slate-300 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-200"
            >
              <span className="text-slate-400 dark:text-slate-500">→</span> {prompt}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wide mb-2">Custom Task</label>
        <textarea
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Describe what the agent should do..."
          className="w-full px-4 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
        />
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">Be specific about what you want the agent to accomplish.</p>
      </div>

      <button
        onClick={handleExecute}
        disabled={isExecuting || !taskInput.trim()}
        className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium transition-all duration-200 hover:from-blue-700 hover:to-blue-800 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed w-full flex items-center justify-center gap-2 text-sm font-semibold"
      >
        {isExecuting ? (
          <>
            <span className="animate-spin inline-block">⚙️</span>
            <span>Processing...</span>
          </>
        ) : (
          <>
            <span>🚀</span>
            <span>Execute Task</span>
          </>
        )}
      </button>
    </div>
  );
};
