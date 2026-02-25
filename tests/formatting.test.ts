import { describe, it, expect } from 'bun:test'
import {
  formatWithCommas,
  formatCurrency,
  toScientific,
  formatPercent,
} from '../src/index'

describe('formatWithCommas', () => {
  // Basic positive integers
  it('formats a 7-digit number', () => {
    expect(formatWithCommas(1234567)).toBe('1,234,567')
  })

  it('formats a 4-digit number', () => {
    expect(formatWithCommas(1234)).toBe('1,234')
  })

  it('does not add commas to 3-digit number', () => {
    expect(formatWithCommas(123)).toBe('123')
  })

  // Zero
  it('returns "0" for zero', () => {
    expect(formatWithCommas(0)).toBe('0')
  })

  // Negative numbers
  it('handles negative numbers', () => {
    expect(formatWithCommas(-1234)).toBe('-1,234')
  })

  it('handles large negative numbers', () => {
    expect(formatWithCommas(-1234567)).toBe('-1,234,567')
  })

  // Decimals
  it('preserves decimal part unchanged', () => {
    expect(formatWithCommas(1234.5678)).toBe('1,234.5678')
  })

  it('preserves decimal for small numbers', () => {
    expect(formatWithCommas(0.1234)).toBe('0.1234')
  })

  it('handles negative decimal numbers', () => {
    expect(formatWithCommas(-1234.5678)).toBe('-1,234.5678')
  })

  // Very large numbers
  it('handles very large numbers', () => {
    expect(formatWithCommas(1e15)).toBe('1,000,000,000,000,000')
  })

  // Edge cases: NaN, Infinity
  it('returns "NaN" for NaN', () => {
    expect(formatWithCommas(NaN)).toBe('NaN')
  })

  it('returns "Infinity" for Infinity', () => {
    expect(formatWithCommas(Infinity)).toBe('Infinity')
  })

  it('returns "-Infinity" for -Infinity', () => {
    expect(formatWithCommas(-Infinity)).toBe('-Infinity')
  })
})

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

describe('formatPercent', () => {
  // Basic formatting
  it('formats a ratio as a percentage', () => {
    expect(formatPercent(0.1234)).toBe('12.34%')
    expect(formatPercent(0.5)).toBe('50.00%')
    expect(formatPercent(1.0)).toBe('100.00%')
  })

  // Default decimals
  it('defaults to 2 decimal places', () => {
    expect(formatPercent(0.1)).toBe('10.00%')
    expect(formatPercent(0.12345)).toBe('12.35%')
  })

  // Custom decimals
  it('supports 0 decimal places with rounding', () => {
    expect(formatPercent(0.126, 0)).toBe('13%')
    expect(formatPercent(0.5, 0)).toBe('50%')
  })

  it('supports 1 decimal place', () => {
    expect(formatPercent(0.1234, 1)).toBe('12.3%')
  })

  it('supports 4 decimal places', () => {
    expect(formatPercent(0.123456, 4)).toBe('12.3456%')
  })

  // Zero
  it('returns "0.00%" for zero', () => {
    expect(formatPercent(0)).toBe('0.00%')
  })

  it('returns "0%" for zero with 0 decimals', () => {
    expect(formatPercent(0, 0)).toBe('0%')
  })

  // Negative numbers
  it('handles negative numbers', () => {
    expect(formatPercent(-0.1234)).toBe('-12.34%')
  })

  it('handles -100%', () => {
    expect(formatPercent(-1.0)).toBe('-100.00%')
  })

  // Edge cases: NaN, Infinity
  it('returns "NaN%" for NaN', () => {
    expect(formatPercent(NaN)).toBe('NaN%')
  })

  it('returns "Infinity%" for Infinity', () => {
    expect(formatPercent(Infinity)).toBe('Infinity%')
  })

  it('returns "-Infinity%" for -Infinity', () => {
    expect(formatPercent(-Infinity)).toBe('-Infinity%')
  })
})
