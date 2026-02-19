import { describe, expect, it } from 'bun:test'
import { charCount, wordCount } from '../src/index'

describe('wordCount', () => {
  it('counts words split by whitespace', () => {
    expect(wordCount('hello world')).toBe(2)
  })

  it('ignores leading and trailing spaces', () => {
    expect(wordCount('  hello   world  ')).toBe(2)
  })

  it('returns 0 for empty string', () => {
    expect(wordCount('')).toBe(0)
  })

  it('returns 1 for a single word', () => {
    expect(wordCount('hello')).toBe(1)
  })
})

describe('charCount', () => {
  it('returns total character count by default', () => {
    expect(charCount('hello world')).toBe(11)
  })

  it('excludes whitespace when ignoreSpaces is true', () => {
    expect(charCount('hello world', { ignoreSpaces: true })).toBe(10)
  })

  it('returns 0 for empty string', () => {
    expect(charCount('')).toBe(0)
  })

  it('counts spaces when ignoreSpaces is false', () => {
    expect(charCount('a b', { ignoreSpaces: false })).toBe(3)
  })
})
