import { describe, it, expect } from 'bun:test'
import { fibonacci } from '../src/index'

describe('fibonacci', () => {
  it('returns 0 for n=0', () => expect(fibonacci(0)).toBe(0))
  it('returns 1 for n=1', () => expect(fibonacci(1)).toBe(1))
  it('returns 1 for n=2', () => expect(fibonacci(2)).toBe(1))
  it('returns 5 for n=5', () => expect(fibonacci(5)).toBe(5))
  it('returns 55 for n=10', () => expect(fibonacci(10)).toBe(55))
  it('returns 144 for n=12', () => expect(fibonacci(12)).toBe(144))
})
