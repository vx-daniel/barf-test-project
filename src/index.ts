/**
 * String utility library.
 * All functions are pure — no side effects.
 */

/** Reverses a string. */
export function reverse(s: string): string {
  return s.split('').reverse().join('')
}

/** Truncates a string to `maxLen` characters, appending `…` if cut. */
export function truncate(s: string, maxLen: number): string {
  if (s.length <= maxLen) return s
  return s.slice(0, maxLen) + '…'
}

/** Converts a string to snake_case. */
export function snakeCase(s: string): string {
  return s
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .split(/[\s\-_]+/)
    .filter(Boolean)
    .map(w => w.toLowerCase())
    .join('_')
}

/** Pads the start of `s` with `padChar` (default `' '`) until it reaches `targetLen`. */
export function padStart(s: string, targetLen: number, padChar = ' '): string {
  if (padChar.length !== 1) throw new Error('padChar must be a single character')
  return s.padStart(targetLen, padChar)
}

/** Pads the end of `s` with `padChar` (default `' '`) until it reaches `targetLen`. */
export function padEnd(s: string, targetLen: number, padChar = ' '): string {
  if (padChar.length !== 1) throw new Error('padChar must be a single character')
  return s.padEnd(targetLen, padChar)
}
