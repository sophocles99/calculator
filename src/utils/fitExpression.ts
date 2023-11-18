import { CONTAINS_OPERATOR_REGEX } from "./calculatorLogicReducer";
import styles from "../styles/Expression.module.css";

export default function fitExpression(
  expression: string,
  container: HTMLDivElement
): [string[], boolean] {
  const containerWidth = container.getBoundingClientRect().width;

  const DOMTestLine = document.createElement("p");
  DOMTestLine.classList.add(styles.testExpressionLine);
  document.body.appendChild(DOMTestLine);

  let expressionLines = [];
  let currentLine = "";
  let isFull = false;

  for (let i = expression.length - 1; i >= 0; i--) {
    currentLine = expression[i] + currentLine;
    DOMTestLine.textContent = currentLine;

    const testLineWidth = DOMTestLine.getBoundingClientRect().width;
    if (testLineWidth > containerWidth) {
      const operatorIndex = currentLine.search(CONTAINS_OPERATOR_REGEX);
      const commaIndex = currentLine.indexOf(",");

      if (operatorIndex >= 0 && operatorIndex <= 3) {
        expressionLines.unshift(currentLine.slice(operatorIndex));
        currentLine = currentLine.slice(0, operatorIndex);
      } else if (commaIndex >= 0 && commaIndex <= 3) {
        expressionLines.unshift(currentLine.slice(commaIndex + 1));
        currentLine = currentLine.slice(0, commaIndex + 1);
      } else {
        expressionLines.unshift(currentLine.slice(1));
        currentLine = currentLine[0];
      }
    }
    if (expressionLines.length === 3) {
      isFull = true;
      break;
    }
  }
  if (currentLine) {
    expressionLines.unshift(currentLine);
  }
  expressionLines = expressionLines.map((line) =>
    line.replaceAll("/", "\u00F7").replaceAll("*", "\u00d7")
  );

  document.body.removeChild(DOMTestLine);

  return [expressionLines, isFull];
}
