import { describe, expect, it } from 'bun:test'
import { countOccurrences } from '../src/index'

describe('countOccurrences', () => {
  it('returns count of non-overlapping occurrences', () => {
    expect(countOccurrences('hello world hello', 'hello')).toBe(2)
  })

  it('returns 0 when sub is empty string', () => {
    expect(countOccurrences('hello', '')).toBe(0)
  })

  it('returns 0 when sub is not found', () => {
    expect(countOccurrences('abcabc', 'xyz')).toBe(0)
  })

  it('counts non-overlapping matches only', () => {
    expect(countOccurrences('aaaa', 'aa')).toBe(2)
  })

  it('is case-sensitive', () => {
    expect(countOccurrences('Hello hello HELLO', 'hello')).toBe(1)
  })

  it('returns 0 on empty string with non-empty sub', () => {
    expect(countOccurrences('', 'a')).toBe(0)
  })
})
