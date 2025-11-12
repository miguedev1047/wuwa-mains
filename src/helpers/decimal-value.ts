export function formatDecimalAsPercent(value: number): string {
  if (!Number.isFinite(value)) return String(value);
  const isDecimal = value % 1 !== 0;
  return isDecimal ? `${value}%` : `${value}`;
}
