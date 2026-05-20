type FormatCurrencyOptions = {
  compact?: boolean;
};

const standardCurrencyFormatter = new Intl.NumberFormat("en-NG", {
  currency: "NGN",
  maximumFractionDigits: 0,
  style: "currency",
});

const compactCurrencyFormatter = new Intl.NumberFormat("en-NG", {
  currency: "NGN",
  maximumFractionDigits: 0,
  notation: "compact",
  style: "currency",
});

export const formatCurrency = (
  value: number,
  options: FormatCurrencyOptions = {},
) =>
  options.compact
    ? compactCurrencyFormatter.format(value)
    : standardCurrencyFormatter.format(value);
