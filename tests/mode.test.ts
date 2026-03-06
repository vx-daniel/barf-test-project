import { describe, it, expect } from 'bun:test'
import { mode } from '../src/index'

describe('mode', () => {
  it('returns single mode', () => expect(mode([1, 2, 2, 3])).toEqual([2]))
  it('returns multiple modes on tie', () => expect(mode([1, 1, 2, 2, 3])).toEqual([1, 2]))
  it('returns all when all equal frequency', () => expect(mode([1, 2, 3])).toEqual([1, 2, 3]))
  it('handles single element', () => expect(mode([42])).toEqual([42]))
  it('handles all same value', () => expect(mode([5, 5, 5])).toEqual([5]))
  it('handles negative numbers', () => expect(mode([-1, -1, 2])).toEqual([-1]))
  it('handles decimals', () => expect(mode([1.5, 1.5, 2.5])).toEqual([1.5]))
  it('throws on empty array', () => expect(() => mode([])).toThrow('Cannot compute mode of empty array'))
})
