import React, { type PropsWithChildren } from "react";

export interface CardProps {
  clickable?: boolean;
  onClick?: () => void;
}

const Card: React.FC<PropsWithChildren<CardProps>> = ({
  clickable = true,
  onClick = () => {},
  children,
}) => {
  return (
    <div
      className={`shadow-lg p-4 bg-gray-100 rounded-lg ${
        clickable ? "cursor-pointer" : ""
      }`}
      onClick={() => {
        if (clickable) onClick();
      }}
    >
      {children}
    </div>
  );
};

export default Card;
