import { describe, it, expect } from 'bun:test'
import { stddev } from '../src/index'

describe('stddev', () => {
  // Population standard deviation
  it('returns population stddev for a simple array', () => {
    // mean = 2, deviations^2 = [1, 0, 1], variance = 2/3 ≈ 0.8165
    const result = stddev([1, 2, 3])
    expect(result).toBeCloseTo(Math.sqrt(2 / 3), 10)
  })

  it('returns 0 when all values are identical (population)', () => {
    expect(stddev([5, 5, 5, 5])).toBe(0)
  })

  it('returns 0 for a single-element array (population)', () => {
    // single element: deviation = 0, variance = 0/1 = 0
    expect(stddev([42])).toBe(0)
  })

  it('handles larger dataset (population)', () => {
    // [2,4,4,4,5,5,7,9], mean=5, variance=4, stddev=2
    expect(stddev([2, 4, 4, 4, 5, 5, 7, 9])).toBeCloseTo(2, 10)
  })

  // Sample standard deviation
  it('returns sample stddev with { sample: true }', () => {
    // mean = 2, deviations^2 = [1, 0, 1], sample variance = 2/2 = 1, stddev = 1
    const result = stddev([1, 2, 3], { sample: true })
    expect(result).toBeCloseTo(1, 10)
  })

  it('returns 0 when all values are identical (sample)', () => {
    expect(stddev([7, 7, 7], { sample: true })).toBe(0)
  })

  it('handles larger dataset (sample)', () => {
    // [2,4,4,4,5,5,7,9], mean=5, sum of sq dev=32, sample variance=32/7, stddev≈2.138
    const result = stddev([2, 4, 4, 4, 5, 5, 7, 9], { sample: true })
    expect(result).toBeCloseTo(Math.sqrt(32 / 7), 10)
  })

  // Edge cases — throws
  it('throws on empty array (population)', () => {
    expect(() => stddev([])).toThrow()
  })

  it('throws on empty array (sample)', () => {
    expect(() => stddev([], { sample: true })).toThrow()
  })

  it('throws on single-element array with sample=true', () => {
    // N-1 = 0 → division by zero
    expect(() => stddev([5], { sample: true })).toThrow()
  })
})
