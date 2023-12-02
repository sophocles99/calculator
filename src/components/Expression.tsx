import { useContext, useEffect, useRef, useState } from "react";
import { CalculatorContext } from "../contexts/Calculator";
import formatExpression from "../utils/formatExpression";
import fitExpression from "../utils/fitExpression";
import styles from "../styles/Expression.module.css";

export default function Expression() {
  const [expressionSize, setExpressionSize] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const { calculatorState } = useContext(CalculatorContext);
  const { expression } = calculatorState;
  const expressionFormatted = formatExpression(expression);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      setExpressionSize(fitExpression(expressionFormatted, container));
    }
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
