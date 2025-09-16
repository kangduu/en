"use client";

import type { Course } from "@/lib/books";
import React, { useEffect, useMemo } from "react";
import { useAudioContext } from "@/context/AudioCtx";
import {
  checkCompleted,
  RenderWord,
  useCompleted,
  useCorrect,
} from "@/components/InputDetect";

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
        <div className="flex-1">
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
            className={`w-full text-xs text-gray-300 m-0 pt-1 ${
              completed ? "opacity-100" : "opacity-0 hover:opacity-100 active:opacity-100 focus:opacity-100"
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
