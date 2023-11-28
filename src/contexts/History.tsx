import { createContext, Dispatch, SetStateAction, useState } from "react";

type HistoryContextValueType = {
  isHistoryOpen: boolean;
  setIsHistoryOpen: Dispatch<SetStateAction<boolean>>;
};

const defaultContextValue: HistoryContextValueType = {
  isHistoryOpen: false,
  setIsHistoryOpen: () => {},
};

const initialState = false;

export const HistoryContext = createContext(defaultContextValue);

export default function HistoryContextProvider({ children }: ChildrenType) {
  const [isHistoryOpen, setIsHistoryOpen] = useState(initialState);
  return (
    <HistoryContext.Provider value={{ isHistoryOpen, setIsHistoryOpen }}>
      {children}
    </HistoryContext.Provider>
  );
}
