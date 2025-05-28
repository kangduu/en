"use client";

import _ from "lodash";
import React, { useCallback, useMemo, useState } from "react";

export interface InputDetectProps {
  target: string;
  onChange: (correct: boolean) => void;
}

export default function InputDetect({ target, onChange }: InputDetectProps) {
  const [right, setRight] = useState(false);

  const debouncedInputChange = useMemo(
    () =>
      _.debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        const correct = inputValue === target;
        onChange?.(correct);
        setRight(correct);
      }, 500),
    [target, onChange]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      debouncedInputChange(e);
    },
    [debouncedInputChange]
  );

  const len = target.length;
  const width = len >= 5 ? len * 0.65 : len * 0.85;
  return (
    <input
      onChange={handleInputChange}
      key={target}
      style={{ width: `${width}rem` }}
      className={`border-b-1 ${
        right ? "border-b-green-600 text-green-600" : "border-b-primary"
      } text-center focus:outline-none bg-transparent `}
    />
  );
}
