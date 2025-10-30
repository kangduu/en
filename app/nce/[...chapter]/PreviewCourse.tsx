"use client";

import { useRouter } from "next/navigation";
import type { Course } from "@/lib/books";
import React from "react";
import { cn, type NewConceptBookKey } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Empty from "@/components/svg/Empty";
import AudioCtx, { AudioTrigger } from "@/context/AudioCtx";
import getTalkerWidth from "./getTalkerWidth";
export interface PreviewCourseProps extends ComponentCssProps {
  courses: Course[];
  book: NewConceptBookKey;
}

// New Concept English Book Preview
export default function PreviewCourse({ book, courses }: PreviewCourseProps) {
  const router = useRouter();
  if (!courses?.length)
    return (
      <div className="res-box max-w-4xl">
        <div className="text-center mt-4 text-muted">
          The resources are on the way ~ ~ ~
        </div>
        <Empty.page />
      </div>
    );
  return (
    <AudioCtx paths={courses.map(({ audio }) => audio)}>
      <Accordion type="single" collapsible className="res-box max-w-3xl">
        {courses.map((lesson, index) => {
          const { course, id, translation, name, type, audio } = lesson;
          const NoTalker = type === "essay";
          const TalkerWidth = getTalkerWidth(lesson);
          return (
            <AccordionItem value={id + book} key={book + id}>
              <AccordionTrigger className="hover:no-underline items-center text-primary text-sm">
                <AudioTrigger
                  path={audio}
                  onClick={(e) => e.stopPropagation()}
                />
                <span
                  className={cn(
                    "hover:underline text-primary px-2",
                    "flex items-center justify-center flex-1"
                  )}
                >
                  {index + 1}. {name}
                </span>
                <span
                  className="cursor-pointer text-nowrap mr-4"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/nce/${book}/${id}`);
                  }}
                >
                  Start
                </span>
              </AccordionTrigger>
              {course.map((sentence, index) => {
                const [talker, s] = NoTalker
                  ? [undefined, sentence]
                  : sentence.split(":");
                return (
                  <AccordionContent key={id + index} className="flex pb-1">
                    {NoTalker ? null : (
                      <span
                        style={{ width: `${TalkerWidth}rem` }}
                        className="uppercase whitespace-nowrap mr-2 text-right inline-block text-muted"
                      >
                        {talker}:
                      </span>
                    )}
                    <span>
                      <div className="text-primary">{s}</div>
                      <span className="text-muted text-xs">
                        {translation[index]}
                      </span>
                    </span>
                  </AccordionContent>
                );
              })}
            </AccordionItem>
          );
        })}
      </Accordion>
    </AudioCtx>
  );
}
