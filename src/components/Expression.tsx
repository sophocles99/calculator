import { useEffect, useRef, useState } from "react";
import styles from "../styles/Expression.module.css";

type ExpressionProps = {
  expression: string;
};

const OPERATORS_REGEX = /[\+\-\*\/%]/;
const EXPRESSION_REGEX = /([0-9.]+)|([\+\-\*\/%]+)/g;

export default function Expression({ expression }: ExpressionProps) {
  const [expDisplay, setExpDisplay] = useState<string>("");
  const [expDisplayLines, setExpDisplayLines] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const expSplit = expression.match(EXPRESSION_REGEX);
    if (expSplit) {
      const expSplitFormatted = expSplit.map((term) => {
        if (!OPERATORS_REGEX.test(term)) {
          const trailingPoint = term.slice(-1) === ".";
          let [integerPart, decimalPart] = term.split(".");
          integerPart = new Intl.NumberFormat("en-GB").format(
            parseInt(integerPart)
          );
          if (decimalPart) {
            return [integerPart, decimalPart].join(".");
          } else {
            return integerPart + (trailingPoint ? "." : "");
          }
        } else {
          return term.replace("/", "\u00F7").replace("*", "\u00d7");
        }
      });
      console.log(expSplitFormatted);
      setExpDisplay(expSplitFormatted.join(""));
    } else {
      setExpDisplay("");
    }
  }, [expression]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const containerWidth = container.getBoundingClientRect().width;
      const testLine = document.createElement("p");
      testLine.classList.add(styles.testLine);
      document.body.appendChild(testLine);
      const expressionLines = [];
      let currentLine = "";
      for (let i = expDisplay.length - 1; i >= 0; i--) {
        currentLine = expDisplay[i] + currentLine;
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
      setExpDisplayLines(expressionLines);
    }
  }, [expDisplay]);

  return (
    <div ref={containerRef} className={styles.expressionContainer}>
      {expDisplayLines.map((line, index) => (
        <p key={index} className={styles.expression}>
          {line}
        </p>
      ))}
    </div>
  );
}
