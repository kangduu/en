"use client";

import LexicalComp from "@/components/Lexical";
import Phonetic from "@/components/Phonetic";
import Subhead from "@/components/Subhead";

export default function Home() {
  return (
    <>
      <Subhead>Lexical</Subhead>
      <LexicalComp />
      <Subhead>phonetic</Subhead>
      <Phonetic />
      {/* <h1 className="my-4">Part 3 Practices</h1> */}
      {/* <h1 className="my-4">Part 4 Exam</h1> */}
    </>
  );
}
