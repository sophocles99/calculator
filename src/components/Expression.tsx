import { useEffect, useRef, useState } from "react";
import styles from "../styles/Expression.module.css";

type ExpressionProps = {
  children: string;
};

export default function Expression({ children }: ExpressionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [expressionLines, setExpressionLines] = useState<string[]>([]);

  useEffect(() => {
    console.log(children.length)
    const container = containerRef.current;
    if (container) {
      const containerWidth = container.getBoundingClientRect().width;
      const testLine = document.createElement("p");
      testLine.classList.add(styles.testLine);
      document.body.appendChild(testLine);
      const expressionLines = [];
      let currentLine = "";
      for (let i = children.length - 1; i >= 0; i--) {
        currentLine = children[i] + currentLine;
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
      setExpressionLines(expressionLines);
    }
  }, [children]);

  return (
    <div ref={containerRef} className={styles.expressionContainer}>
      {expressionLines.map((line, index) => (
        <p key={index} className={styles.expression}>
          {line}
        </p>
      ))}
    </div>
  );
}
