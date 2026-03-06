import { describe, it, expect } from 'bun:test'
import { convertWeight } from '../src/index'

describe('convertWeight', () => {
  // ── Same-unit identity ──────────────────────────────────────────────────
  it('returns same value for same-unit conversion (kg→kg)', () =>
    expect(convertWeight(5, 'kg', 'kg')).toBe(5))
  it('returns same value for same-unit conversion (lbs→lbs)', () =>
    expect(convertWeight(3.5, 'lbs', 'lbs')).toBe(3.5))
  it('returns same value for same-unit conversion (oz→oz)', () =>
    expect(convertWeight(16, 'oz', 'oz')).toBe(16))
  it('returns same value for same-unit conversion (g→g)', () =>
    expect(convertWeight(100, 'g', 'g')).toBe(100))

  // ── kg conversions ─────────────────────────────────────────────────────
  it('converts kg to lbs', () =>
    expect(convertWeight(1, 'kg', 'lbs')).toBeCloseTo(2.20462, 4))
  it('converts lbs to kg', () =>
    expect(convertWeight(1, 'lbs', 'kg')).toBeCloseTo(0.45359, 4))
  it('converts kg to oz', () =>
    expect(convertWeight(1, 'kg', 'oz')).toBeCloseTo(35.27396, 4))
  it('converts oz to kg', () =>
    expect(convertWeight(1, 'oz', 'kg')).toBeCloseTo(0.02835, 4))
  it('converts kg to g', () =>
    expect(convertWeight(1, 'kg', 'g')).toBe(1000))
  it('converts g to kg', () =>
    expect(convertWeight(1000, 'g', 'kg')).toBe(1))

  // ── lbs conversions ────────────────────────────────────────────────────
  it('converts lbs to oz', () =>
    expect(convertWeight(1, 'lbs', 'oz')).toBe(16))
  it('converts oz to lbs', () =>
    expect(convertWeight(16, 'oz', 'lbs')).toBe(1))
  it('converts lbs to g', () =>
    expect(convertWeight(1, 'lbs', 'g')).toBeCloseTo(453.59237, 4))
  it('converts g to lbs', () =>
    expect(convertWeight(453.59237, 'g', 'lbs')).toBeCloseTo(1, 4))

  // ── oz conversions ─────────────────────────────────────────────────────
  it('converts oz to g', () =>
    expect(convertWeight(1, 'oz', 'g')).toBeCloseTo(28.34952, 4))
  it('converts g to oz', () =>
    expect(convertWeight(28.349523125, 'g', 'oz')).toBeCloseTo(1, 4))

  // ── Edge cases ─────────────────────────────────────────────────────────
  it('converts zero correctly', () =>
    expect(convertWeight(0, 'kg', 'lbs')).toBe(0))
  it('converts very large numbers', () =>
    expect(convertWeight(1e12, 'g', 'kg')).toBe(1e9))
  it('converts very small numbers', () =>
    expect(convertWeight(0.001, 'kg', 'g')).toBe(1))
  it('handles negative values (mathematically valid)', () =>
    expect(convertWeight(-1, 'kg', 'g')).toBe(-1000))

  // ── Error handling ─────────────────────────────────────────────────────
  it('throws on invalid source unit', () =>
    expect(() => convertWeight(1, 'stone' as any, 'kg')).toThrow())
  it('throws on invalid target unit', () =>
    expect(() => convertWeight(1, 'kg', 'stone' as any)).toThrow())
})
