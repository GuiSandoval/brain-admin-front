export function generateTitlePage(title: string) {
  return `${title} | Brain`;
}

export function isNullUndefined<T>(value: T | null | undefined): value is null | undefined {
  return value === null || value === undefined;
}
