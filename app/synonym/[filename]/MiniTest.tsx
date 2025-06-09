"use client";

import React, { useState } from "react";
// import { Separator } from "@/components/ui/separator";
import type { Synonym } from "@/lib/actions";
import { Separator } from "@/components/ui/separator";

function RenderTest({
  value: { options = [], answer, explanation },
}: {
  value: Synonym["mini_test"][number];
}) {
  const Answer = ["A", "B", "C", "D", "E"];

  const [correct, setCorrect] = useState(false);
  const [selected, setSelected] = useState("");

  const handleClick = (index: number) => {
    const selected = Answer[index];
    setSelected(selected);
    setCorrect(selected === answer);
  };

  return (
    <>
      <div className="mt-2 flex items-center justify-around flex-wrap">
        {options.map((option, idx) => {
          const CorrectOption = option.startsWith(answer);
          return (
            <div
              key={idx}
              className="cursor-pointer hover:text-blue-400 transition-colors duration-200"
              onClick={() => handleClick(idx)}
            >
              {option}
              {selected && option.startsWith(selected) && (
                <span
                  className={`ml-2 ${
                    correct && selected === Answer[idx]
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {selected && CorrectOption ? "✅" : "❌"}
                </span>
              )}
            </div>
          );
        })}
      </div>
      {selected &&
        (correct ? (
          <p className="mt-2 text-sm text-green-500">
            Correct！【{explanation}】
          </p>
        ) : (
          <p className={"mt-2 text-sm text-red-500"}>
            {correct ? "Correct!" : "Incorrect, please try again."}
          </p>
        ))}
    </>
  );
}

interface MiniTestProps {
  tests: Synonym["mini_test"];
}
export default function MiniTest({ tests }: MiniTestProps) {
  return (
    <>
      <Separator title="Mini Test" className="mt-8" />
      {tests.length > 0 ? (
        <div className="flex flex-col gap-4">
          {tests.map((test, index) => (
            <div key={index} className="p-4 border rounded-md">
              <h3 className="text-lg font-semibold">{test.question}</h3>
              <RenderTest value={test} />
            </div>
          ))}
        </div>
      ) : (
        <p>No mini tests available.</p>
      )}
    </>
  );
}
