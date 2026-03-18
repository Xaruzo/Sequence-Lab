export interface PerformanceResult {
  algorithm: 'tabulation' | 'memoization';
  executionTime: number; // in milliseconds
  sequence: number[];
  inputSize: number;
}

export function fibonacciTabulation(n: number): number[] {
  if (n < 0) return [];
  if (n === 0) return [0];
  
  const dp: number[] = new Array(n + 1);
  dp[0] = 0;
  dp[1] = 1;
  
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  
  return dp;
}

export function fibonacciMemoization(n: number): number[] {
  const memo: Map<number, number> = new Map();
  
  function fib(n: number): number {
    if (n <= 1) return n;
    if (memo.has(n)) return memo.get(n)!;
    
    const result = fib(n - 1) + fib(n - 2);
    memo.set(n, result);
    return result;
  }
  
  const result: number[] = [];
  for (let i = 0; i <= n; i++) {
    result.push(fib(i));
  }
  
  return result;
}

export function measurePerformance(
  fn: (n: number) => number[],
  n: number,
  algorithm: 'tabulation' | 'memoization'
): PerformanceResult {
  const start = performance.now();
  const sequence = fn(n);
  const end = performance.now();
  
  return {
    algorithm,
    executionTime: end - start,
    sequence,
    inputSize: n
  };
}
