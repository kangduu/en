import { NewConceptBooks, type BookLink } from "../routes";
import Card, { type CardProps } from "./Card";
import BookList, { type BookListProps } from "./BookList";

interface NewConceptProps extends Pick<CardProps, "clickable"> {
  showList?: boolean;
  onClickCourse?: BookListProps["onClick"];
  onClick?: (url: BookLink["url"]) => void;
}

export default function NewConcept({
  showList = false,
  clickable = true,
  onClickCourse,
  onClick,
}: NewConceptProps) {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {NewConceptBooks.map((book: BookLink) => (
        <Card
          key={book.id}
          clickable={clickable}
          onClick={() => onClick?.(book.url)}
        >
          <h2>{book.title}</h2>
          {showList && <BookList chapter={book.id} onClick={onClickCourse} />}
        </Card>
      ))}
    </div>
  );
}
