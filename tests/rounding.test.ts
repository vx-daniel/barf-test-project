import { describe, expect, it } from 'bun:test'
import { ceil, floor, roundHalfEven, roundTo } from '../src/index'

describe('roundTo', () => {
  it('rounds to 2 decimal places', () => {
    expect(roundTo(1.2345, 2)).toBe(1.23)
  })

  it('rounds up when next digit ≥ 5', () => {
    expect(roundTo(1.235, 2)).toBe(1.24)
  })

  it('rounds to 0 decimal places', () => {
    expect(roundTo(1.5, 0)).toBe(2)
    expect(roundTo(1.4, 0)).toBe(1)
  })

  it('rounds to 3 decimal places', () => {
    expect(roundTo(3.14159, 3)).toBe(3.142)
  })

  it('handles negative numbers', () => {
    // JS Math.round(-123.5) === -123 (rounds toward +∞), so -1.235 → -1.23
    expect(roundTo(-1.235, 2)).toBe(-1.23)
    expect(roundTo(-1.236, 2)).toBe(-1.24)
    expect(roundTo(-1.234, 2)).toBe(-1.23)
  })

  // Floating-point edge cases
  it('handles 1.005 to 2 decimal places correctly', () => {
    // Simple multiplier approach fails: Math.round(1.005 * 100) / 100 === 1.00
    // String-exponential approach gives the mathematically expected result
    expect(roundTo(1.005, 2)).toBe(1.01)
  })

  it('handles large numbers', () => {
    expect(roundTo(123456.789, 1)).toBe(123456.8)
    expect(roundTo(1e15 + 0.5, 0)).toBe(1e15 + 1)
  })

  it('avoids returning negative zero', () => {
    const result = roundTo(-0.004, 2)
    expect(result).toBe(0)
    // Object.is distinguishes -0 from +0; we want +0
    expect(Object.is(result, -0)).toBe(false)
  })
})

describe('ceil', () => {
  it('ceiling to 1 decimal place', () => {
    expect(ceil(1.21, 1)).toBe(1.3)
  })

  it('ceiling to 0 decimal places (default)', () => {
    expect(ceil(1.2)).toBe(2)
  })

  it('handles negative numbers', () => {
    expect(ceil(-1.5)).toBe(-1)
  })

  it('exact value stays the same', () => {
    expect(ceil(2.0, 1)).toBe(2.0)
  })

  it('handles 0 decimal places explicitly', () => {
    expect(ceil(3.001, 0)).toBe(4)
    expect(ceil(-3.001, 0)).toBe(-3)
  })

  it('handles 2 decimal places', () => {
    expect(ceil(1.001, 2)).toBe(1.01)
  })
})

describe('floor', () => {
  it('floor to 1 decimal place', () => {
    expect(floor(1.29, 1)).toBe(1.2)
  })

  it('floor to 0 decimal places (default)', () => {
    expect(floor(1.9)).toBe(1)
  })

  it('handles negative numbers', () => {
    expect(floor(-1.1)).toBe(-2)
  })

  it('exact value stays the same', () => {
    expect(floor(2.0, 1)).toBe(2.0)
  })

  it('handles 0 decimal places explicitly', () => {
    expect(floor(3.999, 0)).toBe(3)
    expect(floor(-3.001, 0)).toBe(-4)
  })

  it('handles 2 decimal places', () => {
    expect(floor(1.999, 2)).toBe(1.99)
  })
})

describe('roundHalfEven (banker\'s rounding)', () => {
  it('rounds 0.5 to 0 (nearest even)', () => {
    expect(roundHalfEven(0.5)).toBe(0)
  })

  it('rounds 1.5 to 2 (nearest even)', () => {
    expect(roundHalfEven(1.5)).toBe(2)
  })

  it('rounds 2.5 to 2 (nearest even)', () => {
    expect(roundHalfEven(2.5)).toBe(2)
  })

  it('rounds 3.5 to 4 (nearest even)', () => {
    expect(roundHalfEven(3.5)).toBe(4)
  })

  it('rounds -0.5 to 0 (nearest even)', () => {
    expect(roundHalfEven(-0.5)).toBe(0)
  })

  it('rounds -1.5 to -2 (nearest even)', () => {
    expect(roundHalfEven(-1.5)).toBe(-2)
  })

  it('uses Math.round for non-.5 fractions', () => {
    expect(roundHalfEven(1.4)).toBe(1)
    expect(roundHalfEven(1.6)).toBe(2)
    expect(roundHalfEven(-1.4)).toBe(-1)
    expect(roundHalfEven(-1.6)).toBe(-2)
  })

  it('leaves integers unchanged', () => {
    expect(roundHalfEven(0)).toBe(0)
    expect(roundHalfEven(3)).toBe(3)
    expect(roundHalfEven(-4)).toBe(-4)
  })
})
