import { describe, it, expect } from 'bun:test'
import { isPrime } from '../src/index'

describe('isPrime', () => {
  describe('primes', () => {
    it('returns true for 2 (smallest prime)', () => {
      expect(isPrime(2)).toBe(true)
    })
    it('returns true for 3', () => {
      expect(isPrime(3)).toBe(true)
    })
    it('returns true for 5', () => {
      expect(isPrime(5)).toBe(true)
    })
    it('returns true for 13', () => {
      expect(isPrime(13)).toBe(true)
    })
    it('returns true for 97', () => {
      expect(isPrime(97)).toBe(true)
    })
    it('returns true for 7919 (large prime)', () => {
      expect(isPrime(7919)).toBe(true)
    })
  })

  describe('composites', () => {
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
  })

  describe('edge cases', () => {
    it('returns false for 0', () => {
      expect(isPrime(0)).toBe(false)
    })
    it('returns false for 1', () => {
      expect(isPrime(1)).toBe(false)
    })
    it('returns false for -1', () => {
      expect(isPrime(-1)).toBe(false)
    })
    it('returns false for -5', () => {
      expect(isPrime(-5)).toBe(false)
    })
  })

  describe('non-integers', () => {
    it('returns false for 2.5', () => {
      expect(isPrime(2.5)).toBe(false)
    })
  })
})
