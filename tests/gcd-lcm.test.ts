import { describe, it, expect } from 'bun:test'
import { gcd, lcm } from '../src/index'

describe('gcd', () => {
  it('returns gcd of two positive numbers', () => expect(gcd(12, 8)).toBe(4))
  it('returns 1 for coprime numbers', () => expect(gcd(7, 13)).toBe(1))
  it('returns larger when one is a multiple', () => expect(gcd(100, 75)).toBe(25))
  it('handles gcd(a, 0) = |a|', () => expect(gcd(5, 0)).toBe(5))
  it('handles gcd(0, b) = |b|', () => expect(gcd(0, 7)).toBe(7))
  it('handles gcd(0, 0) = 0', () => expect(gcd(0, 0)).toBe(0))
  it('handles negative first argument', () => expect(gcd(-12, 8)).toBe(4))
  it('handles negative second argument', () => expect(gcd(12, -8)).toBe(4))
  it('handles both negative', () => expect(gcd(-12, -8)).toBe(4))
  it('handles equal inputs', () => expect(gcd(9, 9)).toBe(9))
})

describe('lcm', () => {
  it('returns lcm of two positive numbers', () => expect(lcm(4, 6)).toBe(12))
  it('returns product for coprime numbers', () => expect(lcm(7, 13)).toBe(91))
  it('returns the value when both are equal', () => expect(lcm(3, 3)).toBe(3))
  it('handles lcm(0, n) = 0', () => expect(lcm(0, 5)).toBe(0))
  it('handles lcm(n, 0) = 0', () => expect(lcm(5, 0)).toBe(0))
  it('handles lcm(0, 0) = 0', () => expect(lcm(0, 0)).toBe(0))
  it('handles negative first argument', () => expect(lcm(-4, 6)).toBe(12))
  it('handles negative second argument', () => expect(lcm(4, -6)).toBe(12))
  it('handles both negative', () => expect(lcm(-4, -6)).toBe(12))
  it('handles one being a multiple of the other', () => expect(lcm(3, 9)).toBe(9))
})
