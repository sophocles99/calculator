import { createContext, Dispatch, useReducer } from "react";
import calculatorLogicReducer from "../utils/calculatorLogicReducer";

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

export const CalculatorLogicContext =
  createContext<CalculatorContextValueType>(defaultContextValue);

export default function CalculatorLogicProvider({ children }: ChildrenType) {
  const [state, dispatch] = useReducer(calculatorLogicReducer, initialState);

  return (
    <CalculatorLogicContext.Provider value={{ state, dispatch }}>
      {children}
    </CalculatorLogicContext.Provider>
  );
}
