import { useEffect, useRef, useState } from "react";
import formatExpression from "../utils/formatExpression";
import splitExpression from "../utils/splitExpression";
import styles from "../styles/Expression.module.css";

type ExpressionProps = {
  expression: string;
};

export default function Expression({ expression }: ExpressionProps) {
  const [expressionFormatted, setExpressionFormatted] = useState<string>("");
  const [expressionFormattedLines, setExpressionFormattedLines] = useState<
    string[]
  >([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setExpressionFormatted(formatExpression(expression));
  }, [expression]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      setExpressionFormattedLines(
        splitExpression(expressionFormatted, container)
      );
    }
  }, [expressionFormatted]);

  return (
    <div ref={containerRef} className={styles.expressionContainer}>
      {expressionFormattedLines.map((line, index) => (
        <p key={index} className={styles.expression}>
          {line}
        </p>
      ))}
    </div>
  );
}
