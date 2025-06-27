"use client";
import React, { useMemo, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import type { Synonym } from "@/lib/actions";
import MiniTest from "./MiniTest";
import { Inspection } from "@icon-park/react";
import { flattenDeep } from "lodash";
import { Separator } from "@/components/ui/separator";
import { RenderWord, useCorrect } from "@/components/InputDetect";
import { matchSentence } from "@/utils";

function RenderSentence({ data }: { data: string[] }) {
  const [index, setIndex] = useState<number>(0);
  const { english, translate } = useMemo(() => {
    const sentence = data[index];
    return matchSentence(sentence);
  }, [data, index]);

  const words = english.split(" ");
  // statistics completed of word.
  const [correct, setCorrect] = useCorrect(words);

  return (
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
    const life = life_examples.map(({ scene, ...rest }) => {
      console.log(scene);
      return Object.values(rest).map((item) => item);
    });
    return flattenDeep([examples, life]);
  }, [explanation, life_examples]);

  return (
    <Drawer open={open} onOpenChange={setOpen} direction="bottom">
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="fixed right-4 bottom-4 z-10 rounded-full"
        >
          <Inspection className="text-blue-400" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="max-w-full md:w-[1024px] mx-auto overflow-y-auto p-4">
          <DrawerHeader className="p-0 ">
            <DrawerTitle className="text-center m-0">Practice</DrawerTitle>
          </DrawerHeader>
          {/* sentences */}
          <Separator title="Sentences" className="mt-8" />
          <RenderSentence data={sentences} />
          {/* tests */}
          <MiniTest tests={mini_test} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
