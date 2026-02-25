import { describe, it, expect } from 'bun:test'
import { formatCurrency, toScientific } from '../src/index'

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
    expect(() => formatCurrency(10, 'ABC')).toThrow(
      'Unknown currency code: ABC',
    )
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

describe('toScientific', () => {
  // Basic formatting
  it('formats a positive integer', () => {
    expect(toScientific(1234)).toBe('1.234e+3')
  })

  it('formats a decimal number with default precision', () => {
    // toExponential() with no arg: as many digits as needed
    expect(toScientific(0.00456)).toBe('4.56e-3')
  })

  // Custom precision
  it('supports custom precision', () => {
    expect(toScientific(1234, 2)).toBe('1.23e+3')
  })

  it('supports precision of 0', () => {
    expect(toScientific(1234, 0)).toBe('1e+3')
  })

  // Zero
  it('returns "0e+0" for zero', () => {
    expect(toScientific(0)).toBe('0e+0')
  })

  // Negative numbers
  it('handles negative numbers', () => {
    expect(toScientific(-1234)).toBe('-1.234e+3')
  })

  // Special values
  it('returns "NaN" for NaN', () => {
    expect(toScientific(NaN)).toBe('NaN')
  })

  it('returns "Infinity" for Infinity', () => {
    expect(toScientific(Infinity)).toBe('Infinity')
  })

  it('returns "-Infinity" for negative Infinity', () => {
    expect(toScientific(-Infinity)).toBe('-Infinity')
  })
})
