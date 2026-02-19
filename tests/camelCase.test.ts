import { describe, expect, test } from 'bun:test'
import { camelCase } from '../src/index'

describe('camelCase', () => {
  test('splits on spaces and capitalizes subsequent words', () => {
    expect(camelCase('hello world')).toBe('helloWorld')
  })

  test('splits on hyphens', () => {
    expect(camelCase('foo-bar-baz')).toBe('fooBarBaz')
  })

  test('splits on underscores', () => {
    expect(camelCase('foo_bar')).toBe('fooBar')
  })

  test('first word is all lowercase', () => {
    expect(camelCase('Hello World')).toBe('helloWorld')
  })

  test('leading and trailing delimiters are ignored', () => {
    expect(camelCase('  hello  world')).toBe('helloWorld')
  })

  test('returns empty string for empty input', () => {
    expect(camelCase('')).toBe('')
  })
})
