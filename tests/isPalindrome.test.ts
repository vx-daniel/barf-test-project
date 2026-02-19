import { describe, expect, it } from 'bun:test'
import { isPalindrome } from '../src/index'

describe('isPalindrome', () => {
  it('returns true for classic palindrome', () => {
    expect(isPalindrome('racecar')).toBe(true)
  })

  it('is case-insensitive', () => {
    expect(isPalindrome('Racecar')).toBe(true)
  })

  it('ignores spaces and punctuation', () => {
    expect(isPalindrome('A man a plan a canal Panama')).toBe(true)
  })

  it('returns true for empty string', () => {
    expect(isPalindrome('')).toBe(true)
  })

  it('returns false for non-palindrome', () => {
    expect(isPalindrome('hello')).toBe(false)
  })

  it('returns false for two different characters', () => {
    expect(isPalindrome('ab')).toBe(false)
  })

  it('ignores punctuation mid-sentence', () => {
    expect(isPalindrome('Was it a car or a cat I saw?')).toBe(true)
  })

  it('ignores commas and spaces', () => {
    expect(isPalindrome('No lemon, no melon')).toBe(true)
  })
})
