import { describe, it, expect } from 'bun:test'
import { roundTo, ceil, floor, roundHalfEven } from '../src/index'

describe('roundTo', () => {
  it('rounds to 0 decimal places', () => expect(roundTo(1.5, 0)).toBe(2))
  it('rounds to 2 decimal places', () => expect(roundTo(1.2345, 2)).toBe(1.23))
  it('rounds up when next digit >= 5', () => expect(roundTo(1.2355, 2)).toBe(1.24))
  it('handles negative numbers', () => expect(roundTo(-1.2345, 2)).toBe(-1.23))
  it('handles zero', () => expect(roundTo(0, 2)).toBe(0))
  it('handles floating-point edge case 1.005', () => expect(roundTo(1.005, 2)).toBe(1.01))
  it('rounds to 3 decimal places', () => expect(roundTo(3.14159, 3)).toBe(3.142))
  it('handles integer input', () => expect(roundTo(5, 2)).toBe(5))
})

describe('ceil', () => {
  it('ceils to integer when decimals omitted', () => expect(ceil(1.1)).toBe(2))
  it('ceils to integer when decimals is 0', () => expect(ceil(1.1, 0)).toBe(2))
  it('ceils to 2 decimal places', () => expect(ceil(1.231, 2)).toBe(1.24))
  it('returns same value if already exact', () => expect(ceil(1.5, 1)).toBe(1.5))
  it('handles negative numbers', () => expect(ceil(-1.9)).toBe(-1))
  it('handles negative with decimals', () => expect(ceil(-1.231, 2)).toBe(-1.23))
  it('handles zero', () => expect(ceil(0)).toBe(0))
  it('ceils to 1 decimal place', () => expect(ceil(1.01, 1)).toBe(1.1))
})

describe('floor', () => {
  it('floors to integer when decimals omitted', () => expect(floor(1.9)).toBe(1))
  it('floors to integer when decimals is 0', () => expect(floor(1.9, 0)).toBe(1))
  it('floors to 2 decimal places', () => expect(floor(1.239, 2)).toBe(1.23))
  it('returns same value if already exact', () => expect(floor(1.5, 1)).toBe(1.5))
  it('handles negative numbers', () => expect(floor(-1.1)).toBe(-2))
  it('handles negative with decimals', () => expect(floor(-1.231, 2)).toBe(-1.24))
  it('handles zero', () => expect(floor(0)).toBe(0))
  it('floors to 1 decimal place', () => expect(floor(1.99, 1)).toBe(1.9))
})

describe('roundHalfEven (banker\'s rounding)', () => {
  it('rounds 0.5 to 0 (even)', () => expect(roundHalfEven(0.5)).toBe(0))
  it('rounds 1.5 to 2 (even)', () => expect(roundHalfEven(1.5)).toBe(2))
  it('rounds 2.5 to 2 (even)', () => expect(roundHalfEven(2.5)).toBe(2))
  it('rounds 3.5 to 4 (even)', () => expect(roundHalfEven(3.5)).toBe(4))
  it('rounds 4.5 to 4 (even)', () => expect(roundHalfEven(4.5)).toBe(4))
  it('rounds -0.5 to 0 (even)', () => expect(roundHalfEven(-0.5)).toBe(0))
  it('rounds -1.5 to -2 (even)', () => expect(roundHalfEven(-1.5)).toBe(-2))
  it('rounds -2.5 to -2 (even)', () => expect(roundHalfEven(-2.5)).toBe(-2))
  it('rounds 1.4 down normally', () => expect(roundHalfEven(1.4)).toBe(1))
  it('rounds 1.6 up normally', () => expect(roundHalfEven(1.6)).toBe(2))
  it('handles 0', () => expect(roundHalfEven(0)).toBe(0))
  it('handles whole numbers unchanged', () => expect(roundHalfEven(3)).toBe(3))
})
