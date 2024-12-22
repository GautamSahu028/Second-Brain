import { ReactElement } from "react";

export interface ButtonProps {
  variant: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  text: string;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  width?: "full";
  onClick?: () => void;
}
const variantStyles = {
  primary: "bg-purple-600 text-white",
  secondary: "bg-purple-300 text-purple-600",
};
const sizeStyles = {
  sm: "py-1 pl-2 pr-4",
  md: "py-2 px-4 pr-5",
  lg: "py-3 px-6 pr-6",
};
const defaultStyles = "rounded-lg flex items-center font-light justify-center";
const Button = (props: ButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      className={`${variantStyles[props.variant]} ${defaultStyles} ${
        sizeStyles[props.size]
      } ${props.width ? "w-full" : null}`}
    >
      {props.startIcon ? <div className="pr-2">{props.startIcon}</div> : null}
      {props.text}
      {props.endIcon ? <div className="pl-2">{props.endIcon}</div> : null}
    </button>
  );
};

export default Button;
