export default function addCommaSeparators(number: string) {
  const trailingPoint = number.slice(-1) === ".";
  let [integerPart, decimalPart] = number.split(".");
  
  // For numbers in scientific notation with integer significand and negative
  // exponent, e.g. 4e-8
  if (integerPart.includes("-")) {
    return integerPart
  }
  const integerPartNumber = Number(integerPart);
  if (integerPartNumber) {
    integerPart = new Intl.NumberFormat("en-GB").format(integerPartNumber);
  }
  if (decimalPart) {
    return [integerPart, decimalPart].join(".");
  } else {
    return integerPart + (trailingPoint ? "." : "");
  }
}
