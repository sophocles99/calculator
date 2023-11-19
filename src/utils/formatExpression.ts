import addCommaSeparators from "./addCommaSeparators";
import { IS_OPERATOR_REGEX } from "./calculatorLogicReducer";

export default function formatExpression(expressionSplit: string[]) {
  if (expressionSplit.length) {
    const expressionSplitFormatted = expressionSplit.map((term) =>
      !IS_OPERATOR_REGEX.test(term) ? addCommaSeparators(term) : term
    );
    return expressionSplitFormatted.join("");
  } else {
    return "";
  }
}
