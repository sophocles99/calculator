import addCommaSeparators from "./addCommaSeparators";
import { IS_OPERATOR_REGEX } from "./calculatorLogicReducer";

export default function formatExpression(expSplit: string[]): string[] {
  const expSplitFormatted = expSplit.map((token) =>
    !IS_OPERATOR_REGEX.test(token) ? addCommaSeparators(token) : token
  );
  return expSplitFormatted;
}
