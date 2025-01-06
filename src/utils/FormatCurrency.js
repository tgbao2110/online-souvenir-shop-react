const fCurrency = (value, currency = "USD", locale = "en-US") => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2
  }).format(value);
};

export default fCurrency;