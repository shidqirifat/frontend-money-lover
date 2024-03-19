export const formatNominal = (value: string | number) => {
  const numberValue =
    typeof value === "string" ? Number(value.replace(/\./g, "")) : value;
  return new Intl.NumberFormat("id-ID").format(Math.abs(numberValue));
};

export const formatCurrency = (value: number, absolute = false) => {
  const formattedNumber = formatNominal(value);
  const formattedCurrency = `Rp ${formattedNumber}`;

  if (value < 0 && !absolute) return `-${formattedCurrency}`;
  return formattedCurrency;
};
