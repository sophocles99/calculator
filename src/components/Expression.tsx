import { useContext, useEffect, useRef, useState } from "react";
import { CalculatorContext } from "../contexts/Calculator";
import splitExpression from "../utils/splitExpression";
import formatExpression from "../utils/formatExpression";
import fitExpression from "../utils/fitExpression";
import styles from "../styles/Expression.module.css";

export default function Expression() {
  const { state, dispatch } = useContext(CalculatorContext);
  const [expLines, setExpLines] = useState<string[]>([""]);

  const containerRef = useRef<HTMLDivElement>(null);
  const container = containerRef.current;
  
  const { expression } = state;
  const expSplit = splitExpression(expression);
  const longNum = !expSplit.every((token) => token.length <= 12);
  const expFormatted = formatExpression(expSplit);

  useEffect(() => {
    if (container) {
      const [newExpLines, isFull] = fitExpression(
        expFormatted,
        container,
        longNum
      );
      if (isFull) {
        dispatch({ type: "function", payload: "full" });
      }
      setExpLines(newExpLines);
    }
  }, [expression]);

  return (
    <div ref={containerRef} className={styles.expressionContainer}>
      {expLines.map((line, index) => (
        <p
          key={index}
          className={`${styles.expression} ${longNum ? styles.longNum : ""}`}
        >
          {line}
        </p>
      ))}
    </div>
  );
}
