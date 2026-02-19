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

/** Returns `s` repeated `n` times. Returns `''` if `n <= 0`. */
export function repeat(s: string, n: number): string {
  if (n <= 0) return ''
  return s.repeat(n)
}

/** Uppercases the first character and lowercases the rest. */
export function capitalize(s: string): string {
  if (s.length === 0) return ''
  return s[0].toUpperCase() + s.slice(1).toLowerCase()
}

/** Capitalizes the first letter of each word (split on whitespace). */
export function titleCase(s: string): string {
  if (s.length === 0) return ''
  return s.split(/\s+/).filter(Boolean).map(w => capitalize(w)).join(' ')
}

/** Converts a string to camelCase. Splits on whitespace, hyphens, and underscores. */
export function camelCase(s: string): string {
  const words = s.split(/[\s\-_]+/).filter(Boolean)
  if (words.length === 0) return ''
  return words[0].toLowerCase() + words.slice(1).map(w => w[0].toUpperCase() + w.slice(1).toLowerCase()).join('')
}

/** Returns the number of non-overlapping occurrences of `sub` in `s`. Returns `0` if `sub` is empty. */
export function countOccurrences(s: string, sub: string): number {
  if (!sub) return 0
  let count = 0
  let idx = 0
  while ((idx = s.indexOf(sub, idx)) !== -1) {
    count++
    idx += sub.length
  }
  return count
}

/** Returns the number of words in `s`, splitting on whitespace and ignoring empty tokens. */
export function wordCount(s: string): number {
  return s.split(/\s+/).filter(Boolean).length
}

/** Returns the character count of `s`. When `ignoreSpaces: true`, whitespace is excluded. */
export function charCount(s: string, opts?: { ignoreSpaces?: boolean }): number {
  if (opts?.ignoreSpaces) return s.replace(/\s/g, '').length
  return s.length
}

/** Returns true if the string is a palindrome (case-insensitive, ignoring non-alphanumeric characters). */
export function isPalindrome(s: string): boolean {
  const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '')
  return cleaned === cleaned.split('').reverse().join('')
}

/** Converts a string to a URL-safe slug. */
export function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-{2,}/g, '-')
    .replace(/^-+|-+$/g, '')
}
