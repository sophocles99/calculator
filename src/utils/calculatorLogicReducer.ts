export const CONTAINS_OPERATOR_REGEX = /[-+*/%]/;
export const IS_OPERATOR_REGEX = /^[-+*\/%]$/;

function containsTwoTerms(localExpression: string) {
  const terms = localExpression.split(CONTAINS_OPERATOR_REGEX);
  const startsWithMinus = localExpression[0] === "-";
  if (startsWithMinus) {
    terms.shift();
  }
  return terms.length >= 2 && terms[0] && terms[1];
}

function evaluate(localExpression: string) {
  if (IS_OPERATOR_REGEX.test(localExpression.slice(-1))) {
    localExpression = localExpression.slice(0, -1);
  }
  try {
    return eval(localExpression).toString();
  } catch (error) {
    console.log(error);
    return "";
  }
}

export default function calculatorLogicReducer(
  state: StateType,
  action: ActionType
) {
  const returnState = { ...state };
  switch (action.type) {
    case "number": {
      if (state.full) {
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
        returnState.expression = action.payload;
        returnState.answer = "";
        returnState.overwrite = false;
        returnState.error = false;
        break;
      } else {
        const newExpression = state.expression + action.payload;
        const newAnswer = containsTwoTerms(newExpression)
          ? evaluate(newExpression)
          : "";
        returnState.expression = newExpression;
        returnState.answer = newAnswer;
        returnState.error = false;
        break;
      }
    }

    case "operator": {
      if (action.payload === "=") {
        if (containsTwoTerms(state.expression)) {
          const evaluatedExpression = evaluate(state.expression);
          if (evaluatedExpression === "") {
            returnState.error = true;
            break;
          } else {
            returnState.expression = evaluatedExpression;
            returnState.answer = "";
            returnState.overwrite = true;
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
        returnState.expression = returnState.expression.slice(0, -1);
      }
      if (state.full) {
        break;
      }
      returnState.expression = returnState.expression + action.payload;
      returnState.overwrite = false;
      break;
    }

    case "function": {
      switch (action.payload) {
        case "C": {
          returnState.expression = "";
          returnState.answer = "";
          returnState.overwrite = false;
          returnState.full = false;
          returnState.error = false;
          break;
        }
        case "back": {
          if (state.overwrite) {
            returnState.expression = "";
            returnState.answer = "";
            returnState.overwrite = false;
            returnState.full = false;
            returnState.error = false;
            break;
          }
          const newExpression = state.expression.slice(0, -1);
          const newAnswer = containsTwoTerms(newExpression)
            ? evaluate(newExpression)
            : "";
          returnState.expression = newExpression;
          returnState.answer = newAnswer;
          returnState.overwrite = false;
          returnState.full = false;
          returnState.error = false;
          break;
        }
        case "+-": {
          let newExpression;
          if (state.expression[0] === "-") {
            newExpression = returnState.expression.slice(1);
          } else {
            newExpression = "-" + returnState.expression;
          }
          const newAnswer = containsTwoTerms(newExpression)
            ? evaluate(newExpression)
            : "";
          returnState.expression = newExpression;
          returnState.answer = newAnswer;
          returnState.overwrite = false;
          break;
        }
        case "full": {
          returnState.expression = state.expression.slice(0, -1);
          returnState.full = true;
        }
      }
    }
  }
  return returnState;
}
