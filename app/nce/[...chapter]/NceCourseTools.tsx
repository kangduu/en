"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerPortal,
  DrawerTrigger,
} from "@/components/ui/drawer";
import AudioCtx, {
  AudioControl,
  AudioTrigger,
  useAudioContext,
} from "@/context/AudioCtx";
import type { Course } from "@/lib/books";
import type { NewConceptBookKey } from "@/lib/utils";
import { DoubleLeft, DoubleRight, NotebookOne } from "@icon-park/react";
import React from "react";

interface NceCourseToolsProps {
  page: number;
  book: NewConceptBookKey;
  courses: Course[];
  notes?: string;
}

export default function NceCourseTools({
  page,
  book,
  courses,
  ...props
}: NceCourseToolsProps) {
  const [open, setOpen] = React.useState(false);
  const audio = useAudioContext();

  const PreviousCourse = courses[page - 1],
    NextCourse = courses[page + 1],
    CurrentCourse = courses[page];
  return (
    <div className="w-full dark:border-gray-100/40 flex gap-4 justify-center items-center mt-8">
      {PreviousCourse?.name && (
        <Button
          variant="outline"
          disabled={page === 0}
          onClick={() => {
            window.location.href = `/nce/${book}/${PreviousCourse.id}`;
          }}
        >
          <DoubleLeft theme="outline" size="24" />
          <span className="hidden md:block">{PreviousCourse?.name}</span>
        </Button>
      )}

      {NextCourse?.name && (
        <Button
          variant="outline"
          disabled={page === courses.length - 1}
          onClick={() => {
            window.location.href = `/nce/${book}/${NextCourse.id}`;
          }}
        >
          <span className="hidden md:block">{NextCourse?.name}</span>
          <DoubleRight theme="outline" size="24" />
        </Button>
      )}

      <AudioTrigger path={CurrentCourse.audio}>
        {(played) => {
          return (
            <Button variant="outline">
              <AudioControl played={played} />
              <span className="hidden md:block">听原文</span>
            </Button>
          );
        }}
      </AudioTrigger>

      <Button
        variant="outline"
        onClick={() => audio.setReplay?.(!audio.replay)}
      >
        <Checkbox
          style={{ cursor: "pointer" }}
          type="button"
          checked={audio.replay}
          onCheckedChange={(value) => audio.setReplay?.(value as boolean)}
        />
        自动重播
      </Button>

      {props.notes && (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button variant="outline">
              <NotebookOne theme="outline" size="24" />
              <span className="hidden md:block">课堂笔记</span>
            </Button>
          </DrawerTrigger>
          <DrawerPortal>
            <DrawerOverlay className="bg-black/50" />
            <DrawerContent>
              <div
                className="mx-auto md px-4 overflow-y-auto"
                dangerouslySetInnerHTML={{ __html: props.notes }}
              />
            </DrawerContent>
          </DrawerPortal>
        </Drawer>
      )}
    </div>
  );
}
