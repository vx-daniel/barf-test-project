import { describe, it, expect } from 'bun:test'
import { formatWithCommas } from '../src/index'

describe('formatWithCommas', () => {
  it('formats zero', () => expect(formatWithCommas(0)).toBe('0'))
  it('returns small numbers unchanged', () => {
    expect(formatWithCommas(1)).toBe('1')
    expect(formatWithCommas(100)).toBe('100')
    expect(formatWithCommas(999)).toBe('999')
  })
  it('adds commas to thousands', () => expect(formatWithCommas(1000)).toBe('1,000'))
  it('formats larger integers', () => {
    expect(formatWithCommas(12345)).toBe('12,345')
    expect(formatWithCommas(1000000)).toBe('1,000,000')
    expect(formatWithCommas(1234567890)).toBe('1,234,567,890')
  })
  it('handles negative numbers', () => {
    expect(formatWithCommas(-1234)).toBe('-1,234')
    expect(formatWithCommas(-1000000)).toBe('-1,000,000')
  })
  it('preserves decimal places', () => {
    expect(formatWithCommas(1234.56)).toBe('1,234.56')
    expect(formatWithCommas(1234567.89)).toBe('1,234,567.89')
  })
  it('handles small decimals without commas', () => {
    expect(formatWithCommas(0.123)).toBe('0.123')
    expect(formatWithCommas(0.001)).toBe('0.001')
  })
  it('handles negative decimals', () => {
    expect(formatWithCommas(-1234.56)).toBe('-1,234.56')
  })
})
