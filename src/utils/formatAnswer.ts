import styles from "../styles/Display.module.css";

export default function formatAnswer(
  answer: string,
  container: HTMLDivElement
): string {
  const containerWidth = container.getBoundingClientRect().width;

  const DOMTestLine = document.createElement("p");
  DOMTestLine.classList.add(styles.testAnswerLine);
  document.body.appendChild(DOMTestLine);

  let currentPrecision = 17;
  let answerFormatted = "";

  do {
    currentPrecision--;
    answerFormatted = parseFloat(answer).toPrecision(currentPrecision);
    DOMTestLine.textContent = answerFormatted;
  } while (DOMTestLine.getBoundingClientRect().width > containerWidth);

  // Strip trailing decimal zeros
  answerFormatted = answerFormatted.replace(/(?:\.0+|(\.\d+?)0+)$/, "$1");
  answerFormatted = answerFormatted.replace(/(\.\d*?[1-9])0+e/i, "$1e");

  document.body.removeChild(DOMTestLine);

  return answerFormatted;
}
