import styles from "../styles/Expression.module.css";

export default function splitExpression(
  expression: string,
  container: HTMLDivElement
) {
  const containerWidth = container.getBoundingClientRect().width;

  const DOMtestLine = document.createElement("p");
  DOMtestLine.classList.add(styles.testLine);
  document.body.appendChild(DOMtestLine);

  const expressionLines = [];
  let currentLine = "";

  for (let i = expression.length - 1; i >= 0; i--) {
    currentLine = expression[i] + currentLine;
    DOMtestLine.textContent = currentLine;

    const testLineWidth = DOMtestLine.getBoundingClientRect().width;
    if (testLineWidth > containerWidth) {
      expressionLines.unshift(currentLine.slice(1));
      currentLine = currentLine[0];
      DOMtestLine.textContent = "";
    }
  }
  if (currentLine) {
    expressionLines.unshift(currentLine);
  }
  document.body.removeChild(DOMtestLine);
  return expressionLines;
}
