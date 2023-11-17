type ChildrenType = {
  children: ReactNode;
};

type ModalsStateType = {
  isMenuOpen: boolean;
  isSettingsOpen: boolean;
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

type CalculatorStateType = {
  expression: string;
  answer: string;
  overwrite: boolean;
  full: boolean;
  error: boolean;
};

type ActionType = {
  type: ButtonType;
  payload: string;
};
