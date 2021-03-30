export function getFormattedPrice(price, currencySymbol = " €") {
  const formattedPrice =
    (price / 100).toFixed(2).replace(".", ",") + currencySymbol;

  return formattedPrice;
}

export function getFormattedMinMax(price) {
  const formattedPrice = price * 100;

  return formattedPrice;
}
