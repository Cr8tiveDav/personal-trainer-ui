type FormatCurrencyOptions = {
  compact?: boolean;
};

export const formatCurrency = (
  value: number,
  options: FormatCurrencyOptions = {},
) =>
  new Intl.NumberFormat("en-NG", {
    currency: "NGN",
    maximumFractionDigits: 0,
    notation: options.compact ? "compact" : "standard",
    style: "currency",
  }).format(value);
