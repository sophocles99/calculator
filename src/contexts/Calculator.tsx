import { createContext, Dispatch, useReducer } from "react";
import calculatorReducer from "../utils/calculatorReducer";

type CalculatorContextValueType = {
  calculatorState: CalculatorStateType;
  calculatorDispatch: Dispatch<ActionType>;
};

const defaultContextValue: CalculatorContextValueType = {
  calculatorState: {
    expression: "",
    answer: "",
    lastExpression: ["", ""],
    overwrite: false,
    error: "",
  },
  calculatorDispatch: () => {},
};

const initialState: CalculatorStateType = {
  expression: "",
  answer: "",
  lastExpression: ["", ""],
  overwrite: false,
  error: "",
};

export const CalculatorContext =
  createContext<CalculatorContextValueType>(defaultContextValue);

export default function CalculatorProvider({ children }: ChildrenType) {
  const [calculatorState, calculatorDispatch] = useReducer(
    calculatorReducer,
    initialState
  );

  return (
    <CalculatorContext.Provider value={{ calculatorState, calculatorDispatch }}>
      {children}
    </CalculatorContext.Provider>
  );
}
