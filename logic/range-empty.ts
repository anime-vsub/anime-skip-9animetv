export function rangeEmpty(range: { start: number; end: number }): boolean {
  return range.end > 0 && range.start !== range.end
}
