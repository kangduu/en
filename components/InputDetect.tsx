"use client";

import _ from "lodash";
import React, { useCallback, useEffect, useMemo, useState } from "react";

// custom hook to manage the state of correct answers
// It takes a source array as input and returns an array of boolean values indicating whether each item is correct or not.
// The hook also provides a function to update the state of correct answers.
export function useCorrect(source: string[]) {
  const [correct, setCorrect] = useState<boolean[]>([]);

  const updateCorrect = useCallback(
    (index: number, success: boolean) => {
      setCorrect((prev) => {
        const newCorrect = [...prev];
        newCorrect[index] = success;
        return newCorrect;
      });
    },
    [setCorrect]
  );

  useEffect(() => {
    setCorrect(Array(source.length).fill(false));
  }, [source.length]);

  return [correct, updateCorrect] as const;
}
export interface InputDetectProps {
  target: string;
  onChange: (correct: boolean) => void;
}

function InputDetect({ target, onChange }: InputDetectProps) {
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

export interface RenderWordProps {
  word: string;
  id: number;
  onChange: (index: number, success: boolean) => void;
}
export function RenderWord({ word, id, onChange }: RenderWordProps) {
  // keep onChange callback unique.
  const handleChange = useCallback(
    (correct: boolean) => {
      onChange?.(id, correct);
    },
    [id, onChange]
  );
  return <InputDetect target={word} key={word + id} onChange={handleChange} />;
}

export default InputDetect;
