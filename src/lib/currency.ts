export const formatCurrency = (value: number, absolute = false) => {
  const formattedNumber = new Intl.NumberFormat("id-ID").format(
    Math.abs(value)
  );
  const formattedCurrency = `Rp ${formattedNumber}`;

  if (value < 0 && !absolute) return `-${formattedCurrency}`;
  return formattedCurrency;
};
