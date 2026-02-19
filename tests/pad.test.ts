import { describe, expect, test } from 'bun:test'
import { padEnd, padStart } from '../src/index'

describe('padStart', () => {
  test('pads from the left to targetLen', () => {
    expect(padStart('5', 3, '0')).toBe('005')
  })

  test('uses space as default pad character', () => {
    expect(padStart('hi', 5)).toBe('   hi')
  })

  test('returns original string when already at targetLen', () => {
    expect(padStart('abc', 3)).toBe('abc')
  })

  test('returns original string when longer than targetLen', () => {
    expect(padStart('hello', 3)).toBe('hello')
  })

  test('throws when padChar is longer than one character', () => {
    expect(() => padStart('x', 5, 'ab')).toThrow('padChar must be a single character')
  })

  test('throws when padChar is empty string', () => {
    expect(() => padStart('x', 5, '')).toThrow('padChar must be a single character')
  })
})

describe('padEnd', () => {
  test('pads from the right to targetLen', () => {
    expect(padEnd('hi', 5, '.')).toBe('hi...')
  })

  test('uses space as default pad character', () => {
    expect(padEnd('hi', 5)).toBe('hi   ')
  })

  test('returns original string when already at targetLen', () => {
    expect(padEnd('abc', 3)).toBe('abc')
  })

  test('returns original string when longer than targetLen', () => {
    expect(padEnd('hello', 3)).toBe('hello')
  })

  test('throws when padChar is longer than one character', () => {
    expect(() => padEnd('x', 5, 'ab')).toThrow('padChar must be a single character')
  })

  test('throws when padChar is empty string', () => {
    expect(() => padEnd('x', 5, '')).toThrow('padChar must be a single character')
  })
})
