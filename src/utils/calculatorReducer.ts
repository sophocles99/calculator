import { format } from "mathjs";
import splitExpression from "./splitExpression";

export const CONTAINS_OPERATOR_REGEX = /[-+*/%]/;
export const IS_OPERATOR_REGEX = /^[-+*\/%]$/;
const MAX_NUM_LENGTH = 15;
const MAX_PRECISION = 14;
const EXPONENT_LIMIT = 15;

function containsTwoTerms(localExpression: string) {
  const terms = localExpression.split(CONTAINS_OPERATOR_REGEX);
  const startsWithMinus = localExpression[0] === "-";
  if (startsWithMinus) {
    terms.shift();
  }
  return terms.length >= 2 && terms[0] && terms[1];
}

function evaluate(exp: string) {
  if (IS_OPERATOR_REGEX.test(exp.slice(-1))) {
    exp = exp.slice(0, -1);
  }
  try {
    return format(eval(exp), {
      precision: MAX_PRECISION,
      upperExp: EXPONENT_LIMIT,
    });
  } catch (error) {
    console.log(error);
    return "";
  }
}

export default function calculatorReducer(
  state: CalculatorStateType,
  action: ActionType
) {
  const newState = { ...state };

  switch (action.type) {
    case "number": {
      const currentExpSplit = splitExpression(state.expression);
      const currentToken = currentExpSplit[currentExpSplit.length - 1];

      if (state.error === "Full") {
        break;
      }
      if (action.payload === ".") {
        const terms = state.expression.split(CONTAINS_OPERATOR_REGEX);
        const currentTerm = terms[terms.length - 1];
        if (currentTerm.includes(".") && !state.overwrite) {
          break;
        }
      }
      if (state.overwrite) {
        newState.expression = action.payload;
        newState.answer = "";
        newState.overwrite = false;
        newState.error = "";
        break;
      } else if (
        currentToken &&
        !IS_OPERATOR_REGEX.test(currentToken) &&
        action.payload !== "." &&
        currentToken.replace(".", "").length >= MAX_NUM_LENGTH
      ) {
        newState.error = "Maximum length";
        break;
      } else {
        const newExpression = state.expression + action.payload;
        const newAnswer = containsTwoTerms(newExpression)
          ? evaluate(newExpression)
          : "";
        newState.expression = newExpression;
        newState.answer = newAnswer;
        newState.error = "";
        break;
      }
    }

    case "operator": {
      if (action.payload === "=") {
        if (containsTwoTerms(state.expression)) {
          const evaluatedExpression = evaluate(state.expression);
          if (evaluatedExpression === "") {
            newState.error = "Invalid expression";
            break;
          } else {
            newState.expression = evaluatedExpression;
            newState.answer = "";
            newState.overwrite = true;
            newState.error = "";
            break;
          }
        }
        break;
      }
      if (state.expression.length === 0) {
        if (action.payload !== "-") {
          break;
        }
      }
      if (IS_OPERATOR_REGEX.test(state.expression.slice(-1))) {
        if (state.expression.length === 1) {
          if (action.payload !== "-") {
            break;
          }
        }
        newState.expression = newState.expression.slice(0, -1);
      }
      if (state.error === "Full") {
        break;
      }
      newState.expression = newState.expression + action.payload;
      newState.overwrite = false;
      break;
    }

    case "function": {
      switch (action.payload) {
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
        case "full": {
          newState.expression = state.expression.slice(0, -1);
          newState.error = "Full";
        }
      }
    }
  }
  return newState;
}