type IconType = "+-" | "%" | "/" | "*" | "-" | "+" | "=";

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

type State = {
  expression: string;
  answer: string;
  overwrite: boolean;
  error: boolean;
};

type Action = {
  type: ButtonType;
  value: string;
};