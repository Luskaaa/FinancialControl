export const normalizeNumber = (
  value: string | number | undefined,
): number | undefined => {
  if (value === undefined || value === "") return undefined;
  const num =
    typeof value === "string" ? parseFloat(value.replace(",", ".")) : value;
  if (isNaN(num)) return undefined;
  return Math.round(num * 100) / 100;
};

export const normalizeText = (value: string | undefined): string => {
  if (!value) return "";
  const trimmed = value.replace(/\s+/g, " ").trim();
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
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
