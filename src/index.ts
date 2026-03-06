/**
 * Math utility library.
 * All functions are pure — no side effects.
 */

// ── Basic arithmetic (issue 001 — COMPLETED) ────────────────────────────────

/** Returns the sum of two numbers. */
export function add(a: number, b: number): number {
  return a + b
}

/** Returns the difference of two numbers. */
export function subtract(a: number, b: number): number {
  return a - b
}

/** Returns the product of two numbers. */
export function multiply(a: number, b: number): number {
  return a * b
}

/** Returns a / b. Throws if b is zero. */
export function divide(a: number, b: number): number {
  if (b === 0) throw new Error('Division by zero')
  return a / b
}

// ── Statistics (issue 002 — COMPLETED) ───────────────────────────────────────

/** Returns the arithmetic mean of an array of numbers. Throws on empty array. */
export function mean(nums: number[]): number {
  if (nums.length === 0) throw new Error('Cannot compute mean of empty array')
  return nums.reduce((sum, n) => sum + n, 0) / nums.length
}

/** Returns the median of an array of numbers. Throws on empty array. */
export function median(nums: number[]): number {
  if (nums.length === 0) throw new Error('Cannot compute median of empty array')
  const sorted = [...nums].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2
}

// ── Factorial (issue 004 — IN_PROGRESS, partial) ─────────────────────────────

/** Returns n! (factorial). Throws on negative input. */
export function factorial(n: number): number {
  if (n < 0) throw new Error('Factorial of negative number')
  if (n === 0 || n === 1) return 1
  let result = 1
  for (let i = 2; i <= n; i++) {
    result *= i
  }
  return result
}

// fibonacci — not yet implemented (part of issue 004)

// ── Standard deviation (issue 009-1) ─────────────────────────────────────────

/**
 * Returns the standard deviation of an array of numbers.
 * Defaults to population standard deviation (divide by N).
 * Pass `{ sample: true }` for sample standard deviation (divide by N-1).
 * Throws on empty array, or single-element array when sample=true.
 */
export function stddev(nums: number[], opts?: { sample?: boolean }): number {
  if (nums.length === 0) throw new Error('Cannot compute stddev of empty array')
  const sample = opts?.sample ?? false
  if (sample && nums.length === 1)
    throw new Error('Cannot compute sample stddev of single-element array')
  const m = mean(nums)
  const sumSq = nums.reduce((acc, n) => acc + (n - m) ** 2, 0)
  const divisor = sample ? nums.length - 1 : nums.length
  return Math.sqrt(sumSq / divisor)
}
