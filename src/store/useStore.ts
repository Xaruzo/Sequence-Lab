import { create } from 'zustand';
import { PerformanceResult } from '../utils/fibonacci';

export interface ChartDataPoint {
  n: number;
  tabulation: number;
  memoization: number;
}

interface ComparisonState {
  tabulationResult: PerformanceResult | null;
  memoizationResult: PerformanceResult | null;
  inputSize: number;
  isLoading: boolean;
  error: string | null;
  chartData: ChartDataPoint[];
  envInfo: {
    browser: string;
    os: string;
  };
  setResults: (tab: PerformanceResult, memo: PerformanceResult, size: number) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const getEnvInfo = () => {
  const ua = navigator.userAgent;
  let browser = "Unknown Browser";
  if (ua.includes("Chrome")) browser = "Chrome (V8)";
  else if (ua.includes("Firefox")) browser = "Firefox (SpiderMonkey)";
  else if (ua.includes("Safari")) browser = "Safari (JavaScriptCore)";
  else if (ua.includes("Edge")) browser = "Edge (V8)";

  let os = "Unknown OS";
  if (ua.includes("Windows")) os = "Windows";
  else if (ua.includes("Mac")) os = "macOS";
  else if (ua.includes("Linux")) os = "Linux";

  return { browser, os };
};

export const useStore = create<ComparisonState>((set) => ({
  tabulationResult: null,
  memoizationResult: null,
  inputSize: 0,
  isLoading: false,
  error: null,
  chartData: [],
  envInfo: getEnvInfo(),
  setResults: (tab, memo, size) => 
    set((state) => {
      // Avoid duplicate entries for the same n
      const newChartData = [...state.chartData.filter(d => d.n !== size), {
        n: size,
        tabulation: parseFloat(tab.executionTime.toFixed(4)),
        memoization: parseFloat(memo.executionTime.toFixed(4))
      }].sort((a, b) => a.n - b.n);

      return { 
        tabulationResult: tab, 
        memoizationResult: memo, 
        inputSize: size, 
        isLoading: false, 
        error: null,
        chartData: newChartData
      };
    }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error, isLoading: false }),
  reset: () => set({ 
    tabulationResult: null, 
    memoizationResult: null, 
    inputSize: 0, 
    isLoading: false, 
    error: null,
    chartData: [] 
  }),
}));
