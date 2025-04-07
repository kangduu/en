"use client";

import { useRouter } from "next/navigation";
import { NewConceptBooks, type BookLink } from "../routes";
import Card, { type CardProps } from "./Card";
import BookList from "./BookList";

interface NewConceptProps extends CardProps {
  showList?: boolean;
}

export default function NewConcept({
  showList = false,
  clickable = true,
}: NewConceptProps) {
  const router = useRouter();
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {NewConceptBooks.map((book: BookLink) => (
        <Card
          key={book.id}
          clickable={clickable}
          onClick={() => clickable && router.push(book.url)}
        >
          <h2>{book.title}</h2>
          {showList && <BookList chapter={book.id} />}
        </Card>
      ))}
    </div>
  );
}
