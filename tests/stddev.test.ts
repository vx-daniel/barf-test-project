import { describe, it, expect } from 'bun:test'
import { stddev } from '../src/index'

describe('stddev (population)', () => {
  it('computes population stddev of [2, 4, 4, 4, 5, 5, 7, 9]', () => {
    // mean = 5, variance = (9+1+1+1+0+0+4+16)/8 = 32/8 = 4, stddev = 2
    expect(stddev([2, 4, 4, 4, 5, 5, 7, 9])).toBeCloseTo(2, 10)
  })

  it('computes population stddev of single element (0)', () => {
    expect(stddev([42])).toBe(0)
  })

  it('returns 0 for all identical values', () => {
    expect(stddev([3, 3, 3, 3])).toBe(0)
  })

  it('throws on empty array', () => {
    expect(() => stddev([])).toThrow()
  })
})

describe('stddev (sample)', () => {
  it('computes sample stddev of [2, 4, 4, 4, 5, 5, 7, 9]', () => {
    // mean = 5, variance = 32/7 ≈ 4.5714..., stddev ≈ 2.1381...
    expect(stddev([2, 4, 4, 4, 5, 5, 7, 9], { sample: true })).toBeCloseTo(
      Math.sqrt(32 / 7),
      10
    )
  })

  it('throws on empty array', () => {
    expect(() => stddev([], { sample: true })).toThrow()
  })

  it('throws on single-element array', () => {
    expect(() => stddev([42], { sample: true })).toThrow()
  })

  it('returns 0 for all identical values', () => {
    expect(stddev([5, 5, 5], { sample: true })).toBe(0)
  })
})
