export const normalizeNumber = (
  value: string | number | undefined,
): number | undefined => {
  if (value === undefined || value === "") return undefined;

  const normalizedValue =
    typeof value === "string" ? value.replace(",", ".") : value;

  const num =
    typeof normalizedValue === "string"
      ? parseFloat(normalizedValue)
      : normalizedValue;

  if (isNaN(num)) return undefined;
  return Math.round(num * 100) / 100;
};

export const normalizeText = (value: string | undefined): string => {
  if (!value) return "";
  return value.trimStart();
};

export const formatCurrency = (
  value: number,
  currency: "EUR" | "BRL" = "BRL",
): string => {
  const locale = currency === "EUR" ? "pt-PT" : "pt-BR";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(value);
};
