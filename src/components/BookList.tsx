import React from "react";
import { books } from "@/src/db/books";
import type { NewConceptBookKey } from "../utils/constant";

interface BookListProps {
  chapter: NewConceptBookKey;
}
export default async function BookList({ chapter }: BookListProps) {
  try {
    const course = await books[chapter]()
      .then((res) => res)
      .catch(() => []);

    return (
      <ul>
        {course.map(({ name, id }, index) => {
          return (
            <li key={id}>
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
