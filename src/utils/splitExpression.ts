import styles from "../styles/Expression.module.css";

export default function splitExpression(
  expression: string,
  container: HTMLDivElement
) {
  const containerWidth = container.getBoundingClientRect().width;
  const testLine = document.createElement("p");
  testLine.classList.add(styles.testLine);
  document.body.appendChild(testLine);
  const expressionLines = [];
  let currentLine = "";
  for (let i = expression.length - 1; i >= 0; i--) {
    currentLine = expression[i] + currentLine;
    testLine.textContent = currentLine;
    const testLineWidth = testLine.getBoundingClientRect().width;
    if (testLineWidth > containerWidth) {
      expressionLines.unshift(currentLine.slice(1));
      currentLine = currentLine[0];
      testLine.textContent = "";
    }
  }
  if (currentLine) {
    expressionLines.unshift(currentLine);
  }
  document.body.removeChild(testLine);
  return expressionLines;
}
