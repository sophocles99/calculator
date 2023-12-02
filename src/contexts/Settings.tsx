import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import retrieveSettings from "../utils/retrieveSettings";

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

const initialState: SettingsStateType = retrieveSettings();

export const SettingsContext = createContext(defaultContextValue);

export default function SettingsContextProvider({ children }: ChildrenType) {
  const [settingsState, setSettingsState] = useState(initialState);

  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settingsState));
  }, [settingsState]);
  
  return (
    <SettingsContext.Provider value={{ settingsState, setSettingsState }}>
      {children}
    </SettingsContext.Provider>
  );
}
