import styles from "../styles/Expression.module.css";

export default function fitExpression(
  exp: string[],
  container: HTMLDivElement,
  longNum: boolean
): [string[], boolean] {
  const containerWidth = container.getBoundingClientRect().width;
  const DOMTestLine = document.createElement("p");
  DOMTestLine.classList.add(styles.testExpressionLine);
  if (longNum) DOMTestLine.classList.add(styles.longNum);
  document.body.appendChild(DOMTestLine);

  let expressionLines = [];
  let currentLine = "";
  let isFull = false;

  for (let i = exp.length - 1; i >= 0; i--) {
    const currentToken = exp[i];
    currentLine = currentToken + currentLine;
    DOMTestLine.textContent = currentLine;
    const testLineWidth = DOMTestLine.getBoundingClientRect().width;

    if (testLineWidth > containerWidth) {
      currentLine = currentLine.slice(currentToken.length);
      expressionLines.unshift(currentLine);
      currentLine = currentToken;
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
