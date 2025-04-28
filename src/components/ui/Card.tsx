"use client";
import React, { type PropsWithChildren } from "react";

export interface CardProps extends ComponentCssProps {
  clickable?: boolean;
  onClick?: () => void;
}

const Card: React.FC<PropsWithChildren<CardProps>> = ({
  clickable = true,
  onClick = () => {},
  ...props
}) => {
  return (
    <div
      className={`
      shadow-xl p-4 bg-blue-300/50 dark:bg-slate-700 rounded-lg
      ${clickable ? "cursor-pointer" : ""}
      ${props.className || ""} 
      `}
      onClick={() => {
        if (clickable) onClick();
      }}
      style={props.style}
    >
      {props.children}
    </div>
  );
};

export default Card;
