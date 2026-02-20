import { describe, it, expect } from 'bun:test'
import { add, subtract, multiply, divide } from '../src/index'

describe('add', () => {
  it('adds two positive numbers', () => expect(add(2, 3)).toBe(5))
  it('adds negative numbers', () => expect(add(-1, -2)).toBe(-3))
  it('adds zero', () => expect(add(5, 0)).toBe(5))
})

describe('subtract', () => {
  it('subtracts two numbers', () => expect(subtract(5, 3)).toBe(2))
  it('returns negative for smaller minus larger', () => expect(subtract(3, 5)).toBe(-2))
})

describe('multiply', () => {
  it('multiplies two numbers', () => expect(multiply(3, 4)).toBe(12))
  it('multiplies by zero', () => expect(multiply(5, 0)).toBe(0))
  it('multiplies negatives', () => expect(multiply(-2, -3)).toBe(6))
})

describe('divide', () => {
  it('divides two numbers', () => expect(divide(10, 2)).toBe(5))
  it('returns decimal result', () => expect(divide(7, 2)).toBe(3.5))
  it('throws on division by zero', () => expect(() => divide(5, 0)).toThrow('Division by zero'))
})
