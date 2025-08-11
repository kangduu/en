"use client";

import { useRouter } from "next/navigation";
import type { Course } from "@/lib/books";
import React from "react";
import { BookList } from "../BookList";
import type { NewConceptBookKey } from "@/utils/constant";
import { HeaderLinkPathMapping } from "@/lib/navigation";
export interface PreviewCourseProps extends ComponentCssProps {
  courses: Course[];
  book: NewConceptBookKey;
}
export default function PreviewCourse({ book, courses }: PreviewCourseProps) {
  const router = useRouter();
  return (
    <BookList
      courses={courses}
      onClick={(course) => {
        router.push(`${HeaderLinkPathMapping["NCE"]}/${book}/${course}`);
      }}
      render={({ course, id, translation }) => {
        return (
          <div className="pt-4 pb-4" key={book + id}>
            {course.map((sentence, index) => {
              const [talker, s] = sentence.split(":");
              return (
                <p key={id + index}>
                  <span className="uppercase mr-1 text-right inline-block w-[6em]">
                    {talker}:
                  </span>
                  {s}
                  <span>（{translation[index]}）</span>
                </p>
              );
            })}
          </div>
        );
      }}
    />
  );
}
