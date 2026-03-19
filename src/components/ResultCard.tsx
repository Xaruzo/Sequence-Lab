import React from 'react';
import { PerformanceResult } from '../utils/fibonacci';
import { Clock, ListOrdered, CheckCircle2 } from 'lucide-react';

interface ResultCardProps {
  result: PerformanceResult;
  isFaster?: boolean;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result, isFaster }) => {
  const isTabulation = result.algorithm === 'tabulation';
  
  return (
    <div className={`relative flex flex-col h-full bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-md border-2 transition-all duration-300 ${
      isFaster 
        ? 'border-green-500 bg-green-50/10 dark:bg-green-500/5' 
        : 'border-zinc-200 dark:border-zinc-800'
    }`}>
      {isFaster && (
        <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
          <CheckCircle2 size={12} />
          FASTER
        </div>
      )}
      
      <div className="mb-4">
        <h3 className={`text-lg font-bold ${isTabulation ? 'text-blue-600 dark:text-blue-400' : 'text-purple-600 dark:text-purple-400'}`}>
          {isTabulation ? 'Tabulation' : 'Memoization'}
        </h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
          {isTabulation ? 'Bottom-Up Approach' : 'Top-Down Approach'}
        </p>
      </div>

      <div className="space-y-4 flex-grow">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${isTabulation ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-purple-100 dark:bg-purple-900/30'}`}>
            <Clock size={18} className={isTabulation ? 'text-blue-600 dark:text-blue-400' : 'text-purple-600 dark:text-purple-400'} />
          </div>
          <div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 uppercase font-bold tracking-wider">Execution Time</p>
            <p className="text-lg font-mono font-bold text-zinc-800 dark:text-zinc-200">
              {result.executionTime.toFixed(4)} <span className="text-sm font-normal">ms</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
            <ListOrdered size={18} className="text-zinc-600 dark:text-zinc-400" />
          </div>
          <div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 uppercase font-bold tracking-wider">Sequence (F₀ to Fₙ)</p>
            <p className="text-lg font-mono font-bold text-zinc-800 dark:text-zinc-200">{result.inputSize + 1} terms</p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
          <p className="text-xs text-zinc-500 dark:text-zinc-400 uppercase font-bold tracking-wider mb-2">Partial Sequence</p>
          <div className="bg-zinc-50 dark:bg-zinc-950 rounded-lg p-3 max-h-32 overflow-y-auto font-mono text-xs leading-relaxed text-zinc-700 dark:text-zinc-300 break-all border border-zinc-100 dark:border-zinc-800">
            {result.sequence.length > 50 
              ? `${result.sequence.slice(0, 50).map(b => b.toString()).join(', ')} ... [and ${result.sequence.length - 50} more]`
              : result.sequence.map(b => b.toString()).join(', ')
            }
          </div>
        </div>
      </div>
    </div>
  );
};
