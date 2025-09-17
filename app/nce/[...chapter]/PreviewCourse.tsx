"use client";

import { useRouter } from "next/navigation";
import type { Course } from "@/lib/books";
import React from "react";
import { HeaderLinkPathMapping } from "@/lib/navigation";
import { cn, type NewConceptBookKey } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Empty from "@/components/svg/Empty";
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
    <Accordion type="single" collapsible className="res-box max-w-3xl">
      {courses.map(({ course, id, translation, name, type }, index) => {
        const NoTalker = type === "essay";
        const TalkerWidth = (() => {
          let width = 0;
          if (NoTalker) return width;
          course.forEach((sentence) => {
            const [talker] = sentence.split(":");
            const Len = talker.length;
            if (Len > width) width = Len;
          });
          return width;
        })();
        return (
          <AccordionItem key={book + id} value={id + book}>
            <AccordionTrigger className="hover:no-underline items-center">
              <span
                className="text-primary text-[0.8rem] text-nowrap"
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`${HeaderLinkPathMapping["NCE"]}/${book}/${id}`);
                }}
              >
                开始练习
              </span>
              <span
                className={cn(
                  "hover:underline text-primary px-2",
                  "flex items-center justify-center flex-1"
                )}
              >
                {index + 1}. {name}
              </span>
            </AccordionTrigger>
            {course.map((sentence, index) => {
              const [talker, s] = NoTalker
                ? [undefined, sentence]
                : sentence.split(":");
              return (
                <AccordionContent key={id + index}>
                  {NoTalker ? null : (
                    <span
                      style={{ width: `${TalkerWidth * 0.75}em` }}
                      className="uppercase mr-1 text-right inline-block text-muted"
                    >
                      {talker}:
                    </span>
                  )}
                  <span className="text-primary">{s}</span>
                  <span className="text-muted">（{translation[index]}）</span>
                </AccordionContent>
              );
            })}
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
