import { useContext, useEffect, useRef } from "react";
import { HistoryContext } from "../contexts/History";
import addCommaSeparators from "../utils/addCommaSeparators";
import formatExpression from "../utils/formatExpression";
import styles from "../styles/History.module.css";
import { CalculatorContext } from "../contexts/Calculator";

const playClick = () => {
  const clickSound = new Audio("clickSound.wav");
  clickSound.play();
};

export default function History() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const historyLinesRef = useRef<(HTMLParagraphElement | null)[]>([]);
  const { calculatorDispatch } = useContext(CalculatorContext);
  const {
    historyState: { historyLines },
    historyDispatch,
  } = useContext(HistoryContext);

  // Set scroll positions for container and history paragraphs if necessary
  useEffect(() => {
    const container = containerRef.current;
    if (container && container.scrollHeight > container.clientHeight) {
      container.scrollTop = 9999;
    }
    const historyParagraphs = historyLinesRef.current;
    if (historyParagraphs) {
      historyParagraphs.forEach((paragraph) => {
        if (paragraph && paragraph.scrollWidth > paragraph.clientWidth) {
          paragraph.scrollLeft = 9999;
        }
      });
    }
  }, [historyLines]);

  const handleClick = (historyLine: HistoryLineType) => {
    playClick();
    historyDispatch({ type: "function", payload: { value: "close" } });
    calculatorDispatch({
      type: "function",
      payload: { value: "updateFromHistory", historyLine },
    });
  };

  return (
    <div ref={containerRef} className={styles.historyContainer}>
      {historyLines.length ? (
        ""
      ) : (
        <p className={styles.historyLine}>History empty</p>
      )}
      {historyLines.map(([expression, answer], index) => (
        <p
          key={index}
          ref={(element) => (historyLinesRef.current[index] = element)}
          className={styles.historyLine}
          onClick={() => handleClick([expression, answer])}
        >
          {formatExpression(expression)} = {addCommaSeparators(answer)}
        </p>
      ))}
    </div>
  );
}
