import { describe, it, expect } from 'bun:test'
import { formatCurrency } from '../src/index'

describe('formatCurrency', () => {
  // Basic formatting
  it('formats a number as a USD currency string', () => {
    expect(formatCurrency(1234.5)).toBe('$1,234.50')
  })

  it('formats an integer with .00 decimal', () => {
    expect(formatCurrency(1000)).toBe('$1,000.00')
  })

  it('formats zero as "$0.00"', () => {
    expect(formatCurrency(0)).toBe('$0.00')
  })

  it('formats a large number', () => {
    expect(formatCurrency(1000000)).toBe('$1,000,000.00')
  })

  it('rounds to 2 decimal places', () => {
    expect(formatCurrency(1234.5678)).toBe('$1,234.57')
  })

  // Default currency
  it('defaults to USD when currency is omitted', () => {
    expect(formatCurrency(42)).toBe('$42.00')
  })

  // Multiple currencies
  it('formats EUR with € symbol', () => {
    expect(formatCurrency(1234.5, 'EUR')).toBe('€1,234.50')
  })

  it('formats GBP with £ symbol', () => {
    expect(formatCurrency(1234.5, 'GBP')).toBe('£1,234.50')
  })

  it('formats JPY with ¥ symbol', () => {
    expect(formatCurrency(1234.5, 'JPY')).toBe('¥1,234.50')
  })

  // Unknown currency
  it('throws on unknown currency code', () => {
    expect(() => formatCurrency(10, 'XYZ')).toThrow()
  })

  it('throws on unknown currency code with descriptive message', () => {
    expect(() => formatCurrency(10, 'ABC')).toThrow('Unknown currency code: ABC')
  })

  // Negative numbers
  it('handles negative numbers', () => {
    expect(formatCurrency(-1234)).toBe('-$1,234.00')
    expect(formatCurrency(-1234, 'USD')).toBe('-$1,234.00')
  })

  it('handles small negative numbers', () => {
    expect(formatCurrency(-0.5)).toBe('-$0.50')
  })

  it('handles negative numbers with other currencies', () => {
    expect(formatCurrency(-1234.5, 'EUR')).toBe('-€1,234.50')
  })

  // Special values
  it('returns "NaN" for NaN', () => {
    expect(formatCurrency(NaN)).toBe('NaN')
  })

  it('returns "Infinity" for Infinity', () => {
    expect(formatCurrency(Infinity)).toBe('Infinity')
  })

  it('returns "-Infinity" for -Infinity', () => {
    expect(formatCurrency(-Infinity)).toBe('-Infinity')
  })
})
