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

type CalculatorStateType = {
  expression: string;
  answer: string;
  previousExpression: string;
  overwrite: boolean;
  error: "" | "Full" | "Maximum length" | "Invalid expression";
};

type ActionType = {
  type: ButtonType;
  payload: string;
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
