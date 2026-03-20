import React, { useMemo, useState } from 'react';
import { ChevronDown, ChevronUp, ListOrdered } from 'lucide-react';

interface FibonacciSeriesProps {
  sequence: bigint[];
  n: number;
}

export const FibonacciSeries: React.FC<FibonacciSeriesProps> = ({ sequence, n }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const initialLimit = 120;
  const hasMore = sequence.length > initialLimit;

  const displaySequence = useMemo(() => {
    const seq = isExpanded ? sequence : sequence.slice(0, initialLimit);
    return seq.map((b) => b.toString()).join(', ');
  }, [sequence, isExpanded]);

  return (
    <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-md border border-zinc-200 dark:border-zinc-800 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg text-amber-700 dark:text-amber-400">
            <ListOrdered size={18} className="animate-pulse" />
          </div>
          <div>
            <h3 className="text-lg font-bold tracking-tight text-amber-800 dark:text-amber-300">
              Fibonacci Series
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
              Output is identical for Tabulation and Memoization.
            </p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-semibold">
            Range <span className="font-mono">(F0–Fn)</span>
          </p>
          <p className="text-sm font-mono font-bold text-zinc-800 dark:text-zinc-200 tabular-nums">
            n={n} · {n + 1} terms
          </p>
        </div>
      </div>

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
              <>
                Show Less <ChevronUp size={12} />
              </>
            ) : (
              <>
                Show All {sequence.length} <ChevronDown size={12} />
              </>
            )}
          </button>
        )}
      </div>

      <div className="bg-zinc-50 dark:bg-zinc-950 rounded-lg p-4 max-h-[360px] overflow-y-auto font-mono text-xs leading-relaxed text-zinc-700 dark:text-zinc-300 break-all border border-zinc-100 dark:border-zinc-800 custom-scrollbar">
        {displaySequence}
        {!isExpanded && hasMore && (
          <span className="text-zinc-400 dark:text-zinc-600 italic ml-1">
            ... and {sequence.length - initialLimit} more
          </span>
        )}
      </div>
    </div>
  );
};

