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

const chartStorageKey = 'sequencelab.chartData.v1';

const loadChartData = (): ChartDataPoint[] => {
  if (typeof window === 'undefined') return [{ n: 0, tabulation: 0, memoization: 0 }];
  try {
    const raw = window.localStorage.getItem(chartStorageKey);
    if (!raw) return [{ n: 0, tabulation: 0, memoization: 0 }];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [{ n: 0, tabulation: 0, memoization: 0 }];
    const sanitized = parsed
      .map((d) => ({
        n: Number((d as any).n),
        tabulation: Number((d as any).tabulation),
        memoization: Number((d as any).memoization),
      }))
      .filter((d) => Number.isFinite(d.n) && Number.isFinite(d.tabulation) && Number.isFinite(d.memoization))
      .sort((a, b) => a.n - b.n);
    const withBaseline = sanitized.some((d) => d.n === 0)
      ? sanitized
      : [{ n: 0, tabulation: 0, memoization: 0 }, ...sanitized];
    return withBaseline.slice(-60);
  } catch {
    return [{ n: 0, tabulation: 0, memoization: 0 }];
  }
};

const saveChartData = (data: ChartDataPoint[]) => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(chartStorageKey, JSON.stringify(data));
  } catch {
    return;
  }
};

export const useStore = create<ComparisonState>((set) => ({
  tabulationResult: null,
  memoizationResult: null,
  inputSize: 0,
  isLoading: false,
  error: null,
  chartData: loadChartData(),
  envInfo: getEnvInfo(),
  setResults: (tab, memo, size) => 
    set((state) => {
      const newChartData = [...state.chartData.filter(d => d.n !== size), {
        n: size,
        tabulation: parseFloat(tab.trimmedMeanTime.toFixed(4)),
        memoization: parseFloat(memo.trimmedMeanTime.toFixed(4))
      }].sort((a, b) => a.n - b.n);
      const limited = newChartData.slice(-60);
      saveChartData(limited);

      return { 
        tabulationResult: tab, 
        memoizationResult: memo, 
        inputSize: size, 
        isLoading: false, 
        error: null,
        chartData: limited
      };
    }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error, isLoading: false }),
  reset: () => set(() => {
    const baseline = [{ n: 0, tabulation: 0, memoization: 0 }];
    saveChartData(baseline);
    return { 
      tabulationResult: null, 
      memoizationResult: null, 
      inputSize: 0, 
      isLoading: false, 
      error: null,
      chartData: baseline
    };
  }),
}));
