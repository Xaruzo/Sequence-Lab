import React, { useState } from 'react';
import { Play, RotateCcw, SlidersHorizontal, ChevronDown, ChevronUp } from 'lucide-react';
import { useStore } from '../store/useStore';
import { fibonacciTabulation, fibonacciMemoization, measurePerformance } from '../utils/fibonacci';

export const InputSection: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [showBenchmarkControls, setShowBenchmarkControls] = useState(false);
  const [iterationsValue, setIterationsValue] = useState('500');
  const [warmupValue, setWarmupValue] = useState('50');
  const [batchSizeValue, setBatchSizeValue] = useState('10');
  const { setResults, setLoading, setError, reset, isLoading } = useStore();

  const handleExecute = () => {
    const n = parseInt(inputValue);
    
    if (isNaN(n) || n < 0) {
      setError('Please enter a valid non-negative integer.');
      return;
    }

    if (n > 5000) {
        setError('For performance reasons, please enter a number up to 5000.');
        return;
    }

    setLoading(true);
    
    // Use setTimeout to allow the loading state to render
    setTimeout(() => {
      try {
        const parsedIterations = Number(iterationsValue);
        const parsedWarmup = Number(warmupValue);
        const parsedBatchSize = Number(batchSizeValue);

        if (!Number.isFinite(parsedIterations) || !Number.isFinite(parsedWarmup) || !Number.isFinite(parsedBatchSize)) {
          setError('Benchmark settings must be valid numbers.');
          return;
        }

        const iterations = Math.floor(parsedIterations);
        const warmupIterations = Math.floor(parsedWarmup);
        const batchSize = Math.floor(parsedBatchSize);

        if (iterations < 50 || iterations > 2000) {
          setError('Iterations must be between 50 and 2000.');
          return;
        }

        if (warmupIterations < 0 || warmupIterations > 500) {
          setError('Warm-up must be between 0 and 500.');
          return;
        }

        if (batchSize < 1 || batchSize > 100) {
          setError('Batch size must be between 1 and 100.');
          return;
        }

        const effectiveBatchSize = Math.min(batchSize, iterations);
        const tabResult = measurePerformance(fibonacciTabulation, n, 'tabulation', iterations, warmupIterations, effectiveBatchSize);
        const memoResult = measurePerformance(fibonacciMemoization, n, 'memoization', iterations, warmupIterations, effectiveBatchSize);
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
          <label htmlFor="fib-input" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1 whitespace-nowrap">
            Fibonacci Index (n)
          </label>
          <input
            id="fib-input"
            type="number"
            min="0"
            max="5000"
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
            className="flex-1 md:w-32 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20 whitespace-nowrap"
          >
            {isLoading ? (
              <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Play size={18} />
            )}
            <span>{isLoading ? 'Executing' : 'Compare'}</span>
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
      <div className="mt-4">
        <button
          type="button"
          onClick={() => setShowBenchmarkControls((v) => !v)}
          className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-950/40 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100/70 dark:hover:bg-zinc-950/60 transition-colors"
          disabled={isLoading}
        >
          <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
            <SlidersHorizontal size={14} className="opacity-80" />
            Benchmark Controls
          </span>
          {showBenchmarkControls ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {showBenchmarkControls && (
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Iterations
              </label>
              <input
                type="number"
                min="50"
                max="2000"
                value={iterationsValue}
                onChange={(e) => setIterationsValue(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm font-mono text-zinc-900 dark:text-zinc-100"
                disabled={isLoading}
              />
              <p className="text-[10px] text-zinc-400 dark:text-zinc-500">
                Avg time uses this many measured runs.
              </p>
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Warm-up
              </label>
              <input
                type="number"
                min="0"
                max="500"
                value={warmupValue}
                onChange={(e) => setWarmupValue(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm font-mono text-zinc-900 dark:text-zinc-100"
                disabled={isLoading}
              />
              <p className="text-[10px] text-zinc-400 dark:text-zinc-500">
                Runs before timing to reduce JIT noise.
              </p>
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Batch Size
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={batchSizeValue}
                onChange={(e) => setBatchSizeValue(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm font-mono text-zinc-900 dark:text-zinc-100"
                disabled={isLoading}
              />
              <p className="text-[10px] text-zinc-400 dark:text-zinc-500">
                Runs per timer window (lower overhead).
              </p>
            </div>
          </div>
        )}
      </div>
      <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
        Enter a number to compare Tabulation (bottom-up) and Memoization (top-down) performance.
      </p>
    </div>
  );
};
