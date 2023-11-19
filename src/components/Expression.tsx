import { useContext, useEffect, useRef, useState } from "react";
import { CalculatorLogicContext } from "../contexts/CalculatorLogic";
import splitExpression from "../utils/splitExpression";
import formatExpression from "../utils/formatExpression";
import fitExpression from "../utils/fitExpression";
import styles from "../styles/Expression.module.css";

export default function Expression() {
  const {
    state: { expression },
    dispatch,
  } = useContext(CalculatorLogicContext);
  const [expLines, setExpLines] = useState<string[]>([""]);
  const containerRef = useRef<HTMLDivElement>(null);
  const container = containerRef.current;
  const expSplit = splitExpression(expression);
  const expFormatted = formatExpression(expSplit);

  useEffect(() => {
    if (container) {
      const [newExpressionLines, isFull] = fitExpression(
        expFormatted,
        container
      );
      if (isFull) {
        dispatch({ type: "function", payload: "full" });
      }
      setExpLines(newExpressionLines);
    }
  }, [expression]);

  return (
    <div ref={containerRef} className={styles.expressionContainer}>
      {expLines.map((line, index) => (
        <p key={index} className={styles.expression}>
          {line}
        </p>
      ))}
    </div>
  );
}
