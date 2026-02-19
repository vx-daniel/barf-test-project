import { describe, expect, test } from 'bun:test'
import { snakeCase } from '../src/index'

describe('snakeCase', () => {
  test('splits on spaces', () => {
    expect(snakeCase('Hello World')).toBe('hello_world')
  })

  test('splits on hyphens', () => {
    expect(snakeCase('foo-bar')).toBe('foo_bar')
  })

  test('splits on underscores', () => {
    expect(snakeCase('foo_bar')).toBe('foo_bar')
  })

  test('inserts _ at camelCase word boundaries', () => {
    expect(snakeCase('fooBarBaz')).toBe('foo_bar_baz')
  })

  test('lowercases all output characters', () => {
    expect(snakeCase('Hello World')).toBe('hello_world')
    expect(snakeCase('fooBarBaz')).toBe('foo_bar_baz')
  })

  test('ignores leading and trailing delimiters', () => {
    expect(snakeCase('  hello  ')).toBe('hello')
    expect(snakeCase('--foo--')).toBe('foo')
  })

  test('returns empty string for empty input', () => {
    expect(snakeCase('')).toBe('')
  })
})
