export interface PerformanceResult {
  algorithm: 'tabulation' | 'memoization';
  executionTime: number; // in milliseconds
  sequence: bigint[];
  inputSize: number;
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
  
  // Single top-down call fills the memo array from n down to base cases
  fib(n);
  
  // Convert the memoized array to a complete sequence
  // In a realistic scenario, memo[0] and memo[1] might not be set by fib(n) 
  // if n is large and they were already set, but here we set them manually.
  return Array.from({ length: n + 1 }, (_, i) => memo[i]);
}

export function measurePerformance(
  fn: (n: number) => bigint[],
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
