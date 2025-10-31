"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  DrawerPortal,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import {
  AudioControl,
  AudioTrigger,
  useAudioContext,
} from "@/context/AudioCtx";
import type { Course } from "@/lib/books";
import type { NewConceptBookKey } from "@/lib/utils";
import {
  DoubleLeft,
  DoubleRight,
  NotebookOne,
  PlayCycle,
  PlayOnce,
} from "@icon-park/react";
import React, { type PropsWithChildren } from "react";

const ControlLabel = ({ children }: PropsWithChildren) => {
  return <Label className="hidden md:block cursor-pointer">{children}</Label>;
};

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
          <DoubleLeft theme="outline" />
          <ControlLabel>{PreviousCourse?.name}</ControlLabel>
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
          <ControlLabel>{NextCourse?.name}</ControlLabel>
          <DoubleRight theme="outline" />
        </Button>
      )}

      <AudioTrigger path={CurrentCourse.audio}>
        {(played) => {
          return (
            <Button variant="outline" onClick={() => audio.setReplay?.(false)}>
              <AudioControl played={played} />
              <ControlLabel>听原文</ControlLabel>
            </Button>
          );
        }}
      </AudioTrigger>

      <AudioTrigger path={CurrentCourse.audio}>
        <Button variant="outline" onClick={() => audio.setReplay?.(true)}>
          {audio.replay ? (
            <>
              <PlayCycle theme="outline" />
              <ControlLabel>循环播放</ControlLabel>
            </>
          ) : (
            <>
              <PlayOnce theme="outline" />
              <ControlLabel>播放一次</ControlLabel>
            </>
          )}
        </Button>
      </AudioTrigger>

      {props.notes && (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button variant="outline">
              <NotebookOne theme="outline" />
              <ControlLabel>课堂笔记</ControlLabel>
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
