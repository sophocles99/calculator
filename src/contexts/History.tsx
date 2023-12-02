import {
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useReducer,
} from "react";
import historyReducer from "../utils/historyReducer";
import { CalculatorContext } from "./Calculator";

type HistoryContextValueType = {
  historyState: HistoryStateType;
  historyDispatch: Dispatch<ActionType>;
};

const defaultContextValue: HistoryContextValueType = {
  historyState: {
    historyIsOpen: false,
    historyLines: [],
  },
  historyDispatch: () => {},
};

// Retrieve history from localStorage, if present, and use in initialState for
// HistoryContext
let storedHistoryLines: HistoryLineType[] = [];
const storedHistoryJSON = localStorage.getItem("history");
if (storedHistoryJSON) {
  storedHistoryLines = JSON.parse(storedHistoryJSON);
}
const initialState: HistoryStateType = {
  historyIsOpen: false,
  historyLines: storedHistoryLines,
};

export const HistoryContext = createContext(defaultContextValue);

export default function HistoryContextProvider({ children }: ChildrenType) {
  const [historyState, historyDispatch] = useReducer(
    historyReducer,
    initialState
  );
  const { calculatorState } = useContext(CalculatorContext);

  // Whenever lastExpression in calculatorState changes, call historyDispatch
  // to add it to historyLines
  useEffect(() => {
    if (
      calculatorState.lastExpression[0] &&
      calculatorState.lastExpression[1]
    ) {
      historyDispatch({
        type: "function",
        payload: {
          value: "add",
          historyLine: [
            calculatorState.lastExpression[0],
            calculatorState.lastExpression[1],
          ],
        },
      });
    }
  }, [calculatorState.lastExpression]);

  // Whenever historyLines changes, save lastest version to localStorage
  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(historyState.historyLines));
  }, [historyState.historyLines]);

  return (
    <HistoryContext.Provider value={{ historyState, historyDispatch }}>
      {children}
    </HistoryContext.Provider>
  );
}
