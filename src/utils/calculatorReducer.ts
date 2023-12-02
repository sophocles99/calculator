import { format } from "mathjs";
import splitExpression from "./splitExpression";

export const IS_OPERATOR_REGEX = /^[-+*\/%]$/;
const CONTAINS_OPERATOR_REGEX = /[-+*/%]/;
const MAX_NUM_LENGTH = 15;
const MAX_PRECISION = 14;
const UPPER_EXPONENT_LIMIT = 12;
const LOWER_EXPONENT_LIMIT = -6;

function containsTwoTerms(localExpression: string) {
  const terms = localExpression.split(CONTAINS_OPERATOR_REGEX);
  const startsWithMinus = localExpression[0] === "-";
  if (startsWithMinus) {
    terms.shift();
  }
  return terms.length >= 2 && terms[0] && terms[1];
}

function evaluate(expression: string) {
  let expressionSplit = splitExpression(expression);
  expressionSplit = expressionSplit.map((token) => {
    if (!IS_OPERATOR_REGEX.test(token)) {
      if (Number(token) === 0) {
        return "0";
      }
      if (!token.includes(".")) {
        return token.replace(/^0+/, "");
      } else {
        return token.replace(/0{2,}/, "0");
      }
    }
    return token;
  });

  if (IS_OPERATOR_REGEX.test(expressionSplit[expressionSplit.length - 1])) {
    expressionSplit.pop();
  }

  const cleanedExpression = expressionSplit.join("");

  try {
    const result = eval(cleanedExpression);
    const resultFormatted = format(result, {
      precision: MAX_PRECISION,
      upperExp: UPPER_EXPONENT_LIMIT,
      lowerExp: LOWER_EXPONENT_LIMIT,
    });
    return resultFormatted;
  } catch (error) {
    console.log(error);
    return "";
  }
}

export default function calculatorReducer(
  state: CalculatorStateType,
  action: ActionType
) {
  const {
    type,
    payload: { value, historyLine },
  } = action;
  const newState = { ...state };

  switch (type) {
    case "number": {
      const currentExpSplit = splitExpression(state.expression);
      const currentToken = currentExpSplit[currentExpSplit.length - 1];

      if (state.error === "Full") {
        break;
      }
      if (value === ".") {
        const terms = state.expression.split(CONTAINS_OPERATOR_REGEX);
        const currentTerm = terms[terms.length - 1];
        if (currentTerm.includes(".") && !state.overwrite) {
          break;
        }
      }
      if (state.overwrite) {
        newState.expression = value;
        newState.answer = "";
        newState.overwrite = false;
        newState.error = "";
        break;
      } else if (
        currentToken &&
        !IS_OPERATOR_REGEX.test(currentToken) &&
        value !== "." &&
        currentToken.replace(".", "").length >= MAX_NUM_LENGTH
      ) {
        newState.error = "Maximum length";
        break;
      } else {
        const newExpression = state.expression + value;
        newState.expression = newExpression;
        newState.answer = containsTwoTerms(newExpression)
          ? evaluate(newExpression)
          : "";
        newState.error = "";
        break;
      }
    }

    case "operator": {
      if (value === "=") {
        if (containsTwoTerms(state.expression)) {
          const evaluatedExpression = evaluate(state.expression);
          if (evaluatedExpression === "") {
            newState.error = "Invalid expression";
            break;
          } else {
            newState.expression = evaluatedExpression;
            newState.answer = "";
            newState.lastExpression = [state.expression, evaluatedExpression];
            newState.overwrite = true;
            newState.error = "";
            break;
          }
        }
        break;
      }
      if (state.expression.length === 0) {
        if (value !== "-") {
          break;
        }
      }
      if (IS_OPERATOR_REGEX.test(state.expression.slice(-1))) {
        if (state.expression.length === 1) {
          if (value !== "-") {
            break;
          }
        }
        newState.expression = newState.expression.slice(0, -1);
      }
      if (state.error === "Full") {
        break;
      }
      newState.expression = newState.expression + value;
      newState.overwrite = false;
      break;
    }

    case "function": {
      switch (value) {
        case "C": {
          newState.expression = "";
          newState.answer = "";
          newState.overwrite = false;
          newState.error = "";
          break;
        }
        case "back": {
          if (state.overwrite) {
            newState.expression = "";
            newState.answer = "";
            newState.overwrite = false;
            newState.error = "";
            break;
          }
          if (state.error) {
            newState.error = "";
            break;
          }
          const newExpression = state.expression.slice(0, -1);
          const newAnswer = containsTwoTerms(newExpression)
            ? evaluate(newExpression)
            : "";
          newState.expression = newExpression;
          newState.answer = newAnswer;
          newState.overwrite = false;
          newState.error = "";
          break;
        }
        case "+-": {
          let newExpression;
          if (state.expression[0] === "-") {
            newExpression = newState.expression.slice(1);
          } else {
            newExpression = "-" + newState.expression;
          }
          const newAnswer = containsTwoTerms(newExpression)
            ? evaluate(newExpression)
            : "";
          newState.expression = newExpression;
          newState.answer = newAnswer;
          newState.overwrite = false;
          break;
        }
        case "updateFromHistory": {
          if (historyLine) {
            newState.expression = historyLine[0];
            newState.answer = historyLine[1];
            newState.overwrite = false;
            newState.error = "";
          }
          break;
        }
      }
    }
  }
  return newState;
}
