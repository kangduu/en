"use client";
import React, { useEffect, useMemo, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import type { Synonym } from "@/lib/actions";
import MiniTest from "./MiniTest";
import { flattenDeep } from "lodash";
import { Separator } from "@/components/ui/separator";
import { RenderWord, useCompleted, useCorrect } from "@/components/InputDetect";
import { matchSentence } from "@/utils";
import { cn } from "@/lib/utils";

function RenderSentence({ data }: { data: string[] }) {
  const [current, setCurrent] = useState<number>(0);
  const [words, setWords] = useState<string[]>([]);
  const [translate, setTranslate] = useState("");

  useEffect(() => {
    const { english, translate } = (() => {
      const Total = data.length;
      const index = current % Total;
      const sentence = data[index];
      return matchSentence(sentence);
    })();
    setTranslate(translate);
    const words = english.split(" ");
    setWords(words);
  }, [data, current]);

  // statistics completed of word.
  const [correct, setCorrect] = useCorrect(words);

  // check if all words are completed
  const completed = useCompleted(correct);
  useEffect(() => {
    if (completed) {
      setWords([]);
      setCurrent((prev) => prev + 1);
    }
  }, [completed]);

  return (
    <>
      <div className="flex gap-2 mb-4">
        {data.map((_, index) => (
          <div
            key={index}
            className={cn(
              "cursor-pointer rounded-[50%] p-2 bg-blue-100 leading-[50%]",
              current % data.length === index && "bg-blue-500 text-white"
            )}
            onClick={() => setCurrent(index)}
          >
            {index}
          </div>
        ))}
      </div>
      {translate ? (
        <>
          <p>{translate}</p>
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
        </>
      ) : (
        <p>{words}</p>
      )}
    </>
  );
}

interface TestProps {
  data: Synonym;
}

export default function Test({ data }: TestProps) {
  const [open, setOpen] = React.useState(false);

  const { mini_test, explanation, life_examples } = data || {};
  const sentences = useMemo(() => {
    const examples = explanation.details.map(({ example }) => example);
    // eslint-disable-next-line
    const life = life_examples.map(({ scene, ...rest }) => {
      return Object.values(rest).map((item) => item);
    });
    return flattenDeep([examples, life]);
  }, [explanation, life_examples]);

  return (
    <Drawer open={open} onOpenChange={setOpen} direction="bottom">
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="fixed right-4 bottom-16 z-10 rounded-full p-1 text-xl"
        >
          ⚙
        </Button>
      </DrawerTrigger>
      <DrawerPortal>
        <DrawerOverlay className="bg-black/90" />
        <DrawerContent>
          <div className="max-w-full md:w-[var(--size)] mx-auto overflow-y-auto p-4">
            <DrawerHeader className="p-0 ">
              <DrawerTitle className="m-0">Practice</DrawerTitle>
            </DrawerHeader>
            {/* sentences */}
            <Separator title="Sentences" className="mt-8" />
            <RenderSentence data={sentences} />
            {/* tests */}
            <MiniTest tests={mini_test} />
          </div>
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  );
}
