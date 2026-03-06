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

// ── Length conversions (issue 013) ──────────────────────────────────────────

/** Supported length units. */
export type LengthUnit = 'm' | 'km' | 'mi' | 'ft' | 'in'

/** Factor to convert each unit to meters (base unit). */
const LENGTH_TO_METERS: Record<LengthUnit, number> = {
  m: 1,
  km: 1000,
  mi: 1609.344,
  ft: 0.3048,
  in: 0.0254,
}

/**
 * Converts a length value from one unit to another.
 * Supported units: m, km, mi, ft, in.
 * Throws on unrecognised unit.
 */
export function convertLength(value: number, from: LengthUnit, to: LengthUnit): number {
  const fromFactor = LENGTH_TO_METERS[from]
  const toFactor = LENGTH_TO_METERS[to]
  if (fromFactor == null) throw new Error(`Unknown length unit: ${from}`)
  if (toFactor == null) throw new Error(`Unknown length unit: ${to}`)
  return value * (fromFactor / toFactor)
}

// ── Weight conversions (issue 014) ──────────────────────────────────────────

/** Supported weight units. */
export type WeightUnit = 'kg' | 'lbs' | 'oz' | 'g'

/** Factor to convert each unit to grams (base unit). */
const WEIGHT_TO_GRAMS: Record<WeightUnit, number> = {
  g: 1,
  kg: 1000,
  lbs: 453.59237,
  oz: 28.349523125,
}

/**
 * Converts a weight value from one unit to another.
 * Supported units: kg, lbs, oz, g.
 * Throws on unrecognised unit.
 */
export function convertWeight(value: number, from: WeightUnit, to: WeightUnit): number {
  const fromFactor = WEIGHT_TO_GRAMS[from]
  const toFactor = WEIGHT_TO_GRAMS[to]
  if (fromFactor == null) throw new Error(`Unknown weight unit: ${from}`)
  if (toFactor == null) throw new Error(`Unknown weight unit: ${to}`)
  return value * (fromFactor / toFactor)
}

// ── Volume conversions (issue 015) ──────────────────────────────────────────

/** Supported volume units. */
export type VolumeUnit = 'l' | 'ml' | 'gal' | 'cup'

/** Factor to convert each unit to liters (base unit). */
const VOLUME_TO_LITERS: Record<VolumeUnit, number> = {
  l: 1,
  ml: 0.001,
  gal: 3.785411784,
  cup: 0.2365882365,
}

/**
 * Converts a volume value from one unit to another.
 * Supported units: l, ml, gal, cup.
 * Throws on unrecognised unit.
 */
export function convertVolume(value: number, from: VolumeUnit, to: VolumeUnit): number {
  const fromFactor = VOLUME_TO_LITERS[from]
  const toFactor = VOLUME_TO_LITERS[to]
  if (fromFactor == null) throw new Error(`Unknown volume unit: ${from}`)
  if (toFactor == null) throw new Error(`Unknown volume unit: ${to}`)
  return value * (fromFactor / toFactor)
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

// ── Percentage formatting (issue 018) ────────────────────────────────────────

/**
 * Formats a number as a percentage string.
 * Multiplies by 100 and appends '%'. Optional `decimals` controls
 * the number of decimal places (default: 0).
 * Examples: 0.5 → '50%', 0.5 with decimals=2 → '50.00%'
 */
export function formatPercent(n: number, decimals = 0): string {
  return (n * 100).toFixed(decimals) + '%'
}

// ── Number formatting (issue 017) ────────────────────────────────────────────

/**
 * Formats a number with commas as thousand separators.
 * Handles negative numbers and preserves decimal places.
 * Examples: 1234 → '1,234', -1234.56 → '-1,234.56'
 */
export function formatWithCommas(n: number): string {
  const str = String(n)
  const dotIdx = str.indexOf('.')
  const intPart = dotIdx === -1 ? str : str.slice(0, dotIdx)
  const decPart = dotIdx === -1 ? '' : str.slice(dotIdx)
  const sign = intPart.startsWith('-') ? '-' : ''
  const digits = sign ? intPart.slice(1) : intPart
  const withCommas = digits.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return sign + withCommas + decPart
}

// ── Scientific notation (issue 020) ─────────────────────────────────────────

/**
 * Formats a number in scientific notation.
 * Optional `precision` controls the number of mantissa decimal digits (default: 2).
 * Examples: 1234.56 → '1.23e+3', 0 → '0.00e+0'
 */
export function toScientific(n: number, precision = 2): string {
  // Normalise -0 to 0 to avoid '-0.00e+0'
  const value = Object.is(n, -0) ? 0 : n
  return value.toExponential(precision)
}

// ── Generic conversion API (issue 016) ─────────────────────────────────────

/** All supported units across every conversion category. */
export type Unit = LengthUnit | WeightUnit | VolumeUnit

type Category = 'length' | 'weight' | 'volume'

/** Maps every known unit string to its category. Built from the factor tables. */
function unitCategory(unit: string): Category {
  if (unit in LENGTH_TO_METERS) return 'length'
  if (unit in WEIGHT_TO_GRAMS) return 'weight'
  if (unit in VOLUME_TO_LITERS) return 'volume'
  throw new Error(`Unknown unit: ${unit}`)
}

/**
 * Converts a value from one unit to another.
 * Automatically detects the conversion category (length, weight, volume)
 * and dispatches to the appropriate converter.
 * Throws on unknown units or cross-category conversions (e.g. kg → meters).
 */
export function convert(value: number, from: string, to: string): number {
  const fromCat = unitCategory(from)
  const toCat = unitCategory(to)
  if (fromCat !== toCat) {
    throw new Error(`Cannot convert between ${fromCat} and ${toCat}`)
  }
  switch (fromCat) {
    case 'length': return convertLength(value, from as LengthUnit, to as LengthUnit)
    case 'weight': return convertWeight(value, from as WeightUnit, to as WeightUnit)
    case 'volume': return convertVolume(value, from as VolumeUnit, to as VolumeUnit)
  }
}
