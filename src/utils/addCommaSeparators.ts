export default function addCommaSeparators(number: string) {
  const trailingPoint = number.slice(-1) === ".";
  let [integerPart, decimalPart] = number.split(".");
  const integerPartNumber = parseInt(integerPart);

  if (integerPartNumber) {
    integerPart = new Intl.NumberFormat("en-GB").format(integerPartNumber);
  }
  if (decimalPart) {
    return [integerPart, decimalPart].join(".");
  } else {
    return integerPart + (trailingPoint ? "." : "");
  }
}
