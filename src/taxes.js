// Sales taxes, applied to the order (products + shipping). Only Quebec is
// handled for now: GST 5% and QST 9.975%.
const QUEBEC_TAXES = [
  { label: "GST (5%)", rate: 0.05 },
  { label: "QST (9.975%)", rate: 0.09975 },
];

const roundToCents = (amount) => Math.round(amount * 100) / 100;

// [{ label, amount }] for the province, or [] when no tax applies.
export const taxesFor = (province, taxableAmount) =>
  province === "Quebec"
    ? QUEBEC_TAXES.map(({ label, rate }) => ({
        label,
        amount: roundToCents(taxableAmount * rate),
      }))
    : [];
