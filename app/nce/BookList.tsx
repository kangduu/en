"use client";

import React, { type PropsWithChildren } from "react";
import { type Course } from "@/lib/books";
import { cn } from "@/lib/utils";

export interface BookListProps extends ComponentCssProps {
  courses: Course[];
  onClick?: (id: Course["id"], course: Course) => void;
  render?: (course: Course) => React.ReactNode;
}

export function BookList({
  courses,
  render,
  ...props
}: PropsWithChildren<BookListProps>) {
  if (courses === null) return <div>Loading...</div>;
  return (
    <ul className={cn(props.className)}>
      {courses.map((course, index) => {
        const { id, name } = course;
        return (
          <>
            <li
              key={id}
              className="hover:text-blue-500 text-gray-700 dark:text-white cursor-pointer"
              onClick={() => props.onClick?.(id, course)}
            >
              {index + 1}. {name}
            </li>
            {typeof render === "function" && render(course)}
            {props.children}
          </>
        );
      })}
    </ul>
  );
}
