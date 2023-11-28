import { createContext, Dispatch, useEffect, useReducer } from "react";
import calculatorReducer from "../utils/calculatorReducer";
import storeHistory from "../utils/storeHistory";

type CalculatorContextValueType = {
  state: CalculatorStateType;
  dispatch: Dispatch<ActionType>;
};

const defaultContextValue: CalculatorContextValueType = {
  state: {
    expression: "",
    answer: "",
    previousExpression: ["", ""],
    overwrite: false,
    error: "",
  },
  dispatch: () => {},
};

const initialState: CalculatorStateType = {
  expression: "",
  answer: "",
  previousExpression: ["", ""],
  overwrite: false,
  error: "",
};

export const CalculatorContext =
  createContext<CalculatorContextValueType>(defaultContextValue);

export default function CalculatorProvider({ children }: ChildrenType) {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);

  useEffect(() => {
    if (state.previousExpression[0] && state.previousExpression[1]) {
      storeHistory(state.previousExpression);
      console.log("New history stored!");
    }
  }, [state.previousExpression]);

  return (
    <CalculatorContext.Provider value={{ state, dispatch }}>
      {children}
    </CalculatorContext.Provider>
  );
}
