import { createContext, Dispatch, useReducer } from "react";
import calculatorReducer from "../utils/calculatorReducer";

type CalculatorContextValueType = {
  state: CalculatorStateType;
  dispatch: Dispatch<ActionType>;
};

const defaultContextValue: CalculatorContextValueType = {
  state: {
    expression: "",
    answer: "",
    overwrite: false,
    error: "",
  },
  dispatch: () => {},
};

const initialState: CalculatorStateType = {
  expression: "",
  answer: "",
  overwrite: false,
  error: "",
};

export const CalculatorContext =
  createContext<CalculatorContextValueType>(defaultContextValue);

export default function CalculatorProvider({ children }: ChildrenType) {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);

  return (
    <CalculatorContext.Provider value={{ state, dispatch }}>
      {children}
    </CalculatorContext.Provider>
  );
}
