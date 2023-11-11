import { useRef } from "react";
import formatExpression from "../utils/formatExpression";
import splitExpression from "../utils/splitExpression";
import styles from "../styles/Expression.module.css";

type ExpressionProps = {
  expression: string;
};

export default function Expression({ expression }: ExpressionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const container = containerRef.current;

  const expressionFormatted = formatExpression(expression);
  let expressionFormattedLines: string[] = [];
  if (container) {
    expressionFormattedLines = splitExpression(expressionFormatted, container);
  }

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
