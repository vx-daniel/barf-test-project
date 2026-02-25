import { describe, it, expect } from 'bun:test'
import { variance } from '../src/index'

describe('variance', () => {
  it('computes population variance', () => {
    expect(variance([2, 4, 4, 4, 5, 5, 7, 9])).toBeCloseTo(4)
  })

  it('computes sample variance', () => {
    expect(variance([2, 4, 4, 4, 5, 5, 7, 9], { sample: true })).toBeCloseTo(
      4.571428571,
    )
  })

  it('returns 0 for identical values', () => {
    expect(variance([5, 5, 5])).toBe(0)
  })

  it('handles single element (population)', () => {
    expect(variance([42])).toBe(0)
  })

  it('throws on empty array', () => {
    expect(() => variance([])).toThrow()
  })

  it('throws on single element with sample=true', () => {
    expect(() => variance([42], { sample: true })).toThrow()
  })
})
