"use client";

import type { Course } from "@/lib/books";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useAudioContext } from "@/context/AudioCtx";
import InputDetect from "@/components/InputDetect";

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

interface RenderWordProps {
  word: string;
  id: number;
  onChange: (index: number, success: boolean) => void;
}
function RenderWord({ word, id, onChange }: RenderWordProps) {
  // keep onChange callback unique.
  const handleChange = useCallback(
    (correct: boolean) => {
      onChange?.(id, correct);
    },
    [id, onChange]
  );
  return <InputDetect target={word} key={word + id} onChange={handleChange} />;
}

interface RenderSentenceProps {
  id: number; // sentence index
  sentence: string;
  translation: string;
  type: Course["type"];
  onChange?: (index: number, complete: boolean) => void;
}

// This component is used to render a sentence input field that contains multiple words.
// Each word is rendered as a separate input field using the RenderWord component.
function RenderSentence({
  type,
  sentence,
  onChange,
  ...props
}: RenderSentenceProps) {
  const wordArr = useMemo(() => {
    return sentence.split(" ");
  }, [sentence]);

  const [talker, ...words] = wordArr;
  const isEssay = type === "essay"; // is essay content.

  // statistics completed of word.
  const [correct, setCorrect] = useCorrect(isEssay ? wordArr : words);
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
        {isEssay ? null : (
          <div
            className="uppercase"
            onClick={() => {
              audio?.playSegment(props.id);
            }}
          >
            {talker}
          </div>
        )}
        <div>
          <div className="flex gap-1 flex-wrap">
            {(isEssay ? wordArr : words).map((word, index) => (
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
          type={lesson.type}
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
