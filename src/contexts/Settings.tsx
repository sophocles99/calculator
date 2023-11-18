import { Dispatch, SetStateAction, createContext, useState } from "react";

type SettingsContextValueType = {
  settingsState: SettingsStateType;
  setSettingsState: Dispatch<SetStateAction<SettingsStateType>>;
};

const defaultContextValue: SettingsContextValueType = {
  settingsState: {
    theme: "light",
    sound: "on",
  },
  setSettingsState: () => {},
};
const initialState: SettingsStateType = {
  theme: "light",
  sound: "on",
};

export const SettingsContext = createContext(defaultContextValue);

export default function SettingsContextProvider({ children }: ChildrenType) {
  const [settingsState, setSettingsState] = useState(initialState);
  return (
    <SettingsContext.Provider value={{ settingsState, setSettingsState }}>
      {children}
    </SettingsContext.Provider>
  );
}
