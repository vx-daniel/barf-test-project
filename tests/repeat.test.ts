import { describe, expect, test } from 'bun:test'
import { repeat } from '../src/index'

describe('repeat', () => {
  test('repeats a string n times', () => {
    expect(repeat('ab', 3)).toBe('ababab')
  })

  test('returns empty string when n is 0', () => {
    expect(repeat('x', 0)).toBe('')
  })

  test('returns original string when n is 1', () => {
    expect(repeat('x', 1)).toBe('x')
  })

  test('returns empty string when input is empty', () => {
    expect(repeat('', 5)).toBe('')
  })

  test('returns empty string when n is negative', () => {
    expect(repeat('x', -3)).toBe('')
  })
})
