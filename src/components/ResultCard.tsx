import React, { useState, useMemo } from 'react';
import { PerformanceResult } from '../utils/fibonacci';
import { Clock, ListOrdered, CheckCircle2, ChevronDown, ChevronUp, Info } from 'lucide-react';

interface ResultCardProps {
  result: PerformanceResult;
  isFaster?: boolean;
  isEqual?: boolean;
  showSequence?: boolean;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result, isFaster, isEqual, showSequence = true }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isTabulation = result.algorithm === 'tabulation';
  
  const initialLimit = 100;
  const hasMore = result.sequence.length > initialLimit;
  
  const displaySequence = useMemo(() => {
    if (!showSequence) return '';
    const seq = isExpanded ? result.sequence : result.sequence.slice(0, initialLimit);
    return seq.map(b => b.toString()).join(', ');
  }, [result.sequence, isExpanded, showSequence]);
  
  return (
    <div className={`relative flex flex-col h-full ${showSequence ? 'min-h-[550px]' : 'min-h-[360px]'} bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-md border-2 transition-all duration-300 ${
      isFaster 
        ? 'border-green-500 bg-green-50/10 dark:bg-green-500/5' 
        : isEqual
          ? 'border-blue-500/50 bg-blue-50/5 dark:bg-blue-500/5'
          : 'border-zinc-200 dark:border-zinc-800'
    }`}>
      {isFaster && (
        <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg z-20">
          <CheckCircle2 size={12} />
          FASTER
        </div>
      )}

      {isEqual && (
        <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 bg-blue-500 text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg z-20 uppercase tracking-widest">
          Equivalent
        </div>
      )}
      
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-black tracking-tight text-zinc-900 dark:text-white uppercase">
            {isTabulation ? 'Tabulation' : 'Memoization'}
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
            {isTabulation ? 'Bottom-Up Approach' : 'Top-Down Approach'}
          </p>
        </div>
        <span
          className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 cursor-help transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-700"
          title="Min can show 0.0000ms due to timer resolution and rounding. Max may spike due to JIT compilation, garbage collection, or background activity. Median/trimmed mean are more robust to outliers."
        >
          <Info size={12} className="opacity-70" />
          Accuracy
        </span>
      </div>

      <div className="space-y-4 flex-grow">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${isTabulation ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-purple-100 dark:bg-purple-900/30'}`}>
            <Clock size={18} className={isTabulation ? 'text-blue-600 dark:text-blue-400' : 'text-purple-600 dark:text-purple-400'} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-zinc-700 dark:text-zinc-300">
              Avg. Execution Time
            </p>
            <p className="text-lg font-mono font-bold text-zinc-800 dark:text-zinc-200">
              {result.executionTime.toFixed(4)} <span className="text-sm font-normal">ms</span>
            </p>
            <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-1 text-xs text-zinc-600 dark:text-zinc-400">
              <div>
                Median:{' '}
                <span className="font-mono tabular-nums text-zinc-800 dark:text-zinc-200">
                  {result.medianTime.toFixed(4)}ms
                </span>
              </div>
              <div>
                Trimmed:{' '}
                <span className="font-mono tabular-nums text-zinc-800 dark:text-zinc-200">
                  {result.trimmedMeanTime.toFixed(4)}ms
                </span>
              </div>
              <div>
                Min:{' '}
                <span className="font-mono tabular-nums text-zinc-800 dark:text-zinc-200">
                  {result.minTime.toFixed(4)}ms
                </span>
              </div>
              <div>
                Max:{' '}
                <span className="font-mono tabular-nums text-zinc-800 dark:text-zinc-200">
                  {result.maxTime.toFixed(4)}ms
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
            <ListOrdered size={18} className="text-zinc-600 dark:text-zinc-400" />
          </div>
          <div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 uppercase font-bold tracking-wider">Benchmark Data</p>
            <p className="text-sm font-mono font-bold text-zinc-800 dark:text-zinc-200 tabular-nums">
              {result.iterations}{' '}
              <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 normal-case">
                runs
              </span>
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
              Warm-up: <span className="text-zinc-700 dark:text-zinc-300 font-mono tabular-nums">{result.warmupIterations}</span> · Batch:{' '}
              <span className="text-zinc-700 dark:text-zinc-300 font-mono tabular-nums">{result.batchSize}</span>
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-semibold mt-1">
              Sequence: <span className="font-mono">{result.inputSize + 1}</span> terms <span className="font-mono opacity-80">(F0–Fn)</span>
            </p>
          </div>
        </div>

        {showSequence && (
          <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex-grow flex flex-col min-h-0">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-zinc-500 dark:text-zinc-400 uppercase font-bold tracking-wider">
                {isExpanded ? 'Full Sequence' : 'Initial Terms'}
              </p>
              {hasMore && (
                <button 
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-[10px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1 transition-colors"
                >
                  {isExpanded ? (
                    <>Show Less <ChevronUp size={12} /></>
                  ) : (
                    <>Show All {result.sequence.length} <ChevronDown size={12} /></>
                  )}
                </button>
              )}
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-950 rounded-lg p-3 flex-grow max-h-[300px] overflow-y-auto font-mono text-xs leading-relaxed text-zinc-700 dark:text-zinc-300 break-all border border-zinc-100 dark:border-zinc-800 custom-scrollbar">
              {displaySequence}
              {!isExpanded && hasMore && (
                <span className="text-zinc-400 dark:text-zinc-600 italic ml-1">... and {result.sequence.length - initialLimit} more</span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
