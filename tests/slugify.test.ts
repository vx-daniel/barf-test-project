import { describe, it, expect } from 'bun:test'
import { slugify } from '../src/index'

describe('slugify', () => {
  it('lowercases input', () => {
    expect(slugify('Hello World')).toBe('hello-world')
  })

  it('replaces spaces with dashes', () => {
    expect(slugify('foo bar')).toBe('foo-bar')
  })

  it('replaces runs of whitespace with a single dash', () => {
    expect(slugify('  foo   bar  ')).toBe('foo-bar')
  })

  it('removes non-alphanumeric characters', () => {
    expect(slugify("It's a test!")).toBe('its-a-test')
  })

  it('collapses consecutive dashes', () => {
    expect(slugify('foo--bar')).toBe('foo-bar')
  })

  it('strips leading and trailing dashes', () => {
    expect(slugify('---hello---')).toBe('hello')
  })

  it('returns empty string for empty input', () => {
    expect(slugify('')).toBe('')
  })
})
