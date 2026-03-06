import { describe, it, expect } from 'bun:test'
import { toScientific } from '../src/index'

describe('toScientific', () => {
  describe('default precision (2)', () => {
    it('formats a large number', () => expect(toScientific(1234.56)).toBe('1.23e+3'))
    it('formats a million', () => expect(toScientific(1000000)).toBe('1.00e+6'))
    it('formats a number with rounding', () => expect(toScientific(9876543210)).toBe('9.88e+9'))
    it('formats a small integer', () => expect(toScientific(5)).toBe('5.00e+0'))
  })

  describe('custom precision', () => {
    it('formats with precision 0', () => expect(toScientific(1234.56, 0)).toBe('1e+3'))
    it('formats with precision 1', () => expect(toScientific(1234.56, 1)).toBe('1.2e+3'))
    it('formats with precision 4', () => expect(toScientific(1234.56, 4)).toBe('1.2346e+3'))
    it('formats with higher precision than input', () => expect(toScientific(5, 4)).toBe('5.0000e+0'))
  })

  describe('edge cases', () => {
    it('formats zero', () => expect(toScientific(0)).toBe('0.00e+0'))
    it('formats negative numbers', () => expect(toScientific(-1234.56)).toBe('-1.23e+3'))
    it('formats negative zero', () => expect(toScientific(-0)).toBe('0.00e+0'))
    it('formats very large exponents', () => expect(toScientific(1e100)).toBe('1.00e+100'))
    it('formats very small positive numbers', () => expect(toScientific(1e-100)).toBe('1.00e-100'))
    it('formats numbers between 0 and 1', () => expect(toScientific(0.00456)).toBe('4.56e-3'))
    it('formats negative small numbers', () => expect(toScientific(-0.00456)).toBe('-4.56e-3'))
  })
})
