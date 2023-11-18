import addCommaSeparators from "./addCommaSeparators";
import { IS_OPERATOR_REGEX } from "./calculatorLogicReducer";
const EXPRESSION_REGEX = /(-?\d*\.?\d+(?:[eE][-+]?\d+)?|[-+*\/\.])/g;

export default function formatExpression(expression: string) {
  const expressionSplit = expression.match(EXPRESSION_REGEX);

  if (expressionSplit) {
    const expressionSplitFormatted = expressionSplit.map((term) =>
      !IS_OPERATOR_REGEX.test(term) ? addCommaSeparators(term) : term
    );
    return expressionSplitFormatted.join("");
  } else {
    return "";
  }
}
