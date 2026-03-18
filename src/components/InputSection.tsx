import React, { useState } from 'react';
import { Play, RotateCcw } from 'lucide-react';
import { useStore } from '../store/useStore';
import { fibonacciTabulation, fibonacciMemoization, measurePerformance } from '../utils/fibonacci';

export const InputSection: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const { setResults, setLoading, setError, reset, isLoading } = useStore();

  const handleExecute = () => {
    const n = parseInt(inputValue);
    
    if (isNaN(n) || n < 0) {
      setError('Please enter a valid non-negative integer.');
      return;
    }

    if (n > 1000) {
        setError('For performance reasons, please enter a number up to 1000.');
        return;
    }

    setLoading(true);
    
    // Use setTimeout to allow the loading state to render
    setTimeout(() => {
      try {
        const tabResult = measurePerformance(fibonacciTabulation, n, 'tabulation');
        const memoResult = measurePerformance(fibonacciMemoization, n, 'memoization');
        setResults(tabResult, memoResult, n);
      } catch (err) {
        setError('An error occurred during calculation. The input might be too large.');
      }
    }, 100);
  };

  const handleReset = () => {
    setInputValue('');
    reset();
  };

  return (
    <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-md border border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1 w-full">
          <label htmlFor="fib-input" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Fibonacci Index (n)
          </label>
          <input
            id="fib-input"
            type="number"
            min="0"
            max="1000"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter a non-negative integer (e.g., 50)"
            className="w-full px-4 py-2 bg-white dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all dark:text-zinc-100 dark:placeholder:text-zinc-600"
            disabled={isLoading}
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button
            onClick={handleExecute}
            disabled={isLoading || !inputValue}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20"
          >
            <Play size={18} />
            {isLoading ? 'Executing...' : 'Compare'}
          </button>
          <button
            onClick={handleReset}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            <RotateCcw size={18} />
          </button>
        </div>
      </div>
      <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
        Enter a number to compare Tabulation (bottom-up) and Memoization (top-down) performance.
      </p>
    </div>
  );
};
