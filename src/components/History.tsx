import { useEffect, useRef, useState } from "react";
import addCommaSeparators from "../utils/addCommaSeparators";
import formatExpression from "../utils/formatExpression";
import styles from "../styles/History.module.css";

export default function History() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [historyLines, setHistoryLines] = useState<PreviousExpressionType[]>(
    []
  );
  const historyLinesRef = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    let storedHistoryLines: PreviousExpressionType[] = [];
    const storedHistoryJSON = localStorage.getItem("history");
    if (storedHistoryJSON) {
      storedHistoryLines = JSON.parse(storedHistoryJSON);
    }
    setHistoryLines(storedHistoryLines);
  }, []);

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

  return (
    <div ref={containerRef} className={styles.historyContainer}>
      {historyLines.map(([expression, answer], index) => (
        <p
          ref={(element) => (historyLinesRef.current[index] = element)}
          className={styles.historyLine}
          key={index}
        >
          {formatExpression(expression)} = {addCommaSeparators(answer)}
        </p>
      ))}
    </div>
  );
}
