import { describe, expect, test } from 'bun:test'
import { clamp, inRange, range } from '../src/index'

describe('range', () => {
  test('ascending: range(0, 5) → [0, 1, 2, 3, 4]', () => {
    expect(range(0, 5)).toEqual([0, 1, 2, 3, 4])
  })

  test('descending: range(5, 0) → [5, 4, 3, 2, 1]', () => {
    expect(range(5, 0)).toEqual([5, 4, 3, 2, 1])
  })

  test('custom step: range(0, 10, 2) → [0, 2, 4, 6, 8]', () => {
    expect(range(0, 10, 2)).toEqual([0, 2, 4, 6, 8])
  })

  test('custom negative step: range(10, 0, -3) → [10, 7, 4, 1]', () => {
    expect(range(10, 0, -3)).toEqual([10, 7, 4, 1])
  })

  test('same start and end: range(3, 3) → []', () => {
    expect(range(3, 3)).toEqual([])
  })

  test('step zero throws', () => {
    expect(() => range(0, 5, 0)).toThrow('Step cannot be zero')
  })

  test('conflicting step direction: range(0, 5, -1) → []', () => {
    expect(range(0, 5, -1)).toEqual([])
  })

  test('fractional step: range(0, 1, 0.25) → [0, 0.25, 0.5, 0.75]', () => {
    const result = range(0, 1, 0.25)
    expect(result).toHaveLength(4)
    expect(result[0]).toBeCloseTo(0)
    expect(result[1]).toBeCloseTo(0.25)
    expect(result[2]).toBeCloseTo(0.5)
    expect(result[3]).toBeCloseTo(0.75)
  })
})

describe('clamp', () => {
  test('value within range: clamp(5, 0, 10) → 5', () => {
    expect(clamp(5, 0, 10)).toBe(5)
  })

  test('value below min: clamp(-5, 0, 10) → 0', () => {
    expect(clamp(-5, 0, 10)).toBe(0)
  })

  test('value above max: clamp(15, 0, 10) → 10', () => {
    expect(clamp(15, 0, 10)).toBe(10)
  })

  test('value equals min: clamp(0, 0, 10) → 0', () => {
    expect(clamp(0, 0, 10)).toBe(0)
  })

  test('value equals max: clamp(10, 0, 10) → 10', () => {
    expect(clamp(10, 0, 10)).toBe(10)
  })

  test('negative bounds: clamp(0, -10, -5) → -5', () => {
    expect(clamp(0, -10, -5)).toBe(-5)
  })

  test('min > max throws', () => {
    expect(() => clamp(5, 10, 0)).toThrow('min must not be greater than max')
  })
})

describe('inRange', () => {
  test('value inside: inRange(5, 0, 10) → true', () => {
    expect(inRange(5, 0, 10)).toBe(true)
  })

  test('value outside below: inRange(-1, 0, 10) → false', () => {
    expect(inRange(-1, 0, 10)).toBe(false)
  })

  test('value outside above: inRange(11, 0, 10) → false', () => {
    expect(inRange(11, 0, 10)).toBe(false)
  })

  test('value at min boundary: inRange(0, 0, 10) → true', () => {
    expect(inRange(0, 0, 10)).toBe(true)
  })

  test('value at max boundary: inRange(10, 0, 10) → true', () => {
    expect(inRange(10, 0, 10)).toBe(true)
  })

  test('negative range: inRange(-5, -10, -1) → true', () => {
    expect(inRange(-5, -10, -1)).toBe(true)
  })

  test('min > max throws', () => {
    expect(() => inRange(5, 10, 0)).toThrow('min must not be greater than max')
  })
})
