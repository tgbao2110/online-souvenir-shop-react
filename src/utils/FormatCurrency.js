const fCurrency = (value, currency = "VND", locale = "en-US") => {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
    }).format(value);
  };
  
  export default fCurrency;
  