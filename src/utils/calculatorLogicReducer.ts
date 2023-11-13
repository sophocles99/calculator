export const OPERATORS_REGEX = /[\+\-\*\/%]/;

function containsTwoTerms(localExpression: string) {
  const terms = localExpression.split(OPERATORS_REGEX);
  return terms.length >= 2 && terms[0] && terms[1];
}

function evaluate(localExpression: string) {
  if (OPERATORS_REGEX.test(localExpression.slice(-1))) {
    localExpression = localExpression.slice(0, -1);
  }
  try {
    return eval(localExpression).toString();
  } catch (error) {
    console.log(error);
    return "";
  }
}

export default function calculatorLogicReducer(state: StateType, action: ActionType) {
  switch (action.type) {
    case "number": {
      if (action.payload === ".") {
        const terms = state.expression.split(OPERATORS_REGEX);
        const currentTerm = terms[terms.length - 1];
        if (currentTerm.includes(".")) {
          return state;
        }
      }
      if (state.overwrite) {
        return {
          ...state,
          expression: action.payload,
          answer: "",
          overwrite: false,
          error: false,
        };
      } else {
        const newExpression = state.expression + action.payload;
        const newAnswer = containsTwoTerms(newExpression)
          ? evaluate(newExpression)
          : "";
        return {
          ...state,
          expression: newExpression,
          answer: newAnswer,
          error: false,
        };
      }
    }

    case "operator": {
      if (action.payload === "=") {
        if (containsTwoTerms(state.expression)) {
          const evaluatedExpression = evaluate(state.expression);
          if (evaluatedExpression === "") {
            return {
              ...state,
              error: true,
            };
          } else {
            return {
              ...state,
              expression: evaluatedExpression,
              answer: "",
              overwrite: true,
            };
          }
        }
        return state;
      }
      if (OPERATORS_REGEX.test(state.expression.slice(-1))) {
        state.expression = state.expression.slice(0, -1);
      }
      return {
        ...state,
        expression: state.expression + action.payload,
        overwrite: false,
      };
    }

    case "function": {
      switch (action.payload) {
        case "C": {
          return {
            ...state,
            expression: "",
            answer: "",
            error: false,
          };
        }
        case "back": {
          const newExpression = state.expression.slice(0, -1);
          const newAnswer = containsTwoTerms(newExpression)
            ? evaluate(newExpression)
            : "";
          return {
            ...state,
            expression: newExpression,
            answer: newAnswer,
            error: false,
          };
        }
      }
      return state;
    }
  }
}