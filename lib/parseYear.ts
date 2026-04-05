const BCE_PATTERN = /\b(bc|bce)\b/i;
const CE_PATTERN = /\b(ad|ce)\b/i;

export function formatYear(year: number) {
  if (year < 0) {
    return `${Math.abs(year)} BC`;
  }

  return String(year);
}

export function parseYear(input: string) {
  const trimmed = input.trim();

  if (!trimmed) {
    return { valid: false, error: "Enter a year." } as const;
  }

  const normalized = trimmed
    .replace(/\s+/g, " ")
    .replace(/,/g, "")
    .toUpperCase();

  const hasBce = BCE_PATTERN.test(normalized);
  const hasCe = CE_PATTERN.test(normalized);

  if (hasBce && hasCe) {
    return { valid: false, error: "Use either BC/BCE or AD/CE, not both." } as const;
  }

  const match = normalized.match(/^-?\d+/);
  if (!match) {
    return { valid: false, error: "Use a numeric year like 1989 or 44 BC." } as const;
  }

  const numericYear = Number.parseInt(match[0], 10);

  if (!Number.isFinite(numericYear)) {
    return { valid: false, error: "That year could not be read." } as const;
  }

  let year = numericYear;

  if (hasBce) {
    year = -Math.abs(numericYear);
  } else if (hasCe) {
    year = Math.abs(numericYear);
  }

  if (year === 0) {
    return { valid: false, error: "Year 0 is not supported in Yearsy." } as const;
  }

  if (year < -4000 || year > 2500) {
    return { valid: false, error: "Try a year between 4000 BC and 2500 AD." } as const;
  }

  return { valid: true, year, formatted: formatYear(year) } as const;
}
