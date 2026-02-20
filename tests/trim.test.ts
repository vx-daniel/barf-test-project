import { describe, expect, test } from 'bun:test'
import { ltrim, rtrim } from '../src/index'

describe('ltrim', () => {
  test('strips leading whitespace by default', () => {
    expect(ltrim('  hello')).toBe('hello')
  })

  test('strips mixed leading whitespace by default', () => {
    expect(ltrim('\t\n hello')).toBe('hello')
  })

  test('strips specified leading char (single char)', () => {
    expect(ltrim('--hello', '-')).toBe('hello')
  })

  test('strips specified leading chars (multi-char set)', () => {
    expect(ltrim('xyxhello', 'xy')).toBe('hello')
  })

  test('returns original string when nothing to strip', () => {
    expect(ltrim('hello')).toBe('hello')
  })

  test('returns empty string when entire string is stripped', () => {
    expect(ltrim('   ')).toBe('')
  })

  test('does not strip trailing whitespace', () => {
    expect(ltrim('  hello  ')).toBe('hello  ')
  })
})

describe('rtrim', () => {
  test('strips trailing whitespace by default', () => {
    expect(rtrim('hello  ')).toBe('hello')
  })

  test('strips mixed trailing whitespace by default', () => {
    expect(rtrim('hello \t\n')).toBe('hello')
  })

  test('strips specified trailing char (single char)', () => {
    expect(rtrim('hello--', '-')).toBe('hello')
  })

  test('strips specified trailing chars (multi-char set)', () => {
    expect(rtrim('helloyxy', 'xy')).toBe('hello')
  })

  test('returns original string when nothing to strip', () => {
    expect(rtrim('hello')).toBe('hello')
  })

  test('returns empty string when entire string is stripped', () => {
    expect(rtrim('---', '-')).toBe('')
  })

  test('does not strip leading whitespace', () => {
    expect(rtrim('  hello  ')).toBe('  hello')
  })
})
