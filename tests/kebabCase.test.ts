import { describe, expect, test } from 'bun:test'
import { kebabCase } from '../src/index'

describe('kebabCase', () => {
  test('splits on spaces', () => {
    expect(kebabCase('Hello World')).toBe('hello-world')
  })

  test('splits on hyphens', () => {
    expect(kebabCase('foo-bar')).toBe('foo-bar')
  })

  test('splits on underscores', () => {
    expect(kebabCase('foo_bar')).toBe('foo-bar')
  })

  test('inserts - at camelCase word boundaries', () => {
    expect(kebabCase('fooBarBaz')).toBe('foo-bar-baz')
  })

  test('lowercases all output characters', () => {
    expect(kebabCase('Hello World')).toBe('hello-world')
    expect(kebabCase('fooBarBaz')).toBe('foo-bar-baz')
  })

  test('ignores leading and trailing delimiters', () => {
    expect(kebabCase('  hello  ')).toBe('hello')
    expect(kebabCase('--foo--')).toBe('foo')
  })

  test('returns empty string for empty input', () => {
    expect(kebabCase('')).toBe('')
  })
})
