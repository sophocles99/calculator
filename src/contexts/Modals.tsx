import { createContext, Dispatch, SetStateAction, useState } from "react";

type ModalsContextValueType = {
  modalsState: ModalsStateType;
  setModalsState: Dispatch<SetStateAction<ModalsStateType>>;
};

const defaultContextValue: ModalsContextValueType = {
  modalsState: {
    isMenuOpen: false,
    isSettingsOpen: false,
  },
  setModalsState: () => {},
};

const initialState: ModalsStateType = {
  isMenuOpen: false,
  isSettingsOpen: false,
};

export const ModalsContext =
  createContext<ModalsContextValueType>(defaultContextValue);

export default function ModalsProvider({ children }: ChildrenType) {
  const [modalsState, setModalsState] = useState(initialState);

  return (
    <ModalsContext.Provider value={{ modalsState, setModalsState }}>
      {children}
    </ModalsContext.Provider>
  );
}
