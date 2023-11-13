import { useContext, useEffect, useRef, useState } from "react";
import { CalculatorLogicContext } from "../contexts/CalculatorLogic";
import formatExpression from "../utils/formatExpression";
import splitExpression from "../utils/splitExpression";
import styles from "../styles/Expression.module.css";

type ExpressionProps = {
  expression: string;
};

export default function Expression({ expression }: ExpressionProps) {
  const { dispatch } = useContext(CalculatorLogicContext);
  const [expressionFormattedLines, setExpressionFormattedLines] = useState<
    string[]
  >([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const container = containerRef.current;

  const expressionFormatted = formatExpression(expression);

  useEffect(() => {
    if (container) {
      const [newExpressionFormattedLines, isFull] = splitExpression(
        expressionFormatted,
        container
      );
      if (isFull) {
        dispatch({ type: "function", payload: "full" });
      }
      setExpressionFormattedLines(newExpressionFormattedLines);
    }
  }, [expression]);

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
