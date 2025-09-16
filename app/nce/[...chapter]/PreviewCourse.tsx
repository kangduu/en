"use client";

import { useRouter } from "next/navigation";
import type { Course } from "@/lib/books";
import React from "react";
import { HeaderLinkPathMapping } from "@/lib/navigation";
import type { NewConceptBookKey } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
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
      {courses.map(({ course, id, translation, name }) => {
        return (
          <AccordionItem key={book + id} value={id + book}>
            <AccordionTrigger className="hover:no-underline">
              <>
                <Button
                  variant="link"
                  className="p-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(
                      `${HeaderLinkPathMapping["NCE"]}/${book}/${id}`
                    );
                  }}
                >
                  开始练习
                </Button>
                <span className="hover:underline">{name}</span>
              </>
            </AccordionTrigger>
            {course.map((sentence, index) => {
              const [talker, s] = sentence.split(":");
              return (
                <AccordionContent key={id + index}>
                  <span className="uppercase mr-1 text-right inline-block w-[6em] text-muted">
                    {talker}:
                  </span>
                  {s}
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
