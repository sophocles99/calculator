import { useContext, useEffect, useRef } from "react";
import { CalculatorContext } from "../contexts/Calculator";
import formatExpression from "../utils/formatExpression";
import fitExpression from "../utils/fitExpression";
import styles from "../styles/Expression.module.css";

export default function Expression() {
  const containerRef = useRef<HTMLDivElement>(null);
  const container = containerRef.current;
  const { state } = useContext(CalculatorContext);
  const { expression } = state;
  const expressionFormatted = formatExpression(expression);
  let expressionSize = 1;
  if (container) {
    expressionSize = fitExpression(expressionFormatted, container);
  }

  useEffect(() => {
    if (container && container.scrollWidth > container.clientWidth) {
      container.scrollLeft = 9999;
    }
  });

  return (
    <div ref={containerRef} className={styles.expressionContainer}>
      <p
        className={`${styles.expression} ${
          styles["fontSize" + expressionSize]
        }`}
      >
        {expressionFormatted}
      </p>
    </div>
  );
}
