import { expect, test } from 'bun:test'
import { mode } from '../src/index'

// Single mode
test('returns the single most frequent value', () => {
  expect(mode([1, 2, 2, 3])).toEqual([2])
})

test('returns a single element array when all elements are the same', () => {
  expect(mode([5, 5, 5])).toEqual([5])
})

// Multi-mode (ties)
test('returns multiple modes when there are ties', () => {
  expect(mode([1, 1, 2, 2, 3])).toEqual([1, 2])
})

test('returns all elements when every element appears once', () => {
  expect(mode([3, 1, 2])).toEqual([1, 2, 3])
})

// Edge cases
test('throws on empty array', () => {
  expect(() => mode([])).toThrow()
})

test('returns single element array for a one-element input', () => {
  expect(mode([42])).toEqual([42])
})

test('handles negative numbers', () => {
  expect(mode([-1, -1, 2])).toEqual([-1])
})

test('handles decimals', () => {
  expect(mode([1.5, 1.5, 2.5])).toEqual([1.5])
})

test('result is sorted ascending', () => {
  expect(mode([5, 3, 3, 5, 1, 1])).toEqual([1, 3, 5])
})
