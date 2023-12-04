import React from "react";
import "./Button.css";

type ButtonProps = {
  children: React.ReactNode;
  // buttonType?: string;
  // color?: string;
};

const Button = (props: ButtonProps) => {
  return <button>{props.children}</button>;
};

export default Button;
