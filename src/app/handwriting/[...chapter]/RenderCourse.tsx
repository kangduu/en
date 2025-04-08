"use client";

import type { Course } from "@/src/db/books";
import _ from "lodash";
import React, { useCallback, useState } from "react";

// This component is used to render a word input field that checks if the input matches the given word.
// It uses a debounce function to limit the number of times the input change event is triggered.
// The input field has a border color that changes based on whether the input is correct or not.
function RenderWord({ word }: { word: string }) {
  // completed the word in the input field
  const [right, setRight] = useState(false);

  const handleInputChange = useCallback(
    _.debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      setRight(inputValue === word);
    }, 500),
    [word]
  );

  return (
    <input
      onChange={handleInputChange}
      key={word}
      style={{ width: `${word.length}rem` }}
      className={`border-b-1 ${
        right ? "border-b-green-600 text-green-600" : "border-b-primary"
      } text-center focus:outline-none bg-transparent `}
    />
  );
}

// This component is used to render a sentence input field that contains multiple words.
// Each word is rendered as a separate input field using the RenderWord component.
function RenderSentence({ sentence }: { sentence: string }) {
  // todo: completed all words in the sentence
  const words = sentence.split(" ");
  return (
    <>
      <p className="text-gray-300 opacity-10 hover:opacity-100 m-0 mt-4">
        {sentence}
      </p>
      <div className="flex gap-2 items-center justify-center">
        {words.map((word) => (
          <RenderWord word={word} key={word} />
        ))}
      </div>
    </>
  );
}

// This component is used to render a course that contains multiple sentences.
// Each sentence is rendered using the RenderSentence component.
export default function RenderCourse({ course }: Pick<Course, "course">) {
  // todo: completed all sentences in the course
  return (
    <div className="text-center ">
      {course?.map?.((sentence, index) => (
        <RenderSentence sentence={sentence} key={index} />
      ))}
    </div>
  );
}
