import { OPERATORS_REGEX } from "./calculatorLogicReducer";
const EXPRESSION_REGEX = /([0-9.]+)|([\+\-\*\/%]+)/g;

export default function formatExpression(expression: string) {
  const expressionSplit = expression.match(EXPRESSION_REGEX);

  if (expressionSplit) {
    const expressionSplitFormatted = expressionSplit.map((term) => {
      if (!OPERATORS_REGEX.test(term)) {
        const trailingPoint = term.slice(-1) === ".";

        let [integerPart, decimalPart] = term.split(".");
        const integerPartNumber = parseInt(integerPart);
        if (integerPartNumber) {
          integerPart = new Intl.NumberFormat("en-GB").format(
            integerPartNumber
          );
        }
        if (decimalPart) {
          return [integerPart, decimalPart].join(".");
        } else {
          return integerPart + (trailingPoint ? "." : "");
        }
      } else {
        return term.replace("/", "\u00F7").replace("*", "\u00d7");
      }
    });
    return expressionSplitFormatted.join("");
  } else {
    return "";
  }
}
