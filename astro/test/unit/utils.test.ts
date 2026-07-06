import { describe, it, expect } from 'vitest';
import { readingTime, formatDate } from '../../src/lib/utils';

describe('readingTime', () => {
  it('floors at 1 minute for empty or whitespace input', () => {
    expect(readingTime('')).toBe(1);
    expect(readingTime('   \n\t  ')).toBe(1);
    expect(readingTime('one two three')).toBe(1);
  });

  it('counts ~200 words per minute, rounded', () => {
    expect(readingTime(Array(200).fill('word').join(' '))).toBe(1);
    expect(readingTime(Array(300).fill('word').join(' '))).toBe(2); // 1.5 → 2
    expect(readingTime(Array(500).fill('word').join(' '))).toBe(3); // 2.5 → 3 (round-half-up)
  });

  it('collapses arbitrary whitespace between words', () => {
    expect(readingTime('a\n\nb\t c   d')).toBe(1);
  });
});

describe('formatDate', () => {
  it('renders "Mon D, YYYY" in en-US', () => {
    expect(formatDate(new Date('2026-03-14'))).toBe('Mar 14, 2026');
  });

  it('pins to UTC so a midnight-UTC date never shifts a day', () => {
    // Without timeZone:'UTC' this would render Mar 13 in western timezones.
    expect(formatDate(new Date('2026-03-14T00:00:00.000Z'))).toBe('Mar 14, 2026');
    expect(formatDate(new Date('2024-05-26'))).toBe('May 26, 2024');
  });
});
