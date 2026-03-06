import { describe, it, expect } from 'bun:test'
import { isPrime } from '../src/index'

describe('isPrime', () => {
  describe('edge cases', () => {
    it('returns false for 0', () => {
      expect(isPrime(0)).toBe(false)
    })

    it('returns false for 1', () => {
      expect(isPrime(1)).toBe(false)
    })

    it('returns false for negative numbers', () => {
      expect(isPrime(-7)).toBe(false)
      expect(isPrime(-1)).toBe(false)
      expect(isPrime(-100)).toBe(false)
    })
  })

  describe('small primes', () => {
    it('returns true for 2 (the only even prime)', () => {
      expect(isPrime(2)).toBe(true)
    })

    it('returns true for 3', () => {
      expect(isPrime(3)).toBe(true)
    })
  })

  describe('composite numbers', () => {
    it('returns false for 4', () => {
      expect(isPrime(4)).toBe(false)
    })

    it('returns false for 9', () => {
      expect(isPrime(9)).toBe(false)
    })

    it('returns false for 15', () => {
      expect(isPrime(15)).toBe(false)
    })

    it('returns false for 100', () => {
      expect(isPrime(100)).toBe(false)
    })

    it('returns false for 7921 (89*89)', () => {
      expect(isPrime(7921)).toBe(false)
    })
  })

  describe('larger primes', () => {
    it('returns true for 97', () => {
      expect(isPrime(97)).toBe(true)
    })

    it('returns true for 7919', () => {
      expect(isPrime(7919)).toBe(true)
    })
  })
})
