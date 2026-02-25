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
  return sorted.length % 2 !== 0
    ? sorted[mid]
    : (sorted[mid - 1] + sorted[mid]) / 2
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

/** Returns the nth Fibonacci number (0-indexed). fibonacci(0)=0, fibonacci(1)=1. */
export function fibonacci(n: number): number {
  if (n === 0) return 0
  if (n === 1) return 1
  let a = 0
  let b = 1
  for (let i = 2; i <= n; i++) {
    const next = a + b
    a = b
    b = next
  }
  return b
}

// ── Currency formatting (issue 010-3) ───────────────────────────────────────

const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
}

/**
 * Formats a number as a currency string (e.g. 1234.5 → "$1,234.50").
 * @param n - The number to format
 * @param currency - ISO 4217 currency code (default: "USD")
 * @throws Error if currency code is unknown
 */
export function formatCurrency(n: number, currency?: string): string {
  if (Number.isNaN(n)) return 'NaN'
  if (!Number.isFinite(n)) return n > 0 ? 'Infinity' : '-Infinity'

  const code = currency ?? 'USD'
  const symbol = CURRENCY_SYMBOLS[code]
  if (symbol === undefined) {
    throw new Error(`Unknown currency code: ${code}`)
  }

  const isNegative = n < 0
  const abs = Math.abs(n)
  const fixed = abs.toFixed(2)
  const [intPart, decPart] = fixed.split('.')
  const withCommas = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  return `${(isNegative ? '-' : '') + symbol + withCommas}.${decPart}`
}

// ── Variance (issue 009-2) ──────────────────────────────────────────────────

/** Returns the variance of an array of numbers. Population by default; pass { sample: true } for sample variance. */
export function variance(nums: number[], opts?: { sample?: boolean }): number {
  if (nums.length === 0)
    throw new Error('Cannot compute variance of empty array')
  if (opts?.sample && nums.length < 2)
    throw new Error('Sample variance requires at least two data points')
  const avg = mean(nums)
  const sumSqDev = nums.reduce((sum, n) => sum + (n - avg) ** 2, 0)
  return sumSqDev / (opts?.sample ? nums.length - 1 : nums.length)
}

// ── Formatting (issue 010-4) ────────────────────────────────────────────────

/** Formats a number in scientific notation. Omit precision to use JS default. */
export function toScientific(n: number, precision?: number): string {
  if (Number.isNaN(n)) return 'NaN'
  if (n === Infinity) return 'Infinity'
  if (n === -Infinity) return '-Infinity'
  return precision === undefined
    ? n.toExponential()
    : n.toExponential(precision)
}

// ── Percentage formatting (issue 010-2) ──────────────────────────────────────

/**
 * Formats a ratio as a percentage string (e.g. 0.1234 → "12.34%").
 * @param n - The ratio to format (0.5 = 50%)
 * @param decimals - Decimal places in the result (default: 2)
 */
export function formatPercent(n: number, decimals?: number): string {
  if (Number.isNaN(n)) return 'NaN%'
  if (!Number.isFinite(n)) return n > 0 ? 'Infinity%' : '-Infinity%'

  const d = decimals ?? 2
  return `${(n * 100).toFixed(d)}%`
}

// ── Range and clamp (issue 012) ──────────────────────────────────────────────

/**
 * Generates an array of numbers from start (inclusive) to end (exclusive).
 * When step is omitted, defaults to 1 if start < end, -1 if start > end.
 * Throws if step is 0. Returns an empty array if step direction conflicts with start→end direction.
 */
export function range(start: number, end: number, step?: number): number[] {
  if (step === 0) throw new Error('Step cannot be zero')

  const inferredStep = step ?? (start <= end ? 1 : -1)
  const result: number[] = []

  if (inferredStep > 0) {
    for (let i = start; i < end; i += inferredStep) {
      result.push(i)
    }
  } else {
    for (let i = start; i > end; i += inferredStep) {
      result.push(i)
    }
  }

  return result
}

/**
 * Constrains value to the inclusive range [min, max].
 * Throws if min > max.
 */
export function clamp(value: number, min: number, max: number): number {
  if (min > max) throw new Error('min must not be greater than max')
  return Math.max(min, Math.min(max, value))
}

/**
 * Returns true if value is within [min, max] (inclusive).
 * Throws if min > max.
 */
export function inRange(value: number, min: number, max: number): boolean {
  if (min > max) throw new Error('min must not be greater than max')
  return value >= min && value <= max
}

// ── Mode (issue 003) ─────────────────────────────────────────────────────────

/**
 * Returns the most frequently occurring value(s) in an array, sorted ascending.
 * If multiple values share the highest frequency, all are returned (ties).
 * Throws on empty array.
 */
export function mode(nums: number[]): number[] {
  if (nums.length === 0) throw new Error('Cannot compute mode of empty array')

  const freq = new Map<number, number>()
  for (const n of nums) {
    freq.set(n, (freq.get(n) ?? 0) + 1)
  }

  const maxFreq = Math.max(...freq.values())
  const modes: number[] = []
  for (const [n, count] of freq) {
    if (count === maxFreq) modes.push(n)
  }

  return modes.sort((a, b) => a - b)
}

// ── Rounding utilities (issue 011) ───────────────────────────────────────────

/**
 * Rounds n to the given number of decimal places using "round half up".
 * Handles common floating-point edge cases via Number.EPSILON nudge.
 */
export function roundTo(n: number, decimals: number): number {
  const factor = 10 ** decimals
  return Math.round((n + Number.EPSILON) * factor) / factor
}

/**
 * Ceils n to the given number of decimal places.
 * When decimals is omitted or 0, behaves like Math.ceil.
 */
export function ceil(n: number, decimals?: number): number {
  if (!decimals) return Math.ceil(n)
  const factor = 10 ** decimals
  return Math.ceil(n * factor) / factor
}

/**
 * Floors n to the given number of decimal places.
 * When decimals is omitted or 0, behaves like Math.floor.
 */
export function floor(n: number, decimals?: number): number {
  if (!decimals) return Math.floor(n)
  const factor = 10 ** decimals
  return Math.floor(n * factor) / factor
}

/**
 * Rounds n to the nearest integer using banker's rounding (round half to even).
 * When the fractional part is exactly 0.5, rounds to the nearest even integer.
 */
export function roundHalfEven(n: number): number {
  const floored = Math.floor(n)
  const fraction = n - floored

  if (fraction < 0.5) return floored
  if (fraction > 0.5) return floored + 1

  // Exactly 0.5 — round to whichever neighbour is even
  return floored % 2 === 0 ? floored : floored + 1
}

// ── Primality (issue 005) ──────────────────────────────────────────────────

/**
 * Checks whether a number is prime.
 * Returns false for non-integers, numbers less than 2, and composite numbers.
 * Uses trial division up to √n for efficiency.
 */
export function isPrime(n: number): boolean {
  if (!Number.isInteger(n) || n < 2) return false
  if (n === 2) return true
  if (n % 2 === 0) return false
  for (let i = 3; i * i <= n; i += 2) {
    if (n % i === 0) return false
  }
  return true
}

// ── Standard deviation (issue 009-1 — COMPLETED) ─────────────────────────────

/**
 * Returns the standard deviation of an array of numbers.
 * Defaults to population standard deviation (divide by N).
 * Pass `{ sample: true }` to use sample standard deviation (divide by N-1).
 * Throws on empty array or single-element array when sample=true.
 */
export function stddev(nums: number[], opts?: { sample?: boolean }): number {
  if (nums.length === 0) throw new Error('Cannot compute stddev of empty array')
  const sample = opts?.sample ?? false
  if (sample && nums.length === 1) {
    throw new Error('Cannot compute sample stddev of a single-element array')
  }
  const m = mean(nums)
  const sumSqDev = nums.reduce((acc, n) => acc + (n - m) ** 2, 0)
  const divisor = sample ? nums.length - 1 : nums.length
  return Math.sqrt(sumSqDev / divisor)
}
