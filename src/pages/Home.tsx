import React from 'react';
import { InputSection } from '../components/InputSection';
import { ResultCard } from '../components/ResultCard';
import { PerformanceComparison } from '../components/PerformanceComparison';
import { ThemeToggle } from '../components/ThemeToggle';
import { useStore } from '../store/useStore';
import { Activity, Github, Info } from 'lucide-react';

const Home: React.FC = () => {
  const { tabulationResult, memoizationResult, isLoading } = useStore();

  const fasterAlgorithm = tabulationResult && memoizationResult
    ? tabulationResult.executionTime < memoizationResult.executionTime
      ? 'tabulation'
      : 'memoization'
    : null;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans selection:bg-blue-100 dark:selection:bg-blue-900 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg text-white shadow-lg shadow-blue-500/20">
              <Activity size={20} />
            </div>
            <h1 className="text-lg font-bold tracking-tight hidden sm:block">SequenceLab</h1>
          </div>
          
          <div className="flex items-center gap-4 text-zinc-500">
            <ThemeToggle />
            <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-800" />
            <a href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
              <Github size={20} />
            </a>
            <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800" />
            <span className="text-xs font-medium uppercase tracking-widest opacity-60">v1.0.0</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        {/* Intro */}
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-zinc-50 mb-4 tracking-tight">
            Tabulation <span className="text-zinc-400 dark:text-zinc-600">vs</span> Memoization
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
            Compare the efficiency of two common dynamic programming approaches for calculating Fibonacci numbers. 
            Visualize real-time performance metrics and see which algorithm scales better.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Input and Performance Summary */}
          <div className="lg:col-span-4 space-y-6">
            <InputSection />
            <PerformanceComparison />
            
            <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/50 p-5 rounded-xl">
              <div className="flex items-start gap-3">
                <Info size={18} className="text-blue-600 dark:text-blue-400 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-blue-900 dark:text-blue-100 mb-1">Quick Note</h4>
                  <p className="text-xs text-blue-800 dark:text-blue-200/80 leading-relaxed">
                    Tabulation is a bottom-up approach that fills an array. 
                    Memoization is top-down and uses recursion with a cache. 
                    In JavaScript, Tabulation is usually faster due to recursion overhead.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Results */}
          <div className="lg:col-span-8">
            {!tabulationResult && !isLoading && (
              <div className="h-full min-h-[400px] border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl flex flex-col items-center justify-center text-zinc-400 dark:text-zinc-600 bg-white/50 dark:bg-zinc-900/50">
                <Activity size={48} className="mb-4 opacity-20" />
                <p className="font-medium">Enter a value to see the analysis</p>
              </div>
            )}

            {isLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2].map((i) => (
                  <div key={i} className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-md border border-zinc-200 dark:border-zinc-800 animate-pulse">
                    <div className="h-6 w-32 bg-zinc-200 dark:bg-zinc-800 rounded mb-4" />
                    <div className="space-y-4">
                      <div className="h-10 w-full bg-zinc-100 dark:bg-zinc-800/50 rounded" />
                      <div className="h-10 w-full bg-zinc-100 dark:bg-zinc-800/50 rounded" />
                      <div className="h-24 w-full bg-zinc-50 dark:bg-zinc-950 rounded" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tabulationResult && memoizationResult && !isLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <ResultCard 
                  result={tabulationResult} 
                  isFaster={fasterAlgorithm === 'tabulation'} 
                />
                <ResultCard 
                  result={memoizationResult} 
                  isFaster={fasterAlgorithm === 'memoization'} 
                />
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 py-8">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-zinc-500 dark:text-zinc-400 text-xs">
          <p>© 2026 SequenceLab Tool. Built for educational purposes.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Documentation</a>
            <a href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Source Code</a>
            <a href="#" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Algorithm Guide</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
