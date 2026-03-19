export interface PerformanceResult {
  algorithm: 'tabulation' | 'memoization';
  executionTime: number; // average time in milliseconds
  minTime: number;
  maxTime: number;
  sequence: bigint[];
  inputSize: number;
  iterations: number;
}

export function fibonacciTabulation(n: number): bigint[] {
  if (n < 0) return [];
  if (n === 0) return [0n];
  
  const dp: bigint[] = new Array(n + 1);
  dp[0] = 0n;
  dp[1] = 1n;
  
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  
  return dp;
}

export function fibonacciMemoization(n: number): bigint[] {
  if (n < 0) return [];
  if (n === 0) return [0n];
  
  const memo: bigint[] = new Array(n + 1);
  memo[0] = 0n;
  memo[1] = 1n;
  
  function fib(k: number): bigint {
    if (k === 0) return 0n;
    if (k === 1) return 1n;
    if (memo[k] !== undefined) return memo[k];
    
    memo[k] = fib(k - 1) + fib(k - 2);
    return memo[k];
  }
  
  fib(n);
  
  return Array.from({ length: n + 1 }, (_, i) => memo[i]);
}

export function measurePerformance(
  fn: (n: number) => bigint[],
  n: number,
  algorithm: 'tabulation' | 'memoization',
  iterations: number = 500
): PerformanceResult {
  let totalTime = 0;
  let minTime = Infinity;
  let maxTime = -Infinity;
  let lastSequence: bigint[] = [];

  // Run iterations for benchmarking
  for (let i = 0; i < iterations; i++) {
    const start = performance.now();
    lastSequence = fn(n);
    const end = performance.now();
    const duration = end - start;

    totalTime += duration;
    if (duration < minTime) minTime = duration;
    if (duration > maxTime) maxTime = duration;
  }

  return {
    algorithm,
    executionTime: totalTime / iterations,
    minTime,
    maxTime,
    sequence: lastSequence,
    inputSize: n,
    iterations
  };
}
