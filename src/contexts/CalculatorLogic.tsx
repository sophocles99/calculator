import { createContext, Dispatch, ReactNode, useReducer } from "react";
import calculatorLogicReducer from "../utils/calculatorLogicReducer";

type ContextValueType = {
  state: StateType;
  dispatch: Dispatch<ActionType>;
};

type ChildrenType = {
  children: ReactNode;
};

const initialState: StateType = {
  expression: "",
  answer: "",
  overwrite: false,
  error: false,
};

const defaultContextValue = {
  state: {
    expression: "",
    answer: "",
    overwrite: false,
    error: false,
  },
  dispatch: () => {},
};

export const CalculatorLogicContext =
  createContext<ContextValueType>(defaultContextValue);

export default function CalculatorLogicProvider({ children }: ChildrenType) {
  const [state, dispatch] = useReducer(calculatorLogicReducer, initialState);
  const value = { state, dispatch };

  return (
    <CalculatorLogicContext.Provider value={value}>
      {children}
    </CalculatorLogicContext.Provider>
  );
}
