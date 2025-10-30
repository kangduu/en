"use client";

import type { Course } from "@/lib/books";
import React, { useEffect, useMemo } from "react";
import {
  checkCompleted,
  RenderWord,
  useCompleted,
  useCorrect,
} from "@/components/InputDetect";
import utterancePlay from "@/lib/utterance";
import getTalkerWidth from "./getTalkerWidth";

interface RenderSentenceProps {
  id: number; // sentence index
  sentence: string;
  translation: string;
  type: Course["type"];
  talkerWidth?: number;
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
  const _sentence = isEssay ? wordArr : words;

  // statistics completed of word.
  const [correct, setCorrect] = useCorrect(_sentence);
  useEffect(() => {
    onChange?.(props.id, checkCompleted(correct));
  }, [correct, props.id, onChange]);

  // check if all words are completed
  const completed = useCompleted(correct);

  return (
    <div className="mb-2">
      <div className="flex items-start gap-2">
        {isEssay ? null : (
          <div
            style={{ width: `${props.talkerWidth || 1}rem` }}
            className="uppercase text-right"
            onClick={() => {
              utterancePlay(_sentence.join(" "));
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
              completed
                ? "opacity-100"
                : "opacity-0 hover:opacity-100 active:opacity-100 focus:opacity-100"
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

  const TalkerWidth = useMemo(() => getTalkerWidth(lesson), [lesson]);
  return (
    <div className="w-fit max-w-full mx-auto overflow-hidden relative select-none px-1 pt-2 pb-1 md:px-8 md:pt-8 md:pb-4">
      {/* setting // 1.循环播放 2.显示注释 3. */}
      
      {course?.map?.((sentence, index) => (
        <RenderSentence
          translation={translation[index]}
          sentence={sentence}
          key={index}
          id={index}
          onChange={setCorrect}
          type={lesson.type}
          talkerWidth={TalkerWidth}
        />
      ))}

      {finish && (
        <div className="w-full h-full bg-gray-100/30 rounded text-red-500 text-3xl text-center flex justify-center items-center absolute top-0 left-0 z-10">
          🙂 Excellent 🙂
        </div>
      )}
    </div>
  );
}
