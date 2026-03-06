import { describe, it, expect } from 'bun:test'
import { convert } from '../src/index'

describe('convert', () => {
  // ── Dispatches to length converter ───────────────────────────────────────
  it('converts meters to feet', () =>
    expect(convert(1, 'm', 'ft')).toBeCloseTo(3.28084, 4))
  it('converts miles to km', () =>
    expect(convert(1, 'mi', 'km')).toBeCloseTo(1.60934, 4))
  it('converts inches to meters', () =>
    expect(convert(1, 'in', 'm')).toBeCloseTo(0.0254, 4))

  // ── Dispatches to weight converter ───────────────────────────────────────
  it('converts kg to lbs', () =>
    expect(convert(1, 'kg', 'lbs')).toBeCloseTo(2.20462, 4))
  it('converts oz to g', () =>
    expect(convert(1, 'oz', 'g')).toBeCloseTo(28.34952, 4))

  // ── Dispatches to volume converter ───────────────────────────────────────
  it('converts liters to gallons', () =>
    expect(convert(1, 'l', 'gal')).toBeCloseTo(0.26417, 4))
  it('converts cups to ml', () =>
    expect(convert(1, 'cup', 'ml')).toBeCloseTo(236.588, 2))

  // ── Same-unit identity ───────────────────────────────────────────────────
  it('returns same value for same-unit (m→m)', () =>
    expect(convert(5, 'm', 'm')).toBe(5))
  it('returns same value for same-unit (kg→kg)', () =>
    expect(convert(5, 'kg', 'kg')).toBe(5))
  it('returns same value for same-unit (l→l)', () =>
    expect(convert(5, 'l', 'l')).toBe(5))

  // ── Edge cases ───────────────────────────────────────────────────────────
  it('converts zero correctly', () =>
    expect(convert(0, 'kg', 'lbs')).toBe(0))
  it('handles negative values', () =>
    expect(convert(-1, 'km', 'm')).toBe(-1000))
  it('handles very large values', () =>
    expect(convert(1e12, 'g', 'kg')).toBe(1e9))

  // ── Round-trip accuracy ──────────────────────────────────────────────────
  it('round-trip length: m → ft → m', () =>
    expect(convert(convert(100, 'm', 'ft'), 'ft', 'm')).toBeCloseTo(100, 8))
  it('round-trip weight: kg → oz → kg', () =>
    expect(convert(convert(5, 'kg', 'oz'), 'oz', 'kg')).toBeCloseTo(5, 8))
  it('round-trip volume: l → gal → l', () =>
    expect(convert(convert(10, 'l', 'gal'), 'gal', 'l')).toBeCloseTo(10, 8))

  // ── Error handling ───────────────────────────────────────────────────────
  it('throws on unknown source unit', () =>
    expect(() => convert(1, 'stone' as any, 'kg')).toThrow('Unknown unit: stone'))
  it('throws on unknown target unit', () =>
    expect(() => convert(1, 'kg', 'stone' as any)).toThrow('Unknown unit: stone'))
  it('throws on cross-category conversion (weight → length)', () =>
    expect(() => convert(1, 'kg', 'm')).toThrow(/Cannot convert between/))
  it('throws on cross-category conversion (volume → weight)', () =>
    expect(() => convert(1, 'l', 'g')).toThrow(/Cannot convert between/))
})
