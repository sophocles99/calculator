import { OPERATORS_REGEX } from "./calculatorReducer";
const EXPRESSION_REGEX = /([0-9.]+)|([\+\-\*\/%]+)/g;

export default function formatExpression(expression: string) {
  const expressionSplit = expression.match(EXPRESSION_REGEX);

  if (expressionSplit) {
    const expressionSplitFormatted = expressionSplit.map((term) => {
      if (!OPERATORS_REGEX.test(term)) {
        const trailingPoint = term.slice(-1) === ".";

        let [integerPart, decimalPart] = term.split(".");
        integerPart = new Intl.NumberFormat("en-GB").format(
          parseInt(integerPart)
        );

        if (decimalPart) {
          return [integerPart, decimalPart].join(".");
        } else {
          return integerPart + (trailingPoint ? "." : "");
        }
      } else {
        return term.replace("/", "\u00F7").replace("*", "\u00d7");
      }
    });
    console.log(expressionSplitFormatted);
    return expressionSplitFormatted.join("");
  } else {
    return "";
  }
}
