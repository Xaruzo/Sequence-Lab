import React from 'react';
import { useStore } from '../store/useStore';
import { Zap, AlertCircle, TrendingUp, Cpu } from 'lucide-react';

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
  
  const totalTime = tabTime + memoTime;
  const ratio = tabTime > memoTime ? tabTime / memoTime : memoTime / tabTime;
  const isTabFaster = tabTime < memoTime;
  const faster = isTabFaster ? 'Tabulation' : 'Memoization';
  const slower = isTabFaster ? 'Memoization' : 'Tabulation';
  
  const tabPercent = (tabTime / totalTime) * 100;
  const memoPercent = (memoTime / totalTime) * 100;

  return (
    <div className="relative overflow-hidden bg-white dark:bg-zinc-900/50 text-zinc-900 dark:text-zinc-100 p-6 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4 group hover:shadow-2xl hover:border-blue-500/30 dark:hover:border-blue-400/20">
      {/* Background Decorative Element */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-500/5 dark:bg-blue-400/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-colors duration-500" />
      <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-purple-500/5 dark:bg-purple-400/5 rounded-full blur-3xl group-hover:bg-purple-500/10 transition-colors duration-500" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600 dark:text-blue-400">
              <Zap size={18} fill="currentColor" className="animate-pulse" />
            </div>
            <h3 className="text-lg font-bold tracking-tight bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400 bg-clip-text text-transparent">
              Performance Summary
            </h3>
          </div>
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-600">
            Real-time Metrics
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-100 dark:border-zinc-800/50 p-4 rounded-xl transition-all duration-300 hover:border-zinc-200 dark:hover:border-zinc-700">
            <div className="flex items-start gap-3">
              <TrendingUp className="text-green-500 mt-1" size={16} />
              <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                <span className="text-zinc-900 dark:text-white font-bold">{faster}</span> leads with an impressive{' '}
                <span className="text-green-500 dark:text-green-400 font-bold tabular-nums">{ratio.toFixed(2)}x</span> speed advantage over {slower}.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-500 dark:text-blue-400">Tabulation</span>
                <p className="text-xs font-mono text-zinc-400 tabular-nums">{tabTime.toFixed(4)}ms</p>
              </div>
              <div className="space-y-1 text-right">
                <span className="text-[10px] font-bold uppercase tracking-widest text-purple-500 dark:text-purple-400">Memoization</span>
                <p className="text-xs font-mono text-zinc-400 tabular-nums">{memoTime.toFixed(4)}ms</p>
              </div>
            </div>
            
            <div className="h-3 w-full bg-zinc-100 dark:bg-zinc-800/50 rounded-full overflow-hidden flex p-0.5 shadow-inner">
              <div 
                style={{ width: `${tabPercent}%` }} 
                className="bg-gradient-to-r from-blue-600 to-blue-400 h-full rounded-full transition-all duration-700 ease-out shadow-[0_0_15px_rgba(37,99,235,0.3)] relative group/bar"
              >
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/bar:opacity-100 transition-opacity rounded-full" />
              </div>
              <div 
                style={{ width: `${memoPercent}%` }} 
                className="bg-gradient-to-r from-purple-400 to-purple-600 h-full rounded-full transition-all duration-700 ease-out shadow-[0_0_15px_rgba(168,85,247,0.3)] ml-0.5 relative group/bar"
              >
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/bar:opacity-100 transition-opacity rounded-full" />
              </div>
            </div>
            
            <div className="flex justify-between text-[10px] text-zinc-400 dark:text-zinc-500 font-mono font-medium">
              <span>{tabPercent.toFixed(1)}% Relative Cost</span>
              <span>{memoPercent.toFixed(1)}% Relative Cost</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-100 dark:border-zinc-800/50">
            <div className="group/metric p-3 rounded-xl bg-zinc-50/50 dark:bg-zinc-950/30 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800 transition-all duration-300">
              <div className="flex items-center gap-1.5 mb-1.5">
                <div className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Delta</p>
              </div>
              <p className="text-sm font-mono font-bold text-zinc-700 dark:text-zinc-300 tabular-nums">
                {Math.abs(tabTime - memoTime).toFixed(4)} <span className="text-[10px] font-normal opacity-50">ms</span>
              </p>
            </div>
            <div className="group/metric p-3 rounded-xl bg-zinc-50/50 dark:bg-zinc-950/30 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800 transition-all duration-300">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Cpu size={10} className="text-zinc-400" />
                <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Ops/ms</p>
              </div>
              <p className="text-sm font-mono font-bold text-zinc-700 dark:text-zinc-300 tabular-nums">
                {(1000 / totalTime).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
