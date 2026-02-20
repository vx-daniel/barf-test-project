import { describe, it, expect } from 'bun:test'
import { mean, median } from '../src/index'

describe('mean', () => {
  it('computes mean of numbers', () => expect(mean([1, 2, 3, 4, 5])).toBe(3))
  it('handles single element', () => expect(mean([42])).toBe(42))
  it('throws on empty array', () => expect(() => mean([])).toThrow())
})

describe('median', () => {
  it('computes median of odd-length array', () => expect(median([3, 1, 2])).toBe(2))
  it('computes median of even-length array', () => expect(median([1, 2, 3, 4])).toBe(2.5))
  it('handles single element', () => expect(median([7])).toBe(7))
  it('throws on empty array', () => expect(() => median([])).toThrow())
})
