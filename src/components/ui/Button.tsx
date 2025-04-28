import React, { type PropsWithChildren } from "react";

export interface ButtonProps {
  disabled?: boolean;
}
export default function Button({
  disabled = false,
  children,
}: PropsWithChildren<ButtonProps>) {
  return (
    <button type="button" className="bg-indigo-500" disabled={disabled}>
      {children}
    </button>
  );
}
