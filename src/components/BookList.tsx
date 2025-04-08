import React from "react";
import { books, type Course } from "@/src/db/books";
import type { NewConceptBookKey } from "../utils/constant";

export interface BookListProps {
  chapter: NewConceptBookKey;
  onClick?: (id: Course["id"], book: NewConceptBookKey) => void;
}
export default async function BookList({ chapter, onClick }: BookListProps) {
  try {
    const course = await books[chapter]()
      .then((res) => res)
      .catch(() => []);

    return (
      <ul>
        {course.map(({ name, id }, index) => {
          return (
            <li
              key={id}
              className="hover:text-blue-500 text-gray-700 cursor-pointer"
              onClick={() => onClick?.(id, chapter)}
            >
              {index + 1}. {name}
            </li>
          );
        })}
      </ul>
    );
  } catch (error) {
    console.log(error);
    return null;
  }
}
