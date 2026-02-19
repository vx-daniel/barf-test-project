import { describe, expect, test } from 'bun:test'
import { capitalize, titleCase } from '../src/index'

describe('capitalize', () => {
  test('uppercases first char and lowercases the rest', () => {
    expect(capitalize('hELLO')).toBe('Hello')
  })

  test('returns empty string for empty input', () => {
    expect(capitalize('')).toBe('')
  })

  test('handles single character', () => {
    expect(capitalize('a')).toBe('A')
  })
})

describe('titleCase', () => {
  test('capitalizes first letter of every word', () => {
    expect(titleCase('the quick brown fox')).toBe('The Quick Brown Fox')
  })

  test('handles multiple spaces between words', () => {
    expect(titleCase('hello   world')).toBe('Hello World')
  })

  test('returns empty string for empty input', () => {
    expect(titleCase('')).toBe('')
  })
})
