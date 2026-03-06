import { describe, it, expect } from 'bun:test'
import { formatPercent } from '../src/index'

describe('formatPercent', () => {
  describe('default decimals (0)', () => {
    it('formats 0.5 as 50%', () => expect(formatPercent(0.5)).toBe('50%'))
    it('formats 0 as 0%', () => expect(formatPercent(0)).toBe('0%'))
    it('formats 1 as 100%', () => expect(formatPercent(1)).toBe('100%'))
    it('formats values greater than 1', () => expect(formatPercent(1.5)).toBe('150%'))
    it('formats negative values', () => expect(formatPercent(-0.25)).toBe('-25%'))
  })

  describe('custom decimal places', () => {
    it('formats with 2 decimal places', () => expect(formatPercent(0.5, 2)).toBe('50.00%'))
    it('rounds to requested precision', () => expect(formatPercent(0.12345, 1)).toBe('12.3%'))
    it('formats with 3 decimal places', () => expect(formatPercent(0.12345, 3)).toBe('12.345%'))
    it('zero with decimal places', () => expect(formatPercent(0, 2)).toBe('0.00%'))
    it('negative with decimal places', () => expect(formatPercent(-0.25, 1)).toBe('-25.0%'))
  })

  describe('edge cases', () => {
    it('formats very small values', () => expect(formatPercent(0.001)).toBe('0%'))
    it('formats very small values with precision', () => expect(formatPercent(0.001, 1)).toBe('0.1%'))
    it('formats 1/3 with precision', () => expect(formatPercent(1 / 3, 2)).toBe('33.33%'))
  })
})
