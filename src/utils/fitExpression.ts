import styles from "../styles/Expression.module.css";

export default function fitExpression(
  expression: string,
  container: HTMLDivElement
): number {
  let newExpressionSize = 1;

  const containerWidth = container.getBoundingClientRect().width;
  const DOMTestLine = document.createElement("p");
  DOMTestLine.classList.add(styles.testExpressionLine);
  DOMTestLine.textContent = expression;
  document.body.appendChild(DOMTestLine);

  while (newExpressionSize < 9) {
    DOMTestLine.classList.add(styles["fontSize" + newExpressionSize]);
    const testLineWidth = DOMTestLine.getBoundingClientRect().width;
    if (testLineWidth <= containerWidth) break;
    DOMTestLine.classList.remove(styles[newExpressionSize]);
    newExpressionSize++;
  }

  document.body.removeChild(DOMTestLine);
  return newExpressionSize;
}
