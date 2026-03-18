import { create } from 'zustand';
import { PerformanceResult } from '../utils/fibonacci';

interface ComparisonState {
  tabulationResult: PerformanceResult | null;
  memoizationResult: PerformanceResult | null;
  inputSize: number;
  isLoading: boolean;
  error: string | null;
  setResults: (tab: PerformanceResult, memo: PerformanceResult, size: number) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const useStore = create<ComparisonState>((set) => ({
  tabulationResult: null,
  memoizationResult: null,
  inputSize: 0,
  isLoading: false,
  error: null,
  setResults: (tab, memo, size) => 
    set({ tabulationResult: tab, memoizationResult: memo, inputSize: size, isLoading: false, error: null }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error, isLoading: false }),
  reset: () => set({ tabulationResult: null, memoizationResult: null, inputSize: 0, isLoading: false, error: null }),
}));
