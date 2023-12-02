type ChildrenType = {
  children: ReactNode;
};

type SettingsStateType = {
  theme: "dark" | "light";
  sound: "on" | "off";
};

type ModalsStateType = {
  isMenuOpen: boolean;
  isSettingsOpen: boolean;
};

type HistoryLineType = [string, string];

type CalculatorStateType = {
  expression: string;
  answer: string;
  lastExpression: HistoryLineType;
  overwrite: boolean;
  error: "" | "Full" | "Maximum length" | "Invalid expression";
};

type HistoryStateType = {
  historyIsOpen: boolean;
  historyLines: HistoryLineType[];
};

type ActionType = {
  type: ButtonType;
  payload: { value: string; historyLine?: HistoryLineType };
};

type IconType = "back" | "+-" | "/" | "*" | "-" | "+" | "=";

type ButtonType = "number" | "operator" | "function";

type ButtonWithIconDefType = {
  value: IconType;
  type: ButtonType;
  icon: true;
  double: boolean;
};

type ButtonWithoutIconDefType = {
  value: string;
  type: ButtonType;
  icon: false;
  double: boolean;
};

type ButtonDefType = ButtonWithIconDefType | ButtonWithoutIconDefType;
