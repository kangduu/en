"use client";
import React, { useMemo } from "react";
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
  //   todo
  console.log(sentences);
  return (
    <Drawer open={open} onOpenChange={setOpen} direction="bottom">
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="fixed right-16 bottom-4 z-10 rounded-full"
        >
          <Inspection className="text-blue-400" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="max-w-full w-[1024px] md:w-full mx-auto overflow-y-auto p-4">
          <DrawerHeader className="p-0 ">
            <DrawerTitle className="text-center m-0">Practice</DrawerTitle>
          </DrawerHeader>
          {/* tests */}
          <MiniTest tests={mini_test} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
