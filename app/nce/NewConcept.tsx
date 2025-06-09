"use client";

import { NewConceptBooks, type BookLink } from "@/lib/navigation";
import type { NewConceptBookKey } from "@/utils/constant";
import React, { useEffect, useState } from "react";
import { getCourses, type Course } from "@/lib/books";
import { Card } from "../../components/ui/card";

interface BookListProps {
  book: NewConceptBookKey;
  onClick?: (id: Course["id"], book: NewConceptBookKey) => void;
}
function BookList({ book, onClick }: BookListProps) {
  const [courses, setCourses] = useState<Course[] | null>(null);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const course = await getCourses(book)
          .then((res) => res as Course[])
          .catch(() => []);
        setCourses(course);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setCourses(null);
      }
    }
    fetchCourses();
  }, [book]);

  if (courses === null) return <div>Loading...</div>;
  return (
    <ul>
      {courses.map(({ id, name }, index) => (
        <li
          key={id}
          className="hover:text-blue-500 text-gray-700 dark:text-white cursor-pointer"
          onClick={() => onClick?.(id, book)}
        >
          {index + 1}. {name}
        </li>
      ))}
    </ul>
  );
}

interface NewConceptProps {
  clickable?: boolean;
  showList?: boolean;
  onClickCourse?: BookListProps["onClick"];
  onClick?: (url: BookLink["url"]) => void;
}

export default function NewConcept({
  onClick,
  onClickCourse,
  showList,
}: NewConceptProps) {
  return (
    <div>
      {NewConceptBooks.map((book: BookLink) => (
        <Card
          key={book.id}
          // clickable={clickable}
          onClick={() => onClick?.(book.url)}
        >
          <div className="font-bold">{book.title}</div>
          {showList && <BookList book={book.id} onClick={onClickCourse} />}
        </Card>
      ))}
    </div>
  );
}
