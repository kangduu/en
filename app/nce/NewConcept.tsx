"use client";

import { NewConceptBooks, type BookLink } from "@/lib/navigation";
import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { BookList, type BookListProps } from "./BookList";
import { getCourses, type Course } from "@/lib/books";
import type { NewConceptBookKey } from "@/lib/utils";

interface RenderBookProps extends Pick<BookListProps, "onClick"> {
  book: NewConceptBookKey;
}
function RenderBook({ book, onClick }: RenderBookProps) {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const course = await getCourses(book)
          .then((res) => res as Course[])
          .catch(() => []);
        setCourses(course);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setCourses([]);
      }
    }
    fetchCourses();
  }, [book]);

  return <BookList courses={courses} onClick={onClick} />;
}

interface NewConceptProps {
  clickable?: boolean;
  showList?: boolean;
  onClickCourse?: (id: Course["id"], book: NewConceptBookKey) => void;
  onClick?: (url: BookLink["url"]) => void;
}

export default function NewConcept({
  onClick,
  onClickCourse,
  showList,
}: NewConceptProps) {
  return (
    <>
      {NewConceptBooks.map((book: BookLink) => (
        <Card
          key={book.id}
          onClick={() => onClick?.(book.url)}
          className="pl-4 pr-4 mb-4"
        >
          <div className="font-bold">{book.title}</div>
          {showList && (
            <RenderBook
              book={book.id}
              onClick={(id) => onClickCourse?.(id, book.id)}
            />
          )}
        </Card>
      ))}
    </>
  );
}
