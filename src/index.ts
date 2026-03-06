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

// ── Mode (issue 003) ────────────────────────────────────────────────────────

/** Returns the mode(s) of an array — the most frequently occurring value(s). Throws on empty array. */
export function mode(nums: number[]): number[] {
  if (nums.length === 0) throw new Error('Cannot compute mode of empty array')
  const freq = new Map<number, number>()
  for (const n of nums) {
    freq.set(n, (freq.get(n) ?? 0) + 1)
  }
  let maxCount = 0
  for (const count of freq.values()) {
    if (count > maxCount) maxCount = count
  }
  const modes: number[] = []
  for (const [value, count] of freq) {
    if (count === maxCount) modes.push(value)
  }
  return modes.sort((a, b) => a - b)
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

// ── Primality (issue 005) ─────────────────────────────────────────────────────

/**
 * Returns true if n is a prime number, false otherwise.
 * Uses trial division up to sqrt(n) with 6k±1 optimisation.
 */
export function isPrime(n: number): boolean {
  if (n < 2) return false
  if (n < 4) return true          // 2 and 3 are prime
  if (n % 2 === 0 || n % 3 === 0) return false
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false
  }
  return true
}

// ── GCD and LCM (issue 006) ──────────────────────────────────────────────────

/**
 * Returns the greatest common divisor of two integers.
 * Uses the Euclidean algorithm. Negative inputs are treated as their
 * absolute values. gcd(0, 0) returns 0 by convention.
 */
export function gcd(a: number, b: number): number {
  a = Math.abs(a)
  b = Math.abs(b)
  while (b !== 0) {
    const t = b
    b = a % b
    a = t
  }
  return a
}

/**
 * Returns the least common multiple of two integers.
 * Uses the identity lcm(a, b) = |a / gcd(a, b)| * |b|.
 * Returns 0 if either input is 0.
 */
export function lcm(a: number, b: number): number {
  a = Math.abs(a)
  b = Math.abs(b)
  if (a === 0 || b === 0) return 0
  return (a / gcd(a, b)) * b
}

// ── Rounding (issue 011) ─────────────────────────────────────────────────────

/**
 * Rounds `n` to `decimals` decimal places.
 * Uses the string-exponential trick to avoid IEEE 754 pitfalls such as
 * `Math.round(1.005 * 100) / 100 === 1.00`.
 */
export function roundTo(n: number, decimals: number): number {
  const result = +(Math.round(+(n + 'e+' + decimals)) + 'e-' + decimals)
  // Avoid returning -0
  return result === 0 ? 0 : result
}

/**
 * Returns the ceiling of `n` rounded to `decimals` decimal places.
 * Defaults to 0 decimal places (integer ceiling).
 */
export function ceil(n: number, decimals = 0): number {
  return +(Math.ceil(+(n + 'e+' + decimals)) + 'e-' + decimals)
}

/**
 * Returns the floor of `n` rounded to `decimals` decimal places.
 * Defaults to 0 decimal places (integer floor).
 */
export function floor(n: number, decimals = 0): number {
  return +(Math.floor(+(n + 'e+' + decimals)) + 'e-' + decimals)
}

/**
 * Rounds `n` using banker's rounding (round-half-to-even).
 * When the fractional part is exactly 0.5, rounds to the nearest even integer.
 * Otherwise behaves like `Math.round`.
 */
export function roundHalfEven(n: number): number {
  const fl = Math.floor(n)
  const frac = n - fl
  if (Math.abs(frac - 0.5) < Number.EPSILON) {
    // Exactly halfway — round to nearest even
    return fl % 2 === 0 ? fl : fl + 1
  }
  return Math.round(n)
}

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
