import React from 'react';
import { useStore } from '../store/useStore';
import { Zap, AlertCircle } from 'lucide-react';

export const PerformanceComparison: React.FC = () => {
  const { tabulationResult, memoizationResult, error } = useStore();

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/50 p-4 rounded-xl flex items-center gap-3 text-red-700 dark:text-red-400 shadow-sm animate-pulse transition-colors duration-300">
        <AlertCircle size={20} className="flex-shrink-0" />
        <p className="text-sm font-medium">{error}</p>
      </div>
    );
  }

  if (!tabulationResult || !memoizationResult) return null;

  const tabTime = tabulationResult.executionTime;
  const memoTime = memoizationResult.executionTime;
  
  const ratio = tabTime > memoTime ? tabTime / memoTime : memoTime / tabTime;
  const faster = tabTime < memoTime ? 'Tabulation' : 'Memoization';
  const slower = tabTime < memoTime ? 'Memoization' : 'Tabulation';
  
  const tabPercent = (tabTime / (tabTime + memoTime)) * 100;
  const memoPercent = (memoTime / (tabTime + memoTime)) * 100;

  return (
    <div className="bg-zinc-900 dark:bg-zinc-900/50 text-white p-6 rounded-xl shadow-xl border border-zinc-800 dark:border-zinc-700 transition-colors duration-300">
      <div className="flex items-center gap-2 mb-6">
        <Zap className="text-yellow-400" size={20} />
        <h3 className="text-lg font-bold tracking-tight">Performance Summary</h3>
      </div>

      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
          <p className="text-zinc-400 text-sm">
            <span className="text-white font-bold">{faster}</span> is approximately{' '}
            <span className="text-green-400 font-bold">{ratio.toFixed(2)}x</span> faster than {slower}.
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between text-xs font-bold uppercase tracking-widest">
            <span className="text-blue-400">Tabulation</span>
            <span className="text-purple-400">Memoization</span>
          </div>
          
          <div className="h-4 w-full bg-zinc-800 dark:bg-zinc-950 rounded-full overflow-hidden flex shadow-inner">
            <div 
              style={{ width: `${tabPercent}%` }} 
              className="bg-blue-500 h-full transition-all duration-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" 
            />
            <div 
              style={{ width: `${memoPercent}%` }} 
              className="bg-purple-500 h-full transition-all duration-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]" 
            />
          </div>
          
          <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
            <span>{tabPercent.toFixed(1)}% weight</span>
            <span>{memoPercent.toFixed(1)}% weight</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-zinc-800 dark:border-zinc-700">
          <div className="bg-zinc-800/50 dark:bg-zinc-950/50 p-3 rounded-lg border border-zinc-700/50 dark:border-zinc-800/50">
            <p className="text-[10px] text-zinc-500 dark:text-zinc-600 uppercase font-bold mb-1">Delta (Absolute Diff)</p>
            <p className="text-sm font-mono font-bold text-zinc-300 dark:text-zinc-400">
              {Math.abs(tabTime - memoTime).toFixed(4)} ms
            </p>
          </div>
          <div className="bg-zinc-800/50 dark:bg-zinc-950/50 p-3 rounded-lg border border-zinc-700/50 dark:border-zinc-800/50">
            <p className="text-[10px] text-zinc-500 dark:text-zinc-600 uppercase font-bold mb-1">Execution Score</p>
            <p className="text-sm font-mono font-bold text-zinc-300 dark:text-zinc-400">
              {(1000 / (tabTime + memoTime)).toFixed(2)} ops/ms
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
