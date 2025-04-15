"use client";

import type { Course } from "@/src/db/books";
import _ from "lodash";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useAudioContext } from "./WithAudioCtx";

// custom hook to manage the state of correct answers
// It takes a source array as input and returns an array of boolean values indicating whether each item is correct or not.
// The hook also provides a function to update the state of correct answers.
function useCorrect(source: string[]) {
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

function checkCompleted(source: boolean[]) {
  return source?.length > 0 && source?.every?.(Boolean);
}

// custom hook to check if all items in the source array are completed
// It takes a boolean array as input and returns a boolean value indicating whether all items are completed.
function useCompleted(source: boolean[]) {
  const [completed, setCompleted] = useState(false);
  useEffect(() => {
    const isCompleted = checkCompleted(source);
    if (isCompleted !== completed) {
      setCompleted(isCompleted);
    }
  }, [source, completed]);
  return completed;
}

// This component is used to render a word input field that checks if the input matches the given word.
// It uses a debounce function to limit the number of times the input change event is triggered.
// The input field has a border color that changes based on whether the input is correct or not.
function RenderWord({
  id,
  word,
  onChange,
}: {
  id: number; // word index
  word: string;
  onChange?: (id: number, success: boolean) => void;
}) {
  // completed the word in the input field
  const [right, setRight] = useState(false);

  const debouncedInputChange = useMemo(
    () =>
      _.debounce((e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        const correct = inputValue === word;
        onChange?.(id, correct);
        setRight(correct);
      }, 500),
    [id, word, onChange]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      debouncedInputChange(e);
    },
    [debouncedInputChange]
  );

  const len = word.length;
  const width = len >= 5 ? len * 0.65 : len * 0.85;
  return (
    <input
      onChange={handleInputChange}
      key={word}
      style={{ width: `${width}rem` }}
      className={`border-b-1 ${
        right ? "border-b-green-600 text-green-600" : "border-b-primary"
      } text-center focus:outline-none bg-transparent `}
    />
  );
}

interface RenderSentenceProps {
  id: number; // sentence index
  sentence: string;
  translation: string;
  onChange?: (index: number, complete: boolean) => void;
}

// This component is used to render a sentence input field that contains multiple words.
// Each word is rendered as a separate input field using the RenderWord component.
function RenderSentence({ sentence, onChange, ...props }: RenderSentenceProps) {
  const [talker, ...words] = useMemo(() => {
    return sentence.split(" ");
  }, [sentence]);

  // statistics completed of word.
  const [correct, setCorrect] = useCorrect(words);
  useEffect(() => {
    onChange?.(props.id, checkCompleted(correct));
  }, [correct, props.id, onChange]);

  // check if all words are completed
  const completed = useCompleted(correct);

  // audio context
  const audio = useAudioContext();

  return (
    <div className="mb-2">
      <div className="flex items-start gap-2">
        <div
          className="uppercase"
          onClick={() => {
            audio?.playSegment(props.id);
          }}
        >
          {talker}
        </div>
        <div>
          <div className="flex gap-1 flex-wrap">
            {words.map((word, index) => (
              <RenderWord
                word={word}
                key={word + index}
                id={index}
                onChange={setCorrect}
              />
            ))}
          </div>
          <p
            className={`text-xs text-gray-300 m-0 pt-1 ${
              completed ? "opacity-100" : "opacity-0 hover:opacity-100"
            }`}
          >
            {props.translation}
          </p>
        </div>
        <span
          className={`font-['geistMono'] text-pink-500 opacity-0 ${
            completed ? "opacity-100" : "opacity-0"
          }`}
        >
          ✔
        </span>
      </div>
    </div>
  );
}

// This component is used to render a course that contains multiple sentences.
// Each sentence is rendered using the RenderSentence component.
export default function RenderCourse({ lesson }: { lesson: Course }) {
  const { course, translation } = lesson;

  // completed all sentences in the course
  const [correct, setCorrect] = useCorrect(course);
  const finish = useCompleted(correct);

  return (
    <div className="w-fit max-w-full mx-auto overflow-hidden relative p-2 select-none">
      {course?.map?.((sentence, index) => (
        <RenderSentence
          translation={translation[index]}
          sentence={sentence}
          key={index}
          id={index}
          onChange={setCorrect}
        />
      ))}

      {finish && (
        <div className="w-full h-full bg-gray-100/20 rounded-xl  font-['geistMono'] text-red-500 text-3xl text-center flex justify-center items-center absolute top-0 left-0 z-10">
          - 100 -
          <br />
          PERFECT!
        </div>
      )}
    </div>
  );
}
