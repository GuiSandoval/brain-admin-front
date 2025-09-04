export function generateTitlePage(title: string) {
  return `${title} | Brain`;
}

export function isNullUndefined<T>(value: T | null | undefined): value is null | undefined {
  return value === null || value === undefined;
}

/**
 * Formata um array de números representando uma data para o formato brasileiro
 * @param dateArray Array no formato [ano, mês, dia]
 * @returns String formatada no padrão DD/MM/AAAA
 */
export function formatDateFromArray(dateArray: number[]): string {
  if (!dateArray || dateArray.length < 3) {
    return "Data não informada";
  }

  const [year, month, day] = dateArray;
  return `${day.toString().padStart(2, "0")}/${month.toString().padStart(2, "0")}/${year}`;
}
