const EXPRESSION_REGEX = /(-?\d*\.?\d+(?:[eE][-+]?\d+)?|[-+*\/\.])/g;

export default function splitExpression(expression: string): string[] {
  return expression.match(EXPRESSION_REGEX) || [""];
}
