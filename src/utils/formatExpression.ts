import addCommaSeparators from "./addCommaSeparators";
import { IS_OPERATOR_REGEX } from "./calculatorReducer";
import splitExpression from "./splitExpression";

export default function formatExpression(expression: string): string {
  const expressionSplit = splitExpression(expression);
  const expressionSplitFormatted = expressionSplit.map((token) =>
    IS_OPERATOR_REGEX.test(token)
      ? ` ${token.replace("/", "\u00F7").replace("*", "\u00d7")} `
      : addCommaSeparators(token)
  );
  return expressionSplitFormatted.join("");
}
