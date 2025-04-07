"use client";

import { LexicalTemp, NewConceptTemp } from "../components";

export default function Home() {
  return (
    <>
      <h1 className="my-4">Part 1 Books</h1>
      <NewConceptTemp />

      <h1 className="my-4">Part 2 Lexical</h1>
      <LexicalTemp />

      <h1 className="my-4">Part 3 Practices</h1>

      <h1 className="my-4">Part 4 Exam</h1>
    </>
  );
}
